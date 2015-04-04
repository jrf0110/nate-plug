module.exports = function( vector ){
  return Object.create({
    wobbliness: 150

  , speed: 0.008

  , update: function( i ){
      var modX = Math.sin( i / this.wobbliness ) * this.wobbliness;
      var modY = Math.cos( i / this.wobbliness ) * this.wobbliness;

      vector.x = Math.sin( (i - modX) / (1 / this.speed) ) * this.wobbliness;
      vector.y = Math.cos( (i - modY) / (1 / this.speed) ) * this.wobbliness;
    }
  });
};