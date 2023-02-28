var loadLineChart=(id,widths,heights,jsonData)=>{
  let data=manipulateDatejsonData(jsonData);
  console.log(data);
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 180 - margin.top - margin.bottom;
    
    // parse the date / time
    var parseTime = d3.timeParse("%H:%M:%S");
    
    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    
    // define the line
    var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });
    
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#pageViewsLineChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    // Get the data
  
    
    // format the data
    data.forEach(function(d) {
      d.date =parseTime(d.date);
      d.close = d.close;
    });
    
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);
    
    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline)
      .style("fill","none");
    
    // Add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    
    // Add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));
    
  
  
  }