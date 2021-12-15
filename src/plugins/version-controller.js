export default ({ store }) => {
  if (!localStorage) return

  const { version } = require('../../package.json')
  const storedVersion = localStorage.getItem('version') || ''

  if (version !== storedVersion) {
    localStorage.setItem('version', version)
    // if (store.state.auth.token) store.dispatch('auth/versionUpgrade', version)
    if (window) window.location.reload(true)
  }
}
