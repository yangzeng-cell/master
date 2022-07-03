var baseURL = "https://res.vmallres.com"

var bannerEl = document.querySelector(".banner-list")
for (var i = 0; i < banners.length; i++) {
  var bannerData = banners[i]
  var liEl = document.createElement("li")
  liEl.classList.add("item")
  liEl.style.left = `${100*i}%`

  var imgEl = document.createElement("img")
  imgEl.src = `${baseURL}${bannerData.imgUrl}`
  liEl.append(imgEl)
  bannerEl.append(liEl)
}

// 复制第一个和最后一个
var firstCloneLiEl = bannerEl.children[0].cloneNode(true)
firstCloneLiEl.style.left = `${banners.length * 100}%`
var lastCloneLiEl = bannerEl.children[banners.length-1].cloneNode(true)
lastCloneLiEl.style.left = `${-100}%`
bannerEl.append(firstCloneLiEl)
bannerEl.prepend(lastCloneLiEl)

var indicatorEl = document.querySelector(".indicator")
for (var i = 0; i < banners.length; i++) {
  var liEl = document.createElement("li")
  liEl.classList.add("item")
  if (i === 0) {
    liEl.classList.add("active")
  }
  indicatorEl.append(liEl)
  liEl.index = i
  liEl.onclick = function() {
    stopTimer()
    previousIndex = currentIndex
    currentIndex = this.index
    switchBannerItem()
    startTimer()
  }
}

// 按钮的切换
var currentIndex = 0
var previousIndex = 0
// var prevBtn = document.querySelector(".prev")
// var nextBtn = document.querySelector(".next")

// prevBtn.onclick = function() {
//   stopTimer()
//   previousIndex = currentIndex
//   currentIndex--
//   switchBannerItem()
//   startTimer()
// }

// nextBtn.onclick = function() {
//   stopTimer()
//   showNextBannerItem()
//   startTimer()
// }

function switchBannerItem() {
  // 1.切换图片
  bannerEl.style.transition = `all 1000ms ease`
  var position = -currentIndex * 100
  bannerEl.style.transform = `translateX(${position}%)`
  console.log(position)

  // 2.切换指示器
  if (currentIndex === banners.length) {
    currentIndex = 0
    moveBannerItem(0)
  } else if (currentIndex === -1) {
    currentIndex = banners.length - 1
    moveBannerItem(currentIndex * 100)
  }
  var previoutIndicatorEl = indicatorEl.children[previousIndex]
  var currentIndicatorEl = indicatorEl.children[currentIndex]
  previoutIndicatorEl.style.backgroundColor = "#aaa"
  currentIndicatorEl.style.backgroundColor = "red"
}

function moveBannerItem(position) {
  setTimeout(function() {
    bannerEl.style.transition = `none`
    bannerEl.style.transform = `translateX(${-position}%)`
  }, 1000);
}

function showNextBannerItem() {
  previousIndex = currentIndex
  currentIndex++
  switchBannerItem()
}

// 定时器
var timer = null
startTimer()
function startTimer() {
  timer = setInterval(function() {
    showNextBannerItem()
  }, 3000);
}

function stopTimer() {
  if (timer) clearInterval(timer)
}