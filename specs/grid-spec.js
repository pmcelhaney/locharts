define(['grid'], function(Grid) {
	describe("Grid-Spec", function() {
	/*
	- yForIndex(i)
	- xForValue(v)
	- rowHeight()
	*/


		it("should know the x-coordinate for a given index when edgeToEdge is false", function () {

			expect(Grid().xForIndex(0)).toEqual(480);
		
			expect(Grid({ width: 60 }).xForIndex(0)).toEqual(30);
				
			expect(Grid({ width: 60, columnCount: 2 }).xForIndex(0)).toEqual(15);
			expect(Grid({ width: 60, columnCount: 2 }).xForIndex(1)).toEqual(45);
		
			expect(Grid({ width: 60, columnCount: 3 }).xForIndex(0)).toEqual(10);
			expect(Grid({ width: 60, columnCount: 3 }).xForIndex(1)).toEqual(30);
			expect(Grid({ width: 60, columnCount: 3 }).xForIndex(2)).toEqual(50);
		
			expect(Grid({ width: 160, columnCount: 2, marginLeft: 20, marginRight: 20 }).xForIndex(0)).toEqual(50);
		});
	
	
		it("should know the x-coordinate for a given index when edgeToEdge is true", function () {
					
			var fourItemGrid = Grid({ edgeToEdge: true, width: 60, columnCount: 4 });		 
			var threeItemGrid = Grid({ edgeToEdge: true, width: 60, columnCount: 3 });	  
						
			expect(fourItemGrid.xForIndex(0)).toEqual(0);
			expect(fourItemGrid.xForIndex(1)).toEqual(20);
			expect(fourItemGrid.xForIndex(2)).toEqual(40);
			expect(fourItemGrid.xForIndex(3)).toEqual(60);
		
			expect(threeItemGrid.xForIndex(0)).toEqual(0);
			expect(threeItemGrid.xForIndex(1)).toEqual(30);
			expect(threeItemGrid.xForIndex(2)).toEqual(60);
		
			expect(Grid({ edgeToEdge: true, width: 160, columnCount: 2, marginLeft: 20, marginRight: 20 }).xForIndex(0)).toEqual(20);
		});
	
	
		it("should know the x-coordinate for a given index when xValues are used", function () {
					
			var constantGrid = Grid({ xValues: [0, 2, 4, 6], width: 60 });		  
			var variableGrid = Grid({ xValues: [0, 20, 25, 60], width: 60 });	 
						
			expect(constantGrid.xForIndex(0)).toEqual(0);
			expect(constantGrid.xForIndex(1)).toEqual(20);
			expect(constantGrid.xForIndex(2)).toEqual(40);
			expect(constantGrid.xForIndex(3)).toEqual(60);
		
			expect(variableGrid.xForIndex(0)).toEqual(0);
			expect(variableGrid.xForIndex(1)).toEqual(20);
			expect(variableGrid.xForIndex(2)).toEqual(25);
			expect(variableGrid.xForIndex(3)).toEqual(60);
		
			expect(Grid({ edgeToEdge: true, width: 160, xValues: [1, 2], marginLeft: 20, marginRight: 20 }).xForIndex(0)).toEqual(20);
		});
	
	
		it("should know the index for a given x-coordinate", function () {

			  expect(Grid().xForIndex(0)).toEqual(480);

			  expect(Grid({ width: 60 }).xForIndex(0)).toEqual(30);

			  expect(Grid({ width: 60, columnCount: 2 }).indexForX(15)).toEqual(0);
			  expect(Grid({ width: 60, columnCount: 2 }).indexForX(45)).toEqual(1);

			  expect(Grid({ width: 60, columnCount: 3 }).indexForX(5)).toEqual(0);
			  expect(Grid({ width: 60, columnCount: 3 }).indexForX(10)).toEqual(0);
			  expect(Grid({ width: 60, columnCount: 3 }).indexForX(25)).toEqual(1);
			  expect(Grid({ width: 60, columnCount: 3 }).indexForX(30)).toEqual(1);
			  expect(Grid({ width: 60, columnCount: 3 }).indexForX(50)).toEqual(2);
			  expect(Grid({ width: 60, columnCount: 3 }).indexForX(60)).toEqual(2);

			  expect(Grid({ width: 160, columnCount: 2, marginLeft: 20, marginRight: 20 }).indexForX(50)).toEqual(0);
		});
	
	
		it("should know the index for a given x-coordinate when edgeToEdge is true", function () {
					
			var fourItemGrid = Grid({ edgeToEdge: true, width: 60, columnCount: 4 });		 
			var threeItemGrid = Grid({ edgeToEdge: true, width: 60, columnCount: 3 });	  
						
			expect(fourItemGrid.indexForX(0)).toEqual(0);
			expect(fourItemGrid.indexForX(20)).toEqual(1);
			expect(fourItemGrid.indexForX(22)).toEqual(1);
			expect(fourItemGrid.indexForX(40)).toEqual(2);
			expect(fourItemGrid.indexForX(44)).toEqual(2);
			expect(fourItemGrid.indexForX(51)).toEqual(3);
			expect(fourItemGrid.indexForX(60)).toEqual(3);
		
			expect(threeItemGrid.indexForX(0)).toEqual(0);
			expect(threeItemGrid.indexForX(30)).toEqual(1);
			expect(threeItemGrid.indexForX(60)).toEqual(2);
		
			expect(Grid({ edgeToEdge: true, width: 160, columnCount: 2, marginLeft: 20, marginRight: 20 }).indexForX(20)).toEqual(0);
		});
	
		it("should know the index for a given x-coordinate when xValues are used", function () {
					
			var constantGrid = Grid({ xValues: [0, 2, 4, 6], width: 60 });		  
			var variableGrid = Grid({ xValues: [0, 20, 25, 60], width: 60 });	 
						
			expect(constantGrid.indexForX(0)).toEqual(0);
			expect(constantGrid.indexForX(20)).toEqual(1);
			expect(constantGrid.indexForX(40)).toEqual(2);
			expect(constantGrid.indexForX(60)).toEqual(3);
		
			expect(variableGrid.indexForX(0)).toEqual(0);
			expect(variableGrid.indexForX(20)).toEqual(1);
			expect(variableGrid.indexForX(24)).toEqual(2);
			expect(variableGrid.indexForX(25)).toEqual(2);
			expect(variableGrid.indexForX(26)).toEqual(2);
			expect(variableGrid.indexForX(58)).toEqual(3);
			expect(variableGrid.indexForX(60)).toEqual(3);
			expect(variableGrid.indexForX(62)).toEqual(3);
		
			expect(Grid({ edgeToEdge: true, width: 160, xValues: [1, 2], marginLeft: 20, marginRight: 20 }).indexForX(20)).toEqual(0);
		});
	
	
		it("should know the width of each column", function () {
			expect(Grid({ width: 60, columnCount: 1 }).columnWidth()).toEqual(60);
			expect(Grid({ width: 60, columnCount: 2 }).columnWidth()).toEqual(30);
			expect(Grid({ width: 200, columnCount: 3, marginLeft: 30, marginRight: 20 }).columnWidth()).toEqual(50);
		});
	
	
		it("should know the y-coordinate for a given value (keep in mind that y increases as it goes down)", function() {
			expect(Grid().yForValue(0)).toEqual(960);
			expect(Grid().yForValue(0.75)).toEqual(960/4);
			expect(Grid({ height: 60, yMaxValue: 100 }).yForValue(50)).toEqual(30);
			expect(Grid({ height: 30, yMinValue: 100, yMaxValue: 190 }).yForValue(130)).toEqual(20);		
			expect(Grid({ height: 60, marginBottom: 10, marginTop: 10 }).yForValue(0.75)).toEqual(20);
		});
	
		it("should return whole numbers", function () {
			expect(Grid({ width: 99, columnCount: 3 }).xForIndex(1)).toEqual(50);
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
	
	
		it("should snap the max and min values to round numbers", function () {
			var grid = Grid({ yMinValue: 101, yMaxValue: 399 });
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
			expect( Grid({colors:	  ['#c00']}).gradient(0)  ).toEqual('#c00');
			expect( Grid({colors:	  ['#b00']}).fillColor(0) ).toEqual('#b00');
		});
		

	
	});

});