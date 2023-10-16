import CryptoJS from 'crypto-js'
export const fileRead = {
  data () {
    return {

    }
  },
  methods: {
    encrypt (key, password) {
      return CryptoJS.AES.encrypt(key, password).toString()
    },
    decrypt (decryptKey, password) {
      const bytes = CryptoJS.AES.decrypt(decryptKey, password)
      return bytes.toString(CryptoJS.enc.Utf8)
    },
    initFile2Data (file) {
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')// 读取文件
      return new Promise((resolve, reject) => {
        reader.onload = (evt) => { // 读取完文件之后会回来这里
          // 这里可以获取并处理文件数据，json可以用JSON.parse()转成json对象
          resolve(evt.target.result)
        }
      })
    },
    initData2File (data, filename = 'pr') {
      if (!data) {
        alert('保存的数据为空')
        return
      }
      if (!filename) filename = 'json.json'
      if (typeof data === 'object') {
        data = JSON.stringify(data, undefined, 4)
      }
      // 要创建一个 blob 数据
      const blob = new Blob([data], { type: 'text/json' })
      const a = document.createElement('a')
      a.download = filename

      // 将blob转换为地址
      // 创建 URL 的 Blob 对象
      a.href = window.URL.createObjectURL(blob)
      console.log(blob, '链接', a.href)

      // 标签 data- 嵌入自定义属性  屏蔽后也可正常下载
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      console.log(a, 'dataset', a.dataset.downloadurl)

      // 添加鼠标事件
      const event = new MouseEvent('click', {})
      console.log('事件', event)

      // 向一个指定的事件目标派发一个事件
      a.dispatchEvent(event)
    }
  }
}
