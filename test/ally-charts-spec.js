
describe("Grid", function() {
/*
- yForIndex(i)
- xForValue(v)
- rowHeight()
- xLabelForIndex(i)
*/
	var Grid;

	beforeEach(function () {
		waitsFor( function () {
			var loaded = false;
	        require({baseUrl: "/"}, ["js/grid"], function(G){
				Grid = G;
                loaded = true;
	        });
	        return loaded;
		}, "RequireJS to load the Grid module");		
	});

	it("should know the x-coordinate for a given index", function () {
		
		expect(Grid().xForIndex(0)).toEqual(480);
		
		expect(Grid({ width: 60 }).xForIndex(0)).toEqual(30);
				
		expect(Grid({ width: 60, xLabels: ['one', 'two'] }).xForIndex(0)).toEqual(15);
		expect(Grid({ width: 60, xLabels: ['one', 'two'] }).xForIndex(1)).toEqual(45);
		
		expect(Grid({ width: 60, xLabels: ['one', 'two', 'three'] }).xForIndex(0)).toEqual(10);
		expect(Grid({ width: 60, xLabels: ['one', 'two', 'three'] }).xForIndex(1)).toEqual(30);
		expect(Grid({ width: 60, xLabels: ['one', 'two', 'three'] }).xForIndex(2)).toEqual(50);
		
		expect(Grid({ width: 160, xLabels: ['one', 'two'], marginLeft: 20, marginRight: 20 }).xForIndex(0)).toEqual(50);
	});
	
	it("should know the width of each column", function () {
		expect(Grid({ width: 60, xLabels: ['one'] }).columnWidth()).toEqual(60);
		expect(Grid({ width: 60, xLabels: ['one', 'two'] }).columnWidth()).toEqual(30);
		expect(Grid({ width: 200, xLabels: ['one', 'two', 'three'], marginLeft: 30, marginRight: 20 }).columnWidth()).toEqual(50);
	});
	
	
	it("should know the y-coordinate for a given value (keep in mind that y increases as it goes down)", function() {
		expect(Grid().yForValue(0)).toEqual(960);
		expect(Grid().yForValue(0.75)).toEqual(960/4);
		expect(Grid({ height: 60, yMaxValue: 100 }).yForValue(50)).toEqual(30);
		expect(Grid({ height: 30, yMinValue: 100, yMaxValue: 190 }).yForValue(130)).toEqual(20);		
		expect(Grid({ height: 60, marginBottom: 10, marginTop: 10 }).yForValue(0.75)).toEqual(20);
	});
	
	it("should return whole numbers", function () {
		expect(Grid({ width: 99, xLabels: [0,1,2] }).xForIndex(1)).toEqual(50);
		expect(Grid({ height: 59 }).yForValue(0.75)).toEqual(15);
	});
	
	
	it("should know where the edges of the graph are", function() {
		expect(Grid().yForTopEdge()).toEqual(0);
		expect(Grid().yForBottomEdge()).toEqual(960);
		expect(Grid({ height: 500, marginTop: 100, marginBottom: 50 }).yForTopEdge()).toEqual(100);
		expect(Grid({ height: 500, marginTop: 100, marginBottom: 50 }).yForBottomEdge()).toEqual(450);
		
		expect(Grid().xForLeftEdge()).toEqual(0);
		expect(Grid().xForRightEdge()).toEqual(960);
		expect(Grid({ width: 500, marginLeft: 100, marginRight: 50 }).xForLeftEdge()).toEqual(100);
		expect(Grid({ width: 500, marginLeft: 100, marginRight: 50 }).xForRightEdge()).toEqual(450);
	});
	
	
	it("should know the labels of its columns", function () {
		var grid = Grid({ xLabels: ['one', 'two', 'three'] });
		expect(grid.xLabelForIndex(0)).toEqual('one');
		expect(grid.xLabelForIndex(2)).toEqual('three');
		expect(grid.xLabelForIndex(3)).toBe(undefined);
	});
	
	it("should know the width and height", function () {
		var grid = Grid({ width: 800, height: 600, marginLeft: 10, marginRight: 90, marginTop: 150, marginBottom: 50 });
		expect(grid.width()).toEqual(700);
		expect(grid.height()).toEqual(400);
	});
	
	it("should know the max and min values", function () {
		var grid = Grid({ yMinValue: 100, yMaxValue: 400 });
		expect(grid.yMinValue()).toEqual(100);
		expect(grid.yMaxValue()).toEqual(400);
	});
	
	it("should return black as the default color", function () {
		var grid = Grid();
		expect(grid.color(0)).toEqual('#000');
		expect(grid.color(1)).toEqual('#000');
		expect(grid.color(5)).toEqual('#000');
	});
	
	it("should return the correct color", function () {
		var grid = Grid({colors: ['#aaa', '#bbb', '#ccc']});
		expect(grid.color(0)).toEqual('#aaa');
		expect(grid.color(1)).toEqual('#bbb');
		expect(grid.color(2)).toEqual('#ccc');
		expect(grid.color(3)).toEqual('#aaa');
	});
	
	it("should return the correct fillColor", function () {
		var grid = Grid({fillColors: ['#aaa', '#bbb', '#ccc']});
		expect(grid.fillColor(0)).toEqual('#aaa');
		expect(grid.fillColor(1)).toEqual('#bbb');
		expect(grid.fillColor(2)).toEqual('#ccc');
		expect(grid.fillColor(3)).toEqual('#aaa');
	});
	
	it("should return the correct gradients", function () {
		var grid = Grid({gradients: ['270-#aaa-#bbb', '270-#bbb-#ccc', '270-#ccc-#ddd']});
		expect(grid.gradient(0)).toEqual('270-#aaa-#bbb');
		expect(grid.gradient(1)).toEqual('270-#bbb-#ccc');
		expect(grid.gradient(2)).toEqual('270-#ccc-#ddd');
		expect(grid.gradient(3)).toEqual('270-#aaa-#bbb');
	});
	
	
	it("should fall through gradient -> fillColor -> color", function () {
		expect( Grid({fillColors: ['#f00']}).gradient(0)  ).toEqual('#f00');
		expect( Grid({colors:     ['#c00']}).gradient(0)  ).toEqual('#c00');
		expect( Grid({colors:     ['#b00']}).fillColor(0) ).toEqual('#b00');
	});
	
});


