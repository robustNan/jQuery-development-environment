import 'bootstrap';

import 'bootstrap/scss/bootstrap.scss';
import '../style/demo.sass';

/* 引入日期范围选择器 */
import 'daterangepicker/daterangepicker.js';
import 'daterangepicker/daterangepicker.css';

import '../plugin/el-select'; //引入select插件
import displayState from './demoPage/display';

/* import引入图片 */
import bg from '../static/img/bg-1.jpg';

import dateM from '../plugin/date-manager';
import Arithmetic from '../plugin/arithmetic';

/**
 * @description 日期范围选择插件配置
 * @type {Object}
 */
const locale = {
  format: 'YYYY/MM/DD',
  separator: ' - ',
  applyLabel: '确定',
  cancelLabel: '取消',
  fromLabel: 'From',
  toLabel: 'To',
  customRangeLabel: 'Custom',
  weekLabel: 'W',
  daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
  monthNames: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十一月',
    '十二月',
  ],
  firstDay: 1,
};

$(function () {
  console.warn('全局引入jQuery', $);
  console.warn('全局引入Lodash', _);
  console.warn('全局引入Echarts', echarts);

  console.warn(`current 'API' value: '${API}'`);

  const $btn = $('.btn');
  $btn.on('click', function (e) {
    $btn
      .removeClass('btn-primary, btn-outline-primary')
      .addClass('btn-primary');
    $(e.target).removeClass('btn-primary').addClass('btn-outline-primary');
  });

  if (process.env.NODE_ENV === 'development') {
    const key = 'a63b0782ec22dfd190771f7f57cf579d';
    $.post('/txapi/ncov/index', { key }, function (response) {
      if (response.code === 200) {
        const desc = response.newslist[0].desc;
        displayState(desc);
      }
    });
  } else {
    const data = require('../static/data/data.json');
    displayState(data.newslist[0].desc);
  }

  document.querySelector('#script-import').src = bg;

  const years = $('#years').elSelect(
    [{ value: '2019', text: '2019年' }], //初始设置的数据
    (value, text) => {
      alert(
        `value: ${value}, text: ${text}\n提示：调用setValue方法也会设置value也会触发回调`
      );
    }
  );
  years.setData(dateM.nearlyYears()); //再次设置可选择数据
  // years.setValue('2015'); //设置指定值

  console.log($('#date-range').daterangepicker);

  $('#date').daterangepicker(
    {
      locale,
      // autoApply: true,
      drops: 'up',
      startDate: '2020/09/09',
      singleDatePicker: true,
    },
    function (start, end, label) {
      console.log(
        '选择了一个新的日期: ' +
          start.format('YYYY-MM-DD') +
          ' to ' +
          end.format('YYYY-MM-DD')
      );
    }
  );

  $('#date-range').daterangepicker(
    {
      locale,
      // autoApply: true,
      drops: 'up',
      opens: 'left',
      startDate: '2020/09/03',
      endDate: '2020/09/09',
    },
    function (start, end, label) {
      console.log(
        '选择了一个新的日期: ' +
          start.format('YYYY-MM-DD') +
          ' to ' +
          end.format('YYYY-MM-DD')
      );
    }
  );

  const arith = new Arithmetic(); //初始化计算对象
  $('#calc').on('click', () => {
    const expression = $('#calc-input').val();
    const result = arith.calculate(expression); //传入表达式开始计算
    alert(result);
  });
});
