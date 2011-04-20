describe("Grid", function() {
/*
- xForIndex(i), yForIndex(i)
- xForValue(v), yForValue(v)
- columnWidth(), rowHeight()
- yForTopEdge(), yForBottomEdge()
- xForLeftEdge(), xForRightEdge()
*/
	
	it("should know the x-coordinate for a given index", function () {
		expect(Grid().xForIndex(0)).toEqual(480);
		
		expect(Grid({ width: 60 }).xForIndex(0)).toEqual(30);
				
		expect(Grid({ width: 60, xLabels: ['one', 'two'] }).xForIndex(0)).toEqual(20);
		expect(Grid({ width: 60, xLabels: ['one', 'two'] }).xForIndex(1)).toEqual(40);
		
		expect(Grid({ width: 60, xLabels: ['one', 'two', 'three'] }).xForIndex(0)).toEqual(15);
		expect(Grid({ width: 60, xLabels: ['one', 'two', 'three'] }).xForIndex(1)).toEqual(30);
		expect(Grid({ width: 60, xLabels: ['one', 'two', 'three'] }).xForIndex(2)).toEqual(45);
		
		expect(Grid({ width: 160, xLabels: ['one', 'two'], marginLeft: 20, marginRight: 20 }).xForIndex(0)).toEqual(60);
	});
	
	it("should know the width of each column", function () {
		expect(Grid({ width: 60, xLabels: ['one'] }).columnWidth()).toEqual(60);
		expect(Grid({ width: 60, xLabels: ['one', 'two'] }).columnWidth()).toEqual(30);
		expect(Grid({ width: 200, xLabels: ['one', 'two', 'three'], marginLeft: 30, marginRight: 20 }).columnWidth()).toEqual(50);
	});
	
	
	it("should know the y-coordinate for a given value (keep in mind that the origin is in the top left corner)", function() {
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
	});
	
	
});


