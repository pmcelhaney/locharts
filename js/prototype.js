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
		        day.low  = Math.max(Math.random(), lastClose - Math.pow(1 + Math.random() * 0.5, 3));
		        day.close = day.low + Math.random() * (day.high - day.low);
		        day.date = new Date(previousDate.getTime() + 24 * 60 * 60 * 1000 * (previousDate.getDay() == 6 ? 3 : 1));
			    day.volume = 1000 + Math.round( Math.sqrt(Math.random() * 50000 * 50000) );
		        tradingDays.push(day);
		        previousDate = day.date;
		        lastClose = day.close;
		        
		    }
		    
		    return tradingDays;
		};

  
       
		
		var drawStockChart = function (data) {

    		$('#candlestick').chart({
    			data: data,
    			layers: [
    				"borders", 
    				["y-axis markers", 6, Money], 
    				"candlestick",
    				"hover dots",
    				"column hotspots"
    			],
    			marginBottom: 1,
    			marginTop: 10,
    			marginLeft: 100,
    			marginRight: 10,
    			colors: ['rgb(55,152,199)', 'rgb(101,3,96)'],
    			yMaxValue: Math.max.apply(null, $(data).map(function () { return this.high; } ).toArray()) + 1,
    			yMinValue: Math.min.apply(null, $(data).map(function () { return this.low; } ).toArray()) - 1,
    			eventTarget: '#candlestick'
    		})
		
    		.after('<div></div>').find('+div').css({width: $('#candlestick').width(), height: $('#candlestick').height() / 3})
            .chart({
    			data: $(data).map(function () { return { 
    			    date: this.date, 
    			    volume: this.volume, 
    			    open: this.open,
    			    close: this.close,
    			    high: this.high,
    			    low: this.low,
    			    valueOf: function () { return this.volume; } 
    			}; } ).toArray(),
    			layers: [
    				"borders", 
    				["y-axis markers", 3], 
    				"x-axis static dates",  
    				["bars", 1],
    				"column hotspots"			
    			],
    			marginBottom: 20,
    			marginTop: 10,
    			marginLeft: 100,
    			marginRight: 10,
    			colors: ['rgb(55,152,199)', 'rgb(101,3,96)'],
    			eventTarget: '#candlestick'
    		});


            var formatDate = function(d) {
            	var twoDigits = function(n) {
            		return n > 9 ? n : '0' + n;
            	};
            	if (!d.getMonth) {
            		return d;
            	}
            	return twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate()) + '/' + d.getFullYear();		
            };


            $('#candlestick').bind('focusDatum.chart', function (event, index, datum) {
               $('#daily-stock-details .date p').text(formatDate(datum.date));
               $('#daily-stock-details .volume p').text(datum.volume);
               $('#daily-stock-details .open p').text(datum.open.toFixed(2));
               $('#daily-stock-details .close p').text(datum.close.toFixed(2));
               $('#daily-stock-details .high p').text(datum.high.toFixed(2));
               $('#daily-stock-details .low p').text(datum.low.toFixed(2));
            });

        };
        
        var allData = randomTradingDays(500);
  		var data = allData.splice(-90);
        
       // drawStockChart(data);
        
        var url = "http://query.yahooapis.com/v1/public/yql?";
        
        
        $.ajax({
          url: 'http://query.yahooapis.com/v1/public/yql',
          data: {
            q: "select * from yahoo.finance.historicaldata where symbol = 'AAPL' and startDate ='2011-01-01' and endDate='2011-04-01'",
            format: 'json',
            env: 'http://datatables.org/alltables.env'          
          },
          
          dataType: 'jsonp',
          success: function (data) {  
              drawStockChart(
                  $(data.query.results.quote).map(function () { 
                      return { 
                          date: this.Date, 
                          volume: +this.Volume, 
                          open: +this.Open,
                          close: +this.Close,
                          high: +this.High,
                          low: +this.Low,
                          valueOf: function () { return this.volume; } 
      			      };
                 }).toArray() 
              ); 
          }
        });
        
        
            
       
	});
});



