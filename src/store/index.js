import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./', true, /\.state.js$/)
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  moduleName = moduleName.replace('.state', '')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
// {
//       OneMoreWallet: null,
//       'TrueSwap-V1': null,
//       'TrueSwap-V2': null,
//       discard: null,
//       twitter: null,
//       in: null,
//       youtobe: null
//     }
const store = new Vuex.Store({
  modules,
  state: {
    lang: 'en',
    configList: null
  },
  getters: {
    localConfigList (state) {
      return state.configList
    },
    localLang (state) {
      const lang = localStorage.getItem('lang')
      if (lang && lang !== 'undefined') {
        store.commit('setLocalLang', lang)
        return state.lang
      }
      return state.lang
    }
  },
  mutations: {
    setLocalConfigList (state, configList) {
      state.configList = configList
    },
    setLocalLang (state, lang) {
      state.lang = lang
      localStorage.setItem('lang', lang)
    }
  },
  actions: {

  }
})

export default store
