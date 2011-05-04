define(['chart', 'Money'], function (chart, Money) {


	var COLORS = {
		LINES: '#DCDFE3',
		TEXT: '#645050',
		FILL: 'rgb(55,152,199)'
	};


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
			marginRight: 10,
		
			gradients: ['270-rgb(55,152,199)-rgb(70,195,255)' /*blue*/, '270-rgb(101,3,96)-rgb(211,6,201)'/*purple*/],
			
		});
		
		
		$('#line').chart({
			data: [Money(50598.54), Money(51204.25), Money(51817.21), Money(52437.51)],
			layers: [
				"borders", 
				["y-axis markers", 6, Money], 
				"x-axis label separators",  
				"x-axis labels",  
				"lines",
				"dots"
			],
			xLabels: ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)'],
			marginBottom: 20,
			marginTop: 40,
			marginLeft: 100,
			marginRight: 10,
			fillColors: ['rgb(55,152,199)', 'rgb(101,3,96)'],
		});
		
		
		$('#area').chart({
			data: [Money(100), Money(250), Money(550), Money(1000)],
			layers: [
				"borders", 
				["y-axis markers", 6, Money], 
				"x-axis label separators",  
				"x-axis labels",  
				"area",
				"dots"
			],
			xLabels: ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)'],
			marginBottom: 20,
			marginTop: 40,
			marginLeft: 100,
			marginRight: 10,
			fillColors: ['rgb(55,152,199)', 'rgb(101,3,96)'],
		});

	});
});

