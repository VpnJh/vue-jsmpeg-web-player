import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Table as ElTable, TableColumn as ElTableColumn, Pagination as ElPagination, Notification
} from 'element-ui'
Vue.use(ElTable)
Vue.use(ElTableColumn)
Vue.use(ElPagination)
Vue.prototype.$notifyElement = Notification
