define(function () {

    // var chart = orthogonal.chart(element[, gridFactory]);
    // chart.print(data[, spec]);


    return {
        chart: function (element) {
            //var grid, data, paper, element, container;
            //var container = $('<div></div>').css('position', 'relative').appendTo(element[0])[0];

            var initialize = function (data, spec) {
                // create the container
                // create the paper
                // store the data
                // create the grid
            };

            return {
                print: function(printer, data, spec) {
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