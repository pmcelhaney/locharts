/* Stock chart for Investor Relations

This file was manually combined from several files in the ally-charts repo. 

One day in the very near future I hope there we will be using AMD/RequireJS, which allows us to:

- develop in small, modular files
- only include one script tag per page
- generate large, combined files for production

*/



/****************************************
ALLY.define(name, dependencies, fn)

Defines a module and puts it in the ALLY namespace. Use this function to 
replace the boiler-plate (function () { ... }()) call that wraps JavaScript
files.

Instead of: 

ALLY.car = ( function (wheels, engine) { 

	// A whole bunch of code 


	return { ... }; 
}(ALLY.wheels, ALLY.engine));


You can write:

ALLY.define('car', ['wheels', 'engine'], function (wheels, engine)) {

	// A whole bunch of code
	

	return { ... }; 
});

This format will make it possible to later use an Asynchronous Module Definitions (AMD) loader
to automatically load the required scripts on demand. And it just happens to make the boilerplate
code a little simpler and more standardized.

*/

ALLY = window.ALLY || {};
ALLY.define = function (name, dependencies, fn) {
	
	if (window.define && define.amd && !define.amd.dontReplaceAllyDefine) {
		return define(name, dependencies, fn);
	}
	
	var i;
	var args = [];
	for (i=0; i < dependencies.length; i++) {
		args.push(ALLY[ dependencies[i].split('/').slice(-1)[0] ]); 
	}
	ALLY[name] = fn.apply(this, args);
};



/*******************************************************************************************
Money() 

Calculates interest and stuff. But here it's just used for formatting.

Money(5).toString() === "$5.00";
*********************************************************************************************/

ALLY.define('money', [], function () {
	var insertCommas = function (numberAsStringWithDecimal) {
		var parts = numberAsStringWithDecimal.split(".");
		var left = parts[0];
		var right = parts[1];
		var result = "";
		var i;
		
		for (i=0; i<left.length; i++) { 
			if ((left.length - i) % 3 === 0 && i != 0) { 
				result += ","; 
			} 
			result += left.charAt(i);
		}
	
	
		return result + '.' + right;	
	};
	
	var MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

	var daysBetweenDates = function (startDate, endDate) {		
		return Math.round( ( endDate - startDate ) / MILLISECONDS_IN_A_DAY ); 
	};

	var applyInterestBetweenStartAndEndDates =	function(principal, apr, startDate, endDate) {
		return principal * Math.pow(1 + ((apr/100)/365), daysBetweenDates(startDate, endDate));
	};
	
	var copyDate = function (date) {
		return new Date( date.getTime() );
	};
	
	var addYears = function (date, years) {
		return copyDate(date).setFullYear( date.getFullYear() + years );
	};
	
	var calculateInterest = function (principal, params) { 
		params.startDate = params.startDate || new Date();
		
		if (params.years) {
			params.endDate = addYears(params.startDate, params.years);
		}
				
		var newBalance = applyInterestBetweenStartAndEndDates(principal, params.apr, params.startDate, params.endDate);
	
		return Money(newBalance - principal); 
	};
	
	var Money = function (amount) {
		return {
			toString: function () { 
				return "$" + insertCommas(amount.toFixed(2)); 
			},
			valueOf: function () { 
				return parseFloat(amount.toFixed(2), 10); 
			},
			calculateInterest: function (params) {
				return calculateInterest(amount, params);
			}
		};
	};
	
	return Money;
});





/*******************************************************************************************
chart-grid

Utility functions for drawing charts. See the readme.md file in the ally-charts project.
*********************************************************************************************/

