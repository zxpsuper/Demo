class Game {
  constructor(userOption) {
    this.option = {
      time: 30,
      level: 'normal',
      end: () => {}
    };
    this.step = 0;
    this.score = 0;
    this.init(userOption);
  }
  init(userOption) {
    // 合并用户配置
    if (Object.assign) {
      Object.assign(this.option, userOption);
    } else {
      this.extend(this.option, userOption, true);
    }

    // 设置初始时间和分数
    document.getElementsByClassName('wgt-score')[0].innerHTML = `得分：<span id="score">${this.score}</span>
    时间：<span id="timer">${this.option.time}</span>`

    // 开始计时
    window.timer = setInterval(() => {
      if (this.option.time === 0) {
        clearInterval(window.timer)
        this.option.end(this.score)
      } else {
        this.option.time--
        document.getElementById('timer').innerHTML = this.option.time
      }
    }, 1000)
    this.nextStep()
    
  }
  nextStep() {
    // 记级
    this.step++ 
    let col // 列数
    if (this.step < 6) {
      col = this.step + 1
    } else if (this.step < 12) {
      col = Math.floor(this.step / 2) * 2
    } else if (this.step < 18){
      col = Math.floor(this.step / 3) * 3
    } else {
      col = 16
    }
    // 小盒子宽度
    let blockWidth = ((100/col).toFixed(2) * 100 - 1) / 100
    let randomBlock = Math.floor(col*col*Math.random())
    let [normalColor, specialColor] = getColor(this.step)
    let item = `<div class="block" style="width: ${blockWidth}%;">
    <div class="block-inner" style="background-color: #${normalColor}"></div>
  </div>`
    let arr = []
    for (let i = 0; i < col*col; i++) {
      arr.push(item)
    }
    arr[randomBlock] = `<div class="block" style="width: ${blockWidth}%;">
    <div class="block-inner" style="background-color: #${specialColor}" id="special-block"></div>
  </div>`
    document.getElementById('screen').innerHTML = arr.join('')
    document.getElementById('special-block').addEventListener('click', () => { 
      this.nextStep()
      this.score ++ 
      document.getElementById('score').innerHTML = this.score
    })
  }
  // 合并参数方法
  extend(o, n, override) {
    for (var p in n) {
      if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))
        o[p] = n[p];
    }
  }
}
function getColor(step) {
  let random = Math.floor(Math.abs(100-4*step))
  var color = randomColor(0, 255), m = color.match(/[\da-z]{2}/g);
  for (var i = 0; i < m.length; i++) m[i] = parseInt(m[i], 16);//rgb
  let specialColor = Math.floor(m[0] + (Math.random() < 0.5 ? -1 : 1) * random).toString(16) +
  Math.floor(m[1] + (Math.random() < 0.5 ? -1 : 1) * random).toString(16) +
  Math.floor(m[2] + (Math.random() < 0.5 ? -1 : 1) * random).toString(16);
  return [color, specialColor]
}

function randomColor(min, max) {
  var r = randomNum(min, max).toString(16)
  var g = randomNum(min, max).toString(16)
  var b = randomNum(min, max).toString(16)
  return r + g + b
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}