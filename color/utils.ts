/*
 * @Author: super
 * @Date: 2019-06-27 16:29:43
 * @Last Modified by: super
 * @Last Modified time: 2019-07-10 10:03:25
 */

/**
 * promisify promise化，使得promisify(func).then()更加方便，不用每次都構造 promise
 * Making Promise more convenient, without having to construct a promise every time
 * @param f {function} 異步函數
 */

export const promisify = (f: Function): Function => {
  return function() {
    const args = Array.prototype.slice.call(arguments);
    return new Promise(function(resolve, reject) {
      args.push(function(err: object, result: object) {
        if (err) reject(err);
        else resolve(result);
      });
      f.apply(null, args);
    });
  };
};

/**
 * 判斷是不是 image dom 節點
 * Determine if it is a dom
 * @param o image dom 節點
 */
export function isImageDom(o: any): boolean {
  return o && ["IMAGE", "IMG"].includes(o.tagName);
}

/**
 * 合并两个对象
 * @param o 默认对象
 * @param n 自定义对象
 * @param override 是否覆盖默认对象
 */
export function extend(o: any, n: any, override: boolean): void {
  for (var p in n) {
    if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) o[p] = n[p];
  }
}

/**
 *   事件兼容方法
 * @param element dom元素
 * @param type 事件类型
 * @param handler 事件处理函数
 */
export function addEvent(element: HTMLElement, type: string, handler: any) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
    // @ts-ignore
  } else if (element.attachEvent) {
    // @ts-ignore
    element.attachEvent("on" + type, handler);
  } else {
    // @ts-ignore
    element["on" + type] = handler;
  }
}

/**
 * 获取点击点于canvas内的坐标
 * @param canvas canvas对象
 * @param e 点击事件
 */
export function windowToCanvas(canvas: HTMLCanvasElement, e: any) {
  let bbox = canvas.getBoundingClientRect(),
    x = IsPC()
      ? e.clientX
      : e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX,
    y = IsPC()
      ? e.clientY
      : e.changedTouches
      ? e.changedTouches[0].clientY
      : e.clientY;

  return {
    x: x - bbox.left,
    y: y - bbox.top
  };
}

/**
 * 判断是否为 PC 端，若是则返回 true，否则返回 flase
 */
export function IsPC(): boolean {
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
 * 判断是否为数组
 * @param obj 任意对象变量
 */
export function isArray(obj: any): boolean {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

/**
 * 判断一个东西是否存在于数组内
 * @param arr 数组
 * @param item 子项
 */
export function isInArray(arr: Array<any>, item: any): boolean {
  for (var i = arr.length; --i > -1; ) {
    if (item === arr[i]) return true;
  }
  return false;
}

/**
 * 判斷是否是函數
 * Determine if it is a function
 * @param o {function} 函數
 */
export function isFunction(o: any): boolean {
  return typeof o === "function";
}
/**
 * 判斷是不是字符串
 * Determine if it is a string
 * @param o {string} 字符串
 */
export function isString(o: any): boolean {
  return typeof o === "string";
}

export function _getRootName(prop: string, path: string): string {
  if (path === "#") {
    return prop;
  }
  return path.split("-")[1];
}
