var EventEmitter = require('events').EventEmitter;
var utils = require('./utils');

var uInput = {
  hInput: 0
, vInput: 0
, currT:  0
, rotationMultiplier: 10
, calibration: 0
, isDisabled: false

, inputStates: {
    enter: false
  }

, disable: function(){
    this.isDisabled = true;
    if ( this.tween ) this.tween.stop();
    return this;
  }

, enable: function(){
    this.isDisabled = false;
    if ( this.tween ) this.tween.start();
    return this;
  }

, reset: function(){
    if ( this.tween ) this.tween.stop();
    this.hInput = 0;
    this.vInput = 0;
  }

, tweenHorizontalTo: function( value ){
    if ( this.isDisabled ) return;
    if ( this.hTween ) this.hTween.stop();

    this.hTween = new utils.Tween( this )
      .to( { hInput: value }, 500 )
      .easing( utils.Easing.Quadratic.In )
      .onUpdate( function(){
        uInput.emit( 'horizontal', this.hInput, uInput );
      })
      .start();

    return this;
  }

, tweenVerticalTo: function( value ){
    if ( this.isDisabled ) return;
    if ( this.vTween ) this.vTween.stop();

    this.vTween = new utils.Tween( this )
      .to( { vInput: value }, 500 )
      .easing( utils.Easing.Quadratic.In )
      .onUpdate( function(){
        uInput.emit( 'vertical', this.vInput, uInput );
      })
      .start();

    return this;
  }

, onLeftInputDown: function(){
    if ( this.leftDown ) return;

    this.leftDown = true;
    this.tweenHorizontalTo(-1);
  }

, onLeftInputUp: function(){
    this.leftDown = false;
    this.tweenHorizontalTo(0);
  }

, onRightInputDown: function(){
    if ( this.rightDown ) return;

    this.rightDown = true;
    this.tweenHorizontalTo(1);
  }

, onRightInputUp: function(){
    this.rightDown = false;
    this.tweenHorizontalTo(0);
  }

, onUpInputDown: function(){
    if ( this.upDown ) return;

    this.upDown = true;
    this.tweenVerticalTo(-1);
  }

, onUpInputUp: function(){
    this.upDown = false;
    this.tweenVerticalTo(0);
  }

, onDownInputDown: function(){
    if ( this.downDown ) return;

    this.downDown = true;
    this.tweenVerticalTo(1);
  }

, onDownInputUp: function(){
    this.downDown = false;
    this.tweenVerticalTo(0);
  }

, onEnterDown: function(){
    if ( this.inputStates.enter ) return;
    this.inputStates.enter = true;
    this.emit( 'action-1-down', this );
  }

, onEnterUp: function(){
    this.inputStates.enter = false;
    this.emit( 'action-1-up', this );
  }
};

utils.extend( uInput, EventEmitter.prototype );
uInput = Object.create( uInput );
EventEmitter.call( uInput );

utils.key.bind( 'a', uInput.onLeftInputDown.bind( uInput ),   'keydown' );
utils.key.bind( 'a', uInput.onLeftInputUp.bind( uInput ),     'keyup' );

utils.key.bind( 'd', uInput.onRightInputDown.bind( uInput ),  'keydown' );
utils.key.bind( 'd', uInput.onRightInputUp.bind( uInput ),    'keyup' );

utils.key.bind( 'w', uInput.onUpInputDown.bind( uInput ),     'keydown' );
utils.key.bind( 'w', uInput.onUpInputUp.bind( uInput ),       'keyup' );

utils.key.bind( 's', uInput.onDownInputDown.bind( uInput ),   'keydown' );
utils.key.bind( 's', uInput.onDownInputUp.bind( uInput ),     'keyup' );

utils.key.bind( 'enter', uInput.onEnterDown.bind( uInput ), 'keydown' );
utils.key.bind( 'enter', uInput.onEnterUp.bind( uInput ), 'keyup' );

// Only add device orientation if it's a device that likely
// supports free rotation
var deviceCheck = function( e ){
  if ( e.alpha ){
    window.addEventListener(
      'deviceorientation'
    , uInput.onDeviceOrientation.bind( uInput )
    );
  }

  window.removeEventListener( deviceCheck );
};

window.addEventListener(
  'deviceorientation', deviceCheck
);

module.exports = uInput;