import Vue from 'vue'

import Auth from './auth'

const components = [Auth]

components.forEach((component) => {
  Vue.component(component.name, component)
})

export { Auth }
