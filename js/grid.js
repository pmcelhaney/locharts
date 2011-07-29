ALLY.define('grid', [], function () {

	var roundOutMinAndMax = function (min, max, size, precision) {
	   var size = size || 60;
	   var precision = precision || 2;
	   var domain = max - min;
	   var slice = Math.round(domain / size) || Math.pow(10, -precision - 1);
	   return [ +(min - min % slice).toPrecision(precision), +(max + slice - ( max % slice || slice ) ).toPrecision(precision) ];

	};
	return function (options) {
		
		var options = options || {},
			marginLeft = options.marginLeft || 0,
			marginRight = options.marginRight || 0,
			marginTop = options.marginTop || 0,
			marginBottom = options.marginBottom || 0,
			columnCount = options.columnCount || 1,
			colors = options.colors || ['#000'],
			fillColors = options.fillColors || colors,
			gradients = options.gradients || fillColors,
			edgeToEdge = options.edgeToEdge || options.xValues,
			xValues = options.xValues,
			width = ( options.width || 960 ) - marginLeft - marginRight,
			height = ( options.height || 960 ) - marginBottom - marginTop,
			roundedMinAndMax = roundOutMinAndMax(options.yMinValue || 0, options.yMaxValue || 1),
			yMinValue = roundedMinAndMax[0],
			yMaxValue = roundedMinAndMax[1];
		
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
			
			indexForX: function (x) {
				var ratio =	 (x - this.xForLeftEdge()) / width;
				
				if (xValues) {
					var i = 0;
					var min = 0;
					for (i = 0; i < xValues.length; i++) {
						if ( this.xForIndex(i) == x) {
							return i;
						}
						if ( this.xForIndex(i) > x) {
							return ( i > 0 && this.xForIndex(i) - x > x - this.xForIndex(i-1) ) ? i-1 : i; 
						} 
					}
					return xValues.length - 1;
				}
				else if (edgeToEdge) {
					return Math.round( ratio * (columnCount-1) );
				} else {
					return Math.min( Math.round( ratio * (columnCount) - 0.5 ), columnCount - 1);
				}
			},
		
			yForValue: function (value) {
				if (isNaN(value)) return 0;
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
			
			outerHeight: function () {
				return options.height;
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



