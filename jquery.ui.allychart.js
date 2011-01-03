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
		_create: function(o) {
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
			        enabled: true
			    },
			    yAxis: {
			    	title: ''
			    },
			    xAxis: {
			    	
			    },
				series: []
			};
			if (this.options.sourceTable) {
				this.readTable(this.options.sourceTable);	
				this.draw();
			}
		},
		
		addSeries: function (name, data) {
			this._chartOptions.series.push({ name: name, data: data });
		},
		
		setCategories: function (categories) {
			this._chartOptions.xAxis.categories = categories;
		},
		
		readTable: function (table) {
			var $table = $(table);
			var self = this;
			var headersPerRow = $table.find('tbody > tr:eq(0) > th').length;
			this.setCategories($table.find('thead th:gt(' + (headersPerRow - 1) + ')').map(function() { return $(this).text()  }).toArray());
			$table.find('tbody tr').each(function () {
				var data = $(this).find('td').map(function () {
					return parseFloat($(this).text());
				}).toArray();
				$(data).each(function (i) {
					if (isNaN(this)) {
						data[i] = null;
					}	
				});
				console.log(data)
				self.addSeries($(this).find('th').text(), data);
			});
		},
		
		draw: function () {
			this._chartOptions.chart.width = this.options.width;
			this._chartOptions.chart.height = this.options.height;
			this._chartOptions.chart.margin = this.options.margin;
			this._chart = new Highcharts.Chart(this._chartOptions);
		}

	})
	
}(jQuery, Highcharts));