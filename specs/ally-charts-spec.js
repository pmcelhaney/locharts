window.logTime = function() {
	setTimeout(function() {
		alert("Don't forget to remove calls to logTime().");
	}, 1);
	window.logTime = function() {};
};



define([ 'js/chart/chart', './grid-spec', './money-spec'], function() {



	describe("Chart Widget", function() {
		/*
	- yForIndex(i)
	- xForValue(v)
	- rowHeight()
	*/
		var mockLayerWasCalled = false;



		window.Raphael = function(c, w, h) {
			return {
				container: c,
				width: w,
				height: h,
				remove: function() {}
			};
		};

		it("should make the data available to the layer", function() {
			var data;
			var layer = function() {
					data = this.data;
				};

			$('div').chart({
				layers: [layer],
				data: [
					[2, 4, 6, 8]
				]
			});

			expect(data).toEqual([
				[2, 4, 6, 8]
			]);
		});

		it("should make the data available to the layer -- when the data is a function", function() {
			var data;
			var layer = function() {
					data = this.data;
				};

			$('div').chart({
				layers: [layer],
				data: function() {
					return [2, 4, 6, 8];
				}
			});

			expect(data).toEqual([
				[2, 4, 6, 8]
			]);
		});


		it("should make the target element available to the layer", function() {
			var element;
			var layer = function() {
					element = this.element;
				};

			$('<div id="parentElement"></div>').chart({
				layers: [layer],
				data: [
					[2, 4, 6, 8]
				]
			});

			expect(element.id).toEqual('parentElement');
		});


		it("should make the container element available to the layer", function() {
			var container;
			var layer = function() {
					container = this.container;
				};

			var target = $('<div id="parentElement"></div>').chart({
				layers: [layer],
				data: [
					[2, 4, 6, 8]
				]
			})[0];

			expect(container).toEqual(target.children[0]);
		});

		it("should wrap in a relatively-positioned div", function() {
			var element;
			var layer = function() {
					element = this.element;
				};

			var container = $('<div id="parentElement"></div>').chart({
				layers: [layer],
				data: [
					[2, 4, 6, 8]
				]
			});

			expect(container.children().first().css('position')).toEqual('relative');
		});

		it("should make the eventTarget available to the layer", function() {
			var eventTarget;
			var layer = function() {
					eventTarget = this.eventTarget;
				};

			$('<div id="parentElement"></div>').chart({
				layers: [layer],
				data: [
					[2, 4, 6, 8]
				],
				eventTarget: '#target'
			});

			expect(eventTarget).toEqual('#target');
		});

		it("should wrap one-dimensional data in an array", function() {
			var data;
			var layer = function() {
					data = this.data;
				};

			$('<div></div>').chart({
				layers: [layer],
				data: [2, 4, 6, 8]
			});

			expect(data).toEqual([
				[2, 4, 6, 8]
			]);
		});

		it("should create a grid with the right height and width", function() {
			var grid;
			$('<div style="width: 600px; height: 400px"></div>').chart({
				layers: [function() {}],
				data: [],
				Grid: function(options) {
					grid = options;
				}
			});
			expect(grid.width).toEqual(600);
			expect(grid.height).toEqual(400);
		});

		it("should set the yMaxValue to 110% of the highest value in the data", function() {
			var grid;
			$('<div></div>').chart({
				layers: [function() {}],
				data: [10, 20, 30, 40, 50],
				Grid: function(options) {
					grid = options;
					return {
						columnWidth: function() {
							console.debug(arguments.callee.caller);
						}
					};
				}
			});
			expect(grid.yMaxValue).toEqual(55);
		});

		it("should pass the yMinValue,	margins, and colors, and other options to the grid", function() {
			var grid;
			$('<div></div>').chart({

				Grid: function(options) {
					return options;
				},

				layers: [

				function() {
					grid = this.grid;
				}],

				data: [
					[10, 20, 50]
				],
				spec: {
					yMinValue: 5,
					xValues: [1, 2, 3],
					edgeToEdge: true,
					marginTop: 10,
					marginRight: 20,
					marginBottom: 30,
					marginLeft: 40
				},
				colors: ['#aaa', '#bbb'],
				fillColors: ['#111', '#222'],
				gradients: ['0-#aaa-#bbb', '0-#111-#222']

			});


			expect(grid.yMinValue).toEqual(5);
			expect(grid.xValues).toEqual([1, 2, 3]);
			expect(grid.marginTop).toEqual(10);
			expect(grid.marginRight).toEqual(20);
			expect(grid.marginBottom).toEqual(30);
			expect(grid.marginLeft).toEqual(40);
			expect(grid.marginLeft).toEqual(40);
			expect(grid.colors).toEqual(['#aaa', '#bbb']);
			expect(grid.fillColors).toEqual(['#111', '#222']);
			expect(grid.gradients).toEqual(['0-#aaa-#bbb', '0-#111-#222']);
			expect(grid.edgeToEdge).toBeTruthy();

		});

		it("should pass the columnCount to the grid", function() {
			var grid;
			$('<div></div>').chart({

				Grid: function(options) {
					return options;
				},

				layers: [

				function() {
					grid = this.grid;
				}],

				data: [
					[10, 20, 50]
				]

			});


			expect(grid.columnCount).toEqual(3);

		});


		it("should apply each layer in order", function() {
			var layers = [];
			var Layer = function(name) {
					return function() {
						layers.push(name);
					};
				};
			$('<div></div>').chart({
				layers: [Layer('one'), Layer('two'), Layer('three')]
			});
			expect(layers).toEqual(['one', 'two', 'three']);
		});

		it("should pass the options for a layer", function() {
			var args;
			var layer = function() {
					args = Array.prototype.slice.apply(arguments);
				};
			$('<div></div>').chart({
				layers: [
					[layer, 'arg1', 'arg2']
				]
			});
			expect(args).toEqual(['arg1', 'arg2']);
		});

		it("should allow a layer to call another layer", function() {
			var layers = [];

			var subLayer = function (name, index) {
				layers.push(name + index);
			};

			var Layer = function(name) {
					return function() {
						this.applyLayer(subLayer, [name, 1]);
						this.applyLayer(subLayer, [name, 2]);
					};
				};

			$('<div></div>').chart({
				layers: [Layer('A'), Layer('B'), Layer('C')]
			});
			expect(layers).toEqual(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
		});






		it("should remove each layer when the chart is removed", function() {
			var removedLayers = [];
			var Layer = function(name) {
					return function() {
						return {
							remove: function() {
								removedLayers.push(name);
							}
						};
					};
				};
			$('<div></div>').chart({
				layers: [Layer('one'), Layer('two'), Layer('three')]
			}).chart('remove');


			expect(removedLayers).toEqual(['one', 'two', 'three']);
		});


		it("should make spec available to the layer", function() {
			var spec;
			var layer = function() {
					spec = this.spec;
				};

			$('<figure></figure>').chart({
				layers: [layer],
				data: [
					[2, 4, 6, 8]
				],
				spec: { xAxisLabels: ['a','b','c','d'] }
			});

			expect(spec.xAxisLabels).toEqual(['a','b','c','d']);
		});


		describe("the paper", function() {

			var paper;
			var element = $('<div style="width: 600px; height: 400px"></div');


			beforeEach(function() {
				var layer = function() {
						paper = this.paper;
					};

				element.chart({
					layers: [layer]
				});

			});

			it("should be added to the relatively positioned wrapper inside the target element", function() {
				expect(paper.container).toEqual(element[0].children[0]);
			});

			it("should have the width and height of the target element", function() {
				expect(paper.width).toEqual(600);
				expect(paper.height).toEqual(400);
			});

		});

	});

});
