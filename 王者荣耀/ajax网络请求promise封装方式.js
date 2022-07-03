function httpRequestPromise({
  url,
  method = "get",
  timeout = 10000,
  data = {},
  headers = {},
} = {}) {
  const xhr = new XMLHttpRequest();
  const promsie = new Promise((resolve, reject) => {
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          message: xhr.statusText,
        });
      }
    };

    xhr.responseType = "json";
    xhr.timeout = timeout;
    xhr.ontimeout = function () {
      console.log("监听过期时间");
    };
    if (method.toUpperCase() === "GET") {
      const queryString = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          queryString.push(`${key}=${data[key]}`);
        }
      }
      url = url.includes("?")
        ? url + "&" + queryString.join("&")
        : url + "?" + queryString.join("&");
      xhr.open(method, url);
      xhr.send();
    } else if (method.toUpperCase() === "POST") {
      xhr.open(method, url);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(data));
    }
  });
  // 把xhr传出去，可以进行调用xhr.abort()
  promsie.xhr = xhr;
  return promsie;
}
