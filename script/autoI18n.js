const path = require('path')
const fs = require('fs')

const files = []
const filesJs = []
const mapDir = (directory) => {
  const statList = fs.readdirSync(directory)

  statList.forEach((filename) => {
    const pathname = path.join(directory, filename)
    const stat = fs.statSync(pathname)

    if (stat.isDirectory()) {
      mapDir(pathname)
    } else if (stat.isFile()) {
      if (['.vue'].includes(path.extname(pathname))) {
        files.push(pathname)
      } else if (['.js'].includes(path.extname(pathname))) {
        filesJs.push(pathname)
      }
    }
  })
}
const dir = path.join(__dirname, '../src')

mapDir(dir)
const arr = []

files.forEach((file) => {
  const fileData = fs.readFileSync(file, 'utf-8')
  // ==old /\$t\(('.*?')\)/g
  const array = fileData.match(/\$t\(('.*?[^\\]')\)/g)
  if (!array) {
    // console.error('没有可导出文件1')
    return
  }
  array.forEach((txt) => {
    const localTxt = txt.substring(4, txt.length - 2)

    if (!arr.includes(localTxt)) {
      arr.push(localTxt)
    }
  })
})
filesJs.forEach((file) => {
  const fileData = fs.readFileSync(file, 'utf-8')
  // ==old /\$t\(('.*?')\)/g
  const array = fileData.match(/i18n.t\(('.*?[^\\]')\)/g)
  // fileData.match(/\$t\(('.*?[^\\]')\)/g)
  if (!array) {
    // console.error('没有可导出文件1')
    return
  }
  array.forEach((txt) => {
    const localTxt = txt.substring(8, txt.length - 2)

    if (!arr.includes(localTxt)) {
      arr.push(localTxt)
    }
  })
})
/*
*
* */
// const routerJs = path.join(process.cwd(), '/src/router/index.js')
// // 读取 路由文件
// const readRouter2Data = (file) => {
//   const fileData = fs.readFileSync(file, 'utf-8')
//   const array = fileData.match(/i18n.t\(('.*?[^\\]')\)/g)
//   if (!array) {
//     return console.error('没有可导出文件2')
//   }
//   array.forEach((txt) => {
//     const localTxt = txt.substring(8, txt.length - 2)
//
//     if (!arr.includes(localTxt)) {
//       arr.push(localTxt)
//     }
//   })
// }
//
// readRouter2Data(routerJs)
// const routerJs12 = path.join(process.cwd(), '/src/utils/static.js')
// // 读取 路由文件
// const readRouter2Data12 = (file) => {
//   const fileData = fs.readFileSync(file, 'utf-8')
//   const array = fileData.match(/i18n.t\(('.*?[^\\]')\)/g)
//   if (!array) {
//     return console.error('没有可导出文件2')
//   }
//   array.forEach((txt) => {
//     const localTxt = txt.substring(8, txt.length - 2)
//
//     if (!arr.includes(localTxt)) {
//       arr.push(localTxt)
//     }
//   })
// }
//
// readRouter2Data12(routerJs12)

const res = {}

arr.forEach((key) => {
  res[key] = key
})
// console.log(JSON.stringify(arr))
const writeFilePath = path.resolve(process.cwd(), 'src/lang/locales')

fs.writeFileSync(`${writeFilePath}/en.json`, JSON.stringify(res, null, 2), 'utf-8')
