// js/lineChart.js
const lineData = [10, 15, 20, 25, 18, 30, 40, 45, 35, 50];

const lineWidth = 600;
const lineHeight = 400;
const lineMargin = { top: 50, right: 30, bottom: 50, left: 50 };

const lineSvg = d3.select("#line-chart")
    .append("svg")
    .attr("width", lineWidth + lineMargin.left + lineMargin.right)
    .attr("height", lineHeight + lineMargin.top + lineMargin.bottom)
    .append("g")
    .attr("transform", `translate(${lineMargin.left},${lineMargin.top})`);

const lineX = d3.scaleLinear()
    .domain([0, lineData.length - 1])
    .range([0, lineWidth]);

const lineY = d3.scaleLinear()
    .domain([0, d3.max(lineData)])
    .range([lineHeight, 0]);

const lineDefs = lineSvg.append("defs");
const lineGradient = lineDefs.append("linearGradient")
    .attr("id", "line-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

lineGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#6a5acd");

lineGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#ff6347");

const line = d3.line()
    .x((d, i) => lineX(i))
    .y(d => lineY(d));

lineSvg.append("path")
    .datum(lineData)
    .attr("class", "line")
    .attr("d", line)
    .attr("stroke", "url(#line-gradient)");

lineSvg.append("g")
    .attr("transform", `translate(0,${lineHeight})`)
    .call(d3.axisBottom(lineX).ticks(lineData.length).tickFormat(i => `Point ${i + 1}`));

lineSvg.append("g")
    .call(d3.axisLeft(lineY));

lineSvg.append("text")
    .attr("x", lineWidth / 2)
    .attr("y", -20)
    .attr("class", "title")
    .text("Line Chart");
