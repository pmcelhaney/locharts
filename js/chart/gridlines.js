define(function () {

    var log10 = function (val) {
      return Math.log(val) / Math.log(10);
    };

    var scale = function(domain) {
       return Math.pow(10, Math.ceil(log10(domain)));
    };

    var fractions = function (scale) {
        return [scale / 2, scale / 4, scale / 5, scale / 10, scale / 20, scale / 40, scale / 50, scale / 100, scale / 200, scale / 400, scale / 500];
    };


    var steps = function (increment, start, end) {
        var result = [];

        var x = start;
        while (x <= end) {
            result.push(x);
            x+= increment;
        }
        return result;
    };

    return function(min, max, minGridLines) {
        var i = 0;
        var domain = max - min;
        minGridLines = minGridLines || 4;
        var minUsedRatio = 0.8;
        var f = fractions(scale(domain));

        var result = [];
        for (i = 0; i < f.length; i++) {
            var snappedMin = +(min - (min % f[i])).toPrecision(10);
            var snappedMax = +(max - (max % f[i] || f[i]) + f[i]).toPrecision(10);
            var snappedDomain = snappedMax - snappedMin;

            if (snappedDomain / f[i] >= (minGridLines-1) && domain / snappedDomain  >= minUsedRatio) {
                return steps(f[i], snappedMin, snappedMax);
            }
        }
    };

});