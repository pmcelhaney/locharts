(function($) {

module("allychart: core");

test("sanity check", function () {
	equals(1, 1);
});


test("A value should map to the correct y coordinate.", function () {
	$('#chart-target').allyChart({ 
		height: 100, 
		values: [30, 25],
		yAxis: {
			min: 20, 
			max: 40
		}, 
		xAxis: {
			labels: ['apples', 'bananas']
		}
	});
	var points = $('#chart-target').allyChart('points');
	
	equals(points[0].y, 50, "30 is halfway between 20 and 40, should map to 50");
	equals(points[1].y, 75, "25 is 1/4 of the way up, should map to 75 (since y axis points down)");
});


test("A value should map to the correct x coordinate.", function () {
	$('#chart-target').allyChart({ 
		height: 100, 
		width: 300,
		values: [30, 25],
		yAxis: {
			min: 20, 
			max: 40
		},
		xAxis: {
			labels: ['apples', 'bananas']
		} 
	});
	var points = $('#chart-target').allyChart('points');
	
	equals(points[0].x, 100, "the first point should be at 100 (1/3 of the width )");
	equals(points[1].x, 200, "the second point should be at 200 (2/3 of the width)");
});

})(jQuery);

