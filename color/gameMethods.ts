/**
 * 根据关卡等级返回相应的一般颜色和特殊颜色
 * @param {number} step 关卡
 */
export function getColor(step: number): Array<string> {
  let random = Math.floor(100 / step);
  // let random = Math.floor(Math.abs(100 - 4 * step));
  let color = randomColor(17, 255),
    m: Array<string | number> = color.match(/[\da-z]{2}/g);
  for (let i = 0; i < m.length; i++) m[i] = parseInt(String(m[i]), 16); //rgb
  let specialColor =
    getRandomColorNumber(m[0], random) +
    getRandomColorNumber(m[1], random) +
    getRandomColorNumber(m[2], random);
  return [color, specialColor];
}
/**
 * 返回随机颜色的一部分值
 * @param num 数字
 * @param random 随机数
 */
export function getRandomColorNumber(
  num: number | string,
  random: number
): string {
  let temp = Math.floor(Number(num) + (Math.random() < 0.5 ? -1 : 1) * random);
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
export function randomColor(min: number, max: number): string {
  var r = randomNum(min, max).toString(16);
  var g = randomNum(min, max).toString(16);
  var b = randomNum(min, max).toString(16);
  return r + g + b;
}
// 随机数
export function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
