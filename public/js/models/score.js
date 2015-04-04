var $ = require('jquery');

module.exports = function( options ){
  return Object.create({
    $el: $([
      '<div class="score">'
    , '  <div class="value"></div>'
    , '  <div class="hint">Lower is better</div>'
    , '</div>'
    ].join('\n'))

  , init: function(){
      this.$val = this.$el.find('.value');
      return this;
    }

  , render: function( score ){
      this.$val.html( score );
      return this;
    }

  , hide: function(){
      this.$el.addClass('hide');
      return this;
    }

  , show: function(){
      this.$el.removeClass('hide');
      return this;
    }
  }).init();
};