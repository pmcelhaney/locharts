/*
 * jQuery UI Ally-Charts
 *
 * Highcharts wrapper widget
 *
 * 
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 *   Highcharts.2.1.1.js
 */



(function( $, Highcharts ) {
	$.widget("ui.allyChart", {
		options: {  
			width: 800,
			height: 400,
			margin: [75,75,75,75] 
			
		},
		_chartOptions: {},
		_create: function() { 	
			this._chartOptions = {
			    chart: {
			        width: this.options.width,
			        height: this.options.height,
			        margin: this.options.margin,
			        renderTo: this.element[0],
			        plotBorderColor: '#DCDFE3',
			        plotBorderWidth: '1',
			        style: {
			        	fontFamily: "Arial,Helvetica,Sans-Serif"
			        }
			    },
			    credits: {
			        enabled: false
			    },
			    title: {
			        text: ''
			    },
			    legend: {
			        enabled: false
			    },
			    yAxis: {
			    	title: ''
			    },
			    xAxis: {
			    	categories: ['2008', '2009', '2010']
			    },
				series: [ 
						{name: 'Lions', data: [10,20,30]},
						{name: 'Tigers', data: [14,7,33]},
						{name: 'Bears', data: [25,4,22]}
        		]
			}
		},
		
		addSeries: function (name, data) {
	
			this._chartOptions.series.push({ name: name, data: data });
		},
		
		draw: function () {
			this._chart = new Highcharts.Chart(this._chartOptions);
		}

	})
	
}(jQuery, Highcharts));