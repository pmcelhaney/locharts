define(function () {

    return function () {
        var paper = this.paper;
        var grid = this.grid;
        var data = this.data;
        var eventTarget = this.spec.eventTarget;
        var container = this.container;
        var containerOffsetLeft;
        var oldColumnIndex; //= data.slice(-1)[0].length-1;  <-- Can't remember why I did this; it might be necessary for IE7.

        $('<div></div>')
            .css({'background-color': '#fff', opacity: 0, width: grid.width(), height: grid.height(), position: 'absolute', top: grid.yForTopEdge(), left: grid.xForLeftEdge()})
            .mousemove(function (e) {
                if (containerOffsetLeft === undefined) {
                    containerOffsetLeft = $(container).offset().left;
                }
                newColumnIndex = grid.indexForX(e.pageX - containerOffsetLeft);
                if (newColumnIndex !== oldColumnIndex) {


                    $(eventTarget).trigger('focusDatum.chart', [newColumnIndex, data.slice(-1)[0][newColumnIndex]]);

                    if (oldColumnIndex !== undefined) {
                       $(eventTarget).trigger('blurDatum.chart', [oldColumnIndex, data.slice(-1)[0][oldColumnIndex]]);

                    }

                    oldColumnIndex = newColumnIndex;
                }
            })
            .appendTo(container);


        var lastX = 0;
        $(data[data.length-1]).each(function (i, datum) {
            var thisX = grid.xForIndex(i);
            var leftX = thisX - (thisX - lastX) / 2;
            var rightX = thisX + ( ( grid.xForIndex(i+1) || grid.outerWidth() ) - thisX ) / 2;
            lastX = thisX;
        });


    };

});