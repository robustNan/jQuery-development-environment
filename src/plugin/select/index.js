import '../../lib/jquery.nicescroll';
import './select.sass';

$.fn.extend({
  select: function (data, callback) {
    const _this = this;
    const $input = _this.children('input');
    /* webpack打包好的代码中回自动去掉 type="text" */
    // const $input = _this.children('input[type="text"]');
    const $glyphicon = $('<i class="glyphicon-triangle-bottom"></i>');
    const $ul = $('<ul class="list-group" style="width:' + _this.get(0).offsetWidth + 'px"></ul>');
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
      if (e.target !== _this.get(0) && e.target !== $input.get(0) && e.target !== $ul.get(0) && e.target !== $glyphicon.get(0)) setListVisible(false);
    });

    function setListVisible(visible) {
      if (visible) {
        $arrow.show();
        $ul.show();
        $glyphicon.css('transform', 'translateY(-50%) rotate(225deg)');
      } else {
        $arrow.hide();
        $ul.hide().getNiceScroll(0).doScrollLeft(0);
        $glyphicon.css('transform', 'translateY(-50%) rotate(45deg)');
      }
      displayFlag = visible;
    }

    function setData(data) {
      _data = data;
      $ul.empty();
      for (let i = 0, len = _data.length; i < len; i++) {
        $ul.append('<li title="' + _data[i].text + '" data-value="' + _data[i].value + '">' + _data[i].text + '</li>');
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
            $input.val(_data[i].text).attr('title', _data[i].text).data('value', value);
            if (typeof _callback == 'function') _callback(_data[i].value, _data[i].text);
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
