define(function () {

    var roundRobin = function ( a, i ) {
        return a[ i % a.length ];
    };

    return function () {
        var grid = this.grid;
        var data = this.data;
        var width = 130;
        var height = 40;
        var colors = this.spec.colors;
        var labels = this.spec.labels;


        var textPosition = function (i, datum) {
            return {
                left: grid.xForIndex(i) - width / 2 + 0.5,
                top: grid.yForValue(datum) - height - 20.5
            };
        };

        textContent = this.spec.bubbleFormatter || function (i, value) {
            return (labels ? labels[i] + ': ' : '') + value.toString();
        };

        var text = $('<div id="text"></div>')
            .appendTo(this.container)
            .css({ border: '2px solid ' + colors[0], 'border-radius': '5px', background: '#fff', width: width-10, height: height-10, padding: '5px', position: 'absolute', top: textPosition(0, data[0][0]).top, left: textPosition(0,  data[0][0]).left, 'font-size': '10px' })
            .html(textContent(0, data[0][0]));


        $(this.spec.eventTarget).bind('focusDatum.chart', function (event, index, datum) {
            text.animate( textPosition(index, datum), 200, "linear", function () {
                 $(this).css('border-color', roundRobin(colors, index));
                 $(this).html(textContent(index, datum));
            });
        });
    };

});