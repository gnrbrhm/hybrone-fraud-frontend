import store from '../store/index.js'

export default function (to, from, next) {
  console.log(to)
  const auth = store.state.auth
  //Route Değiştikçe 0 lanacak olan Store değişkenleri
  store.state.dataTable.selectedRows = []
  store.state.dataTable.selectedRow = {}
  console.log(auth)
  const isLoggedIn = store.getters['auth/isLoggedIn']
  let isUndefined = typeof to.name === 'undefined'
  console.log(isLoggedIn)
  console.log(isUndefined)

  const queryRedirect = to.query.redirect

  if (isUndefined) {
    if (!isLoggedIn) {
      next({ name: 'Login' })
    } else {
      if (queryRedirect) next({ name: queryRedirect })
      next({ name: 'Integrator' })
    }
  }

  if (isLoggedIn) {
    if (queryRedirect) next({ name: 'Dashboard' })
    if (!queryRedirect && to.name == 'Login') next({ name: 'Dashboard' })
    next()
  } else {
    if (to.meta.layout == 'auth') {
      let payload = {
        name: 'Login',
        query: {
          redirect: queryRedirect
        }
      }
      if (!queryRedirect) delete payload.query.redirect
      next(payload)
    } else {
      next()
    }
  }
}
