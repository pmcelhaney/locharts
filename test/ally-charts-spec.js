
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
	
});


describe("Chart Widget", function() {
/*
- yForIndex(i)
- xForValue(v)
- rowHeight()
- xLabelForIndex(i)
*/
	var mockLayerWasCalled = false;
	var gird;
	var mockLayer = function () {
		grid = this.grid;
		mockLayerWasCalled = true;
	};

	define("grid", function () {
		return function (options) {
			return options;
		};
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
					marginLeft: 40
				});
	        });
	        return loaded;
		}, "RequireJS to load the Chart module", 100);	
	});
	
	
	
	it("should call the mock layer", function () {
		expect(mockLayerWasCalled).toBe(true);
	});
	
	it("should create a grid with the right height and width", function () {
		expect(grid.width).toEqual(600);
		expect(grid.height).toEqual(400);
	});
	
	it("should set the yMaxValue to 110% of the highest value in the data", function () {
		expect(grid.yMaxValue).toEqual(55);
	});
	
	it("should pass the yMinValue, xLabels, and margins to the grid", function () {
		expect(grid.yMinValue).toEqual(5);
		expect(grid.xLabels).toEqual(['Jan', 'Feb', 'Mar']);
		expect(grid.marginTop).toEqual(10);
		expect(grid.marginRight).toEqual(20);
		expect(grid.marginBottom).toEqual(30);
		expect(grid.marginLeft).toEqual(40);
		expect(grid.marginLeft).toEqual(40);
		
	});
});

