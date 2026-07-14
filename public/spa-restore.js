(function () {
  var params = new URLSearchParams(window.location.search)
  var path = params.get('p')
  if (!path) return
  var restoredQuery = params.get('q')
  params.delete('p')
  params.delete('q')
  var query = restoredQuery || params.toString()
  window.history.replaceState(null, '', path + (query ? '?' + query : '') + window.location.hash)
})()
