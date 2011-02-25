/*
 * Ally Bar Chart Widget
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 *   raphael.js
 */



(function( $, Rapahel, undefined ) {
	
	$.widget("ui.allyBarChart", {
		options: {  
			chartWidth: 600,
			chartHeight: 400,
			margin: 10,
			barWidth: 135,
			point: {
				onMouseOver: function () {
					this.animate( {"fill": "270-rgb(101,3,96)-rgb(211,6,201)"} );			
				},

				onMouseOut: function () { 
					this.animate( {"fill": "270-rgba(55,152,199,1)-rgba(70,195,255,.5)"} ); 
				}
			},
			topLabel: {
				text: function (i) {
					return '$' + this + ",000.0" + i;
				}
			}
		},
		_paper: null,
		
		_create: function() {		
			this._paper = Raphael(this.element[0].id, this.options.chartWidth, this.options.chartHeight);
		},
		
		
		drawBar: function (index, height) {
			var margin = this.options.margin;
			var barWidth = this.options.barWidth;
			var chartHeight = this.options.chartHeight;
			var chartWidth = this.options.chartWidth;
			var options = this.options;
			this._paper.rect(margin + (barWidth + margin) * index, chartHeight - margin, barWidth, 1)
			.attr( { stroke: "none", fill: "270-rgba(55,152,199,1)-rgba(70,195,255,.5)" } )
			.hover( options.point.onMouseOver, options.point.onMouseOut)
			.animate( { height: height, y: chartHeight - margin - height }, 1500, "elastic" );
		},

		addValues: function (values) {
			var widget = this;
			var max = Math.max.apply(Math, values) * 1.2;
			
			$(values).each(function(i, val) {
				setTimeout(function () { 
					var height = widget.options.chartHeight * val/max; 
					widget.drawBar(i, height); 
					widget._paper.text(145 * i + 10, widget.options.chartHeight - height - 20, widget.options.topLabel.text.call(val, i)).attr("text-anchor", "start");
				}, i * 100);
			});
		}
		

	});
	
}(jQuery, Raphael));

/*
  Point(index, value)
    - index() // read only
    - value() // read only
    - mouseOver()
    - mouseOut()
    - textLabel()
    - hoverLabel()
    - draw() 

   Chart 
     - xAxis : typically an CategoryAxis
     - yAxis : typically a ScalarAxis
     - width()
 	 - height()
     - margin()
     - plotWidth()
     - plotHeight()
     - getCoordinatesForPoint(point)
     - eachSeries()
     - addSeries()

   Series : BarSeries, AreaSeries, LineSeries, etc.
     - points()
     - draw()

   Axis(x_or_y)
    - draw() // also draws lines
    - formatLabel() 
    - categories() : for scalar, it's the places where lines are drawn
    - count() : the number of ticks
    - min() : scaler only
    - max() : scaler only
    - isScaler() 






BarChartPoint = {
   index: function () { return index },
   value: function () { return value },
   mouseOver: function () { ... },
   ...
}

options.Point.prototype = BarChartPoint;

function createPoint(index, value) {
    var instance = {};
    instance.prototype = options.Point;
	return instance;
}


BarChartPoint < options.Point < aPointInstance


options.Point is an object that extends BarChartPoint (using prototypal inheritance). Each Point instance
is an object that extends options.Point. That's a little complicated, but it's efficient, because there's
only one copy of each function. And that's how prototypal inheritance is designed to work.

BarChartPoint.draw = function (chart) {
  // uses chart.yAxis.min(), chart.yAxis.max(), chart.xAxis.count(), 
  // chart.margin(),  chart.plotWidth(), and chart.plotHeight()
  
  // Or it could use chart.getCoordinatesForPoint(this) to figure out where the top of the bar is
  // and chart.plotWidth()  / chart.xAxis.count() to find out how wide it should be
}

{
   Point: {
      textLabel: function () { ... },
      hoverLabel: ...,
      onmMouseOver: ...
   },
    
   chart: {
      width: function () { return 600 },
      height: function () { return 400 }
     
   },

   xAxis: {
      labels: function() { ... }
   } 

   yAxis: {
      min: function () {},
      max: function () {},
      isScaler: function () { return true;}
   }
}

Go through the options object, and whenever a simple value is encountered, wrap it in a function.
e.g., width: 400 becomes width: function () { return 400 }

addSeries() can be a function on the widget itself. It would have one argument, an array. If the item in 
the array is a number, it's converted to on object { index: positionInArray, value: theNumber }. Otherwise,
it should be already be an object with those fields. The object's prototype is assigned to Point, so that
the series always contains an array of Points.

Possibly a second argument of addSeries is the type of series (bar, line, area, etc.)


*/