ALLY.define('stock-chart', ['chart', 'money'], function (chart, Money) {


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
		var lastOpen = 75;
		var previousDate = new Date();
		for (i = 0; i<n; i++) {
			day = TradingDay();
			day.close = lastOpen + ( Math.pow(1 + Math.random(), 2) - Math.pow(1 + Math.random(), 2) ) / 10;
			day.high = lastOpen + Math.pow(1 + Math.random() * 0.5, 3);
			day.low	 = Math.max(Math.random(), lastOpen - Math.pow(1 + Math.random() * 0.5, 3));
			day.open = day.low + (Math.random() * 0.99) * (day.high - day.low); // Slightly biased to lower opens (counting backward).
			day.date = new Date(previousDate.getTime() - 24 * 60 * 60 * 1000 * (previousDate.getDay() == 1 ? 3 : 1));
			day.volume = Math.round( 1000 * 1000 * 10.2 - 1000 * 1000 * 10 * Math.pow(Math.random(), 0.2) );
			tradingDays.unshift(day);
			previousDate = day.date;
			lastOpen = day.open;

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
	

	

	$(function() {

		var form = $('#stock-filter-form');
		var startDateField = $('input[name=start]', form);
		var endDateField = $('input[name=end]', form);

		var data = []; 
		var volumeData = [];  

		var loadFromYahoo = function () {
			
			var parseDate = function (s) {
				   parts = s.split('/');
				   return new Date(+parts[0], +parts[1]-1, +parts[2]);
			};
			
			
			$('#candlestick').html("Loading data from Yahoo... (on the live site it will be pre-cached and fast)");

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
							date: parseDate(this.date), 
							volume: +this.Volume, 
							open: +this.Open,
							close: +this.Close,
							high: +this.High,
							low: +this.Low,
							valueOf: function () { return this.close; }
						};
					}).toArray();

					volumeData = $(data).map(function () { 
						return { 
							date: this.date, 
							volume: this.volume, 
							open: this.open,
							close: this.close,
							high: this.high,
							low: this.low,
							valueOf: function () { return this.volume; }
						}; 
					} ).toArray();
					$('#candlestick').html('');
					drawStockChart(); 
				}
			});			   
		};
		
		var applyFormsMagic = function () {
			// This is called when forms.js is loaded, before the modal form has loaded.
			// So it needs to be called again.
			forms.activateFocus(form);	

			// I assume this is supposed to be called to initiate forms.js magic.
			forms.clean(form);

			// Turn on the datepickers.  
			$('.item.calendar input', form).datepicker({ beforeShowDay: $.datepicker.noWeekends});
		
			
		};
		
		
		
		
		
		
		var loadFromRandom = function () {
			data = randomTradingDays(500);
			volumeData = $(data).map(function () { return { 
				date: this.date, 
				volume: this.volume, 
				open: this.open,
				close: this.close,
				high: this.high,
				low: this.low,
				valueOf: function () { return this.volume; }
			}; } ).toArray();
			
			setTimeout( function () { drawStockChart(); }, 1); 
		};
		
		var functionize = function (x) { 
			return function () { return x; };
		};
		
		var indexForDate = function (d) {
			var i = 0;
			while (data[i++].date < d) {}
			return i-1;
		};
		
		var drawStockChart = function () {
			var subset = data.slice( -30 );	
			var volumeSubset = volumeData.slice( -30 );	
			var startDate = subset[0].date ;
			var endDate =  subset.slice(-1)[0].date;
			
			startDateField.datepicker('setDate', startDate);
			endDateField.datepicker('setDate', endDate);
			
			startDateField.add(endDateField).datepicker('option', 'minDate', data[0].date);
			startDateField.add(endDateField).datepicker('option', 'maxDate', data.slice(-1)[0].date);

			$('#candlestick').chart({
				data: functionize(subset),
				layers: [
					"borders", 
					["y-axis markers", 6, Money], 
					"candlestick",
					"hover dots",
					"column hotspots"
				],
				marginBottom: 1,
				marginTop: 10,
				marginLeft: 40,
				marginRight: 1,
				colors: ['rgb(55,152,199)', 'rgb(101,3,96)'],
				yMaxValue: Math.max.apply(null, $(subset).map(function () { return this.high; } ).toArray()) + 1,
				yMinValue: Math.min.apply(null, $(subset).map(function () { return this.low; } ).toArray()) - 1,
				eventTarget: '#candlestick'
			})
		
			.after('<div></div>').find('+div').css({width: $('#candlestick').width(), height: 100, position: 'relative'})
			.chart({
				data: functionize(volumeSubset),
				layers: [
					"borders", 
					["y-axis markers", 3, function (n) { return n / 1000 / 1000 + 'm'; }], 
					"x-axis date labels",	
					["bars", 0.5, 1],
					"column hotspots"			
				],
				marginBottom: 20,
				marginTop: 10,
				marginLeft: 40,
				marginRight: 1,
				colors: ['rgb(55,152,199)', 'rgb(101,3,96)'],
				eventTarget: '#candlestick'
			})
			
			
			.after('<div id="scrubber"></div>').find('+div').css({width: $('#candlestick').width(), height: 50})
			.chart({
				data: functionize(data),
				layers: [
					"borders", 
					"area",
					["scrubber", indexForDate(startDate), indexForDate(endDate)]
				],
				marginBottom: 1,
				marginTop: 1,
				marginLeft: 40,
				marginRight: 1,
				colors: ['#ccc', 'rgb(101,3,96)'],
				yMaxValue: Math.max.apply(null, $(data).map(function () { return this.high; } ).toArray()) + 1,
				yMinValue: Math.min.apply(null, $(data).map(function () { return this.low; } ).toArray()) - 1			
			});


			$('#scrubber').bind('selectedRangeChange.chart', function (event, start, end) {

				var subset = data.slice( start, end+1 );
				$('#candlestick').chart('option', 'yMaxValue', Math.max.apply(null, $(subset).map(function () { return this.high; } ).toArray()) + 1);
				$('#candlestick').chart('option', 'yMinValue', Math.min.apply(null, $(subset).map(function () { return this.low; } ).toArray()) - 1);
				$('#candlestick').chart('draw', subset);

				$('#candlestick+div').chart('draw', volumeData.slice( start, end+1 ) );

				startDateField.datepicker('setDate', subset[0].date );
				endDateField.datepicker('setDate', subset.slice(-1)[0].date );

			});


			$('#candlestick').bind('focusDatum.chart', function (event, index, datum) {
			   $('#daily-stock-details td.date').text(formatDate(datum.date));
			   $('#daily-stock-details td.volume').text(datum.volume);
			   $('#daily-stock-details td.open').text(datum.open.toFixed(2));
			   $('#daily-stock-details td.close').text(datum.close.toFixed(2));
			   $('#daily-stock-details td.high').text(datum.high.toFixed(2));
			   $('#daily-stock-details td.low').text(datum.low.toFixed(2));
			});
			
			$(startDateField).add(endDateField).bind('change.chart', function (e) {
				e.preventDefault();

				$('#candlestick').unbind('blurDatum.chart');

				var startDate = startDateField.datepicker('getDate');
				var endDate = endDateField.datepicker('getDate');
				
				var startDateWasChanged = (startDateField[0] === e.target);
				
				if (startDate > endDate) {
					if (startDateWasChanged) {
						endDateField.datepicker('setDate', endDate = startDate);
					} else {
						startDateField.datepicker('setDate', startDate = endDate);
					}
						
				}

				var subset = data.slice( indexForDate(startDate), indexForDate(endDate) + 1 );
				$('#candlestick').chart('option', 'yMaxValue', Math.max.apply(null, $(subset).map(function () { return this.high; } ).toArray()) + 1);
				$('#candlestick').chart('option', 'yMinValue', Math.min.apply(null, $(subset).map(function () { return this.low; } ).toArray()) - 1);
				$('#candlestick').chart('draw', subset);

				$('#candlestick+div').chart('draw', volumeData.slice( indexForDate(startDate), indexForDate(endDate) + 1) );

				$('#scrubber').trigger('moveScrubIndex.chart', [ indexForDate(startDate), indexForDate(endDate) + 1	 ]); 
				
		
				var indexOfSelectedDate = startDateWasChanged ? 0 : subset.length - 1;
				$('#candlestick').trigger('focusDatum.chart',  ( [ indexOfSelectedDate , subset[indexOfSelectedDate] ] ) );
				
			});
			
			$('#candlestick').trigger('focusDatum.chart', [subset.length-1, subset.slice(-1)[0] ]);
		};
		


		applyFormsMagic();

		loadFromRandom();
		//loadFromYahoo();
		



	});
});



