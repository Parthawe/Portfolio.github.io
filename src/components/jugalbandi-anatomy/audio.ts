import { midiForSensor, demoFrequency, type Instrument } from './model'
/** Illustrative synthesis. Never presented as a recording or recovered tuning. */
export class MechanismAudio {
  context: AudioContext | null = null
  private voices = new Set<AudioScheduledSourceNode>()
  async enable() { this.context ??= new AudioContext(); await this.context.resume() }
  play(kind: Instrument, channel: number, velocity=96) {
    const ctx = this.context
    if (!ctx || ctx.state !== 'running') return
    this.stop()
    const duration = kind === 'harp' ? 1.1 : kind==='hexa'?.6:.8, gain = ctx.createGain(), filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'; filter.frequency.value = kind === 'rain' ? 2500 : 4500
    gain.gain.setValueAtTime(.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(.12*(kind==='hexa'?midiForSensor(channel,velocity).velocity/127:1), ctx.currentTime + .015)
    gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + duration)
    gain.connect(filter); filter.connect(ctx.destination)
    let source: AudioScheduledSourceNode
    if (kind === 'flute'||kind==='hexa') {
      const oscillator = ctx.createOscillator(); oscillator.type = kind==='hexa'?'triangle':'sine'; oscillator.frequency.value = kind==='hexa'?440*2**((midiForSensor(channel).note-69)/12):demoFrequency(channel + 2); oscillator.connect(gain); source = oscillator
    } else {
      const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate), samples = buffer.getChannelData(0), period = Math.round(ctx.sampleRate / demoFrequency(channel))
      for (let i = 0; i < samples.length; i++) samples[i] = kind === 'harp' ? (i < period ? Math.random() * 2 - 1 : .495 * (samples[i - period] + samples[Math.max(0, i - period - 1)])) : (Math.random() * 2 - 1) * (.2 + .8 * Math.sin(i / ctx.sampleRate * 55) ** 8)
      const player = ctx.createBufferSource(); player.buffer = buffer; player.connect(gain); source = player
    }
    source.onended = () => { source.disconnect(); gain.disconnect(); filter.disconnect(); this.voices.delete(source) }
    this.voices.add(source); source.start(); source.stop(ctx.currentTime + duration)
  }
  stop() { for (const source of this.voices) { try { source.stop() } catch { /* Already ended. */ } } this.voices.clear() }
  close() { this.stop(); void this.context?.close(); this.context = null }
}
