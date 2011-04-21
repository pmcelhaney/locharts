define(['layers', 'js/ally-charts.js', 'lib/raphael/raphael.js'], function (layers) {
	$(function() {

		var chart = {
			data: [100, 142, 40, 151],
			paper: Raphael(50, 100, 600, 400)
		};

		var layersToInclude = ["borders", ["y-axis markers", 4], "x-axis label separators",  "x-axis labels",  "bars", "values above points"];
		

		chart.grid = Grid({
			width: 600, 
			height: 400, 
			yMinValue: 0, 
			yMaxValue: Math.max.apply(null, chart.data) * 1.1, 
			xLabels: ['Jan', 'Feb', 'Mar', 'Apr'],
			marginBottom: 20,
			marginTop: 10,
			marginLeft: 100,
			marginRight: 10
		});



		$.each(layersToInclude, function () {
			var args = [];
			if ($.isArray(this)) {
				layer = layers[this[0]];
				args.push(this.slice(1));
			} else {
				layer = layers[this];
			}

			layer.apply(chart, args);
		});

	});
});