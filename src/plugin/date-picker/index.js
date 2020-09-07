import date from './date';
import './picker.sass';

// console.log(date.daysInMonth(2020, 2));
const symbolName = 'date-picker-symbol'; //用来处理datepicker区域外点击的隐藏选框的class标记
const body = document.body;
const bodyOverfloow = body.style.overflow; //缓存body原始的overflow属性,选框隐藏后回复body

$.fn.extend({
  datePicker(option) {
    const _this = this;
    const _option = $.extend(
      {
        range: false,
        isEn: false,
        default: '', //range未false -> 'yyyy-mm-dd' | range为true -> {start: 'yyyy-mm-dd', end: 'yyyy-mm-dd'}
      },
      option
    );

    const now = new Date();
    const [year, month, date, day] = [
      now.getFullYear(), //年
      now.getMonth(), //月
      now.getDate(), //日
      now.getDay(), //周?
    ];

    /* 日期范围的开始与结束,如果不需要选择日期范围只取end数据 */
    const [start, end] = [
      { year, month, date },
      { year, month, date },
    ];

    /* 初始化input框,设置默认值及placeholder */
    const lastInput = _this.children('input').last();
    let firstInput = null;

    _this.dialog_h = _this.dialog_w = 300;

    if (_option.range) {
      firstInput = _this.children('input').first();

      firstInput.attr('placeholder', _option.isEn ? 'Start date' : '开始日期');
      lastInput.attr('placeholder', _option.isEn ? 'End date' : '结束日期');

      if (_option.default) {
        firstInput.val(_option.default.start);
        lastInput.val(
          /* 校验默认结束日期是否比开始日期小 */
          new Date(_option.default.end) < new Date(_option.default.start)
            ? _option.default.start
            : _option.default.end
        );
      }

      _this.dialog_w = 600;
    } else {
      lastInput.attr('placeholder', _option.isEn ? 'Select date' : '选择日期');

      if (_option.default) lastInput.val(_option.default);
    }

    _this.dialog = $('.date-picker-dialog');
    if (!_this.dialog.length) {
      _this.dialog = $(
        `<div class="date-picker-dialog ${symbolName}" style="height:${_this.dialog_h}px;width:${_this.dialog_w}px;"></div>`
      );
      $('body').append(_this.dialog);
    }

    _this.on('click', 'input', function (e) {
      openDatePicker.call(_this, e, this);
    });
  },
});

/**
 * @author cooper
 * @description datepicker区域外点击隐藏选框
 */
$(document).on('click', function (e) {
  const target = e.target;
  if (
    !~target.className.indexOf('form-control') &&
    !~target.className.indexOf(symbolName)
  ) {
    $('.date-picker-dialog').css('display', 'none');
    body.style.overflow = bodyOverfloow;
  }
});

/**
 * @author cooper
 * @description 打开选择弹窗
 * @param {InputEvent} e
 * @param {DocumentHTML} input
 */
function openDatePicker(e, input) {
  const [position_top, position_left] = calcPosition(e, input, {
    dialog_h: this.dialog_h,
    dialog_w: this.dialog_w,
  });

  body.style.overflow = 'hidden';

  this.dialog.css({
    display: 'block',
    left: position_left + 'px',
    top: position_top + 'px',
    width: this.dialog_w + 'px',
  });
}

/**
 * @author cooper
 * @description 计算选择弹窗的位置
 * @param {InputEvent} e
 * @param {DocumentHTML} input
 * @param {Number} { dialog_h, dialog_w }
 * @returns {Array} [position_top, position_left]
 */
function calcPosition(e, input, { dialog_h, dialog_w }) {
  // 元素在页面上的位置 input.offsetLeft, input.offsetTop
  // 元素的宽高 input.offsetWidth, input.offsetHeight
  // 浏览器窗口的宽高 window.innerWidth, window.innerHeight

  // 点击事件在input框中的位置 e.offsetX, e.offsetY
  // 点击事件在input框中的位置 e.pageX, e.pageY

  const margin = 6; //弹窗与input框的距离
  const [inputX, inputY] = [e.clientX - e.offsetX, e.clientY - e.offsetY]; //被点击的input框相对浏览器窗口的位置

  let [dialog_top, dialog_left] = [
    inputY + input.offsetHeight + margin,
    inputX,
  ];

  if (dialog_top + dialog_h > window.innerHeight)
    dialog_top = inputY - dialog_h - margin;

  dialog_top = 0 > dialog_top ? 0 : dialog_top;

  if (dialog_left + dialog_w > window.innerWidth)
    dialog_left = inputX + input.offsetWidth - dialog_w;

  dialog_left = 0 > dialog_left ? 0 : dialog_left;

  return [dialog_top, dialog_left];
}
