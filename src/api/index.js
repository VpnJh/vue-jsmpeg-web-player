import { fetch } from '../plugins/axios.js'

const api = process.env.VUE_APP_BASE_URL + '/api'

// ---------- 配置信息  -----------------
export function getConfigList () {
  return fetch(`${api}/index/configList`, {}, 'post')
}
