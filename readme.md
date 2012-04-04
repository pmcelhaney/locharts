LoCharts
========

Data
----
The chart widget provides an easy way to draw attractive and highly customizable charts. It uses Raphaël, a
a JavaScript drawing API for SVG (or VML in IE6-8). The plugin takes several options, but only one,
data, is required. This very simple example will draw a bar chart with four data points.

	$('#hello').chart({
		data: [100, 142, 40, 151]
	});


The chart above has only one series of data points. A chart can have multiple series, which is specified by
passing an array of arrays. The chart below has three series' of data, each of which has four data points.

    $('#hello').chart({
    	data: [ [100, 142, 40, 151], [105, 147, 45, 156], [106, 149, 48, 160] ]
    });

For simplicity, the data is always represented as an array of arrays, even if there's only one series. The
first example is equivalent to:

 	$('#hello').chart({
		data: [ [100, 142, 40, 151] ]
	});

It's okay to leave off the outer '[ ]'s if you only want to plot one series. The series will
automatically be stuffed into an array.

One more point about data: Each value, or datum, can be a number or an object that
has a `valueOf()` function that returns a number.

    var Player = function (name, score, handicap) {
        return {
            name: name,
            score: score,
            valueOf: function () { return score - handicap; }
        };
    }

    $('#scores').chart({
    	data: [  Player('Dave', 55, 1), Player('Matt', 108, 25), Player('Vern', 89, 7), Player('Vic', 101, 10) ]
    });


Margins
-------

A margin is defined as the space between the edge of the chart and the plot area. The x and y axis lines
are drawn between the margins and the plot area. Margins can be specified as individual options: marginTop,
marginRight, marginBottom, and marginLeft.

Margins work like the margins on a sheet of paper, not like the CSS border-box model. Adding 50px margins
to a chart that is 800&times;600 will reduce the plot area to 700&times;500.

	$('#spacious').chart({
		data: [100, 142, 40, 151],
		marginTop: 20,
		marginRight: 20,
		marginBottom: 40,
		marginLeft: 40
	});

Layers
------

Charts are composed of layers. Think PSD files. Every element on the chart, whether it's a bar or a line or a label or
even an axis marker, is part of a layer. Customizing a chart begins with specifying what layers it should have.

Let's create a simple bar chart by passing it an array of strings corresponding to built-in layers. The layers are
applied in order, so the layers toward the end will appear on top of the layers toward the beginning.

	$('#ogre').chart({
		data: [100, 142, 40, 151],
		layers: ["borders", "y-axis markers", "x-axis label separators",  "x-axis labels",  "bars"]
	});

Layer Arguments
---------------

