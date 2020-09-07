import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';

import '../plugin/date-picker';

import '../style/stylus.styl';

$(function () {
  $('#date').datePicker({ isEn: true });
  $('#date-range').datePicker({
    default: {
      start: '2020-09-07',
      end: '2020-09-07',
    },
    range: true,
  });
});
