var $ = require('jquery');

module.exports = function(){
  return Object.create({
    x: 0
  , y: 0

  , tmpl: function(){
      return [
        '<div class="hand">'
      , '  <img src="/assets/hand.png">'
      , '</div>'
      ].join('\n');
    }

  , init: function(){
      this.$el = $( this.tmpl() );
      return this;
    }

  , plugAttempt: function(){
      this.plugHold();
      setTimeout( function(){
        this.plugRelease();
      }.bind(this), 101 );
    }

  , plugHold: function(){
      this.$el.addClass('plug-attempt');
      return this;
    }

  , plugRelease: function(){
      this.$el.removeClass('plug-attempt');
      return this;  
    }

  , update: function(){
      this.$el.css(
        'transform'
      , 'translate3d( ' + [ this.x, this.y, 0 ].join('px, ') + 'px )'
      );
    }

  , playDeathAnimation: function(){
      this.$el.addClass('death');
      return this;
    }

  , resetDeathAnimation: function(){
      this.$el.removeClass('death');
      return this;
    }
  }).init();
};