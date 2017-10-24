var c = (function($){
  var ca ,
      ck = {},
      defaults;
  ck.checkAll = function (options) {
      this.settings = $.extend({}, defaults, options || {});
      this.table = $(this.settings.table); // tbody
      this.CBtn = $(this.settings.CBtn); // 全选按钮
      this.dC = this.settings.dC; // 是否默认选中
      this.chk_tr = this.settings.table + ' tr '; // 子选项 tr 一行
      this.checkboxes = this.settings.checkboxes; // 子项 checkbox
      this.CBtn.prop('checked', this.dC);
      if (this.settings.filter) {
        this.checkboxes = this.checkboxes +':not(:'+this.settings.filter+')'
      }
  };
  ck.fn = {
    ca: function () {
      this.event();
      this._all();
    },
    event: function() {
      var _that = this;
      $(document).delegate(this.settings.CBtn, 'click', function(){
        _that._all();
      });

      var checkbox_filter = this.chk_tr + this.checkboxes;
      $(document).delegate(checkbox_filter, 'click', function(){
        _that._isCheck();
      });
    },
    _all: function() {
      var flag = $(this.CBtn).prop('checked');
      var _that = this;
      $(this.chk_tr).each(function(index, element) {
        var checkbox = $(element).find(_that.checkboxes);
        checkbox.prop('checked', flag);
      });
    },
    getValue: function () {
      var _that = this;
      var values = [];
      $(this.chk_tr).each(function(index, element) {
        var checkbox = $(element).find(_that.checkboxes);
        var flag = checkbox.is(':checked');
        if (flag) {
          values.push(checkbox.val());
        }
      });
      return values;
    },
    _isCheck: function () {
      var _that = this;
      var checkbox_filter = this.chk_tr + this.checkboxes;
      $(checkbox_filter).each(function(index, element){
        var checkbox = $(element);
        var flag = checkbox.is(':checked');
        if (!flag) {
          $(_that.settings.CBtn).prop('checked', false);
          return false;
        }
        if (flag && index === $(checkbox_filter).size() - 1) {
          $(_that.settings.CBtn).prop('checked', true);
        }
      });
    }
  };

  defaults = {
    table: '.tbody_box .table tbody', // 选择体
    CBtn: 'thead>tr>th:first input[type="checkbox"]', // 全选按钮
    dC: false, //defaultCheck //默认是否选中
    checkboxes: 'td:nth-of-type(1) input[type="checkbox"]',//子项按钮
    filter: null //过滤条件
  };

  // 创建对象
  ck.opts = function(){
    // ck.checkAll.prototype = ck.fn;
    var cka = new ck.checkAll(arguments[0]);
    cka.__proto__ = ck.fn;
    cka.ca();
    return cka;
  };
  ca = function () {
    return ck.opts.apply(null, arguments);
  }
  return ca;
})(jQuery);

window.checkAll === undefined && (window.checkAll = c);