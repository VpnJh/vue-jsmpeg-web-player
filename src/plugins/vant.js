import Vue from 'vue'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import '../vant-variables.less'

Vue.use(Vant)
// // 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true
})
