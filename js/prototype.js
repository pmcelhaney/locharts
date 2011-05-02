define(['chart'], function () {
	$(function() {
		$('#chart-target').chart({
			data: [100, 142, 40, 151],
			layers: ["borders", ["y-axis markers", 4], "x-axis label separators",  "x-axis labels",  "bars", "values above points", "bubble"],
			xLabels: ['Jan', 'Feb', 'Mar', 'Apr'],
			marginBottom: 20,
			marginTop: 40,
			marginLeft: 100,
			marginRight: 10
		});

	});
});