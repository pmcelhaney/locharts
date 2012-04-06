Change "layers" to "printers".

A printer will be called in the context of a chart object that has:

- paper
- grid
- element
- spec
- print(printer[, spec])
- helper functions
- other stuff that's part of layerContext now

Rename "meta" to "spec" and make data part of spec.

Basically, a printer will know how to print a layer given a spec.

this.print(printer[, spec]) can be used to call another printer. The optional spec argument would cause
the existing spec to be extended.

Kicking off a chart would look something like this:

    chart = orthoganal.chart('#my-bar-chart', { data: [1,2,3], labels:['a','b','c']});
    chart.print(barChart);

This is the symmetry I was seeking.  The chart object is the context in which printers are called.

