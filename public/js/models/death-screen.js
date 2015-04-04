var events  = require('events');
var $       = require('jquery');
var utils   = require('../lib/utils');

module.exports = function( options ){
  return Object.create( events.EventEmitter, {
    $el: $el = $([
      '<div class="screen death-screen">'
    , '  <h1>Nate\'s hand exploded!</h1>'
    , '  <button class="btn retry-btn">Try again</button>'
    , '</div>'
    ].join('\n'))

  , init: function(){
      this.$el.find('.retry-btn').click( function( e ){
        this.emit('retry');
        this.hide();
      }.bind(this));

      return this;
    }

  , show: function(){
      this.$el.removeClass('hide');
      return this;
    }

  , hide: function(){
      this.$el.addClass('hide');
      return this;
    }
  }).init();
};