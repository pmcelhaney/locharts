define(['./background', './pie', './pie-labels'], function (background, pie, pieLabels) {

	return function () {
		this.applyLayer(background);
		this.applyLayer(pie);
		this.applyLayer(pieLabels);
	};
});