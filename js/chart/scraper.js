/*global define*/

define(function () {
    $.fn.scrape  =  function (template, customFilter) {
        return scrape(this, template, customFilter || function (val) { return val; });
    };

    var scrape = function (context, template, filter) {

        if (typeof template === "string") {
            return filter( $(context).find(template).text() );
        }

        if ($.isArray(template)) {
            return scrapeArray(context, template, filter);
        }

        if (typeof template === 'object') {
            return scrapeMap(context, template, filter);
        }
    };

    var scrapeArray = function (context, template, filter) {
        if (template.length === 1) {
            return scrapeValues(context, template[0], filter);
        } else {
            var result = [];
            $(context).find(template[0]).map(function () {
                if (typeof template[1] === 'string') {
                    result.push(scrape(this, template.slice(1), filter));
                } else {
                    result.push(scrape(this, template[1], filter ));
                }
            });
            return result;
        }
    };

    var scrapeMap = function(context, template, filter) {
        var obj = {};
        $.each(template, function(key, selector) { obj[key] = scrape(context, selector, filter);  });
        return obj;
    };

    var scrapeValues = function (context, selector, filter) {
        return $(context).find(selector).map( function () { return filter ( $(this).text() ); } ).toArray();
    };
});