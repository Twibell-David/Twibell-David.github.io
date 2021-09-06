
window.onload = function() {
    img = {};

    img.ac = $("#airplane");
    img.cg = $("#cg");
    img.stick_parent = $("#stick-parent");
    img.stick = $("#stick");

    elevator = $('#elevator')
    throttle = $('#throttle')

    pos_ac = {x: 100, y: 100};
    img.ac.css({position: "absolute", left: pos_ac.x + "px", top: pos_ac.y + "px"});
    img.cg.css({position: "absolute", left: pos_ac.x + 331 + "px", top: pos_ac.y + 83 + "px"});
    img.stick_parent.css({position: "absolute", left: pos_ac.x + 417 + "px", top: pos_ac.y + 90 + "px"})
    img.stick.css({position: "absolute"})

    elevator.css({position: "absolute", left: 10, top: 10});
    throttle.css({position: "absolute", left: 200, top: 10});

    img.ac.css("z-index", 0);
    img.cg.css("z-index", 1);
    img.stick.css("z-index", 1);
    throttle.css("z-index",1000);

    img.ac.css("transition", "transform 0.1s");
    img.stick_parent.css("transition", "transform 0.1s");
    img.stick.css("transition", "transform 0.1s");

    img.ac.css("transform-origin", "348px 100px");
    img.stick_parent.css("transform-origin", "-69px 10px");
    img.stick.css("transform-origin", "11px 40.5px");

    elevator_update = function() {
        val = elevator[0].value;
        img.ac.css("transform", "rotate("+(val*50-25)+"deg)");
        img.stick_parent.css("transform", "rotate("+(val*50-25)+"deg)");
        img.stick.css("transform", "rotate("+(val*30-15)+"deg)");
    }
    elevator_update();
    elevator.on('input', elevator_update);

    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

      // When reading the csv, I must format variables:
      function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
      },

      // Now I can use this dataset:
      function(data) {

        // Add X axis --> it is a date format
        var x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { return d.date; }))
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return +d.value; })])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
            )

    })

};