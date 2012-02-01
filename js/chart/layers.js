define(
	['./layers/bars', './layers/x-axis-labels', './layers/values-above-points', './layers/x-axis-label-separators', './layers/y-axis-markers', './layers/background', './layers/bubble', './layers/horizontal-grid-lines', './layers/dots', './layers/hover-dots', './layers/area', './layers/area-differential', './layers/hotspots', './layers/hotspots-column', './layers/candlestick', './layers/pie', './layers/pie-labels', './layers/x-axis-date-labels', './layers/scrubber'], 
	function (bars, xAxisLabels, valuesAbovePoints, xAxisLabelSeparators, yAxisMarkers, background, bubble, horizontalGridLines, dots, hoverDots, area, differentialArea, hotspots, columnHotspots, candlestick, pie, pieLabels, xAxisDateLabels, scrubber) {


return {
	'bars':  bars, 
	'x-axis labels': xAxisLabels,
	'values above points': valuesAbovePoints,
	'x-axis label separators': xAxisLabelSeparators,
	'y-axis markers': yAxisMarkers,
	'borders': background,
	'bubble': bubble,
	'lines': horizontalGridLines,
	'dots': dots,
	'hover dots': hoverDots,
	'area': area,
	'differential area': differentialArea,
	'hotspots': hotspots,
	'column hotspots': columnHotspots,
	'candlestick' : candlestick,
	'pie': pie,
	'pie labels': pieLabels,
	'x-axis date labels': xAxisDateLabels,
	'scrubber': scrubber	
};



});

