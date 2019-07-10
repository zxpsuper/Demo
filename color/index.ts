/*
 * @Author: super
 * @Date: 2019-06-27 16:29:31
 * @Last Modified by: super
 * @Last Modified time: 2019-07-10 10:20:00
 */
import { addEvent, extend, windowToCanvas } from "./utils";
import { getColor } from "./gameMethods";
import { Context } from "vm";
interface ColorGameType {
  init: Function;
  nextStep: Function;
  reStart: Function;
}
interface BaseOptions {
  time?: number;
  end?: Function;
  start?: Function;
  canvas?: HTMLCanvasElement;
}
// 坐标
interface Coordinate {
  x: number;
  y: number;
}
class ColorGame implements ColorGameType {
  private option: BaseOptions;
  private step: number; // 步
  private score: number; // 得分
  private time: number;
  private blockWidth: number; // 盒子宽度
  private randomBlock: number; // 随机盒子索引
  private positionArray: Array<Coordinate>;
  private widthScale: number; // 实虚宽度比
  constructor(userOption: BaseOptions) {
    this.option = {
      time: 30, // 总时长
      canvas: <HTMLCanvasElement>document.getElementById("canvas"),
      start: () => {
        document.getElementById("result").innerHTML = "";
        document.getElementById("screen").style.display = "block";
      },
      end: (score: number) => {
        document.getElementById("screen").style.display = "none";
        document.getElementById(
          "result"
        ).innerHTML = `<div class="result" style="width: 100%;">
        <div class="block-inner" id="restart"> 您的得分是： ${score} <br/> 点击重新玩一次</div>
      </div>`;
        // @ts-ignore
        addEvent(document.getElementById("restart"), "click", () => {
          this.reStart();
        });
      } // 结束函数
    };
    this.init(userOption); // 初始化，合并用户配置
  }
  init(userOption: BaseOptions) {
    if (this.option.start) this.option.start();
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
    this.widthScale =
      this.option.canvas.width /
      this.option.canvas.getBoundingClientRect().width;
    // 设置初始时间和分数
    document.getElementsByClassName(
      "wgt-score"
    )[0].innerHTML = `得分：<span id="score">${this.score}</span>
    时间：<span id="timer">${this.time}</span>`;

    // 开始计时
    (<any>window).timer = setInterval(() => {
      if (this.time === 0) {
        clearInterval((<any>window).timer);
        this.option.end(this.score);
      } else {
        this.time--;
        document.getElementById("timer").innerHTML = this.time.toString();
      }
    }, 1000);
    this.nextStep(); // 下一关
    ["mousedown", "touchstart"].forEach(event => {
      this.option.canvas.addEventListener(event, e => {
        let loc = windowToCanvas(this.option.canvas, e);
        if (
          this.option.canvas
            .getContext("2d")
            .isPointInPath(loc.x * this.widthScale, loc.y * this.widthScale)
        ) {
          this.nextStep();
          this.score++;
          document.getElementById("score").innerHTML = this.score.toString();
        }
      });
    });
  }
  nextStep() {
    // 记级
    this.step++;
    let col: number; // 列数
    if (this.step < 6) {
      col = this.step + 1;
    } else if (this.step < 12) {
      col = Math.floor(this.step / 2) * 2;
    } else if (this.step < 18) {
      col = Math.floor(this.step / 3) * 3;
    } else {
      col = 16;
    }
    let canvas = this.option.canvas;
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.width); // 清除画布
    ctx.closePath();
    // 小盒子宽度
    this.blockWidth = (canvas.width - (col - 1) * 2 * this.widthScale) / col;
    // 随机盒子index
    this.randomBlock = Math.floor(col * col * Math.random());
    // 解构赋值获取一般颜色和特殊颜色
    let [normalColor, specialColor] = getColor(this.step);

    this.positionArray = [];
    for (let i = 0; i < col ** 2; i++) {
      let row = Math.floor(i / col);
      let colNow = i % col;
      let x = colNow * (this.blockWidth + 2),
        y = row * (this.blockWidth + 2);

      this.positionArray.push({
        x,
        y
      });
      if (i !== this.randomBlock)
        drawItem(ctx, normalColor, x, y, this.blockWidth, this.blockWidth);
    }

    ctx.beginPath();
    drawItem(
      ctx,
      specialColor,
      this.positionArray[this.randomBlock].x,
      this.positionArray[this.randomBlock].y,
      this.blockWidth,
      this.blockWidth
    );
    ctx.closePath();
  }
  reStart() {
    console.log("重新开始");
    this.init(this.option);
  }
}

function drawItem(
  context: Context,
  color: string,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  context.fillStyle = `#${color}`;
  context.rect(x, y, width, height);
  context.fill(); //替代fillRect();
}
export default ColorGame;
