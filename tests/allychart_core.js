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

test("read categories from thead > tr > th", function() {	
  $('#chart-target').allyChart({sourceTable: '#cd-rate-table' });
  same(Highcharts.chart.options.xAxis.categories, ['1 Year', '2 Year', '4 Year']); 
});


test("when reading categories, skip THs that are just headers of headers", function() {	
  $('#chart-target').allyChart({sourceTable: '#cd-ryr-table' });
  same(Highcharts.chart.options.xAxis.categories, ["01/01/2011","04/15/2012","07/04/2013","01/01/2014"]); 
});



})(jQuery);