var $ = require('jquery');

module.exports = function( options ){
  return Object.create({
    $el: $('<div class="damage-indicator"></div>')

  , tmpl: function( data ){
      return Array
        .apply( null, Array( data.numLives ) )
        .map( function( x, i ){
          return '<img class="damage-item" src="/assets/hand.png" />';
        })
        .join('\n');
    }

  , init: function(){
      return this;
    }

  , render: function( numLives ){
      this.$el.html( this.tmpl({ numLives: numLives }) );
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