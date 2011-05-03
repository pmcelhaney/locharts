define(['chart', 'Money'], function (chart, Money) {
	$(function() {
		$('#bar').chart({
			data: [Money(50598.54), Money(51204.25), Money(51817.21), Money(52437.51)],
			layers: [
				"borders", 
				["y-axis markers", 6, Money], 
				"x-axis label separators",  
				"x-axis labels",  
				"bars", 
				"values above points", 
				"bubble"
			],
			xLabels: ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)'],
			marginBottom: 20,
			marginTop: 40,
			marginLeft: 100,
			marginRight: 10
		});

	});
});

