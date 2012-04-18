/*global define*/
define(['../../math/money', './background', './y-axis-markers',  './candlestick', './hover-dots', './hotspots-column'], function (money, background, yAxisMarkers, candlestick, hoverDots, columnHotspots) {

    return function (labels) {

        this.print(background);
        this.print(yAxisMarkers, [money, 'right']);
        this.print(candlestick);
        this.print(hoverDots);
        this.print(columnHotspots);
    };

});
