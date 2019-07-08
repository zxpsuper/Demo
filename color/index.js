class ColorGame {
  constructor(userOption) {
    this.option = {
      time: 30, // 总时长
      end: score => {
        document.getElementById(
          "screen"
        ).innerHTML = `<div class="result" style="width: 100%;">
        <div class="block-inner" id="restart"> You score is ${score} <br/> click to start again</div>
      </div>`;
        addEvent(document.getElementById("restart"), "click", () => {
          this.init();
        });
      } // 结束函数
    };
    this.init(userOption); // 初始化，合并用户配置
  }
  init(userOption) {
    this.step = 0;
    this.score = 0;
    if (userOption) {
      if (Object.assign) {
        Object.assign(this.option, userOption);
      } else {
        extend(this.option, userOption, true);
      }
    }
    // 倒计时赋值
    this.time = this.option.time;
    // 设置初始时间和分数
    document.getElementsByClassName(
      "wgt-score"
    )[0].innerHTML = `得分：<span id="score">${this.score}</span>
    时间：<span id="timer">${this.time}</span>`;

    // 开始计时
    window.timer = setInterval(() => {
      if (this.time === 0) {
        clearInterval(window.timer);
        this.option.end(this.score);
      } else {
        this.time--;
        document.getElementById("timer").innerHTML = this.time;
      }
    }, 1000);
    this.nextStep(); // 下一关
  }
  nextStep() {
    // 记级
    this.step++;
    let col; // 列数
    if (this.step < 6) {
      col = this.step + 1;
    } else if (this.step < 12) {
      col = Math.floor(this.step / 2) * 2;
    } else if (this.step < 18) {
      col = Math.floor(this.step / 3) * 3;
    } else {
      col = 16;
    }
    // 小盒子宽度
    let blockWidth = ((100 / col).toFixed(2) * 100 - 1) / 100;
    // 随机盒子index
    let randomBlock = Math.floor(col * col * Math.random());
    // 解构赋值获取一般颜色和特殊颜色
    let [normalColor, specialColor] = getColor(this.step);
    // 模板字符串
    let item = `<div class="block" style="width: ${blockWidth}%;">
    <div class="block-inner" style="background-color: #${normalColor}"></div>
  </div>`;
    // 包含所有盒子的数组
    let arr = [];

    for (let i = 0; i < col * col; i++) arr.push(item);
    // 修改随机盒子
    arr[randomBlock] = `<div class="block" style="width: ${blockWidth}%;">
    <div class="block-inner" style="background-color: #${specialColor}" id="special-block"></div>
  </div>`;
    document.getElementById("screen").innerHTML = arr.join("");
    // 监听特殊盒子点击事件
    addEvent(document.getElementById("special-block"), "click", () => {
      this.nextStep();
      this.score++;
      document.getElementById("score").innerHTML = this.score;
    });
  }
}
// 合并参数方法
function extend(o, n, override) {
  for (var p in n) {
    if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) o[p] = n[p];
  }
}
/**
 * 根据关卡等级返回相应的一般颜色和特殊颜色
 * @param {number} step 关卡
 */
function getColor(step) {
  let random = Math.floor(100 / step);
  // let random = Math.floor(Math.abs(100 - 4 * step));
  let color = randomColor(17, 255),
    m = color.match(/[\da-z]{2}/g);
  console.log("m", m);
  console.log(typeof m[0]);
  console.log("color", color);
  for (let i = 0; i < m.length; i++) m[i] = parseInt(m[i], 16); //rgb
  let specialColor =
    getRandomColorNumber(m[0], random) +
    getRandomColorNumber(m[1], random) +
    getRandomColorNumber(m[2], random);
  return [color, specialColor];
}

function getRandomColorNumber(num, random) {
  let temp = Math.floor(num + (Math.random() < 0.5 ? -1 : 1) * random);
  if (temp > 255) {
    return "ff";
  } else if (temp > 16) {
    return temp.toString(16);
  } else if (temp > 0) {
    return "0" + temp.toString(16);
  } else {
    return "00";
  }
}
// 随机颜色 min 大于16
function randomColor(min, max) {
  var r = randomNum(min, max).toString(16);
  var g = randomNum(min, max).toString(16);
  var b = randomNum(min, max).toString(16);
  return r + g + b;
}
// 随机数
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// 事件兼容方法

function addEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, handler);
  } else {
    element["on" + type] = handler;
  }
}
