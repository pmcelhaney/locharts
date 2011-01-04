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
  		[1.28, 1.38, 1.50],
  		[1.09, 1.18, 1.30],
  		[1.02, 1.35, 1.46]
  	];
  	$('#chart-target').allyChart({sourceTable: '#cd-rate-table' });
  	$(data).each(function (i) {
  		same(Highcharts.chart.options.series[i].data, data[i]); 
	});
});


test("read series data from table, converting blanks to null", function() {	
	var data = [
  		[50000, 50800, 51500, 52312],
  		[ null, 50800, 51800, 52911],
  		[ null,  null, 51800, 53301]
  	];
  	$('#chart-target').allyChart({sourceTable: '#cd-ryr-table' });
  	$(data).each(function (i) {
  		same(Highcharts.chart.options.series[i].data, data[i]); 
	});
});



test("read series names from table", function() {	
	var names = ['Ally', 'Last Union', 'Bank Of Elbonia'];
  	$('#chart-target').allyChart({sourceTable: '#cd-rate-table' });
  	$(names).each(function (i) {
  		same(Highcharts.chart.options.series[i].name, names[i]); 
	});
});


test("read series data from table, differential mode", function() {	
	var data = [
  		[50000, 50800,       51500,             52312],
  		[ null,     0, 51800-51500,       52911-52312],
  		[ null,  null,           0, 53301-52911      ]
  	];
  	$('#chart-target').allyChart({sourceTable: '#cd-ryr-table', differential: true });
  	$(data).each(function (i) {
  		same(Highcharts.chart.options.series[i].data, data[i]); 
	});
});





})(jQuery);

