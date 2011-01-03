(function($) {

module("allychart: core")

test("set width and height", function() {	
  $('#chart-target').allyChart({width: 200, height: 100, sourceTable:'#empty-table' });
  var chart = Highcharts.chart;
  equals(200, chart.options.chart.width);
  equals(100, chart.options.chart.height);
});

})(jQuery);