describe("Chart Widget", function() {
/*
- yForIndex(i)
- xForValue(v)
- rowHeight()
- xLabelForIndex(i)
*/
	var mockLayerWasCalled = false;
	var grid;
	var data;
	var builtInLayers = {};
	
	var mockLayer = function () {
		data = this.data;
		grid = this.grid;
		mockLayerWasCalled = true;
	};

	window.Raphael = function (t, w, h) { 
		return { 
			target: t,
			width: w,
			height: h 
		}; 
	};

	define("grid", function () {
		return function (options) {
			return options;
		};
	});

	define("layers", function () {
		return builtInLayers;
	});

	beforeEach(function () {
		waitsFor( function () {
			var loaded = false;
	        require({ baseUrl: "/", urlArgs: "bust=" +  (new Date()).getTime() }, ["js/chart"], function(){
                loaded = true;
				$('<div id="testDiv" style="width: 600px; height:400px;"></div>').chart({
					layers: [mockLayer],
					data: [10, 20, 50],
					yMinValue: 5, 
					xLabels: ['Jan', 'Feb', 'Mar'],
					marginTop: 10,
					marginRight: 20,
					marginBottom: 30,
					marginLeft: 40,
					colors: ['#aaa', '#bbb'],
					fillColors: ['#111', '#222'],
					gradients: ['0-#aaa-#bbb', '0-#111-#222']
					
				});
	        });
	        return loaded;
		}, "RequireJS to load the Chart module", 100);	
	});
	
	
	
	it("should call the mock layer", function () {
		expect(mockLayerWasCalled).toBe(true);
	});
	
	it("should make the data available to the layer", function () {
		expect(data).toEqual([10, 20, 50]);
	});
	
	it("should create a grid with the right height and width", function () {
		expect(grid.width).toEqual(600);
		expect(grid.height).toEqual(400);
	});
	
	it("should set the yMaxValue to 110% of the highest value in the data", function () {
		expect(grid.yMaxValue).toEqual(55);
	});
	
	it("should pass the yMinValue, xLabels, margins, and colors to the grid", function () {
		expect(grid.yMinValue).toEqual(5);
		expect(grid.xLabels).toEqual(['Jan', 'Feb', 'Mar']);
		expect(grid.marginTop).toEqual(10);
		expect(grid.marginRight).toEqual(20);
		expect(grid.marginBottom).toEqual(30);
		expect(grid.marginLeft).toEqual(40);
		expect(grid.marginLeft).toEqual(40);
		expect(grid.colors).toEqual(['#aaa', '#bbb']);
		expect(grid.fillColors).toEqual(['#111', '#222']);
		expect(grid.gradients).toEqual(['0-#aaa-#bbb', '0-#111-#222']);

	});
	
	it("should apply each layer in order", function () {
		var layers = [];
		var Layer = function (name) {
			return function () {
				layers.push(name);
			};
		};
		$('<div></div>').chart({
			layers: [Layer('one'), Layer('two'), Layer('three')]
		});
		expect(layers).toEqual(['one', 'two', 'three']);
	});
	
	it("should pass the options for a layer", function() {
		var args;
		var layer = function () {
			args = Array.prototype.slice.apply(arguments);
		};
		$('<div></div>').chart({
			layers: [ [layer, 'arg1', 'arg2'] ]
		});
		expect(args).toEqual(['arg1', 'arg2']);
	});
	
	it("should recognize a built-in layer and skip a missing layer", function() {
		builtInLayers['a built-in layer'] = function () {
			args = Array.prototype.slice.apply(arguments);
		};
		
		$('<div></div>').chart({
			layers: [ 'a built-in layer', 'a missing layer', ['a built-in layer', 'foo', 'bar'] ]
		});
		
		expect(args).toEqual(['foo', 'bar']);
	});
	
	
	describe("the paper", function () {
		
		var paper;
		var element = $('<div style="width: 600px; height: 400px"></div');
		
		
		beforeEach(function () {
			var layer = function () {
				paper = this.paper;
			};
			
			element.chart({
				layers: [ layer ]
			});
			
		});
		
		it("should be added to the target element", function() {
			expect(paper.target).toEqual(element[0]);
		});
	
		it("should have the width and height of the target element", function () {
			expect(paper.width).toEqual(600);
			expect(paper.height).toEqual(400);
		});
	
	});
	



});

