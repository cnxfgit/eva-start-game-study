/**
 * 返回start到end区间的随机数 左闭右开
 * @param start
 * @param end
 */
export const randomByRange = (start: number, end: number) => {
  return Math.floor(start + Math.random() * (end - start));
}

export const randomByLen = (len: number) => {
  let str = ''
  for (let i = 0; i < len; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str
}