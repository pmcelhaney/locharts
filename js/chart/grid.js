define(['./gridlines'], function (gridLines) {

    var RADIAN = Math.PI / 180;


    /**
     * @param {object} options A group of options that config this particular instance of a grid
     * @returns {object} The grid object
     */
    return function (options) {

        options = options || {};
        var marginLeft = options.marginLeft || 0;
        var marginRight = options.marginRight || 0;
        var marginTop = options.marginTop || 0;
        var marginBottom = options.marginBottom || 0;
        var columnCount = options.columnCount || 1;
        var edgeToEdge = options.edgeToEdge || options.xValues;
        var xValues = options.xValues;
        var width = ( options.width || 960 ) - marginLeft - marginRight;
        var height = ( options.height || 960 ) - marginBottom - marginTop;
        var yValuesForGridLines = gridLines(options.yMinValue || 0, options.yMaxValue || 1);
        var yMinValue = yValuesForGridLines[0];
        var yMaxValue = yValuesForGridLines.slice(-1)[0];

        return {

            /**
             * @param {number} i
             * @returns {number}
             */
            xForIndex: function (i) {
                var min, max;
                if (xValues) {
                    min = Math.min.apply(null, xValues);
                    max = Math.max.apply(null, xValues);
                    return Math.round( this.xForLeftEdge() + (xValues[i] - min) * ( width / (max - min) ) );
                } else if (edgeToEdge) {
                    return Math.round( i * width/(columnCount-1) + marginLeft );
                } else {
                    return Math.round( ( i+0.5 ) * width/(columnCount) + marginLeft );
                }
            },

            /**
             * @param {number} x
             * @returns {number}
             */
            indexForX: function (x) {
                var ratio =  (x - this.xForLeftEdge()) / width;

                if (xValues) {
                    var i = 0;
                    var min = 0;
                    for (i = 0; i < xValues.length; i++) {
                        if ( this.xForIndex(i) == x) {
                            return i;
                        }
                        if ( this.xForIndex(i) > x) {
                            return ( i > 0 && this.xForIndex(i) - x > x - this.xForIndex(i-1) ) ? i-1 : i;
                        }
                    }
                    return xValues.length - 1;
                }
                else if (edgeToEdge) {
                    return Math.round( ratio * (columnCount-1) );
                } else {
                    return Math.min( Math.round( ratio * (columnCount) - 0.5 ), columnCount - 1);
                }
            },

            /**
             * @param {number} value
             * @returns {number}
             */
            yForValue: function (value) {
                if (isNaN(value)) return 0;
                return Math.round( this.yForBottomEdge() - (value - yMinValue) * ( height / (yMaxValue - yMinValue) ) );
            },

            yValuesForGridLines: function () {
                return yValuesForGridLines;
            },

            /**
             * @returns {number}
             */
            xForLeftEdge: function () {
                return marginLeft;
            },

            /**
             * @returns {number}
             */
            xForRightEdge: function () {
                return marginLeft + width;
            },

            /**
             * @returns {number}
             */
            yForTopEdge: function () {
                return marginTop;
            },

            /**
             * @returns {number}
             */
            yForBottomEdge: function () {
                return marginTop + height;
            },

            /**
             * @returns {number}
             */
            columnWidth: function () {
                return width / columnCount;
            },

            /**
             * @returns {number}
             */
            width: function () {
                return width;
            },

            /**
             * @returns {number}
             */
            outerWidth: function () {
                return options.width;
            },

            /**
             * @returns {number}
             */
            height: function () {
                return height;
            },

            /**
             * @returns {number}
             */
            outerHeight: function () {
                return options.height;
            },

            /**
             * @returns {number}
             */
            yMinValue: function () {
                return yMinValue;
            },

            /**
             * @returns {number}
             */
            yMaxValue: function () {
                return yMaxValue;
            },

            /**
             * @returns {number} The vertical (y-axis) midpoint of the grid
             */
            yMidpoint: function () {
                return Math.ceil(height / 2);
            },

            /**
             * @returns {number}
             */
            xMinValue: function () {
                return xMinValue;
            },

            /**
             * @returns {number}
             */
            xMaxValue: function () {
                return xMaxValue;
            },
            /**
             * @returns {number} The horizontal (x-axis) midpoint of the grid
             */
            xMidpoint: function () {
                return Math.ceil(width / 2);
            },

            /**
             * Calculates and returns the set of coordinates for each end of an arc (a pie piece sector)
             * @param {number} cx Center x-coordinate of the circle that serves as origin of the radius
             * @param {number} cy Center y-coordinate of the circle that serves as origin of the radius
             * @param {number} r radius
             * @param {number} startAngle Angle in degrees
             * @param {number} endAngle Angle in degrees
             * @returns {object} Two sets of coordinates
             */
            sectorCoordinates: function (cx, cy, r, startAngle, endAngle) {
                var x1 = cx + r * Math.cos(-startAngle * RADIAN),
                    x2 = cx + r * Math.cos(-endAngle * RADIAN),
                    y1 = cy + r * Math.sin(-startAngle * RADIAN),
                    y2 = cy + r * Math.sin(-endAngle * RADIAN);

                return {
                    'x1': x1,
                    'y1': y1,
                    'x2': x2,
                    'y2': y2
                };
            }

        };
    };
});



