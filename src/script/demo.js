import 'bootstrap';

import 'bootstrap/scss/bootstrap.scss';
import '../style/demo.sass';

/* 引入日期范围选择器 */
import 'daterangepicker/daterangepicker.js';
import 'daterangepicker/daterangepicker.css';

import '../plugin/select'; //引入select插件
import displayState from './demoPage/display';

/* import引入图片 */
import bg from '../static/img/bg-1.jpg';

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

  const years = $('#years').select(
    [{ value: '2019', text: '2019年' }],
    (value, text) => {
      alert(
        `value: ${value}, text: ${text}\n提示：调用setValue方法也会设置value也会触发回调`
      );
    }
  );
  years.setData([
    { value: '2019', text: '2019年' },
    { value: '2018', text: '2018年' },
    { value: '2017', text: '2017年' },
    { value: '2016', text: '2016年' },
    { value: '2015', text: '2015年' },
    { value: '2014', text: '2014年' },
    { value: '2013', text: '2013年' },
    { value: '2012', text: '2012年' },
    { value: '2011', text: '2011年' },
    { value: '2010', text: '2010年' },
    { value: '2009', text: '2009年' },
    { value: '2008', text: '2008年' },
    { value: '2007', text: '2007年' },
    { value: '2006', text: '2006年' },
  ]);
  // years.setValue('2019')

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
});
