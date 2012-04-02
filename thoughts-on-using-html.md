# Should Locharts use HTML?

I've experimented with the idea of adding textual content as HTML and found a pretty flexible way to do it. Each label is wrapped in a 0x0 div that's absolutely positioned in the general area where the label is expected to go. A label marking a point can be anchored above the point (bottom: 0), below the point (top: 0), to the left (right: 0), or to the right (left: 0).

I could create layers for "HTML at points", "HTML at x-axis", and "HTML at y axis", which should provide the ability to put points wherever I need. A formatter function provided as an argument would specify exactly what markup to write.

## There are two main advanatages to using HTML in this way.

### A flexible system for creating various types of labels.

Most labels on most charts could be created this way. The keyword is *most* and that's what scares me. For example, the Raise Your Rate chart has logic to make sure a label doesn't bump against the boundary of the chart, and that's not possible without very specialized code. I don't want a simple solution that works for 80% of cases. It will be hard to recognize when I'm in the 20% and need to do something more custom.

### Familiar HTML and CSS

Basing parts of the charting framework on HTML and CSS is seductive. In theory, it would allow more people to play with it and make minor changes. But it may not be good for people to be messing with charts if they only understand how some parts of the charts work. If you want to hack charts, you need to learn Raphael.

## Extension over Configuration

My spidey-senses are tellng me that I need to work hard to make clean, simple abstractions at the highest level. Configuration details need to be pushed down into layers. If that means creating lots of one-time-use layers, so be it.

### Composition

I need to get working on composing layers. If I have to cut and paste a layer to make a very similiar layer, there should be a way factor out the commonailities into a base layer to avoid duplication.

Also, there should be a way to create a layer that simply combines several other layers. Each chart type could be defined as a layer that rolls up all of the sublayers that the chart uses. That's pushing the details down and leading to...

### The Ultimate Goal

    <figure class="lochart" data-layers="ryr" data-source="#table"></figure>

It would be awesome if the above code was all that's needed to drop in a "raise-your-rate" chart. The framework would know to get data from the table, and add a "ryr" layer, which in turn would pull in all of the layers that compose that chart.


