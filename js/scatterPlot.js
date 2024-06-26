// js/scatterPlot.js
const scatterData = [
    { x: 10, y: 20 },
    { x: 40, y: 90 },
    { x: 80, y: 50 },
    { x: 160, y: 70 },
    { x: 200, y: 30 },
];

const scatterWidth = 500;
const scatterHeight = 300;
const scatterMargin = { top: 50, right: 30, bottom: 50, left: 50 };

const scatterSvg = d3.select("#scatter-plot")
    .append("svg")
    .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
    .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
    .append("g")
    .attr("transform", `translate(${scatterMargin.left},${scatterMargin.top})`);

const scatterX = d3.scaleLinear()
    .domain([0, d3.max(scatterData, d => d.x)])
    .range([0, scatterWidth]);

const scatterY = d3.scaleLinear()
    .domain([0, d3.max(scatterData, d => d.y)])
    .range([scatterHeight, 0]);

scatterSvg.selectAll("circle")
    .data(scatterData)
    .enter().append("circle")
    .attr("cx", d => scatterX(d.x))
    .attr("cy", d => scatterY(d.y))
    .attr("r", 7)
    .attr("fill", "#4682b4");

scatterSvg.append("g")
    .attr("transform", `translate(0,${scatterHeight})`)
    .call(d3.axisBottom(scatterX));

scatterSvg.append("g")
    .call(d3.axisLeft(scatterY));

scatterSvg.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -20)
    .attr("class", "title")
    .text("Scatter Plot");
