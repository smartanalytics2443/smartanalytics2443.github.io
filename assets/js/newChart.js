// const margin = {top: 10, right: 20, bottom: 30, left: 50},
//     width = 500 - margin.left - margin.right,
//     height = 420 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// const svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

//      var parseTime = d3.timeParse("%H:%M:%S");
//     var x = d3.scaleTime().range([0, width]);
//     var xAxis = d3.axisBottom().scale(x);
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .attr("class","myXaxis")
  
  
//     var y = d3.scaleLinear().range([height, 0]);
//     var yAxis = d3.axisLeft().scale(y);
//   svg.append("g")
//     .attr("class","myYaxis")
    
// //Read the data
// d3.csv("data_TreeMap.csv").then( function(data) {

//   data.forEach(function(d) {
//     d.date =parseTime(d.date);
//     d.close = d.close;
//   });
//   // Add X axis
//   x.domain(d3.extent(data, function(d) { return d.date }) );
//     svg.selectAll(".myXaxis").transition()
//       .duration(3000)
//       .call(xAxis);
  
//     // create the Y axis
//     y.domain([0, d3.max(data, function(d) { return d.close  }) ]);
//     svg.selectAll(".myYaxis")
//       .transition()
//       .duration(3000)
//       .call(yAxis);

//   // Add a scale for bubble size
//   // const z = d3.scaleLinear()
//   //   .domain([200000, 1310000000])
//   //   .range([ 1, 40]);

//   // Add dots
//   svg.append('g')
//     .selectAll("dot")
//     .data(data)
//     .join("circle")
//       .attr("cx", d => x(d.date))
//       .attr("cy", d => y(d.close))
//       .style("fill", "#69b3a2")
//       .style("opacity", "0.7")
//       .attr("stroke", "black")

// })

const xValue = d => d.date;
const xLabel = 'Time';
const yValue = d => d.close;
const yLabel = 'Temperature';
const margin = { left: 120, right: 30, top: 20, bottom: 120 };

const svg = d3.select('svg');
const width = svg.attr('width');
const height = svg.attr('height');
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
const xAxisG = g.append('g')
    .attr('transform', `translate(0, ${innerHeight})`);
const yAxisG = g.append('g');

xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', 100)
    .text(xLabel);

yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', -innerHeight / 2)
    .attr('y', -60)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabel);

const xScale = d3.scaleTime().range([0, width]);
const yScale = d3.scaleLinear().range([height, 0]);;

const xAxis = d3.axisBottom()
  .scale(xScale)
  .tickPadding(15)
  .tickSize(-innerHeight);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(5)
  .tickPadding(15)
  .tickSize(-innerWidth);

  const row = d => {
    d.timestamp = new Date(d.timestamp);
    d.temperature = +d.temperature;
    return d;
  };

d3.csv('data_TreeMap.csv').then( function(data) {
  data.forEach(function(d) {
        d.date =new Date(d.date);
        d.close = +d.close;
      });
      console.log(data);
  xScale
    .domain(d3.extent(data,function(d) { return d.date }))
    .range([0, innerWidth])
    .nice();

  yScale
    .domain(d3.extent(data, function(d) { return d.close }))
    .range([innerHeight, 0])
    .nice();

  g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cx', d => xScale(xValue(d)))
      .attr('cy', d => yScale(yValue(d)))
      .attr('fill-opacity', 0.6)
      .attr('r', 8);

  xAxisG.call(xAxis);
  yAxisG.call(yAxis);
});