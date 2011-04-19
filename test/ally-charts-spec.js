describe("Grid", function() {
/*
- xForIndex(i), yForIndex(i)
- xForValue(v), yForValue(v)
- columnWidth(), rowHeight()
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
});


