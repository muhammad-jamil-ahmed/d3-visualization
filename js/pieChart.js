// js/pieChart.js
const pieData = [10, 20, 30, 40];

const pieWidth = 400;
const pieHeight = 400;
const pieRadius = Math.min(pieWidth, pieHeight) / 2;

const pieSvg = d3.select("#pie-chart")
    .append("svg")
    .attr("width", pieWidth)
    .attr("height", pieHeight + 120)  
    .append("g")
    .attr("transform", `translate(${pieWidth / 2},${(pieHeight / 2) + 60})`); 

const pieColor = d3.scaleOrdinal()
    .domain(pieData)
    .range(["#6a5acd", "#ff6347", "#ffd700", "#48d1cc"]);

const pieGenerator = d3.pie()
    .sort(null)
    .value(d => d);

const pieArc = d3.arc()
    .innerRadius(0)
    .outerRadius(pieRadius);

const pieArcs = pieSvg.selectAll(".pieArc")
    .data(pieGenerator(pieData))
    .enter().append("g")
    .attr("class", "pieArc");

pieArcs.append("path")
    .attr("d", pieArc)
    .attr("fill", d => pieColor(d.data));

pieArcs.append("text")
    .attr("transform", d => `translate(${pieArc.centroid(d)})`)
    .attr("dy", "0.35em")
    .attr("class", "label")
    .text(d => `${d.data}%`);

d3.select("#pie-chart svg")
    .append("text")
    .attr("x", pieWidth / 2)
    .attr("y", 30)  
    .attr("text-anchor", "middle")
    .attr("class", "title")
    .text("Pie Chart");
