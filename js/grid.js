define(function () {

	return function (options) {
		var options = options || {};
		var marginLeft = options.marginLeft || 0;
		var marginRight = options.marginRight || 0;
		var marginTop = options.marginTop || 0;
		var marginBottom = options.marginBottom || 0;
	
		var width = ( options.width || 960 ) - marginLeft - marginRight;
		var height = ( options.height || 960 ) - marginBottom - marginTop;
	
	
		var columnCount = options.columnCount || 1;
	
		var yMinValue = options.yMinValue || 0;
		var yMaxValue = options.yMaxValue || 1;
	
		var colors = options.colors || ['#000']; 
		
		var fillColors = options.fillColors || colors; 

		var gradients = options.gradients || fillColors;
	
		var edgeToEdge = options.edgeToEdge || options.xValues;
		
		var xValues = options.xValues;
		
		return {
			xForIndex: function (i) {
				var min, max;
				if (xValues) {
					min = Math.min.apply(null, xValues);
					max = Math.max.apply(null, xValues);
					return Math.round( this.xForLeftEdge() + (xValues[i] - min) * ( width / (max - min) ) );
				} else if (edgeToEdge) {
					return Math.round( i * width/(columnCount-1) + marginLeft );
				} else {
					return Math.round( ( i+0.5 ) * width/(columnCount) + marginLeft );
				}
			},
		
			yForValue: function (value) {
				return Math.round( this.yForBottomEdge() - (value - yMinValue) * ( height / (yMaxValue - yMinValue) ) );
			},
		
			xForLeftEdge: function () {
				return marginLeft;
			},
		
			xForRightEdge: function () {
				return marginLeft + width;
			},
		
		
			yForTopEdge: function () {
				return marginTop;
			},
		
			yForBottomEdge: function () {
				return marginTop + height;
			},

			columnWidth: function () {
				return width / columnCount;
			},
		

		
			width: function () {
				return width;
			},
			
			outerWidth: function () {
				return options.width;
			},
		
			height: function () {
				return height;
			},
		
			yMinValue: function () {
				return yMinValue;
			},
		
			yMaxValue: function () {
				return yMaxValue;
			},
			
			xMinValue: function () {
				return xMinValue;
			},
		
			xMaxValue: function () {
				return xMaxValue;
			},
			
			color: function ( i ) {
				return colors[ i % colors.length ];
			},
			
			fillColor: function ( i ) {
				return fillColors[ i % fillColors.length ];
			},
			
			gradient: function ( i ) {
				return gradients[ i % gradients.length ];
			}
		};
	};
});