A layer can have arguments, which are specified with by wrapping the layer reference in an array. The first item in the
array is a reference to the layer, and everything following is an argument. Let's give this chart a thick red border and
change the font to Verdana.

	$('#red-ogre').chart({
		data: [100, 142, 40, 151],
		layers: [
				['borders", 'red', 3], /* 'borders' has two arguments: color and thickness */
				'y-axis markers',
				'x-axis label separators',
				['x-axis labels', 'Verdana'], /* 'x-axis-labels has an argument for font-family */
				'bars'
			]
	});


Custom Layers
-------------

You aren't limited to the built-in layers. You can also define your own.

Each layer is implemented as a function. You can create a custom layer by defining a function and adding it
to the layers array, in the same place where you'd otherwise put a string that contains the name of a
built-in-layer.

<pre>
var <strong>loggingLayer</strong> = function () {
	this.console.log("This is my custom layer. It doesn't draw anything. Sit tight -- we'll get there.");
};

$('#little-lisper').chart({
	data: [100, 142, 40, 151],
	layers: [
			['borders', 'red', 3],
			'y-axis markers',
			'x-axis label separators',
			["x-axis labels", 'Verdana'],
			'bars',
			<strong>loggingLayer</strong>
		]
});
</pre>

### Layer Context API

When the layer function is called, its context is an object with some special fields. The layer
collaborates with these fields to read the data, map the data to coordinates, and add SVG or absolutely
positioned HTML elements.

* **this.data** is the data passed into the widget. It's always an array of arrays.
* **this.grid** contains helper functions like `xForLeftEdge()` and `yForValue()` that can be
  used to map the chart's dimensions and data to paper coordinates.
* **this.paper** is the Raphaël object used to do the drawing. See the
  [Raphaël API reference](http://Raphaëljs.com/reference.html) for more information.
* **this.container** is a relatively-positioned div that contains the paper. It establishes a positioning
  context for HTML elements (e.g. text labels).
* **this.element** is the DOM element in which the chart is placed.
* **this.eventTarget** is the element to which jQuery custom events should be bound.
  By default, this.eventTarget === this.element.
* **this.applyLayer** is a function used to call one layer from another. It takes two arguments. The first is a reference to the sub-layer to apply. The second is an optional array of arguments to pass to that layer.

<pre>
var layerThatPrintsDataInTheMiddleOfTheChart = function () {
	this.paper.text( this.grid.width() / 2, this.grid.height() / 2, "The data is " + this.data )
};
</pre>


Typically, a layer will loop over the **data**, using the **grid** to map data values to x and y coordinates, and
draw objects on the **paper**.

<pre>
var blueCircles = function () {
	var paper = this.paper;
	var grid = this.grid;
	$(this.data[0]).each( function (i, v) {
		paper.circle( grid.xForIndex(i), grid.yForValue(v), 5 ).attr( 'fill', '#009' );
	});
}
</pre>

Remember that a layer can also have parameters. Those parameters are simply passed to the function as arguments.

<pre>
var circles = function ( <strong>color</strong> ) {
	var paper = this.paper;
	var grid = this.grid;
	$(this.data).each( function (i, v) {
		paper.circle( grid.xForIndex(i), grid.yForValue(v), 5 ).attr( 'fill', <strong>color</strong> );
	});
}

$('#red-circles').chart({
	data: [100, 142, 40, 151],
	layers: [
			["borders", 'red', 3],
			"y-axis markers",
			"x-axis label separators",
			["x-axis labels", 'Verdana'],
			"bars",
			[circles, <strong>'red'</strong>]
		]
});
</pre>

If the layer returns an object containing a function named remove(), the chart widget will automatically call
the remove method when the layer is removed. A remove method is useful for clean-up work such as unbinding
events. There's typically no need to clean up DOM objects added under this.target when `$().chart('remove')`
is called.

<pre>
var messyLayer = function () {
	$(this.eventTarget).bind('focusDatum.chart.messyLayer', function () { ... });

	return {
		remove: function () {
			$(this.eventTarget).unbind('focusDatum.chart.messyLayer');
		}
	}
}
</pre>






Communication Between Layers
----------------------------

Some layers are interactive, e.g. a bar changes color in response to hover, or clicking a label reveals
more information. These effects can be achieved through the Raphaël API and aren't specifically covered here.

Sometimes one layer needs to communicate with another. For example, the High Yield CD calculator chart has
an information bubble that floats between the different bars as the mouse hovers over them. The bars, which
are on one layer, need to signal the bubble, which is on another layer, to move when the mouse hovers over
them.

Layers can't and shouldn't communicate directly with each other. Instead, the bar layer fires a jQuery event
when the mouse enters one of the bars. The bubble layer listens for that event and springs into action.

The following standardized events are provided. You should use one of these if it makes sense, but feel free
to use your own custom events.

* **focusDatum** should be triggered when a particular datum is brought into focus, e.g. the mouse hovers over
  second bar representing 142 widgets. The focusDatum event has two arguments, the datum's index (1) and the
  datum itself (142). **blurDatum** is the opposite of focusDatum.

* **selectDatum** and **deselectDatum** are the same as focusDatum and blurDatum and are used to indicate that
  an item is selected. The difference between focusing and selecting hasn't yet been clearly defined. This is
  just a placeholder.

See [layers.js](js/layers.js) for examples of how jQuery events can be used to communicate between layers.


<h2 id="#composingLayers">Composing Layers</h2>

Remember when you used to play with Transformers as a kid? Some of the coolest ones could combine together
to make [one massive butt-kicking robot](http://tfwiki.net/wiki/Combiner). Layers are kind of like Transformers.
They can band together to create a super-layer that composes multiple-sub-layers. It sounds complicated, but
boils down to this.

    var awesomeBarChartLayerWithLabels = function (labels) {
        this.applyLayer(borders);
        this.applyLyaer(yAxisMarkers);
        this.applyLayer(xAxisLabelSeparators);
        this.applyLayer(xAxisLabels, labels);
        this.applyLayer(bars);
        this.applyLayer(valuesAbovePoints);
        this.applyLayer(bubble, function (i, value) { return labels[i] + '<br>Earnings: ' + value.toString(); });
        this.applyLayer(columnHotspots);
    };


*Note: This is a somewhat experimental new feature. My goal is to make it so that a developer who's only concerned
about implementing a chart on a page needn't bother with layers. They'll just have to choose a chart type and connect
it to a data source. (The "chart type" will be implemented as a layer, but that detail will be abstracted away.)*






<h2 id="#valueOf">Using valueOf()</h2>

Sometimes it's useful to have more than one value per point on the graph, as with a candlestick chart that has
prices for high, low, open, and close. Multiple values can be attached to each data point by using
objects instead of numbers. A layer that needs the individual values should know how to look the up. To
maintain compatibility with layers that expecting each datum to be a number, the objects should implement
the valueOf() function.

<pre>
var TradingDay = function (o, h, l, c) {
    return {
	    high: h,
	    low: l,
	    open: o,
	    close: c
	    valueOf: function () { return this.close; }
	};
};


$('#candlestick').chart(
	data: [ TradingDay(100, 120, 90, 105), TradingDay(104, 119, 99, 117), TradingDay(117, 125, 110, 116) ],
	layers: [
		'y-axis markers', /* expects numbers only */
	    'candlestick' /* expects objects with open, high, low, and close */
	]
);
</pre>

Note that with jQuery 1.4, the valueOf() function will get overwritten by the widget factory in IE7. To work
around that problem, wrap the data in a function call.

<pre>
$('#candlestick').chart(
	data: <strong>function () {
		return</strong> [ TradingDay(100, 120, 90, 105), TradingDay(104, 119, 99, 117), TradingDay(117, 125, 110, 116) ]<strong>;
	}</strong>,
	layers: [
		'y-axis markers',
	    'candlestick'
	]
);
</pre>





