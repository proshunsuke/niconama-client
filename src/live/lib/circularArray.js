// @flow
export default class CircularArray{
  construct(){}

  /**
   *
   * @param list
   * @param num
   * @returns {any}
   */
  static get(list: Array<any>, num: number) {
    if ( list.length === 0) throw new Error('Array length is should be greater then 0');
    const surplusNum = num % list.length;
    if (surplusNum >= 0) {
      return list[surplusNum]
    } else {
      return list[surplusNum + list.length ]
    }
  }
}
