
/*
* xlsx 文件必须放在report 文件夹中 并且命名 为hec-i18n
* params  导出的 指定的 数据格式 文件  文件 标题有 ['key','简体'.'繁体','英文']
* 数组里面的 索引值 num 默认等于1;
*
* */

const moment = require('moment')
const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx')
const file = path.join(__dirname, '../src/lang/locales/zh-TW.json')
const headerStyle = {
  font: {
    bold: true
  },
  alignment: {
    horizontal: 'center'
  }
}
const title = [
  {
    v: 'zh-TW',
    s: headerStyle
  }, {
    v: 'en',
    s: headerStyle
  },
  {
    v: 'ja',
    s: headerStyle
  },
  {
    v: 'ko',
    s: headerStyle
  }
]
const exportI18n = function (data) {
  fs.readFile(file, 'utf-8', function (err, data) {
    if (err) {
    } else {
      const targetData = [title]
      const fileData = JSON.parse(data)
      Object.keys(fileData).forEach((item) => {
        const itemArr = [fileData[item]]
        targetData.push(itemArr)
      })
      const buffer = xlsx.build([
        {
          name: 'sheet1',
          data: targetData
        }
      ], {
        '!cols': [{ wch: 45 }, { wch: 45 }, { wch: 45 }]
      })
      fs.writeFileSync(`report/${moment(new Date()).format('YYYY-MM-DD')}-iot-i18n.xlsx`, buffer, { flag: 'w' })
    }
  })
}

try {
  exportI18n()
} catch (err) {
  throw err
}
