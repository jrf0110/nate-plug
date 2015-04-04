module.exports = function( vector, options ){
  return Object.create({
    clampX: options.clampX
  , clampY: options.clampY

  , update: function(){
      vector.x = Math.min( vector.x, this.clampX.max );
      vector.x = Math.max( vector.x, this.clampX.min );
      vector.y = Math.min( vector.y, this.clampY.max );
      vector.y = Math.max( vector.y, this.clampY.min );
    }
  });
};