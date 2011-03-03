(function($) {

module("allychart: core");

test("sanity check", function () {
	equals(1, 1);
});


test("A yValue should map to the correct y coordinate.", function () {
	$('#chart-target').allyChart({ 
		height: 100, 
		values: [30],
		yAxis: {
			min: 20, 
			max: 40
		} 
	
	});
	var points = $('#chart-target').allyChart('points');
	
	equals(points[0], 50);
});

})(jQuery);

