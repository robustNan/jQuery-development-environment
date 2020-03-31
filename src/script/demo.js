import 'bootstrap';

import 'bootstrap/scss/bootstrap.scss';
import '../style/demo.sass';

import displayState from './demoPage/display';

console.warn('全局引入jQuery', $);
console.warn('全局引入Lodash', _);
console.warn('全局引入Echarts', echarts);

console.warn(`current 'API' value: '${API}'`);

const $btn = $('.btn');
$btn.on('click', function(e) {
  $btn.removeClass('btn-primary, btn-outline-primary').addClass('btn-primary');
  $(e.target)
    .removeClass('btn-primary')
    .addClass('btn-outline-primary');
});

if (process.env.NODE_ENV === 'development') {
  const key = 'a63b0782ec22dfd190771f7f57cf579d';
  $.post('/txapi/ncov/index', { key }, function(response) {
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
