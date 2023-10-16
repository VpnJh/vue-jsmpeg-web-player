/*
* 请修改 一下 倒数文件的 路径 才能生成 英文的 ;
* xlsx 文件必须放在report 文件夹中 并且命名 为hec-i18n
* params  [key,英文,简体,繁体];
* 数组里面的 索引值 num 默认等于1;
*
* */
const fs = require('fs')
const xlsx = require('node-xlsx')
const filePath = `${__dirname}/../src/lang/locales/`
const defaultGetPath = `${__dirname}/../report/iot-i18n.xlsx`
const importExecl = () => {
  const workSheetsFromFile = xlsx.parse(defaultGetPath)
  const excelObj = workSheetsFromFile[0].data
  const target = {}
  const fileName = excelObj[0]
  if (excelObj.length) {
    for (const itemString in fileName) {
      target[fileName[itemString]] = {}
      for (const arrInd in excelObj) {
        const item = excelObj[arrInd]
        if (arrInd > 0 && item.length > 0 && item[itemString]) {
          target[fileName[itemString]][item[0]] = item[itemString]
        }
      }
    }
  }
  Object.keys(target).forEach(async (item, index) => {
    const itemFileName = filePath + item + '.json'
    fs.writeFile(itemFileName, JSON.stringify(target[item]), function (err) {
      if (err) {
        return err
      }
    })
  })
}

try {
  importExecl()
} catch (err) {
  throw err
}