ALLY.define('chart-grid', [], function () {

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





/*******************************************************************************************
chart-layers

This is where all of the Raphael drawing takes place. Only the layers that are used by the
stock chart have been included.

See the readme.md file in the ally-charts project.
*********************************************************************************************/



ALLY.define('chart-layers', [], function () {


var COLORS = {
	LINES: '#DCDFE3',
	TEXT: '#645050'
};



var formatDate = function(d) {
	var twoDigits = function(n) {
		return n > 9 ? n : '0' + n;
	};
	if (!d.getMonth) {
		return d;
	}
	return twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate()) + '/' + d.getFullYear();		
};



return {
	'bars' : function (widthFactor, opacity) {
		var opacity = opacity || 0.8;
		var grid = this.grid;
		var paper = this.paper;
		var eventTarget = this.eventTarget;
		var bars = [];
		
		var width = Math.round( grid.columnWidth() * (widthFactor || 0.5) );
		var fillColor = grid.gradient(0);
		var yForBottomEdge = grid.yForBottomEdge();
		
		$(this.data[0]).each(function (i) {
			var datum = this;

			var left = Math.floor(grid.xForIndex(i) - width/2); 
			var top = grid.yForValue(datum);
			var height = yForBottomEdge - top;
			var bar = paper.rect(left + 0.5, top + 0.5, width, height).attr({ 'fill': fillColor, 'opacity': opacity, 'stroke-width': 0 });
			bars[i] = bar;
		});


		var barRecievesFocus = function (event, i, datum) {
			bars[i].attr('fill', grid.gradient(1)).attr('fill-opacity', 1);
		};
		
		var barLosesFocus = function (event, i, datum) {
			bars[i].attr('fill', grid.gradient(0)).attr('fill-opacity', opacity);
		};
		
		$(eventTarget).bind('focusDatum.chart', barRecievesFocus);
		$(eventTarget).bind('blurDatum.chart', barLosesFocus);
		
		
		return {
			name: 'bars',
			remove: function () {
				$(eventTarget).unbind('focusDatum.chart', barRecievesFocus);
				$(eventTarget).unbind('blurDatum.chart', barLosesFocus);
			}  
		};

	},



	'y-axis markers': function (numberOfRows, formatter) {
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
				paper.path('M' + (grid.xForLeftEdge() + 0.5) + ' ' + y + 'L' + (grid.xForRightEdge() + 0.5) + ' ' + y ).attr('stroke', COLORS.LINES).attr('z-index', 0);
				$('<span class="y-axis-label">' + formatter(i).toString() + '</span>').css({ position: 'absolute', left: grid.xForLeftEdge() - 105, top: grid.yForValue(i) - 7, width: '100px' }).appendTo(this.container);
			}
		}
		return { 
			remove: function () {
				$(element).find('.y-axis-label').remove();
			}
		};
	},

	'borders': function () {
		var rect = this.paper.rect(this.grid.xForLeftEdge() + 0.5, this.grid.yForTopEdge() + 0.5, this.grid.width(), this.grid.height());
		rect.attr('fill', '#FBFBFB');
		rect.attr('stroke', COLORS.LINES);
		
	},
	

	
	'area': function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = $.extend([], this.data).reverse();
		
		$(data).each(function (seriesIndex, series) {

			var path = ['M', ( grid.xForIndex(0) + 0.5 ), ' ', grid.yForBottomEdge()];
			$(series).each(function (i) {
				path.push('L', (grid.xForIndex(i) + 0.5), ' ', (grid.yForValue(this) + 0.5));
			});
			path.push('L',	( grid.xForIndex(series.length - 1) + 0.5 ),  ' ',	grid.yForBottomEdge());
			path.push('Z');
			paper.path(path.join('')).attr({ fill: grid.fillColor(seriesIndex),'stroke-width': 0  });
		});
		
	},
	
	
	'column hotspots': function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = this.data;
		var eventTarget = this.eventTarget;
		var container = this.container;
		var containerOffsetLeft = $(container).offset().left;
	
		var oldColumnIndex;
		
		$('<div></div>')
			.css({'background-color': '#fff', opacity: 0, width: grid.width(), height: grid.height(), position: 'absolute', top: grid.yForTopEdge(), left: grid.xForLeftEdge()})
			.mousemove(function (e) { 
				newColumnIndex = grid.indexForX(e.pageX - containerOffsetLeft);
				if (newColumnIndex !== oldColumnIndex) {
				 
				 	$(eventTarget).trigger('focusDatum.chart', [newColumnIndex, data[data.length-1][newColumnIndex]]);
			
					if (oldColumnIndex !== undefined) {
					   $(eventTarget).trigger('blurDatum.chart', [oldColumnIndex, data[data.length-1][oldColumnIndex]]);
					}
				
					oldColumnIndex = newColumnIndex;
				}
			})
			.appendTo(container);
	

		var lastX = 0;
		$(data[data.length-1]).each(function (i, datum) {
			var thisX = grid.xForIndex(i);
			var leftX = thisX - (thisX - lastX) / 2;
			var rightX = thisX + ( ( grid.xForIndex(i+1) || grid.outerWidth() ) - thisX ) / 2; 
			lastX = thisX;
		});
		

	},
	
	
	'candlestick' : function () {
		var grid = this.grid;
		var paper = this.paper;
		var eventTarget = this.eventTarget;
		$(this.data[0]).each(function (i) {
			var datum = this;
			var width = Math.round(grid.columnWidth() / 2);
			var left = grid.xForIndex(i) - (width / 2); 
			var top = grid.yForValue( Math.max(datum.open, datum.close) );
			var height = Math.max(1, grid.yForValue( Math.min(datum.open, datum.close) ) - top);
			
			
			var lineWidth = 1;
			var lineLeft = grid.xForIndex(i) - (lineWidth / 2); 
			var lineTop = grid.yForValue(datum.high);
			var lineHeight = grid.yForValue(datum.low) - lineTop;
			
		
			var line = paper.rect(lineLeft + 0.5, lineTop + 0.5, lineWidth, lineHeight).attr({ fill: grid.gradient(0), 'stroke-width': 0 });
			var bar = paper.rect(left + 0.5, top + 0.5, width, height).attr({ fill: datum.open > datum.close ? grid.gradient(0) : '#fff', stroke: grid.gradient(0), 'stroke-width': 1 });

		});
	},
	
	
	'x-axis date labels': function () {
		var paper = this.paper;
		var grid = this.grid;
		var i;
		var index;
		var element = this.element;
		var howMany = this.data[0].length % 2 ? 5 : 4;
		
		for (i=0; i<howMany; i++) {
			index = Math.floor((i + 0.5) * this.data[0].length / howMany);
			$('<span class="x-axis-label">' + formatDate(this.data[0][index].date) + '</span>').css({ position: 'absolute', left: grid.xForIndex(index) - 50, top: grid.yForBottomEdge() + 5, width: '100px' }).appendTo(this.container);
		}
		return { 
			remove: function () {
				$(element).find('.x-axis-label').remove();
			}
		};
	},
	
	'hover dots': function () {
		var paper = this.paper;
		var grid = this.grid;
		var data = this.data;
		
		var dot = paper.circle(-100, -100, Math.min(5, Math.max(3, grid.columnWidth() / 2))).attr('stroke-width', 0).attr('fill', grid.color(1));
	   
		var moveDot = function (event, index, datum) {
			dot.attr({cx: grid.xForIndex(index), cy: grid.yForValue(data[0][index]) });
		};
		
		var target = $(this.eventTarget);
		
		target.bind('focusDatum.chart.hoverDots', moveDot);
		
		return {
			remove: function () {
				target.unbind('focusDatum.chart.hoverDots');
			}
			
		};

	
	},
	
	'scrubber': function (start, stop) {
		var paper = this.paper;
		var grid = this.grid;
		var data = this.data;
		var eventTarget = this.eventTarget;
		
		var announceChange = function () {
			$(eventTarget).trigger('selectedRangeChange.chart', [grid.indexForX(selection.attr('x')), grid.indexForX(selection.attr('x')) + selection.attr('width')]);
		};
		

		$(this.eventTarget).bind('moveScrubIndex.chart', 
			function (event, start, stop) {
				selection.attr({ x: grid.xForIndex(start) + 0.5, width: grid.xForIndex(stop) - grid.xForIndex(start) });
				leftHandle.attr('x', selection.attr('x') - 5);
				rightHandle.attr('x', selection.attr('x') + selection.attr('width') - 5);
			}
		);
		
		
		var clickArea = this.paper.rect(grid.xForLeftEdge(), grid.yForTopEdge(), grid.width(), grid.height());
		clickArea.attr('fill', '#fff');
		clickArea.attr('opacity', 0);
		clickArea.attr('stroke-width', 0);
		clickArea.click(function (e) { 
			selection.attr('x', Math.min( Math.max(e.x - selection.attr('width') / 2, grid.xForLeftEdge() ), grid.xForRightEdge() - selection.attr('width') ) );
			leftHandle.attr('x', selection.attr('x') - 5);
			rightHandle.attr('x', selection.attr('x') + selection.attr('width') - 5);
			announceChange();
		});

		var selection = this.paper.rect(grid.xForIndex(start) + 0.5, grid.yForTopEdge() + 0.5, grid.xForIndex(stop) - grid.xForIndex(start), grid.height());
		selection.attr('fill', '#000');
		selection.attr('opacity', 0.5);
		selection.attr('stroke-width', 0);
 
		var leftHandle = this.paper.rect(grid.xForIndex(start) + 0.5 - 5, grid.yForTopEdge() + 0.5, 10, grid.height());
		leftHandle.attr('fill', '#00f');
		leftHandle.attr('opacity', 0);
		leftHandle.attr('stroke-width', 0);
		leftHandle.attr('cursor', 'ew-resize');
		
		leftHandle.drag(
			
			function (dx, dy) {
				var boundDx = Math.max(dx, grid.xForLeftEdge() - selection.ox);
				boundDx = Math.min(boundDx, selection.oWidth - 12);
				this.attr({x: this.ox + boundDx });
				selection.attr({x: selection.ox + boundDx, width: selection.oWidth - boundDx });
			},
			
			function () {
				this.ox = this.attr("x");
				selection.ox = selection.attr("x");
				selection.oWidth = selection.attr("width");
			},
			
			announceChange
			
		);
		
		
		var rightHandle = this.paper.rect(grid.xForIndex(start) + 0.5 + selection.attr('width') - 5, grid.yForTopEdge() + 0.5, 10, grid.height());
		rightHandle.attr('fill', '#f00');
		rightHandle.attr('opacity', 0);
		rightHandle.attr('stroke-width', 0);
		rightHandle.attr('cursor', 'ew-resize');
		

		rightHandle.drag(
			
			function (dx, dy) {
				var boundDx = Math.max(dx, 12 - selection.oWidth );
				boundDx = Math.min(boundDx, grid.xForRightEdge() - selection.oWidth - selection.ox);
				this.attr({x: this.ox + boundDx });
				selection.attr({width: selection.oWidth + boundDx });
			},
			
			function () {
				this.ox = this.attr("x");
				selection.ox = selection.attr("x");
				selection.oWidth = selection.attr("width");
			},
			
			
			announceChange
			
		);

				
		selection.drag(
			function (dx, dy) {
				var min = grid.xForRightEdge() - this.attr('width');
				var max = grid.xForLeftEdge();
				this.attr({x: Math.max(max, Math.min( min, this.ox + dx ) ) });
				leftHandle.attr({x: Math.max(max, Math.min( min, leftHandle.ox + dx ) ) });
				rightHandle.attr({x: Math.max(max + this.attr('width'), Math.min( min + this.attr('width'), rightHandle.ox + dx ) ) });
			},
			
			function () {
				this.ox = this.attr("x");
				leftHandle.ox = leftHandle.attr("x");
				rightHandle.ox = rightHandle.attr("x");
			},
			
			announceChange
			
		);
 

	}
	
};



});



