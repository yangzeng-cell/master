function hyajax({
  url,
  method = "get",
  data = {},
  timeout = 5000,
  headers = {},
  success,
  failure
} = {}) {
  // 1.创建xhr对象
  const xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      success && success(xhr.response)
    } else {
      failure && failure(xhr.response)
    }
  }

  xhr.ontimeout = function() {
    failure && failure("timeout")
  }

  // 2.设置响应的类型
  xhr.responseType = "json"
  xhr.timeout = timeout

  // 3.发送请求
  const params = Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`)
  const paramsString = params.join("&")

  // 设置header
  // for (const headerKey in headers) {
  //   xhr.setRequestHeader(headerKey, headers[headerKey])
  // }

  if (method.toLowerCase() === "get") {
    xhr.open(method, url + "?" + paramsString)
    xhr.send()
  } else {
    xhr.open(method, url)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send(paramsString)
  }

  return xhr
}
