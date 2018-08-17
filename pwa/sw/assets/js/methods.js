// 时间格式化  
export function formatDate(date, fmt = "dd-MM-yyyy") {
  // 长度为10的时候末尾补3个0
  if (String(date).length !== 13) {
    date += '000'
  }
  if (date === null || date === 'null') {
    return '--'
  }
  date = new Date(Number(date))
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

// 图片url处理
export function imgUrlDeal(url) {
  //判断客户端是否支持webp
  let isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
  if (isSupportWebp) {
    if (/!/.test(url)) {
      return url.split('!')[0]
    } else {
      return url + '!360.webp'
    }
  } else {
    return url
  }
}
// 还原图片
export function reduceImg(url) {
  if (/!360/.test(url) || /!760/.test(url)) {
    return url.split('!')[0]
  } else {
    return url
  }
}

export function changeToDate (date) {
  let arr = date.split(' ')
  let year = arr[1].slice(6);
  let month = arr[1].slice(3, 5);
  let dateTemp = arr[1].slice(0, 2);
  let timeString = year + '-' + month + '-' + dateTemp + ' ' + arr[0]
  console.log(timeString)
  return new Date(timeString)
}