var utils = require('../lib/utils');

var factory = function( options ){
  options = utils.defaults( options || {}, {
    maxLives: 5
  });

  return Object.create( require('events').EventEmitter, {
    _state: 'title-screen'

  , numLives: options.maxLives

  , getElapsed: function(){
      if ( !this.startDate ) return 0;
      if ( !this.endDate ) return new Date() - this.startDate;
      return this.endDate - this.startDate;
    }

  , getScore: function(){
      var livesModifier = options.maxLives - this.numLives;
      livesModifier *= 1000;
      return this.getElapsed() + livesModifier;
    }

  , start: function(){
      this.startDate = new Date();
      return this;
    }

  , stop: function(){
      this.endDate = new Date();
      return this;
    }

  , reset: function(){
      delete this.startDate;
      delete this.endDate;
      this.numLives = options.maxLives;
      this.score = 0;
      this.emit('reset');
    }

  , takeDamage: function(){
      this.numLives--;
      this.emit('damage-taken');

      if ( this.numLives === 0 ){
        this.state('death');
      }

      return this;
    }

  , state: function( _state ){
      if ( !_state ) return this._state;
      this._state = _state;
      this.emit( this._state );
      return this;
    }
  });
};

module.exports = window.game = factory();
module.exports.create = factory;