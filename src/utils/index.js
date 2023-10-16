const assetsUri = (src) => {
  if (src && (src.includes('https://') || src.includes('http://'))) {
    return src
  }
  return require(`@assets/${src}`)
}
function getUrlParams (params) {
  const urlObj = {}
  if (!window.location.search) { return false }
  const urlParams = window.location.search.substring(1)
  const urlArr = urlParams.split('&')
  for (let i = 0; i < urlArr.length; i++) {
    const urlArrItem = urlArr[i].split('=')
    urlObj[urlArrItem[0]] = urlArrItem[1]
  }
  // 判断是否有参数
  if (arguments.length >= 1) {
    return urlObj[params]
  }
  return urlObj
}

export {
  assetsUri, getUrlParams
}
