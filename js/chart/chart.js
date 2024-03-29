define([ './grid', './scraper'], function ( Grid, scraper) {

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
            templates: [],
            spec: {}
        },

        _create: function () {
            this.container = $('<div></div>').css('position', 'relative').appendTo(this.element[0])[0];
            this._applyHtml5Data();
            this.draw();
        },

        _applyHtml5Data: function () {
            var html5Data = $(this.element).data();
            var spec = this.options.spec;
            if(html5Data.values) {
                this.options.data = $('html').scrape([html5Data.values], parseFloat);
            }
            if(html5Data.labels && !this.options.spec.labels) {
                spec.labels = $('html').scrape([html5Data.labels]);
            }

            spec.marginTop = spec.marginTop || html5Data.marginTop;
            spec.marginRight = spec.marginRight || html5Data.marginRight;
            spec.marginBottom = spec.marginBottom || html5Data.marginBottom;
            spec.marginLeft = spec.marginLeft || html5Data.marginLeft;

            spec.colors = spec.colors || ['#000', '#999'];
        },

        draw: function(newData) {


            if (this.paper) { this.remove(); }

            if (newData) this.options.data = newData;

            var options = this.options;

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

            this.options.spec.eventTarget = this.options.spec.eventTarget || this.element[0];
            var layerContext = {
                grid: grid,
                data: data,
                paper: this.paper,
                element: this.element[0],
                container: this.container,
                spec: this.options.spec,
                print: function (layer, args) { layer.apply(this, args ); }
            };

            this.layer = options.template.apply(layerContext);

        },


        _setOption: function(key, value) {
            $.Widget.prototype._setOption.apply(this,arguments);
        },

        remove: function () {

            if (this.layer.remove) {
                this.layer.remove();
            }

            this.paper.remove();
            delete this.paper;
        },


        destroy: function() {

          //delete this.paper;
          $.Widget.prototype.destroy.call(this);
        }


      });

});