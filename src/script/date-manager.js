export default {
  /**
   * @author jiaojiannan
   * @description 获取十二个月分
   */
  allMonths() {
    const months = [];
    for (let i = 1; i < 13; i++) months.push({ value: i, text: i + ' 月' });
    return months;
  },

  /**
   * @author jiaojiannan
   * @description 根据年份、月分获取当月天数的数据
   * @param {Number} year
   * @param {Number} month 1-12
   */
  daysInMonth(year, month) {
    const [days, leng] = [[], this.getMonthLength(year, month)];
    for (let i = 1; i <= leng; i++) days.push({ value: i, text: i + ' 日' });
    return days;
  },

  /**
   * @author jiaojiannan
   * @description 根据年份、月分获取当月总计天数
   * @param {Number} year
   * @param {Number} month 1-12
   */
  getMonthLength(year, month) {
    const [datumYear, datumMonth] = [
      12 === month ? year + 1 : year,
      12 === month ? 1 : month + 1,
    ]; //需要将月分向后推一个月
    const datum = new Date(datumYear + '-' + datumMonth);
    datum.setDate(0); //设置到指定月份最后一天
    return datum.getDate();
  },

  /**
   * @author jiaojiannan
   * @description 根据传入参数获取近几年，默认六年
   * @param {Number} range
   * @param {Number} maxYear
   */
  nearlyYears(range = 6, maxYear) {
    const years = [];
    let max = maxYear ? maxYear : new Date().getFullYear();
    for (let i = 0; i < range; i++) {
      const year = max - i;
      years.push({ value: year, text: year + ' 年' });
    }
    return years;
  },

  /**
   * @author jiaojiannan
   * @description 根据传入时间对象及分隔符输出日期字符串
   * @param {Date} date
   * @param {String} symbol
   */
  formatterDate(date, symbol) {
    return (
      date.getFullYear() +
      symbol +
      (date.getMonth() + 1) +
      symbol +
      date.getDate()
    );
  },
};
