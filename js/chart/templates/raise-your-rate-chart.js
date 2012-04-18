/*global define*/
define(['../../math/money', './bars', './background', './y-axis-markers', './lines', './x-axis-label-separators', './x-axis-labels', './area-differential', './dots', './bubble', './hotspots-column'], function (money, bars, background, yAxisMarkers, lines, xAxisLabelSeparators, xAxisLabels, differentialArea, dots, bubble, columnHotspots) {

    return function (labels) {

        this.print(background);
        this.print(yAxisMarkers, money);
        this.print(xAxisLabelSeparators);
        this.print(xAxisLabels);
        this.print(differentialArea);
        this.print(lines);
        this.print(dots);
        this.print(bubble, [ function (i) { return (i === 3 ? 'Final balance' : ['1st', '2nd', '3rd'][i] + ' rate: ' + $('#raise-your-rate-data tbody tr').eq(i).find('th:eq(1)').text() + '%') + '<br>Date: ' + $('#raise-your-rate-data thead th').eq(i + 2).text(); } ]);
        this.print(columnHotspots);

    };

});
