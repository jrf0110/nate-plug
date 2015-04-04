var events  = require('events');
var $       = require('jquery');
var utils   = require('../lib/utils');

module.exports = function( options ){
  return Object.create( events.EventEmitter, {
    $el: $el = $([
      '<div class="screen title-screen">'
    , '  <h1>Help Nate!</h1>'
    , '  <p>Nate\'s having problems plugging in his charger while riding on the RV. Help him out before his hand explodes!</p>'
    , '  <div class="controls">'
    , '    <div class="control-indicator">wasd to move</div>'
    , '    <div class="control-indicator">enter to plugin</div>'
    , '  </div>'
    , '  <button class="start-btn">Start</button>'
    , '</div>'
    ].join('\n'))

  , init: function(){
      this.$el.find('.start-btn').click( function( e ){
        this.emit('start');
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