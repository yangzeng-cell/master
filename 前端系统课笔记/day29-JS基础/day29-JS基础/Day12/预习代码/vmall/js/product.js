var baseURL = "https://res.vmallres.com/pimages"

// 获取元素
var productEl = document.querySelector(".product")
var filterResultList = [].concat(resultList)
var filterKeywords = []

// 遍历数据
function showResultList() {
  productEl.innerHTML = ""
  for (var item of filterResultList) {
    var productItemEl = document.createElement("li")
    productItemEl.classList.add("item")
    productEl.append(productItemEl)

    // 拼接welfare字符串
    var welfwareTemplate = ""
    for (var tip of item.promoLabels) {
      welfwareTemplate += `<span class="tip">${tip}</span>`
    }

    productItemEl.innerHTML = `
      <a href="#">
        <img class="album" src="${baseURL}${item.photoPath}428_428_${item.photoName}" alt="">
        <div class="title">${item.name}</div>
        <div class="discount">
          ${item.promotionInfo}
        </div>
        <div class="price">¥${item.price}</div>
        <div class="welfare">
          ${welfwareTemplate}
        </div>
        <div class="comment">
          <span class="count">
            ${item.rateCount}人评价
          </span>
          <span class="rate">
            ${item.goodRate}% 好评
          </span> 
        </div>
      </a>
    `
  }
  for (var i = 0; i < 3; i++) {
    var emptyLi = document.createElement("li")
    emptyLi.className = "item empty"
    productEl.append(emptyLi)
  }
}

function updateFilterResult() {
  filterResultList = resultList.filter(function(item) {
    var itemDiscounts = item.services
    var isFlag = true
    for (var keyword of filterKeywords) {
      if (!itemDiscounts.includes(keyword)) {
        isFlag = false
        break
      }
    }
    return isFlag
  })
  console.log(filterResultList)
  showResultList()
}

function sortFilterResult(sortKey) {
  if (sortKey === "default") {
    console.log("------")
    updateFilterResult()
  } else {
    filterResultList.sort(function(item1, item2) {
      return item2[sortKey] - item1[sortKey]
    })
    console.log(filterResultList, sortKey)
    showResultList()
  }
}

showResultList()

// 功能实现
var discountEl = document.querySelector(".discount")
for (var i = 1; i < discountEl.children.length; i++) {
  var itemEl = discountEl.children[i]
  itemEl.onclick = function () {
    var discountInfo = this.textContent.trim()
    this.classList.toggle("active")
    if (this.classList.contains("active")) {
      filterKeywords.push(discountInfo)
    } else {
      var keywordIndex = filterKeywords.indexOf(discountInfo)
      filterKeywords.splice(keywordIndex, 1)
    }
    updateFilterResult()
  }
}

var sortEl = document.querySelector(".sort")
var activeSortEl = sortEl.querySelector(".active")
for (var i = 1; i < sortEl.children.length; i++) {
  var sortItemEl = sortEl.children[i]
  sortItemEl.onclick = function() {
    activeSortEl.classList.remove("active")
    this.classList.add("active")
    activeSortEl = this
    
    sortFilterResult(this.dataset.key)
  }
}

