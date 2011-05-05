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
		
			gradients: ['270-rgb(55,152,199)-rgb(70,195,255)' /*blue*/, '270-rgb(101,3,96)-rgb(211,6,201)'/*purple*/]
			
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
			fillColors: ['rgb(55,152,199)', 'rgb(101,3,96)']
		});
		
		
		$('#area').chart({
			edgeToEdge: true,
			data: [ 
				[Money(100), Money(200), Money(300), Money(400)],
				[Money(100), Money(200), Money(400), Money(600)],
				[Money(100), Money(200), Money(400), Money(800)]
			],
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
			marginRight: 50,
			colors: ['rgb(55,152,199)', 'rgb(101,3,96)']
		});
		
		$('#differential-area').chart({
			edgeToEdge: true,
			data: [ 
				[Money(100), Money(200), Money(300), Money(400)],
				[Money(100), Money(200), Money(400), Money(600)],
				[Money(100), Money(200), Money(400), Money(800)]
			],
			layers: [
				"borders", 
				["y-axis markers", 6, Money], 
				"x-axis label separators",  
				"x-axis labels",  
				"differential area",
				"lines",
				"dots"
			],
			xLabels: ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)'],
			marginBottom: 20,
			marginTop: 40,
			marginLeft: 100,
			marginRight: 50,
			colors: ["rgb(31,124,166)","rgb(233,126,0)", "rgb(82,182,101)"],
			fillColors: ["rgb(255,255,255)","rgba(136,211,245)", "rgba(44,18,98)"]
		});

	});
});



