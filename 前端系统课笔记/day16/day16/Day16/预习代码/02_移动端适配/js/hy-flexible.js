const htmlEl = document.documentElement
function setRemUnit() {
  const unit = htmlEl.clientWidth / 10
  htmlEl.style.fontSize = unit + "px"
}

setRemUnit()
window.addEventListener("resize", function() {
  setRemUnit()
})
window.addEventListener("pageshow", function(e) {
  if (e.persisted) {
    setRemUnit()
  }
})