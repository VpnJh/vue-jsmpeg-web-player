import 'babel-polyfill'
import Vue from 'vue'
import './style/reset.css'
import './plugins/axios'
import './plugins/element'
import App from './App.vue'
import './plugins/vant.js'
import store from './store'
import router from './router'
import VueClipboard from 'vue-clipboard2'
import i18n from './lang'
import './plugins/svgIcon'

// import './plugins/vConsole'
// Object.keys(filter).forEach((key) => {
//   Vue.filter(key, filter[key])
// })
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.config.productionTip = false
new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
