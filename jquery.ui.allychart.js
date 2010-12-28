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
			width: null,
			height: null,
			margin: [75,75,75,75] 
			
		},
		_chartOptions: {},
		_create: function() { 	
			this._chartOptions = {
			    chart: {
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
			    	
			    },
				series: []
			}
		},
		
		addSeries: function (name, data) {
			this._chartOptions.series.push({ name: name, data: data });
		},
		
		setCategories: function (categories) {
			this._chartOptions.xAxis.categories = categories;
		},
		
		draw: function () {
			this._chartOptions.chart.width = this.options.width;
			this._chartOptions.chart.height = this.options.height;
			this._chartOptions.chart.margin = this.options.margin;
			this._chart = new Highcharts.Chart(this._chartOptions);
		}

	})
	
}(jQuery, Highcharts));