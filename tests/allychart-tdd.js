(function($) {

module("allychart: core");

test("sanity check", function () {
	equals(1, 1);
});


test("A yValue should map to the correct y coordinate.", function () {
	$('#chart-target').allyChart({ 
		height: 100, 
		values: [30, 25],
		yAxis: {
			min: 20, 
			max: 40
		} 
	});
	var points = $('#chart-target').allyChart('points');
	
	equals(points[0], 50, "30 is halfway between 20 and 40, should map to 50");
	equals(points[1], 75, "25 is 1/4 of the way up, should map to 75 (since y axis points down)");
});

})(jQuery);

