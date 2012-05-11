({

    baseUrl: "./js",
    name: "almond",
    include: ["chart/chart"],
    out: "build/jquery.locharts.js",
    optimize: "none",
    wrap: {
      startFile: 'build.start.txt',
      endFile: 'build.end.txt'
    }

})