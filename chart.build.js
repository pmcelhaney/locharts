({

    baseUrl: "./js",
    name: "almond",
    include: ["chart"],
    out: "build/ally.chart.js",
    optimize: "none",
    wrap: {
      start: '/* Ally Charts - version $version */\n\n(function(){',
      end: '}());'
    }
})