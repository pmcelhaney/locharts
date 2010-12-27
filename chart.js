		chart = new Highcharts.Chart({
			    chart: {
			        width: 900,
			        height: 400,
			        marginLeft: 75,
			        marginRight: 75,
			        marginTop: 30,
			        marginBottom: 75,
			        renderTo: 'allyProductCalcTarget',
			        defaultSeriesType: 'area',
			        plotBorderColor: '#DCDFE3',
			        plotBorderWidth: '1',
			        events: {
			            load: announceLoaded
			        },
			        style: {
			        	fontFamily: "Arial,Helvetica,Sans-Serif"
			        }
			    },
			    point: { 
			        marker: {
			        	symbol: 'circle'
			        }
			    },
			    credits: {
			        enabled: false
			    },
			    title: {
			        text: ''
			    },
			    xAxis: {
			        title: {
			            text: null
			        },
			    	type: "datetime",
			        labels: {
			            formatter: function () { return Highcharts.dateFormat('%b %Y', this.value); }
			        }
			    },
			    yAxis: {
			        title: {
			            text: null
			        },
			        startOnTick: false,
			        showFirstLabel: false,
			        labels: {
			            formatter: function() {return '$' + Highcharts.numberFormat(this.value,0);}
			        }
			                        
			    },
			    tooltip: {
			        enabled: true,
			        formatter: function() {return this.series.name;}
			    },
			    legend: {
			        enabled: false
			    },
			    
			    plotOptions: {
			        series: {
			            stacking: 'normal'
			        },
			        area: {
			            lineWidth: 2,
			            marker: {
			                enabled: false,
			                    states: {
			                        hover: {
			                            enabled: false,
			                            radius: 5
			                        }
			                    },
			                symbol: 'circle'
			            },
			            shadow: false,
			            states: {
			                hover: {
			                    lineWidth: 3
			                }
			            }
			        }
			    },
			    
			    series: []
			});