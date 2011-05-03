define(['chart', 'Money'], function (chart, Money) {
	$(function() {
		$('#chart-target').chart({
			data: [Money(100), Money(142), Money(40), Money(151)],
			layers: ["borders", ["y-axis markers", 6], "x-axis label separators",  "x-axis labels",  "bars", "values above points", "bubble"],
			xLabels: ['January', 'February', 'March', 'April'],
			marginBottom: 20,
			marginTop: 40,
			marginLeft: 100,
			marginRight: 10
		});

	});
});