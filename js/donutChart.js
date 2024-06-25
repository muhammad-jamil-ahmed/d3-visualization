// js/donutChart.js
const donutData = [10, 20, 30, 40];

const donutWidth = 400;
const donutHeight = 400;
const donutRadius = Math.min(donutWidth, donutHeight) / 2;
const innerRadius = donutRadius - 100;  
const donutSvg = d3.select("#donut-chart")
    .append("svg")
    .attr("width", donutWidth)
    .attr("height", donutHeight)
    .append("g")
    .attr("transform", `translate(${donutWidth / 2},${donutHeight / 2})`);

const donutColor = d3.scaleOrdinal()
    .domain(donutData)
    .range(["#6a5acd", "#ff6347", "#ffd700", "#48d1cc"]);

const pie = d3.pie()
    .sort(null)
    .value(d => d);

const arc = d3.arc()
    .innerRadius(innerRadius)  
    .outerRadius(donutRadius);

const arcs = donutSvg.selectAll(".arc")
    .data(pie(donutData))
    .enter().append("g")
    .attr("class", "arc");

arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => donutColor(d.data));

arcs.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("dy", "0.35em")
    .attr("class", "label")
    .text(d => `${d.data}%`);

// Add title
donutSvg.append("text")
    
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .text("Donut Chart");
