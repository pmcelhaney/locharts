(function($) {

module("allychart: core");

test("set width, height, margin, and type", function() {	
  $('#chart-target').allyChart({width: 200, height: 100, margin: [10,20,30,40], sourceTable:'#empty-table', type: 'area' });
  var chart = Highcharts.chart;
  equals(200, chart.options.chart.width);
  equals(100, chart.options.chart.height);
  same([10,20,30,40], chart.options.chart.margin);
  equals(chart.options.chart.type, 'area');
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


test("read series data from table", function() {	
	var data = [
  		[['1',23], ['3',29], ['5',35]],
  		[['1',46], ['3',55], ['5',65]],
  		[['1',67], ['3',81], ['5',95]]
  	];
  	$('#chart-target').allyChart({sourceTable: '#simple-table' });
  	$(data).each(function (i) {
  		same(Highcharts.chart.options.series[i].data, data[i]); 
	});
});


test("read series data from table, converting blanks to null", function() {	
	var data = [
  		[['1', 23], ['3', null], ['5',   35]],
  		[['1', 46], ['3',   55], ['5', null]],
  		[['1', 67], ['3',   81], ['5',   95]]
  	];
  	$('#simple-table tbody').find('tr:eq(0) td:eq(1)').text('').end().find('tr:eq(1) td:eq(2)').text('');
  	$('#chart-target').allyChart({sourceTable: '#simple-table' });
  	$(data).each(function (i) {
  		same(Highcharts.chart.options.series[i].data, data[i]); 
	});
});


test("read series data from table, differential mode", function() {	
	// Note: To facilitate stacking, series' are added last-to-first
	var data = [
  		[ ['1', 67-46], ['3',  81-55],  ['5', 95-65]],
  		[ ['1', 46-23], ['3',  55-29],  ['5', 65-35]],
  		[ ['1',    23], ['3',     29],  ['5',    35]]
  	];
  	$('#chart-target').allyChart({sourceTable: '#simple-table', differential: true });
  	$(data).each(function (i) {
  		same(Highcharts.chart.options.series[i].data, data[i]); 
	});
	
	equals(Highcharts.chart.options.plotOptions.area.stacking, 'normal');
});





})(jQuery);

