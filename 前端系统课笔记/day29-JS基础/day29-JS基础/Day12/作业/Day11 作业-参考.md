# Day11 作业布置

## 一. 完成课堂所有的代码





## 二. 整理JSON的相关用法和应用场景

三种用法

- 简单值: 数字 字符串 布尔类型
- 对象值 key value组成 必须添加双引号 value 可以是简单值 对象值 数组值
- 数组值 内容可以是对象值 简单值 数组值

应用场景

- 网络传输的JSON数据
- 项目的某些配置文件
- 非关系型数据库将JSON作为存储文件



## 三. 实现购物车案例数量的变化

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h2fb8ncc5bj20x60f00uv.jpg" alt="image-20220520235737553" style="zoom:67%;" />

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    table {
      border-collapse: collapse;
    }

    thead {
      background-color: #f5f5f5;
    }

    th,
    td {
      border: 1px solid #aaa;
      padding: 8px 12px;
      text-align: center;
    }
  </style>
</head>

<body>

  <table>
    <thead>
      <tr>
        <th>编号</th>
        <th>书籍名称</th>
        <th>出版日期</th>
        <th>价格</th>
        <th>购买数量</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  <h2 class="price">
    总价格: ¥<span class="price-count">0</span>
  </h2>

  <script>
    // 1.从服务器获取数据 ajax/fetch
    var books = [
      {
        id: 1,
        name: '《算法导论》',
        date: '2006-09',
        price: 85.00,
        count: 3
      },
      {
        id: 2,
        name: '《UNIX编程艺术》',
        date: '2006-02',
        price: 59.00,
        count: 2
      },
      {
        id: 3,
        name: '《编程珠玑》',
        date: '2008-10',
        price: 39.00,
        count: 5
      },
      {
        id: 4,
        name: '《代码大全》',
        date: '2006-03',
        price: 128.00,
        count: 8
      }
    ]


    var tbodyEl = document.querySelector("tbody")
    for (const value of books) {
      const trEl = document.createElement("tr")
      for (const key in value) {
        const tdEl = document.createElement("td")
        const tdvalue = value[key];
        tdEl.textContent = tdvalue;

        if (key === "count") {
          const btnEl = document.createElement("button")
          const btnEl2 = document.createElement("button")
          btnEl.textContent = "-"
          btnEl2.textContent = "+"
          tdEl.prepend(btnEl)
          tdEl.append(btnEl2)

          btnEl.onclick = function () {
            value[key]--
            for (const iterator of tdEl.childNodes) {
              if (iterator.nodeName === "#text") {
                iterator.data--
                sumPrice()
                if (iterator.data === "0") {
                  btnEl.disabled = "false"
                }
              }
            }
          }
          btnEl2.onclick = function () {
            value[key]++
            for (const iterator of tdEl.childNodes) {
              if (iterator.nodeName === "#text") {
                iterator.data++
                sumPrice()
              }
            }
          }
        }
        if (key === "price") {
          tdEl.textContent = `￥${tdvalue}`
        }
        trEl.append(tdEl);
      }


      const btnEl = document.createElement("button")
      const tdBtnEl = document.createElement("td")
      btnEl.textContent = "删除"
      tdBtnEl.append(btnEl)
      trEl.append(tdBtnEl)
      btnEl.addEventListener("click", () => {
        const trow = btnEl.parentElement.parentElement // as HTMLTableRowElement
        const trowIndex = trow.sectionRowIndex

        trow.remove()
        books.splice(trowIndex, 1)
        sumPrice()

      })

      tbodyEl.append(trEl);
    }


    var priceCountEl = document.querySelector(".price-count")
    sumPrice()
    function sumPrice() {
      priceCountEl.textContent = books.reduce((pre, item) => pre + item.price * item.count
        , 0)
    }
  </script>

</body>

</html>
```



## 四. 完成考拉Tab的动态切换

![image-20220522003736775](https://tva1.sinaimg.cn/large/e6c9d24egy1h2gi0l50xvj20ii02nmxa.jpg)





## 六. 实现华为商城的轮播图（选做/可以不做无限轮播）

* https://www.vmall.com/index.html

![image-20220522003844455](https://tva1.sinaimg.cn/large/e6c9d24egy1h2gi1pwau3j21cn0f5dj6.jpg)



















