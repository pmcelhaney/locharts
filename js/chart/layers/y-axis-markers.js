define(['./colors'], function (COLORS) {
	
	return function (numberOfRows, formatter, position) {
		var formatter = formatter || (function (n) { return n; }); 
		var paper = this.paper;
		var grid = this.grid;
		var element = this.element;
		var i, y;
		var roughIncrement = Math.round( ( grid.yMaxValue() - grid.yMinValue() ) / (numberOfRows || 5));
		var roundNumber = Math.pow(10, (Math.floor(Math.log(roughIncrement) / Math.LN10)) );
		var increment = roughIncrement - (roughIncrement % roundNumber);      
		
		for (i = Math.floor(grid.yMinValue()); i < grid.yMaxValue() ; i += increment) {
			if (i > grid.yMinValue()) {
				y = 0.5 + grid.yForValue(i);
				//draws the horizontal background lines, should probably be optional
				paper.path('M' + (grid.xForLeftEdge() + 0.5) + ' ' + y + 'L' + (grid.xForRightEdge() + 0.5) + ' ' + y ).attr('stroke', COLORS.LINES).attr('z-index', 0);
				var cssProperties = { 
				    position: 'absolute', 
				    top: grid.yForValue(i) - 7
				}; 
				if (position === 'right') {
				    cssProperties['right'] = 0;     
				    cssProperties['width'] = grid.outerWidth() - grid.xForRightEdge() - 5;  
				} else {
				    cssProperties['left'] = 0;    
				    cssProperties['width'] = grid.xForLeftEdge() - 5; 
				}                            
				
				$('<span class="y-axis-label">' + formatter(i).toString() + '</span>').css(cssProperties).appendTo(this.container);  
			}
		}     
		                  
		return { 
			remove: function () {
				$(element).find('.y-axis-label').remove();
			}
		};
	};
});                                   
                                               