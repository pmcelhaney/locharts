
define("grid", function () {
    return function (options) {
        return options;
    };
});

define("layers", function () {
    return {};
});

define(['js/chart', './grid-spec'], function () {

    describe("Chart Widget", function() {
    /*
    - yForIndex(i)
    - xForValue(v)
    - rowHeight()
    - xLabelForIndex(i)
    */
        var mockLayerWasCalled = false;
        var grid;
        var data;
    
        var mockLayer = function () {
            data = this.data;
            grid = this.grid;
            mockLayerWasCalled = true;
        };

        window.Raphael = function (t, w, h) { 
            return { 
                target: t,
                width: w,
                height: h 
            }; 
        };


        beforeEach(function () {
  
            $('<div id="testDiv" style="width: 600px; height:400px;"></div>').chart({
                layers: [mockLayer],
                data: [ [10, 20, 50] ],
                yMinValue: 5, 
                xLabels: ['Jan', 'Feb', 'Mar'],
                xValues: [1,2,3],
                marginTop: 10,
                marginRight: 20,
                marginBottom: 30,
                marginLeft: 40,
                colors: ['#aaa', '#bbb'],
                fillColors: ['#111', '#222'],
                gradients: ['0-#aaa-#bbb', '0-#111-#222'],
                edgeToEdge: true
            });

        });
    
    
    
        it("should call the mock layer", function () {
            expect(mockLayerWasCalled).toBe(true);
        });
    
        it("should make the data available to the layer", function () {
            expect(data).toEqual([ [10, 20, 50] ]);
        });
    
        it("should wrap one-dimensional data in an array", function () {
            var data;
            var layer = function () {
                data = this.data;
            };
        
            $('<div></div>').chart({
                layers: [ [layer] ],
                data: [2, 4, 6, 8]
            });
        
            expect(data).toEqual([ [2, 4, 6, 8 ] ]);
        });
    
        it("should create a grid with the right height and width", function () {
            expect(grid.width).toEqual(600);
            expect(grid.height).toEqual(400);
        });
    
        it("should set the yMaxValue to 110% of the highest value in the data", function () {
            expect(grid.yMaxValue).toEqual(55);
        });
    
        it("should pass the yMinValue, xLabels, margins, and colors to the grid", function () {
            expect(grid.yMinValue).toEqual(5);
            expect(grid.xLabels).toEqual(['Jan', 'Feb', 'Mar']);
            expect(grid.xValues).toEqual([1,2,3]);
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
    
        it("should apply each layer in order", function () {
            var layers = [];
            var Layer = function (name) {
                return function () {
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
            var layer = function () {
                args = Array.prototype.slice.apply(arguments);
            };
            $('<div></div>').chart({
                layers: [ [layer, 'arg1', 'arg2'] ]
            });
            expect(args).toEqual(['arg1', 'arg2']);
        });
    
        it("should recognize a built-in layer and skip a missing layer", function() {
            require('layers')['a built-in layer'] = function () {
                args = Array.prototype.slice.apply(arguments);
            };
        
            $('<div></div>').chart({
                layers: [ 'a built-in layer', 'a missing layer', ['a built-in layer', 'foo', 'bar'] ]
            });
        
            expect(args).toEqual(['foo', 'bar']);
        });
    
    
        describe("the paper", function () {
        
            var paper;
            var element = $('<div style="width: 600px; height: 400px"></div');
        
        
            beforeEach(function () {
                var layer = function () {
                    paper = this.paper;
                };
            
                element.chart({
                    layers: [ layer ]
                });
            
            });
        
            it("should be added to the target element", function() {
                expect(paper.target).toEqual(element[0]);
            });
    
            it("should have the width and height of the target element", function () {
                expect(paper.width).toEqual(600);
                expect(paper.height).toEqual(400);
            });
    
        });
    
    });

});


