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
			margin: [75,75,75,75],
			type: 'line'
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
			var data = data;
			var series = this._chartOptions.series;
			if (this.options.differential) {
				$(data).each(function (i) {
					$(series).each(function() {
						if(data[i][1] !== null) {
							data[i][1] -= this.data[i][1];
						} 
					});
				});		
			}
			series.push({ name: name, data: data });
		},
		
		setCategories: function (categories) {
			this._chartOptions.xAxis.categories = categories;
		},
		
		readTable: function (table) {
			var $table = $(table);
			var self = this;
			var headersPerRow = $table.find('tbody > tr:eq(0) > th').length;
			var xValues = $table.find('thead th:gt(' + (headersPerRow - 1) + ')').map(function() { return $(this).text()  }).toArray();
			this.setCategories(xValues);
		
			$table.find('tbody tr').each(function () {
				var data = $(this).find('td').map(function (i) {
					var x = xValues[i];
					var y = $(this).text();
					return [[ xValues[i], y.length ? parseFloat(y) : null]];
				}).toArray();
				self.addSeries($(this).find('th').text(), data);
			});
		},
		
		draw: function () {
			this._chartOptions.chart.width = this.options.width;
			this._chartOptions.chart.height = this.options.height;
			this._chartOptions.chart.margin = this.options.margin;
			this._chartOptions.chart.type = this.options.type;
			this._chart = new Highcharts.Chart(this._chartOptions);
		}

	})
	
}(jQuery, Highcharts));