function parseLyric(lyricString) {
  // 1.根据\n切割字符串
  const lyricLineStrings = lyricString.split("\n")
  // console.log(lyricLineStrings)

  // 2.针对每一行歌词进行解析
  // [01:22.550]夏末秋凉里带一点温热有换季的颜色
  const timeRe = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/i
  const lyricInfos = []
  for (const lineString of lyricLineStrings) {
    // 1.获取时间
    const result = lineString.match(timeRe)
    if (!result) continue
    const minuteTime = result[1] * 60 * 1000
    const secondTime = result[2] * 1000
    const mSecondTime = result[3].length === 3? result[3]*1: result[3]*10
    const time = minuteTime + secondTime + mSecondTime
    
    // 2.获取内容
    const content = lineString.replace(timeRe, "").trim()

    // 3.将对象放到数组中
    lyricInfos.push({ time, content })
  }

  return lyricInfos
}