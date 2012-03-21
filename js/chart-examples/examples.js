define(['../chart/chart', '../math/money'], function (chart, Money) {


	var COLORS = {
		LINES: '#DCDFE3',
		TEXT: '#645050',
		FILL: 'rgb(55,152,199)'
	};


	$(function() {          
	           
	    var labels = ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)'];       
	    
	    $('#abtest-rates').chart({
			data: [1.00, 0.50, 0.35, 0.25, 0.20, 0.05],
			layers: [
				["x-axis labels", ['Ally', 'ING Direct', 'Bank of America', 'Chase', 'HSBC Advance', 'Wells Fargo']],
				["bars", 0.8],
				"values above points"
			],
			marginBottom: 20,
			marginTop: 40,
			marginLeft: 100,
			marginRight: 10,
			gradients: ['270-rgb(55,152,199)-rgb(70,195,255)' /*blue*/, '270-rgb(101,3,96)-rgb(211,6,201)'/*purple*/]
			
		});
	    
	    

		
		$('#bar').chart({
			data: [Money(50598.54), Money(51204.25), Money(51817.21), Money(52437.51)],
			layers: [
				"borders", 
				["y-axis markers", Money], 
				"x-axis label separators",
				["x-axis labels", ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)']], 
				"bars", 
				"values above points", 
				["bubble", function (i, value) { return labels[i] + '<br>Earnings: ' + value.toString(); }],
				"column hotspots"
			],
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
				["y-axis markers", Money], 
				"x-axis label separators",	
				["x-axis labels", ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)']],	 
				"lines",
				"dots"
			],
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
				["y-axis markers", Money], 
				"x-axis label separators",	
				["x-axis labels", ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)']],	
				"area",
				"dots"
			],
			marginBottom: 20,
			marginTop: 40,
			marginLeft: 100,
			marginRight: 50,
			colors: ['rgb(55,152,199)', 'rgb(101,3,96)', 'rgb(75,125,220)']
		});
		
		
		$('#differential-area').chart({
			edgeToEdge: true,
			data: $('#raise-your-rate-data').find('tbody tr').map(
				function () { 
					return [ 
						$(this).find('td').map(function () { 
							return Money(parseInt($(this).text(), 10)); 
						}).toArray()
					]; 
				} ).toArray(),
			layers: [
				"borders", 
				["y-axis markers", Money], 
				"x-axis label separators",	
				["x-axis labels", ['Deposit'].concat($('#raise-your-rate-data').find('tbody tr').find('th:eq(0)').map(function () { return $(this).text(); }).toArray())],	
				"differential area",
				"lines",
				"dots",
				["bubble", function (i) { 
					return (i == 3 ? 'Final balance' : ['1st', '2nd', '3rd'][i] + ' rate: ' + $('#raise-your-rate-data tbody tr').eq(i).find('th:eq(1)').text() + '%') + '<br>Date: ' + $('#raise-your-rate-data thead th').eq(i+2).text(); 
				}],
				"column hotspots"
			],
			xValues: $('#raise-your-rate-data').find('thead th:gt(1)').map(function () { return new Date($(this).text()).getTime(); }).toArray(),
			marginBottom: 20,
			marginTop: 40,
			marginLeft: 100,
			marginRight: 50,
			colors: ["rgb(82,182,101)","rgb(233,126,0)","rgb(31,124,166)", "rgb(127,127,127)"],
			fillColors: ["rgba(50,150,180,0)","rgba(136,211,245)", "rgba(44,18,98)"],
			yMinValue: 49000,
			yMaxValue: 56000
		});
		
		
		$('#pie-chart').chart({
			data: $('#wealth-by-type tbody tr td').map(function(){ return Money(parseInt($(this).text(), 10)); }).toArray(),
			layers: [
				"borders",
				"pie",
				["pie labels", $('#wealth-by-type thead tr th').map(function(){ return $(this).text(); }).toArray()]
			],
			marginBottom: 20,
			marginTop: 20,
			marginLeft: 20,
			marginRight: 20,
			colors: ["rgb(82,182,101)","rgb(233,126,0)","rgb(31,124,166)", "rgb(127,127,127)"],
			fillColors: ["rgb(50,150,180)","rgba(136,211,245)", "rgba(44,18,98)", "rgba(90,18,98)"],
		});
		
		var TradingDay = function (v, o, h, l, c, d) {
			
			return {
				high: h,
				low: l,
				open: o,
				close: c,
				date: d,
				volume: v,
				valueOf: function () { return this.close; }		 
			};
		};
		
		
		var randomTradingDays = function (n) {
			var i;
			var tradingDays = [];
			var day;
			var lastClose = 30;
			var previousDate = new Date(2010,01,04);
			for (i = 0; i<n; i++) {
				day = TradingDay();
				day.open = lastClose + ( Math.pow(1 + Math.random(), 2) - Math.pow(1 + Math.random(), 2) ) / 10;
				day.high = lastClose + Math.pow(1 + Math.random() * 0.5, 3);
				day.low	 = Math.max(Math.random(), lastClose - Math.pow(1 + Math.random() * 0.5, 3));
				day.close = day.low + Math.random() * (day.high - day.low);
				day.date = new Date(previousDate.getTime() + 24 * 60 * 60 * 1000 * (previousDate.getDay() == 6 ? 3 : 1));
				day.volume = 1000 + Math.round( Math.sqrt(Math.random() * 50000 * 50000) );
				tradingDays.push(day);
				previousDate = day.date;
				lastClose = day.close;
				
			}
			
			return tradingDays;
		};

  
	   

			
	   
	});
});



