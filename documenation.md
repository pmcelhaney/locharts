# Chart Widget

## Hello World

The chart widget provides an easy way to draw attractive and highly customizable charts. It depends on Raphael, a
a JavaScript drawing framework that outputs SVG (or VRML in IE6-8). The plugin takes several options, but only one,
data, is required. This very simple example will draw a bar chart with four data points.

	$('#hello').chart({
		data: [100, 142, 40, 151]
	});


## Margins

A margin is defined as the space between the edge of the drawing area and the plot area. The x and y axis lines
are drawn inside the margins. 

## Layers

Charts are like ogres -- they have layers. Every element on the chart, whether its a bar or a line or a label or 
even an axis marker, is part of a layer. You can customize a chart by specifying what layers it has.

	$('#ogre').chart({
		data: [100, 142, 40, 151],
		layers: ["borders", "y-axis markers", "x-axis label separators",  "x-axis labels",  "bars"]
	});

## Layer Options

A layer can have options, which are specified by turning the layer into an array. The first item in the array
is a reference to the layer, and everything following is an option. Let's give this chart a thick red border and 
change the font to Verdana.

	$('#red-ogre').chart({
		data: [100, 142, 40, 151],
		layers: [
				["borders", 'red', 3], 
				"y-axis markers", 
				"x-axis label separators",  
				["x-axis labels", 'Verdana'],  
				"bars"
			]
	});
	
	
## Custom Layers

Each layer is implemented as a function. You can create a custom layer by defining a function and adding it
to the layers array, in the same place where you'd otherwise put a string that contains the name of a 
built-in-layer. 

	var loggingLayer = function () {
		console.log("This is my custom layer. It doesn't draw anyting. Sit tight -- we'll get there.");
	};

	$('#little-schemer').chart({
		data: [100, 142, 40, 151],
		layers: [
				["borders", 'red', 3], 
				"y-axis markers", 
				"x-axis label separators",  
				["x-axis labels", 'Verdana'],  
				"bars",
				loggingLayer // <-----
			]
	});
 


The function will be called in the context of an object that has three fields. The layer 
collaborates with these fields to draw something on the chart.

* this.data: The array of data passed into the widget.
* this.paper: The Raphael object on which to draw.
* this.grid: An object with helper functions to map data points to Raphael coordinates.

<pre>var layerThatPrintsDataInTheMiddleOfTheChart = function () {
	var message = "The data is " + this.data);		
	this.paper.text(this.grid.width() / 2, this.grid.height() / 2, message)
};</pre>


Typically, a layer will loop over the **data**, using the **grid** to map data values to x and y coordinates, and
draw objects on the **paper**. 

	var blueCircles = function () {
		var paper = this.paper;
		var grid = this.grid;
		$(this.data).each(function (i) {
			paper.circle(grid.xForIndex(i), grid.yForValue(this), 5).attr('fill', '#009');
		});
	}


Remember that a layer can also have parameters. Those parameters are simply passed to the function as arguments.

	var circles = function (color) {
		var paper = this.paper;
		var grid = this.grid;
		$(this.data).each(function (i) {
			paper.circle(grid.xForIndex(i), grid.yForValue(this), 5).attr('fill', color);
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
				[circle, 'red'] // <-----
			]
	});



## Communication Between Layers







