define(function () {

    // var chart = orthogonal.chart(element, spec);
    // chart.print(printer [, spec]);


    return {
        chart: function (element) {
            //var grid, data, paper, element, container;
            //var container = $('<div></div>').css('position', 'relative').appendTo(element[0])[0];

            var initialize = function (printer, spec) {
                // create the container
                // create the paper
                // store the data
                // create the grid
            };

            return {
                print: function(printer, spec) {
                    if (spec) { initialize(); }
                    // create the context, which has element, container, paper, data, grid, spec
                    // call printer.apply(context)
                },
                remove: function () {

                }
            };
        }
    };



});