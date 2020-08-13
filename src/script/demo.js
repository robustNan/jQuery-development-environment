import 'bootstrap';

import 'bootstrap/scss/bootstrap.scss';
import '../style/demo.sass';

import '../plugin/select'; //引入select插件
import displayState from './demoPage/display';

console.warn('全局引入jQuery', $);
console.warn('全局引入Lodash', _);
console.warn('全局引入Echarts', echarts);

console.warn(`current 'API' value: '${API}'`);

const $btn = $('.btn');
$btn.on('click', function (e) {
  $btn.removeClass('btn-primary, btn-outline-primary').addClass('btn-primary');
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

/* import引入图片 */
import bg from '../static/img/bg-1.jpg';
document.querySelector('#script-import').src = bg;

const years = $('#years').select([{ value: '2019', text: '2019年' }], (value, text) => {
  alert(`value: ${value}, text: ${text}\n提示：调用setValue方法也会设置value也会触发回调`);
});
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
