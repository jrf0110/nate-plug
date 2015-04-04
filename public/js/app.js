var $       = require('jquery');
var TWEEN   = require('tween.js');
var models  = require('./models');
var uInput  = require('./lib/user-input');
var bus     = require('./lib/bus');
var game    = require('./models/game');

var views = {
  titleScreen:    models.titleScreen()
, deathScreen:    models.deathScreen()
, hand:           models.hand()
, score:          models.score()
, damage:         models.damageIndicator()
};

var wobbler = models.wobbler( views.hand );
var clamper = models.clamper( views.hand, {
  clampX: { min: -300, max: 300 }
, clampY: { min: -150, max: 300 }
});

uInput.on('action-1-down', function(){
  views.hand.plugHold();

  game.takeDamage();

  uInput.once('action-1-up', function(){
    views.hand.plugRelease();
  });
});

game.on('reset', function(){
  views.hand.resetDeathAnimation();
  views.damage.render( game.numLives );
});

game.on('title-screen', function(){
  uInput.disable();
  views.damage.hide();
  views.score.hide();
  views.deathScreen.hide();
  views.titleScreen.show();
});

game.on('damage-taken', function(){
  views.damage.render( game.numLives );
});

game.on('death', function(){
  game.stop();
  uInput.disable();
  views.deathScreen.show();
  views.hand.playDeathAnimation();
});

game.on('playing', function(){
  uInput.enable();
  views.damage.show();
  views.score.show();
});

views.titleScreen.on('start', function(){
  game.start();
  game.state('playing');
});

views.deathScreen.on('retry', function(){
  game.reset();
  game.start();
  game.state('playing');
});

var tick = function( frameCount, timeDelta ){
  requestAnimationFrame(
    setTimeout.bind( null, tick.bind( null, ++frameCount ), 1000 / 60 )
  );

  wobbler.update( frameCount );

  views.hand.x += uInput.hInput * 150;
  views.hand.y += uInput.vInput * 150;

  clamper.update();

  views.hand.update( frameCount );

  views.score.render( game.getScore() );

  TWEEN.update();
};

requestAnimationFrame( tick.bind( null, 0 ) );

$(function(){
  var $app = $('.app-container');

  $app.append( views.titleScreen.$el );
  $app.append( views.deathScreen.$el );
  $app.append( views.damage.$el );
  $app.append( views.score.$el );
  $app.append( views.hand.$el );
});

game.reset();
game.state('title-screen');