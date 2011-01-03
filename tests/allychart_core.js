(function($) {

module("allychart: core");

test("set width, height, and margin", function() {	
  $('#chart-target').allyChart({width: 200, height: 100, margin: [10,20,30,40], sourceTable:'#empty-table' });
  var chart = Highcharts.chart;
  equals(200, chart.options.chart.width);
  equals(100, chart.options.chart.height);
  same([10,20,30,40], chart.options.chart.margin);
});

test("set chart container", function() {	
  $('#chart-target').allyChart({sourceTable:'#empty-table' });
  equals(Highcharts.chart.options.renderTo, document.getElementById('#chart-target'));
});

})(jQuery);