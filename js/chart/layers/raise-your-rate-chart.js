/*global define*/
define(['../../math/money', './bars', './background', './y-axis-markers', './horizontal-grid-lines', './x-axis-label-separators', './area-differential', './dots', './bubble', './hotspots-column'], function (money, bars, background, yAxisMarkers, lines, xAxisLabelSeparators, differentialArea, dots, bubble, columnHotspots) {

    return function (labels) {

        this.applyLayer(background);
        this.applyLayer(yAxisMarkers, money);
        this.applyLayer(xAxisLabelSeparators);
        this.applyLayer(differentialArea);
        this.applyLayer(lines);
        this.applyLayer(dots);
        this.applyLayer(bubble, [ function (i) { return (i === 3 ? 'Final balance' : ['1st', '2nd', '3rd'][i] + ' rate: ' + $('#raise-your-rate-data tbody tr').eq(i).find('th:eq(1)').text() + '%') + '<br>Date: ' + $('#raise-your-rate-data thead th').eq(i + 2).text(); } ]);
        this.applyLayer(columnHotspots);

    };

});

/* 
  layers: [
                "borders",
                ["y-axis markers", money],
                "x-axis label separators",
                "differential area",
                "lines",
                "dots",
                ["bubble", function (i) { return (i === 3 ? 'Final balance' : ['1st', '2nd', '3rd'][i] + ' rate: ' + $('#raise-your-rate-data tbody tr').eq(i).find('th:eq(1)').text() + '%') + '<br>Date: ' + $('#raise-your-rate-data thead th').eq(i + 2).text(); }],
                "column hotspots"
            ],

*/