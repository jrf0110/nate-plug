var _     = require('lodash');
var utils = module.exports = _.extend( {}, _ );

utils.key = require('mousetrap');

utils.Tween  = require('tween.js').Tween;
utils.Easing = require('tween.js').Easing;

var oCreate = Object.create;
Object.create = function(){
  var ctrs, objs = Array.prototype.slice.call( arguments );

  ctrs = objs.filter( function( o ){
    return typeof o === 'function';
  });

  objs = objs.filter( function( o ){
    return typeof o === 'object';
  });

  ctrs.forEach( function( ctr ){
    objs.push( ctr.prototype );
  });

  var obj = utils.extend.apply( null, objs );
  obj = oCreate( obj );

  ctrs.forEach( function( ctr ){
    ctr.call( obj );
  });

  return obj;
};