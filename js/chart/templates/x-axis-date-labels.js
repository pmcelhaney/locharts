define(function () {

    return function () {
        var paper = this.paper;
        var grid = this.grid;
        var i;
        var index;
        var element = this.element;
        var howMany = this.data[0].length % 2 ? 5 : 4;

        var formatDate = function(d) {
            return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
        };

        for (i=0; i<howMany; i++) {
            index = Math.floor((i + 0.5) * this.data[0].length / howMany);
            $('<span class="x-axis-label">' + formatDate(this.data[0][index].date) + '</span>').css({ position: 'absolute', left: grid.xForIndex(index) - 50, top: grid.yForBottomEdge() + 5, width: '100px' }).appendTo(this.container);
        }

        return {
            remove: function () {
                $(element).find('.x-axis-label').remove();
            }
        };
    };

});


