import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { loadLanguageAsync } from '@/lang'
import i18n from "../lang";
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'layout',
  //   redirect: '/home',
  //   component: () => import(/* webpackChunkName: "layout" */ '../components/defaultLayout'),
  //   meta: {
  //     auth: false,
  //     title: 'layout',
  //     isDetail: false,
  //   },
  //   children:[
  //     {
  //       path: '/home',
  //       name: 'home',
  //       component: () => import(/* webpackChunkName: "home" */ '../views/home/index'),
  //       meta: {
  //         auth: false,
  //         title: 'Home',
  //         isDetail: false,
  //       }
  //     },
  //     {
  //       path: '/news',
  //       name: 'news',
  //       component: () => import(/* webpackChunkName: "news" */ '../views/news/index'),
  //       meta: {
  //         auth: false,
  //         title: 'News',
  //         isDetail: false,
  //       }
  //     },
  //     {
  //       path: '/detail',
  //       name: 'newsDetail',
  //       component: () => import(/* webpackChunkName: "news-detail" */ '../views/news/detail'),
  //       meta: {
  //         auth: false,
  //         title: 'Consultation details',
  //         isDetail: false,
  //       }
  //     },
  //   ]
  // },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/index'),
    meta: {
      auth: false,
      title: 'Home',
      isDetail: false,
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.query.anchor) { // 路由跳转要传需要定的锚点的id 例如；this.$router.push("index?anchor=download")
        return {
          selector: '#' + to.query.anchor
        }
      }
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes
})

router.beforeEach(async (to, from, next) => {
  let lang = store.getters.localLang;
  console.log(lang,'lang')
  if (to.query && to.query.lang !== store.getters.localLang && ['zh-CN', 'en', 'zh-TW','ja','ko'].includes(to.query.lang)) {
    lang = store.getters.localLang
    store.commit('setLocalLang', to.query.lang)
  }
  loadLanguageAsync(lang).then(() => next())
})
router.afterEach((to) => {
  document.title = i18n.t(process.env.VUE_APP_BASE_TITLE) + (to.meta.title?" - "+i18n.t(to.meta.title) : '')
})
export default router
