define(['chart', 'Money'], function (chart, Money) {


	var COLORS = {
		LINES: '#DCDFE3',
		TEXT: '#645050',
		FILL: 'rgb(55,152,199)'
	};


	$(function() {
	    var labels = ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)'];
	    
		$('#bar').chart({
			data: [Money(50598.54), Money(51204.25), Money(51817.21), Money(52437.51)],
			layers: [
				"borders", 
				["y-axis markers", 6, Money], 
				"x-axis label separators",  
				["x-axis labels", ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)']], 
				"bars", 
				"values above points", 
				["bubble", function (i, value) { return labels[i] + '<br>Earnings: ' + value.toString(); }]
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
				["y-axis markers", 6, Money], 
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
				["y-axis markers", 6, Money], 
				"x-axis label separators",  
				["x-axis labels", ['1st term (12 mo)', '1 renewal (2 yr)', '2 renewals (3 yr)', '3 renewals (4 yr)']],  
				"area",
				"dots"
			],
			marginBottom: 20,
			marginTop: 40,
			marginLeft: 100,
			marginRight: 50,
			colors: ['rgb(55,152,199)', 'rgb(101,3,96)']
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
				["y-axis markers", 6, Money], 
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
			fillColors: ["rgb(255,255,255)","rgba(136,211,245)", "rgba(44,18,98)"],
			yMinValue: 49000,
			yMaxValue: 56000
		});
		
		
		var TradingDay = function (o, h, l, c) {
		    
		    return {
		        high: h,
		        low: l,
		        open: o,
		        close: c,
		        valueOf: function () { return this.close; }      
		    };
		};
		
		
		var randomTradingDays = function (n) {
		    var i;
		    var tradingDays = [];
		    var day;
		    var lastClose = 100;
		    for (i = 0; i<n; i++) {
		        day = TradingDay();
		        day.open = lastClose + Math.sqrt(Math.random() * 20) - Math.sqrt(Math.random() * 20);
		        day.high = lastClose + Math.sqrt(Math.random() * 500);
		        day.low  = Math.max(0.5, lastClose - Math.sqrt(Math.random() * 500));
		        day.close = day.low + Math.random() * (day.high - day.low);
		        tradingDays.push(day);
		        lastClose = day.close;
		        
		    }
		    
		    return tradingDays;
		};

		
		$('#candlestick').chart({
			data: randomTradingDays(50),
			layers: [
				"borders", 
				["y-axis markers", 6, Money], 
				"x-axis label separators",  
				"candlestick"			
			],
			marginBottom: 20,
			marginTop: 40,
			marginLeft: 100,
			marginRight: 10,
			fillColors: ['rgb(55,152,199)', 'rgb(101,3,96)']
		});

	});
});



