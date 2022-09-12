# LoCharts

> Note: I built this before [D3](https://en.wikipedia.org/wiki/D3.js) was created. It was fun, and the code was still in use on Ally Bank's web site last time I checked (about 10 years later), but if you're looking for a modern charting library that's maintained, check out D3. 


## Overview
Locharts is a library for building beatiful charts on the web. It's designed to be as easy-as-possible to use, whether you desire:

- a quick out-of-the box solution with a few customization options
- unlimited extensibility and APIs that are useful but stay out of the way

It's currently implemented as a jQuery UI widget.

It uses the amazing Raphaël library to draw SVG objects (or VML in IE6-8),
but you don't need to worry about unless you plan to customize charts.


## Hello World

By default, LoCharts will draw a simple bar chart. You just have to pass it
an array of data points.

	$('#hello').chart({
		data: [100, 142, 40, 151]
	});


## Data

The chart above has only one series of data points. A chart can have 
multiple series', which is specified by passing an array of arrays. 
The chart below has three series' of data, each of which has four 
data points.

    $('#hello').chart({
    	data: [ 
    		[100, 142, 40, 151], 
    		[105, 147, 45, 156], 
    		[106, 149, 48, 160] 
    	]
    });

For simplicity, the data is always represented as an array of arrays, 
even if there's only one series. The first example is equivalent to:

 	$('#hello').chart({
		data: [ [100, 142, 40, 151] ]
	});

It's okay to leave off the outer '[ ]'s if you only want to plot one 
series. The series will automatically be stuffed into an array.

Usually, the data points are represented by numbers. However, any object
that implements `valueOf()` and returns a number will suffice.

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



## Templates

Tired of bar charts? You can choose from several built in templates, by passing in a string 
corresponding to the template you'd like to use. Let's build an area chart.

	$('#mointainTop').chart({
		template: "area",
		data: [100, 142, 40, 151]
	});


It's also possible to define your own tempalte. See **creating templates** below.

## Customizing a chart with spec

Another option, `spec`, provides all sorts of configuration data. There are some built-in
configuration options, and some that are specific to the template you choose. For example, you
can use the spec to customize your chart's colors.


	$('#colorful').chart({
		data: [100, 142, 40, 151],
		template: "candlestick",
		colors: ["rgb(82,182,101)", "rgb(233,126,0)", "rgb(31,124,166)"]
	});


The following options are available by default:



### Margins

A margin is defined as the space between the edge of the chart and the plot area. The 
x and y axis lines are drawn between the margins and the plot area. Margins can be 
specified as individual options: `marginTop`, `marginRight`, `marginBottom`, and `marginLeft`.

Margins work like the margins on a sheet of paper, not like the CSS border-box model. Adding 50px margins to a chart that is 800&times;600 will reduce the plot area to 700&times;500.

	$('#spacious').chart({
		data: [100, 142, 40, 151],
		marginTop: 20,
		marginRight: 20,
		marginBottom: 40,
		marginLeft: 40
	});


### Colors

Colors are specfied as an array. How exactly those colors are used depends on the template, but generally the first color is considered the *primary* color, the second color (if it exists) is *secondary*, etc. 


	$('#technicolor').chart({
		data: [100, 142, 40, 151],
		colors: [
			"rgb(82,182,101)" /* primary */, 
			"rgb(233,126,0)" /* secondary */, 
			"rgb(31,124,166)" /* tertiary */
		]
	});

### yMinValue, yMaxValue

By default the y-axis will be drawn starting at 0 and ending at about 10% higher than your highest value. If you want to specifiy exactly where the y-axis begins and ends, you can use yMinValue and
yMaxValue.

	$('#apple-stock').chart({
		data: [640, 620, 625, 630],
		yMinValue: 600,
		yMaxValue: 700
	});


### edgeToEdge

For some templates, it can be useful to specify whether the plot bleeds all the way to the far
edges of the x-axis or there should be some padding.

	$('#apple-stock').chart({
		data: [100, 142, 40, 151],
		edgeToEdge: true
	});
	
	
### xValues

For most charts, the x-axis specifies a set of groups, and those groups are evenly spaced. If
the position on the x-axis is meaningful (for example you're plotting the effect of raising
interest rates on certain dates), you can specify those values.

	$('#raise-your-rate').chart({
		data: [1000, 1100, 1250, 1500],
		xValues: ['2012-01-01', '2012-11-01', '2013-07-01', '2014-01-01']
	});


## Custom Templates

If you want to do anything that's more than a little bit off the beaten path, you're going
to want to build your own templates. Fortunately, that's not hard to do, and you can use 
existing templates as a starting point.

A template is a function with no arguments. It's easiest to expalin with an example. This template puts labels on the x-axis.

	var xAxisLabelsTemplate = function () {
		var paper = this.paper;
		var grid = this.grid;
        var labels = this.spec.labels;
        var color = this.spec.colors[0]
		$(this.data[0]).each(function (i) {
			paper.text(grid.xForIndex(i), grid.yForBottomEdge() + 10, labels[i]).attr('fill', color);
		});
	};

Note the references to `this.spec`, `this.grid`, and `this.paper`. When a template function is called, it's called within the context of an object that has useful APIs for building the chart. The specific components of that API are described below.


### Template API


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
* **this.print( otherTemplate )** is a function used to add another template from within a template. 

Typically, a template will loop over the **data**, using the **grid** to map data values to x and y coordinates, and draw objects on the **paper**.

<pre>
var blueCircles = function () {
	var paper = this.paper;
	var grid = this.grid;
	$(this.data[0]).each( function (i, v) {
		paper.circle( grid.xForIndex(i), grid.yForValue(v), 5 ).attr( 'fill', '#009' );
	});
}
</pre>



### Communication Between Templates


Some templates are interactive, e.g. a bar changes color in response to hover, 
or clicking a label reveals more information. These effects can be achieved 
through the Raphaël API and aren't specifically covered here.

Sometimes one layer needs to communicate with another. For example, the High Yield CD 
calculator chart has an information bubble that floats between the different bars as 
the mouse hovers over them. The bars, which are on one layer, need to signal the bubble, 
which is on another template, to move when the mouse hovers over them.

Layers can't and shouldn't communicate directly with each other. Instead, the bar 
layer fires a jQuery event when the mouse enters one of the bars. The bubble layer 
listens for that event and springs into action.

The following standardized events are provided. You should use one of these if it 
makes sense, but feel free to use your own custom events.

* **focusDatum** should be triggered when a particular datum is brought into focus, 
  e.g. the mouse hovers over second bar representing 142 widgets. The focusDatum event has two
  arguments, the datum's index (1) and the datum itself (142). **blurDatum** is the opposite 
  of focusDatum.

* **selectDatum** and **deselectDatum** are the same as focusDatum and blurDatum 
  and are used to indicate that an item is selected. The difference between focusing 
  and selecting hasn't yet been clearly defined. This is just a placeholder.









