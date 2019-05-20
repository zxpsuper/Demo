class Global {
  constructor() {}

  /**
   * 判断是否为 PC 端，若是则返回 true，否则返回 flase
   */
  IsPC() {
    let userAgentInfo = navigator.userAgent,
      flag = true,
      Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];

    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }

  /**
   * 缓动函数，由快到慢
   * @param {Num} t 当前时间
   * @param {Num} b 初始值
   * @param {Num} c 变化值
   * @param {Num} d 持续时间
   */
  easeOut(t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
    return (-c / 2) * (--t * (t - 2) - 1) + b;
  }

  windowToCanvas(canvas, e) {
    console.log(this.IsPC(), canvas, e);
    let bbox = canvas.getBoundingClientRect(),
      x = this.IsPC()
        ? e.clientX || event.clientX
        : e.changedTouches[0].clientX,
      y = this.IsPC()
        ? e.clientY || event.clientY
        : e.changedTouches[0].clientY;

    return {
      x: x - bbox.left,
      y: y - bbox.top
    };
  }

  /**
   * 绘制自动换行的文本
   * @param {Obj} context
   * @param {Str} t          文本内容
   * @param {Num} x          坐标
   * @param {Num} y          坐标
   * @param {Num} w          文本限制宽度
   * @param {Num} lineHeight 行高
   */
  drawText(context, t, x, y, w, lineHeight = 20) {
    let chr = t.split(""),
      temp = "",
      row = [];

    for (let a = 0; a < chr.length; a++) {
      if (context.measureText(temp).width < w) {
      } else {
        row.push(temp);
        temp = "";
      }
      temp += chr[a];
    }

    row.push(temp);

    for (let b = 0; b < row.length; b++) {
      context.fillText(row[b], x, y + (b + 1) * lineHeight);
    }
  }

  /**
   * 定义圆角矩形的方法
   * @param {Obj} context
   * @param {Num} cornerX
   * @param {Num} cornerY
   * @param {Num} width
   * @param {Num} height
   * @param {Num} cornerRadius
   */
  roundedRect(context, cornerX, cornerY, width, height, cornerRadius) {
    if (width > 0) context.moveTo(cornerX + cornerRadius, cornerY);
    else context.moveTo(cornerX - cornerRadius, cornerY);

    context.arcTo(
      cornerX + width,
      cornerY,
      cornerX + width,
      cornerY + height,
      cornerRadius
    );

    context.arcTo(
      cornerX + width,
      cornerY + height,
      cornerX,
      cornerY + height,
      cornerRadius
    );

    context.arcTo(cornerX, cornerY + height, cornerX, cornerY, cornerRadius);

    if (width > 0) {
      context.arcTo(
        cornerX,
        cornerY,
        cornerX + cornerRadius,
        cornerY,
        cornerRadius
      );
    } else {
      context.arcTo(
        cornerX,
        cornerY,
        cornerX - cornerRadius,
        cornerY,
        cornerRadius
      );
    }
  }
}
