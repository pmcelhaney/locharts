define(['./background', './pie', './pie-labels'], function (background, pie, pieLabels) {

	return function () {
		this.print(background);
		this.print(pie);
		this.print(pieLabels);
	};
});