Chart Widget
============

Hello World
-----------
The chart widget provides an easy way to draw attractive and highly customizable charts. It uses Raphael, a
a JavaScript drawing API for SVG (or VML in IE6-8). The plugin takes several options, but only one,
data, is required. This very simple example will draw a bar chart with four data points.

	$('#hello').chart({
		data: [100, 142, 40, 151]
	});


Margins
-------

A margin is defined as the space between the edge of the chart and the plot area. The x and y axis lines
are drawn between the margins and the plot area. Margins can be specified as individual options: marginTop, 
marginRight, marginBottom, and marginLeft. 

Margins work like the margins on a sheet of paper, not like the CSS box model. Adding 50px margins
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

Charts are like ogres -- they have layers. Every element on the chart, whether it's a bar or a line or a label or 
even an axis marker, is part of a layer. Customizing a chart begins with specifying what layers it should use. Let's
create a simple bar chart by passing it an array of strings corresponding to built-in layers. The layers are applied 
in order, so in the case of overlap, the layers toward the end will appear on top of the layers toward the beginning.

	$('#ogre').chart({
		data: [100, 142, 40, 151],
		layers: ["borders", "y-axis markers", "x-axis label separators",  "x-axis labels",  "bars"]
	});

Layer Options
-------------

A layer can have options, which are specified with by wrapping the layer reference in an array. The first item in the 
array is a reference to the layer, and everything following is an option. Let's give this chart a thick red border and 
change the font to Verdana.

	$('#red-ogre').chart({
		data: [100, 142, 40, 151],
		layers: [
				['borders", 'red', 3], 
				'y-axis markers', 
				'x-axis label separators',  
				['x-axis labels', 'Verdana'],  
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


The function will be called in the context of an object that four fields. The layer 
collaborates with these fields to draw something on the chart.

* **this.data** is the array of data passed into the widget. Actually, it's an array of arrays, 
  where each inner array represents a series of values. If your chart only has one series, you can pass 
  a single array (e.g. `[10,20,30]`) and it will automatically be wrapped (e.g. `[[10,20,30]]`).
  The values within each series can be numbers or objects that implement the `valueOf()` function.
* **this.paper** is the Raphael object used to do the drawing. See the Raphael API reference 
  for more information.
* **this.grid** contains helper functions like `xForLeftEdge()` and `yForValue()` that can be
  used to map the chart's dimensions and data to paper coordinates.
* **this.element** is a reference to the DOM element in which the chart is placed.
* **this.eventTarget** is the scope to which jQuery custom events should be bound. By default, this.eventTarget === this.element.

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
more information. These effects can be achieved through the Raphael API and aren't specifically covered here.

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



