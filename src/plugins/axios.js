'use strict'

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs' // 引入 qs
import store from '@/store'
import i18n from '../lang'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset:UTF-8'
  }
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = store.getters.ms_usertoken
    config.headers.language = 'en'
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    const { status, data } = response
    // Do something with response data
    if (status === 200) {
      if (data.code === 401) {
        localStorage.clear()
        window.location.reload()
        return response
      }
    }
    return response
  },
  function (error) {
    // Do something with response error
    if (error.response) {
      const { response: { data, status } } = error
      if (status === 502) {
        return Promise.reject({ code: 502, msg: i18n.t('System error!') })
      }
      return Promise.reject(data)
    }
    // eslint-disable-next-line
    return Promise.reject({
      code: -1,
      msg: error.toString()
    })
    //   映射 给 app 让他们 去 找 重新让用户登录
  }
)

Plugin.install = function (Vue) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

// 返回一个Promise
export function fetch (url, params, type) {
  // debugger

  return new Promise((resolve, reject) => {
    if (type && type.toLowerCase() === 'post') {
      // 因后台post请求需form-data传参，所以使用qs.stringify

      _axios.post(url, qs.stringify(params))
        .then(response => {
          resolve(response.data)
        }, err => {
          // Indicator.close();
          // Toast('网络故障，请稍后再试')
          resolve(err)
          localStorage.setItem({ err: err })
        })
        .catch((error) => {
          resolve(error)
        })
    } else {
      _axios.get(url, { params: params })
        .then(response => {
          resolve(response.data)
        }, err => {
          // Indicator.close();
          // Toast('网络故障，请稍后再试')
          resolve(err)
        })
        .catch((error) => {
          resolve(error)
        })
    }
  })
}

Vue.use(Plugin)

export default Plugin