/*******************************************************************************************
$.fn.chart() definition

See the readme.md file in the ally-charts project.
*********************************************************************************************/

ALLY.define('chart', ['chart-grid', 'chart-layers'], function (Grid, builtInLayers) {
	
	var dataMax = function (data) {

		if (data === undefined) {
			return 0;
		}

		var i;
		var result = 0;
		var datum;


		for( i=0; i < data.length; i++ ) {
			datum = data[i];
			result = Math.max(result, $.isArray(datum) ? dataMax(datum) : datum);
		}

		return result;

	};
	
	
	// The jQuery.aj namespace will automatically be created if it doesn't exist
	  $.widget("ally.chart", {
		// These options will be used as defaults
		options: {	},
		
		_create: function () {
			this.container = $('<div></div>').css('position', 'relative').appendTo(this.element[0])[0];
			this.draw();
		},
		draw: function(newData) {

			if (this.paper) { this.remove(); }
			
			if (newData) this.options.data = newData;
			
			var options = this.options;
			
			if ( $.isFunction(options.data) ) {
				options.data = options.data();
			}	 
			var data = ( options.data && $.isArray( options.data[0] ) ) ? options.data : [options.data];


			var grid = (options.Grid || Grid)( {
				width: this.element.width(),
				height: this.element.height(),
				yMinValue: options.yMinValue,
				yMaxValue: options.yMaxValue || Math.round( dataMax(options.data) * 1.1 ),
				marginTop: options.marginTop,
				marginRight: options.marginRight,
				marginBottom: options.marginBottom,
				marginLeft: options.marginLeft,
				colors: options.colors,
				fillColors: options.fillColors,
				gradients: options.gradients,
				edgeToEdge: options.edgeToEdge,
				xValues: options.xValues,
				columnCount: data && data[0] ? data[0].length : undefined
			});
			
			this.paper = Raphael(this.container, this.element.width(), this.element.height());
			
			var layers = this.layers = [];
			
			var layerContext = { 
				grid: grid,
				data: data,
				paper: this.paper,
				element: this.element[0],
				container: this.container,
				eventTarget: options.eventTarget || this.element[0]
			};
		

			$.each(options.layers, function () {
				var layer = this;
				var layerFunc;
				var args = [];

				if ( $.isArray(this) ) {
					layer = this[0];
					args = this.slice(1);	
				} 

				layerFn =  $.isFunction(layer) ? layer : builtInLayers[layer] ;

				if ( $.isFunction(layerFn) ) {		
					layers.push ( layerFn.apply(layerContext, args) );	
				}
			});
		  
		  
		},
 
		_setOption: function(key, value) {
		  // Use the _setOption method to respond to changes to options
	  
		  $.Widget.prototype._setOption.apply(this,arguments);
		},
		
		remove: function () {
	   
			$(this.layers).each(function () {
				 if ( this.remove ) {
					 this.remove(); 
				 }
			});
			
			this.paper.remove();
			delete this.paper;
		},

		
		destroy: function() {
		   
		  //delete this.paper;
		  $.Widget.prototype.destroy.call(this);
		}
		

	  });
	
});








