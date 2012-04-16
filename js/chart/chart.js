define(['./orthogonal', './grid'], function (orthogonal, Grid) {

    var dataMax = function (data) {

        if (data === undefined) {
            return 0;
        }

        var i;
        var result = 0;
        var datum;

        for( i=0; i < data.length; i++ ) {
            datum = data[i];
            result = Math.max(result, $.isArray(datum) ? dataMax(datum) : datum);
        }

        return result;

    };

      $.widget("ally.chart", {
        options: {
            layers: [],
            spec: {}
        },

        _create: function () {
            this.container = $('<div></div>').css('position', 'relative').appendTo(this.element[0])[0];
            this.chart = orthogonal.chart(this.container);
            this.draw();
        },
        draw: function(newData) {


            if (this.paper) { this.remove(); }

            if (newData) this.options.data = newData;

            var options = this.options;
            if (options.layers.length === 0 ) {
                options.layers = ['borders','y-axis markers', 'bars','values above points'];
            }

            if ( $.isFunction(options.data) ) {
                options.data = options.data();
            }
            var data = ( options.data && $.isArray( options.data[0] ) ) ? options.data : [options.data];

            var grid = (options.Grid || Grid)( {
                width: this.element.width(),
                height: this.element.height(),
                yMinValue: options.spec.yMinValue,
                yMaxValue: options.spec.yMaxValue || Math.round( dataMax(options.data) * 1.1 ),
                marginTop: options.spec.marginTop,
                marginRight: options.spec.marginRight,
                marginBottom: options.spec.marginBottom,
                marginLeft: options.spec.marginLeft,
                edgeToEdge: options.spec.edgeToEdge,
                xValues: options.spec.xValues,
                columnCount: data && data[0] ? data[0].length : undefined
            });

            this.paper = Raphael(this.container, this.element.width(), this.element.height());

            var layers = this.layers = [];

            this.options.spec.eventTarget = this.options.spec.eventTarget || this.element[0];
            var layerContext = {
                grid: grid,
                data: data,
                paper: this.paper,
                element: this.element[0],
                container: this.container,
                spec: this.options.spec,
                applyLayer: function (layer, args) { layer.apply(this, args ); }
            };

            $.each(options.layers, function () {
                var layer = this;
                var layerFunc;
                var args = [];

                if ( $.isArray(this) ) {
                    layer = this[0];
                    args = this.slice(1);
                }


                if ( $.isFunction(layer) ) {
                    layers.push ( layer.apply(layerContext, args) );
                }
            });


        },


        _setOption: function(key, value) {
            $.Widget.prototype._setOption.apply(this,arguments);
        },

        remove: function () {

            $(this.layers).each(function () {
                if ( this.remove ) {
                    this.remove();
                }
            });

            this.paper.remove();
            delete this.paper;
        },


        destroy: function() {

          //delete this.paper;
          $.Widget.prototype.destroy.call(this);
        }


      });

});