function init() {
  var canvas = document.getElementById('canvas');

  if (canvas.getContext) {
      // Grab our context
      var context = canvas.getContext('2d');
    
      // Make sure we have a valid defintion of requestAnimationFrame
      var requestAnimationFrame =
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.msRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              function(callback) {
                  return setTimeout(callback, 16);
              };

      // Let's define our square
      var square = {
          'x': 50,
          'y': 50,
          'width': 10,
          'height': 10,
          'fill': '#000000'
      };

      var render = function() {
          // Clear the canvas
          context.clearRect(0, 0, canvas.width, canvas.height);
        
          // Draw the square
          context.beginPath();
          context.rect(square.x, square.y, square.width, square.height);
          context.fillStyle = square.fill;
          context.fill();
        
          // Redraw
          requestAnimationFrame(render);
      };
    
      // Start the redrawing process
      render();
    
      var animate = function(prop, val, duration) {
        // The calculations required for the step function
        var start = new Date().getTime();
        var end = start + duration;
        var current = square[prop];
        var distance = val - current;
        
        var step = function() {
          // Get our current progres
          var timestamp = new Date().getTime();
          var progress = Math.min((duration - (end - timestamp)) / duration, 1);
          
          // Update the square's property
          square[prop] = current + (distance * progress);
        
          // If the animation hasn't finished, repeat the step.
          if (progress < 1) requestAnimationFrame(step);
        };
      
        // Start the animation
        return step();
      };
    
      var meta = function(e) {
          // Set some initial variables
          var distance = 100;
          var prop = 'x';
          var mult = 1;
          
          // Just return false if the key isn't W, A, S, D
          if (e.which !== 65 && e.which !== 68 && e.which !== 87 && e.which !== 83) { // a 65, d 68, s 83, w 87
              return false;
          };
    
          // If we're going left or up, we want to set the multiplier to -1
          if (e.which === 65 || e.which === 87) {
              mult = -1;
          }
    
          // If we're going up or down, we want to change the property we will be animating. 
          if (e.which === 87 || e.which === 83) {
              prop = 'y';
          };
    
          return [prop, mult * distance];
      };

      var resizeCanvas = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
      };

      resizeCanvas();

      // resize the canvas to fill browser window dynamically
      window.addEventListener('resize', resizeCanvas, false);
    
      document.body.addEventListener('keydown', function(e) {
          var info = meta(e);
          if (info) {
              e.preventDefault();
              animate(info[0], square[info[0]] + info[1], 1000);
          };
      });

      document.body.addEventListener('keyup', function(e) {
          var info = meta(e);
       
          if (info) {
              e.preventDefault();
              animate(info[0], square[info[0]], 1000);
          };
      });
  };
}