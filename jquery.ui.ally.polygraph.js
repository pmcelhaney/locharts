/*
 * Ally Chart Widget
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 *   raphael.js
 */



(function( $, Rapahel, undefined ) {
	
	var Point = function () {};
	Point.prototype = 
	{
		print: function () {
			return '(' + this.index + ',' + this.value + ')';
		}
	};
		
	
	$.widget("ui.allyPolyGraph", {

		_paper: null,
		
		_create: function() {	
			$.extend(Point.prototype, this.options.Point);	
			this._paper = Raphael(this.element[0].id, this.options.width, this.options.height);
		},
		
		addSeries: function (data) {
			var options = this.options;
			$(data).each(function (i) {
				var point = new Point();
				point.index = i;
				point.value = this;
				console.log(point.print() + ' ' + point.color);
			})
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