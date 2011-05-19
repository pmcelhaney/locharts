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


var formatDate = function(d) {
	var twoDigits = function(n) {
		return n > 9 ? n : '0' + n;
	};
	if (!d.getMonth) {
		return d;
	}
	return twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate()) + '/' + d.getFullYear();		
};




define(['chart', 'Money'], function (chart, Money) {


	var COLORS = {
		LINES: '#DCDFE3',
		TEXT: '#645050',
		FILL: 'rgb(55,152,199)'
	};


	$(function() {

		
		

  
       
		
		var drawStockChart = function (data, volumeData, allData) {

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
    			data: volumeData,
    			layers: [
    				"borders", 
    				["y-axis markers", 3, function (n) { return n / 1000 / 1000 + 'm'; }], 
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
    		})
    		
    		
    		.after('<div></div>').find('+div').css({width: $('#candlestick').width(), height: $('#candlestick').height() / 6})
    		.chart({
    			data: data,
    			layers: [
    				"borders", 
    				"area"
    			],
    			marginBottom: 1,
    			marginTop: 1,
    			marginLeft: 100,
    			marginRight: 10,
    			colors: ['#ccc'],
    			yMaxValue: Math.max.apply(null, $(data).map(function () { return this.high; } ).toArray()) + 1,
    			yMinValue: Math.min.apply(null, $(data).map(function () { return this.low; } ).toArray()) - 1,
    			eventTarget: '#candlestick'
    		});





            $('#candlestick').bind('focusDatum.chart', function (event, index, datum) {
               $('#daily-stock-details .date p').text(formatDate(datum.date));
               $('#daily-stock-details .volume p').text(datum.volume);
               $('#daily-stock-details .open p').text(datum.open.toFixed(2));
               $('#daily-stock-details .close p').text(datum.close.toFixed(2));
               $('#daily-stock-details .high p').text(datum.high.toFixed(2));
               $('#daily-stock-details .low p').text(datum.low.toFixed(2));
            });

        };
        
        var data, volumeData, allData;
        
        //         var data = randomTradingDays(500);
        //         var volumeData = $(data).map(function () { return { 
        //     date: this.date, 
        //     volume: this.volume, 
        //     open: this.open,
        //     close: this.close,
        //     high: this.high,
        //     low: this.low,
        //     valueOf: function () { return this.volume; } 
        // }; } ).toArray();
        //          
        
   
        
        $('#candlestick').html("Loading data from Yahoo... (on the live site it will be pre-cached and fast)");
        
        
        var url = "http://query.yahooapis.com/v1/public/yql?";
        
        
        $.ajax({
          url: 'http://query.yahooapis.com/v1/public/yql',
          data: {
            q: 'select * from yahoo.finance.historicaldata where symbol = "AAPL" and startDate ="2010-05-18" and endDate="2011-05-17" | sort(field="Date")',
            format: 'json',
            env: 'http://datatables.org/alltables.env'          
          },
          
          dataType: 'jsonp',
          success: function (yqlData) {  
              
            data = $(yqlData.query.results.quote).map(function () { 
                    return { 
                        date: this.Date, 
                        volume: +this.Volume, 
                        open: +this.Open,
                        close: +this.Close,
                        high: +this.High,
                        low: +this.Low,
                        valueOf: function () { return this.close; } 
                    };
               }).toArray();
               
               
             volumeData = $(data).map(function () { return { 
                   date: this.date, 
                   volume: this.volume, 
                   open: this.open,
                   close: this.close,
                   high: this.high,
                   low: this.low,
                   valueOf: function () { return this.volume; } 
              }; } ).toArray();
              
              
              $('#candlestick').html('');
              drawStockChart(data, volumeData, data); 
          }
        });
        
        
        $('#update-chart-form').submit(function (e) {
            e.preventDefault();
            
            $('#candlestick').unbind('blurDatum.chart');
            
            

        
            var subset = data.slice( -$('#how-many-days').val() );
            $('#candlestick').chart('option', 'yMaxValue', Math.max.apply(null, $(subset).map(function () { return this.high; } ).toArray()) + 1);
            $('#candlestick').chart('option', 'yMinValue', Math.min.apply(null, $(subset).map(function () { return this.low; } ).toArray()) - 1);
            $('#candlestick').chart('draw', subset);
            
            $('#candlestick+div').chart('draw', volumeData.slice( -$('#how-many-days').val() ) );
             
        });
       
	});
});



