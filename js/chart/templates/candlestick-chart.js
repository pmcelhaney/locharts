/*global define*/
define(['../../math/money', './background', './y-axis-markers',  './candlestick', './hover-dots', './hotspots-column'], function (money, background, yAxisMarkers, candlestick, hoverDots, columnHotspots) {

    return function (labels) {

        this.applyLayer(background);
        this.applyLayer(yAxisMarkers, [money, 'right']);
        this.applyLayer(candlestick);
        this.applyLayer(hoverDots);
        this.applyLayer(columnHotspots);
    };

});
