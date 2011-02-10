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
	
	var smallerNumber = function(a, b) {
		return typeof a === 'number' && typeof b === 'number' ? Math.min(a,b)
		       : typeof a === 'number' ? a
		       : typeof b === 'number' ? b
		       : null
	}
	
	
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
				
				plotOptions: {
        			area: {
            			stacking: 'normal'
	        		}
				},
			    chart: {
			        renderTo: this.element[0],
			        plotBorderColor: '#DCDFE3',
			        plotBorderWidth: '1',
			        style: {
			        	fontFamily: "Arial,Helvetica,Sans-Serif"
			        },
			        
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
			    	min: null
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
			var yAxis = this._chartOptions.yAxis;

			if (this.options.differential) {
				var i = data.length;
				
				$(data).each(function (i) {
					yAxis.min = smallerNumber(yAxis.min, data[i][1]);
					$(series).each(function() {
						if(data[i][1] !== null) {
							data[i][1] -= this.data[i][1];
						} 
					});
				});
				
				series.unshift({ name: name, data: data });		
				
			} else {
				series.push({ name: name, data: data });
			}
			
		},
		
		setCategories: function (categories) {
			this._chartOptions.xAxis.categories = categories;
		},
		
		readTable: function (table) {
			var $table = $(table);
			var self = this;
			var headersPerRow = $table.find('tbody > tr:eq(0) > th').length;
			var xValues = $table.find( 'thead th:gt(' + (headersPerRow - 1) + ')' ).map( function() { return $(this).text() } ).toArray();
			this.setCategories(xValues);
		
			$table.find('tbody tr').each(function (i) {
				var data = self._seriesFactory(this, i, headersPerRow);
				self.addSeries($(this).find('th').text(), data);
			});
		},
		
		
		/* 
			This should probably take (table, rowNumber, headersPerRow)
			_parseXValue and _parseYValue would get (table, rowNumber, colNumber)
		*/
		_seriesFactory: function (tr, rowNumber,  headersPerRow) {
			var widget = this;
			return $(tr).find('td').map(function (i, td) {
				var colNumber = headersPerRow + i;
				return [ [ widget._readXValue(td, colNumber), widget._readYValue(td, colNumber) ] ]; 
			}).toArray();
		},
		
		_readXValue: function (td, colNumber) {
			return $(td).closest('table').find('>thead>tr>th').eq(colNumber).text();
		},
		
		_readYValue: function (td, colNumber) {
			var str = $(td).text()
			return str.length ? parseFloat(str) : null;
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