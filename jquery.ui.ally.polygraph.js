/*
 * Ally Chart Widget
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 *   raphael.js
 */



(function( $, Rapahel, undefined ) {
	
	
	var PlotArea = function (width, height, marginTop, marginRight, marginBottom, marginLeft) {
		this.marginTop = marginTop === undefined ? 10 : marginTop;
		this.marginRight = marginRight === undefined ? this.marginTop : marginRight;
		this.marginBottom = marginBottom === undefined ? this.marginTop : marginBottom;
		this.marginLeft = marginLeft === undefined ? this.marginRight : marginLeft;
		this.width = width - this.marginLeft - this.marginRight;
		this.height = this.marginTop - this.marginBottom;
	};
	
	
	var Axis = function (plotArea, orientation) {
		this.plotArea = plotArea;
		this.orientation = orientation === "x" ? "x" : "y";
	};
	
	Axis.prototype = {
		labels: function () { return []; },
		min: function() { return 0; },
		max: function() { return 0; }
	};
	
	
	var Point = function () {};
	Point.prototype = 
	{
		print: function () {
			return '(' + this.index + ',' + this.value + ') ' + (this.color || 'no color');
		}
	};
	
	var Series = function (xAxis, yAxis) {
		this.xAxis = xAxis;
		this.yAxis = yAxis;
	};
    Series.prototype = {
		points: [],
		addPoint: function (point) {
			this.points.push(point);
		},
		print: function () {
			return $(this.points).map(function () { return this.print(); }).toArray();
		},
		
	    draw: function (xAxis, yAxis) {
			var margin = 10;
			var barWidth = 135;
			
			var chartWidth = 600; // xAxis.length()
			var chartHeight = 400; // yAxis.length()
			
			var paper = this.paper;
			var series = this;
			$(this.points).each(function (i) {
				var height = chartHeight * this.value/40;
				// x = xAxis.getCoordinate(i);
				// y = yAxis.getCoordinate(height);
				paper.rect(margin + (barWidth + margin) * this.index, chartHeight - margin, barWidth, 1)
				.attr( { stroke: "none", fill: "270-rgba(55,152,199,1)-rgba(70,195,255,.5)" } )
				.hover( function () { series.onMouseOver(this, i); }, function () { series.onMouseOut(this, i);  })
				.animate( { height: height, y: chartHeight - margin - height }, 1500, "elastic" );
			});
		},
		
		onMouseOver: function (element, index) {
			element.animate( {"fill": "270-rgb(101,3,96)-rgb(211,6,201)"} );	
		},
		
		onMouseOut: function (element, index) {
			element.animate( {"fill": "270-rgba(55,152,199,1)-rgba(70,195,255,.5)"} ); 
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
			var series = new Series();
			series.paper = this._paper;
			$(data).each(function (i) {
				var point = new Point();
				point.index = i;
				point.value = this;
				series.addPoint(point);
			});
			
			series.draw();
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

   Chart 
     - xAxis : typically an CategoryAxis
     - yAxis : typically a ScalarAxis
     - width()
 	 - height()
     - margin()
     - plotWidth()
     - plotHeight()
     - plotTop()
     - plotLeft()
     - getCoordinatesForPoint(point)
     - eachSeries()
     - addSeries()

   Series : BarSeries, AreaSeries, LineSeries, etc.
     - addPoint()
     - eachPoint()
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