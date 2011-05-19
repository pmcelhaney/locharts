

define(['js/layers', 'js/chart', './grid-spec', './money-spec'], function (builtInLayers) {

    

    describe("Chart Widget", function() {
    /*
    - yForIndex(i)
    - xForValue(v)
    - rowHeight()
    */
        var mockLayerWasCalled = false;



        window.Raphael = function (t, w, h) { 
            return { 
                target: t,
                width: w,
                height: h 
            }; 
        };

        it("should make the data available to the layer", function () {
            var data;
            var layer = function () {
                 data = this.data;
            };

            $('div').chart({
                 layers: [ layer ],
                 data: [ [2, 4, 6, 8] ]
            });
            
            expect(data).toEqual([ [2, 4, 6, 8] ]);
        });
        
        it("should make the container element available to the layer", function () {
            var element;
            var layer = function () {
                 element = this.element;
            };

            $('<div id="parentElement"></div>').chart({
                 layers: [ layer ],
                 data: [ [2, 4, 6, 8] ]
            });
            
            expect(element.id).toEqual('parentElement');
        });
        
        it("should make the eventTarget available to the layer", function () {
            var eventTarget;
            var layer = function () {
                 eventTarget = this.eventTarget;
            };

            $('<div id="parentElement"></div>').chart({
                 layers: [ layer ],
                 data: [ [2, 4, 6, 8] ],
                 eventTarget: '#target'
            });
            
            expect(eventTarget).toEqual('#target');
        });
    
        it("should wrap one-dimensional data in an array", function () {
            var data;
            var layer = function () {
                data = this.data;
            };
        
            $('<div></div>').chart({
                layers: [ layer ],
                data: [2, 4, 6, 8]
            });
        
            expect(data).toEqual([ [2, 4, 6, 8 ] ]);
        });
    
        it("should create a grid with the right height and width", function () {
            var grid;
            $('<div style="width: 600px; height: 400px"></div>').chart({
                    layers: [],
                    data: [],
                    Grid: function (options) { grid = options; }
            });      
            expect(grid.width).toEqual(600);
            expect(grid.height).toEqual(400);
        });
    
        it("should set the yMaxValue to 110% of the highest value in the data", function () {
            var grid;
            $('<div></div>').chart({
                    layers: [],
                    data: [10,20,30,40,50],
                    Grid: function (options) { grid = options; }
            });
            expect(grid.yMaxValue).toEqual(55);
        });
    
        it("should pass the yMinValue,  margins, and colors, and other options to the grid", function () {
            var grid;
            $('<div></div>').chart({
                
                Grid: function (options) { return options; },

                layers: [
                    function () {
                        grid = this.grid;
                    }
                ],
            
                data: [ [10, 20, 50] ],
                yMinValue: 5, 
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
            
          
            expect(grid.yMinValue).toEqual(5);
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
        
        it("should pass the columnCount to the grid", function () {
            var grid;
            $('<div></div>').chart({
                
                Grid: function (options) { return options; },

                layers: [
                    function () {
                        grid = this.grid;
                    }
                ],
            
                data: [ [10, 20, 50] ]
                
            });
            
          
            expect(grid.columnCount).toEqual(3);
        
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
            require('js/layers')['a built-in layer'] = function () {
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