/*******************************************************************************************
stock-chart

This is where we get down to the actual business of implementing the stock chart page. 
*********************************************************************************************/


ALLY.define('stock-chart', ['chart', 'money'], function (chart, Money) {


	var TradingDay = function (v, o, h, l, c, d) {

		return {
			high: h,
			low: l,
			open: o,
			close: c,
			date: d,
			volume: v,
			valueOf: function () { return this.close; }
		};
	};


	var randomTradingDays = function (n) {
		var i;
		var tradingDays = [];
		var day;
		var lastOpen = 75;
		var previousDate = new Date();
		for (i = 0; i<n; i++) {
			day = TradingDay();
			day.close = lastOpen + ( Math.pow(1 + Math.random(), 2) - Math.pow(1 + Math.random(), 2) ) / 10;
			day.high = lastOpen + Math.pow(1 + Math.random() * 0.5, 3);
			day.low	 = Math.max(Math.random(), lastOpen - Math.pow(1 + Math.random() * 0.5, 3));
			day.open = day.low + (Math.random() * 0.99) * (day.high - day.low); // Slightly biased to lower opens (counting backward).
			day.date = new Date(previousDate.getTime() - 24 * 60 * 60 * 1000 * (previousDate.getDay() == 1 ? 3 : 1));
			day.volume = Math.round( 1000 * 1000 * 10.2 - 1000 * 1000 * 10 * Math.pow(Math.random(), 0.2) );
			tradingDays.unshift(day);
			previousDate = day.date;
			lastOpen = day.open;

		}

		return tradingDays;
	};


	var formatDate = function(d) {
		var twoDigits = function(n) {
			return n > 9 ? n : '0' + n;
		};
		if (!d.getMonth) {
			return d;
		}
		return twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate()) + '/' + d.getFullYear();	
	};
	

	

	$(function() {

		var form = $('#stock-filter-form');
		var startDateField = $('input[name=start]', form);
		var endDateField = $('input[name=end]', form);

		var data = []; 
		var volumeData = [];  

		var loadFromYahoo = function () {
			
			var parseDate = function (s) {
				   parts = s.split('/');
				   return new Date(+parts[0], +parts[1]-1, +parts[2]);
			};
			
			
			$('#candlestick').html("Loading data from Yahoo... (on the live site it will be pre-cached and fast)");

			$.ajax({
				url: 'http://query.yahooapis.com/v1/public/yql',
				data: {
					q: 'select * from yahoo.finance.historicaldata where symbol = "AAPL" and startDate ="2010-05-18" and endDate="2011-05-17" | sort(field="Date")',
					format: 'json',
					env: 'http://datatables.org/alltables.env'			
				},
				dataType: 'jsonp',
				success: function (yqlData) {  
					data = $(yqlData.query.results.quote).map(function () { 
						return { 
							date: parseDate(this.date), 
							volume: +this.Volume, 
							open: +this.Open,
							close: +this.Close,
							high: +this.High,
							low: +this.Low,
							valueOf: function () { return this.close; }
						};
					}).toArray();

					volumeData = $(data).map(function () { 
						return { 
							date: this.date, 
							volume: this.volume, 
							open: this.open,
							close: this.close,
							high: this.high,
							low: this.low,
							valueOf: function () { return this.volume; }
						}; 
					} ).toArray();
					$('#candlestick').html('');
					drawStockChart(); 
				}
			});			   
		};
		
		var applyFormsMagic = function () {
			// This is called when forms.js is loaded, before the modal form has loaded.
			// So it needs to be called again.
			forms.activateFocus(form);	

			// I assume this is supposed to be called to initiate forms.js magic.
			forms.clean(form);

			// Turn on the datepickers.  
			$('.item.calendar input', form).datepicker({ beforeShowDay: $.datepicker.noWeekends});
		
			
		};
		
		
		
		
		
		
		var loadFromRandom = function () {
			data = randomTradingDays(500);
			volumeData = $(data).map(function () { return { 
				date: this.date, 
				volume: this.volume, 
				open: this.open,
				close: this.close,
				high: this.high,
				low: this.low,
				valueOf: function () { return this.volume; }
			}; } ).toArray();
			
			setTimeout( function () { drawStockChart(); }, 1); 
		};
		
		var functionize = function (x) { 
			return function () { return x; };
		};
		
		var indexForDate = function (d) {
			var i = 0;
			while (data[i++].date < d) {}
			return i-1;
		};
		
		var drawStockChart = function () {
			var subset = data.slice( -30 );	
			var volumeSubset = volumeData.slice( -30 );	
			var startDate = subset[0].date ;
			var endDate =  subset.slice(-1)[0].date;
			
			startDateField.datepicker('setDate', startDate);
			endDateField.datepicker('setDate', endDate);
			
			startDateField.add(endDateField).datepicker('option', 'minDate', data[0].date);
			startDateField.add(endDateField).datepicker('option', 'maxDate', data.slice(-1)[0].date);

			$('#candlestick').chart({
				data: functionize(subset),
				layers: [
					"borders", 
					["y-axis markers", 6, Money], 
					"candlestick",
					"hover dots",
					"column hotspots"
				],
				marginBottom: 1,
				marginTop: 10,
				marginLeft: 40,
				marginRight: 1,
				colors: ['rgb(55,152,199)', 'rgb(101,3,96)'],
				yMaxValue: Math.max.apply(null, $(subset).map(function () { return this.high; } ).toArray()) + 1,
				yMinValue: Math.min.apply(null, $(subset).map(function () { return this.low; } ).toArray()) - 1,
				eventTarget: '#candlestick'
			})
		
			.after('<div></div>').find('+div').css({width: $('#candlestick').width(), height: 100, position: 'relative'})
			.chart({
				data: functionize(volumeSubset),
				layers: [
					"borders", 
					["y-axis markers", 3, function (n) { return n / 1000 / 1000 + 'm'; }], 
					"x-axis date labels",	
					["bars", 0.5, 1],
					"column hotspots"			
				],
				marginBottom: 20,
				marginTop: 10,
				marginLeft: 40,
				marginRight: 1,
				colors: ['rgb(55,152,199)', 'rgb(101,3,96)'],
				eventTarget: '#candlestick'
			})
			
			
			.after('<div id="scrubber"></div>').find('+div').css({width: $('#candlestick').width(), height: 50})
			.chart({
				data: functionize(data),
				layers: [
					"borders", 
					"area",
					["scrubber", indexForDate(startDate), indexForDate(endDate)]
				],
				marginBottom: 1,
				marginTop: 1,
				marginLeft: 40,
				marginRight: 1,
				colors: ['#ccc', 'rgb(101,3,96)'],
				yMaxValue: Math.max.apply(null, $(data).map(function () { return this.high; } ).toArray()) + 1,
				yMinValue: Math.min.apply(null, $(data).map(function () { return this.low; } ).toArray()) - 1			
			});


			$('#scrubber').bind('selectedRangeChange.chart', function (event, start, end) {

				var subset = data.slice( start, end+1 );
				$('#candlestick').chart('option', 'yMaxValue', Math.max.apply(null, $(subset).map(function () { return this.high; } ).toArray()) + 1);
				$('#candlestick').chart('option', 'yMinValue', Math.min.apply(null, $(subset).map(function () { return this.low; } ).toArray()) - 1);
				$('#candlestick').chart('draw', subset);

				$('#candlestick+div').chart('draw', volumeData.slice( start, end+1 ) );

				startDateField.datepicker('setDate', subset[0].date );
				endDateField.datepicker('setDate', subset.slice(-1)[0].date );

			});


			$('#candlestick').bind('focusDatum.chart', function (event, index, datum) {
			   $('#daily-stock-details td.date').text(formatDate(datum.date));
			   $('#daily-stock-details td.volume').text(datum.volume);
			   $('#daily-stock-details td.open').text(datum.open.toFixed(2));
			   $('#daily-stock-details td.close').text(datum.close.toFixed(2));
			   $('#daily-stock-details td.high').text(datum.high.toFixed(2));
			   $('#daily-stock-details td.low').text(datum.low.toFixed(2));
			});
			
			$(startDateField).add(endDateField).bind('change.chart', function (e) {
				e.preventDefault();

				$('#candlestick').unbind('blurDatum.chart');

				var startDate = startDateField.datepicker('getDate');
				var endDate = endDateField.datepicker('getDate');
				
				var startDateWasChanged = (startDateField[0] === e.target);
				
				if (startDate > endDate) {
					if (startDateWasChanged) {
						endDateField.datepicker('setDate', endDate = startDate);
					} else {
						startDateField.datepicker('setDate', startDate = endDate);
					}
						
				}

				var subset = data.slice( indexForDate(startDate), indexForDate(endDate) + 1 );
				$('#candlestick').chart('option', 'yMaxValue', Math.max.apply(null, $(subset).map(function () { return this.high; } ).toArray()) + 1);
				$('#candlestick').chart('option', 'yMinValue', Math.min.apply(null, $(subset).map(function () { return this.low; } ).toArray()) - 1);
				$('#candlestick').chart('draw', subset);

				$('#candlestick+div').chart('draw', volumeData.slice( indexForDate(startDate), indexForDate(endDate) + 1) );

				$('#scrubber').trigger('moveScrubIndex.chart', [ indexForDate(startDate), indexForDate(endDate) + 1	 ]); 
				
		
				var indexOfSelectedDate = startDateWasChanged ? 0 : subset.length - 1;
				$('#candlestick').trigger('focusDatum.chart',  ( [ indexOfSelectedDate , subset[indexOfSelectedDate] ] ) );
				
			});
			
			$('#candlestick').trigger('focusDatum.chart', [subset.length-1, subset.slice(-1)[0] ]);
		};
		


		applyFormsMagic();

		loadFromRandom();
		//loadFromYahoo();
		



	});
});






