import type { ProjectMeta } from '@/types/project'

import { mentra } from './mentra'
import { executivelens } from './executivelens'
import { zentipay } from './zentipay'
import { transfiProject } from './transfi-project'
import { cuetv } from './cuetv'
import { orgDashboard } from './org-dashboard'

import { raahiProject } from './raahi-project'
import { thePointCdc } from './the-point-cdc'
import { officeOfDiversity } from './office-of-diversity'

import { clawedChat } from './clawed-chat'
import { oncallLens } from './oncall-lens'
import { aiVoice } from './ai-voice'
import { ballahCode } from './ballah-code'

import { keyboardProject } from './keyboard-project'
import { jugalbandi } from './jugalbandi'
import { vjSoftware } from './vj-software'
import { shuffle } from './shuffle'
import { enigma } from './enigma'
import { makingOfTime } from './making-of-time'

import { uvLight } from './uv-light'
import { revolvingStage } from './revolving-stage'
import { theOmakase } from './the-omakase'
import { moniacMachine } from './moniac-machine'
import { drowning } from './drowning'

import { tedx } from './tedx'
import { codeForBuild } from './code-for-build'
import { typeface } from './typeface'
import { atps } from './atps'

import { pdf } from './pdf'
import { creativetech } from './creativetech'

export const projects: Record<string, ProjectMeta> = {
  // ── UX Design ──────────────────────────────────────────────
  mentra,
  executivelens,
  zentipay,
  'transfi-project': transfiProject,
  cuetv,
  'org-dashboard': orgDashboard,

  // ── Design for Good ────────────────────────────────────────
  'raahi-project': raahiProject,
  'the-point-cdc': thePointCdc,
  'office-of-diversity': officeOfDiversity,

  // ── AI & Wearables ────────────────────────────────────────
  'clawed-chat': clawedChat,
  'oncall-lens': oncallLens,
  'ai-voice': aiVoice,
  'ballah-code': ballahCode,

  // ── Creative Technology ────────────────────────────────────
  'keyboard-project': keyboardProject,
  jugalbandi,
  'vj-software': vjSoftware,
  shuffle,
  enigma,
  'making-of-time': makingOfTime,

  // ── Installations ──────────────────────────────────────────
  'uv-light': uvLight,
  'revolving-stage': revolvingStage,
  'the-omakase': theOmakase,
  'moniac-machine': moniacMachine,
  drowning,

  // ── Brand & Visual ─────────────────────────────────────────
  tedx,
  'code-for-build': codeForBuild,
  typeface,
  atps,

  // ── Uncategorised ──────────────────────────────────────────
  pdf,
  creativetech,
}

export const projectList = Object.values(projects)
