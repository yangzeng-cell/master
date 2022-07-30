// 练习hyajax -> axios
function hyajax({
  url,
  method = "get",
  data = {},
  timeout = 10000,
  headers = {}, // token
} = {}) {
  // 1.创建对象
  const xhr = new XMLHttpRequest()

  // 2.创建Promise
  const promise = new Promise((resolve, reject) => {

    // 2.监听数据
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject({ status: xhr.status, message: xhr.statusText })
      }
    }

    // 3.设置类型
    xhr.responseType = "json"
    xhr.timeout = timeout

    // 4.open方法
    if (method.toUpperCase() === "GET") {
      const queryStrings = []
      for (const key in data) {
        queryStrings.push(`${key}=${data[key]}`)
      }
      url = url + "?" + queryStrings.join("&")
      xhr.open(method, url)
      xhr.send()
    } else {
      xhr.open(method, url)
      xhr.setRequestHeader("Content-type", "application/json")
      xhr.send(JSON.stringify(data))
    }
  })

  promise.xhr = xhr

  return promise
}


