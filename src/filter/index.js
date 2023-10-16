export const filter = {
  filterChainLineCode (num) {
    let result = ''
    switch (num) {
      case 4001:
        result = '用戶拒絕請求'
        break
      case 4100:
        result = '未經授權'
        break
      case 4200:
        result = '不支持的方法'
        break
      case 4900:
        result = '斷開連接'
        break
      case 4901:
        result = '鏈條斷開'
        break
      default:
        result = '錯誤的請求'
        break
    }
    return result
  },
  formatPhone (val) {
    if (!val) {
      return ''
    }
    return `${val.substring(0, 3)}****${val.substring(7)}`
  },
  // 邮箱加密
  formatEmail (val) {
    return `${val.substring(0, 2)}****${val.substring(6)}`
  }
}
