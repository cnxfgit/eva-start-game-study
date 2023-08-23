/**
 * 返回start到end区间的随机数 左闭右开
 * @param start
 * @param end
 */
export const randomByRange = (start: number, end: number) => {
  return Math.floor(start + Math.random() * (end - start));
}
