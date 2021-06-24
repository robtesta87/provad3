function csvJSON(csv){

  var lines=csv.split("\n");
  var result = [];

  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){

    var obj = {};
    var currentline=lines[i].split(",");
    for(var j=0;j<headers.length;j++){
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }
  console.log(result);
  return result; //JavaScript object
  //return JSON.stringify(result); //JSON
}

function JSONtoString(){
  var righe = [];
  var stringa="day,scarico,elaborazione\n";
  console.log("eccomi");
  d3.csv("https://raw.githubusercontent.com/robtesta87/provad3/master/prova.csv", function (data2) {
    for (var i = 0; i < data2.length; i++) {
      righe.push(data2[i]);
    }
    console.log("length: "+righe.length);
    
    for (var i = 0; i < righe.length; i++) {
      console.log(righe[i].day);
      if (i < righe.length - 1)
        stringa = stringa + righe[i].day + "," + righe[i].scarico + "," + righe[i].elaborazione + "\n";
      else
        stringa = stringa + righe[i].day + "," + righe[i].scarico + "," + righe[i].elaborazione;

    }
    var data= csvJSON(stringa);
    //var data=righe;

    console.log(data);
    var margin = { top: 20, right: 160, bottom: 35, left: 30 };

    var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var parse = d3.time.format("%d%m%Y").parse;


// Transpose the data into layers
var dataset = d3.layout.stack()(["scarico", "elaborazione"].map(function (fruit) {
  return data.map(function (d) {
    return { x: parse(d.day), y: +d[fruit] };
  });
}));
// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(dataset[0].map(function (d) { return d.x; }))
  .rangeRoundBands([10, width - 10], 0.02);

var y = d3.scale.linear()
  .domain([0, d3.max(dataset, function (d) { return d3.max(d, function (d) { return d.y0 + d.y; }); })])
  .range([height, 0]);

var colors = ["#d05300", "#1a5d8c"];


// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickSize(-width, 0, 0)
  .tickFormat(function (d) { return d });

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickFormat(d3.time.format("%d-%m"));

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);


// Create groups for each series, rects for each segment 
var groups = svg.selectAll("g.cost")
  .data(dataset)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function (d, i) { return colors[i]; });

var rect = groups.selectAll("rect")
  .data(function (d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function (d) { return x(d.x); })
  .attr("y", function (d) { return y(d.y0 + d.y); })
  .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
  .attr("width", x.rangeBand())
  .on("mouseover", function () { tooltip.style("display", null); })
  .on("mouseout", function () { tooltip.style("display", "none"); })
  .on("mousemove", function (d) {
    var xPosition = d3.mouse(this)[0] - 15;
    var yPosition = d3.mouse(this)[1] - 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").text(d.y);
  });


// Draw legend
var legend = svg.selectAll(".legend")
  .data(colors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function (d, i) { return "translate(30," + i * 19 + ")"; });

legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function (d, i) { return colors.slice().reverse()[i]; });

legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function (d, i) {
    switch (i) {
      case 0: return "elaborazione";
      case 1: return "scarico";
    }
  });


// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");

tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");
});

}

var stringatot= JSONtoString();

