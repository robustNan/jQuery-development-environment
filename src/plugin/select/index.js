import '../../lib/jquery.nicescroll';
import './select.sass';

const down = require('./chevron-down.svg');
console.log(down);
$.fn.extend({
  select: function (data, callback) {
    const _this = this;
    const $input = _this.children('input');
    /* webpack打包好的代码中回自动去掉 type="text" */
    // const $input = _this.children('input[type="text"]');
    const $glyphicon = $(
      `<svg class="glyphicon-triangle-bottom" width="16px" height="16px" viewBox="0 0 16 16" fill="#ccc" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>`
      // `<i class="glyphicon-triangle-bottom"></i>`
    );
    const $ul = $(
      '<ul class="list-group" style="width:' +
        _this.get(0).offsetWidth +
        'px"></ul>'
    );
    const $arrow = $('<div class="select-arrow"></div>');

    let _data = null;
    let _callback = callback;
    let displayFlag = false;

    _this.append($glyphicon).append($arrow).append($ul);

    $input
      .on('click', function () {
        if (displayFlag) setListVisible(false);
        else setListVisible(true);
        if (_this.get(0).offsetWidth != $ul[0].offsetWidth) {
          $ul.css({ width: _this.get(0).offsetWidth + 'px' });
        }
      })
      .prop('readonly', true)
      .attr('placeholder', '请选择');

    $glyphicon.on('click', function () {
      if (displayFlag) setListVisible(false);
      else setListVisible(true);
    });

    if (typeof data == 'object' && data instanceof Array) setData(data);

    $ul
      .on('click', function (e) {
        const $target = $(e.target);
        const value = $target.attr('data-value');
        const text = $target.text();
        $input.val(text).attr('title', text).data('value', value);
        if (typeof _callback == 'function') _callback(value, text);
      })
      .niceScroll({
        cursorcolor: '#c0c4cc',
      });

    $(document).on('click', function (e) {
      if (
        e.target !== _this.get(0) &&
        e.target !== $input.get(0) &&
        e.target !== $ul.get(0) &&
        e.target !== $glyphicon.get(0)
      )
        setListVisible(false);
    });

    function setListVisible(visible) {
      if (visible) {
        $arrow.show();
        $ul.show();
        $glyphicon.css('transform', 'translateY(-50%) rotate(180deg)');
      } else {
        $arrow.hide();
        $ul.hide().getNiceScroll(0).doScrollLeft(0);
        $glyphicon.css('transform', 'translateY(-50%) rotate(0)');
      }
      displayFlag = visible;
    }

    function setData(data) {
      _data = data;
      $ul.empty();
      for (let i = 0, len = _data.length; i < len; i++) {
        $ul.append(
          '<li title="' +
            _data[i].text +
            '" data-value="' +
            _data[i].value +
            '">' +
            _data[i].text +
            '</li>'
        );
      }
      $ul.getNiceScroll().resize();
      return _this;
    }

    _this.setData = setData;

    _this.setCallback = function (callback) {
      if (typeof callback == 'function') _callback = callback;
    };

    _this.setValue = function (value) {
      if (typeof _data == 'object' && _data instanceof Array && _data.length)
        for (let i = 0, len = _data.length; i < len; i++) {
          if (value == _data[i].value) {
            $input
              .val(_data[i].text)
              .attr('title', _data[i].text)
              .data('value', value);
            if (typeof _callback == 'function')
              _callback(_data[i].value, _data[i].text);
            return _this;
          }
        }
      return _this;
    };

    _this.value = function () {
      return $input.data('value');
    };

    return _this;
  },
});
