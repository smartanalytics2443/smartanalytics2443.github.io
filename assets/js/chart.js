//charts
document.getElementById('clientInfo').innerHTML=config.client;
var loadBarChart=(id,widths,heights,jsonData)=>{

 

  let box = document.querySelector('.pageViewCard');
  widths=box.offsetWidth-30;
  let dimensions={
        width:widths,
        height:heights,
        id:id,
        margin:{left:30,right:10,bottom:20,top:10}
    }

   

 // set the dimensions and margins of the graph
     let width=dimensions.width-dimensions.margin.left-dimensions.margin.right;
     let height=dimensions.height-dimensions.margin.top-dimensions.margin.bottom;
 
 // append the svg object to the body of the page
 const svg = d3.select("#pageViewsBarChart")
     .append("svg")
     .attr("width", dimensions.width)
     .attr("height", dimensions.height)
     .append("g")
     .attr("transform", `translate(${dimensions.margin.left},${dimensions.margin.top})`);

    
 const xAxisG = svg.append('g')
     .attr('transform',  `translate(${dimensions.margin.left},${dimensions.margin.top})`);
 const yAxisG = svg.append('g');
 
 xAxisG.append('text')
     .attr('class', 'axis-label')
     .attr('y',0)
     .attr('x', 0)
     .text("Time");
 
 yAxisG.append('text')
     .attr('class', 'axis-label')
     .attr('transform', `rotate(-90)`)
     .attr('y', 0)
     .attr('x',-90)
     
     .text("Page Views");

// Initialize the X axis
const x = d3.scaleTime().range([0, dimensions.width]);
var xAxis = d3.axisBottom().scale(x).tickPadding(15)
.tickSize(-height);;
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class","myXaxis")

  

const y = d3.scaleLinear().range([height, 0]);
const yAxis = d3.axisLeft().scale(y);
svg.append("g")
  .attr("class","myYaxis")



// A function that create / update the plot for a given variable:
function updateBarChart(jsonData) {
    let data= manipulateNamejsonData(jsonData);
    data.forEach(function(d) {
      d.date =new Date(d.date);
      d.close = +d.close;
    });
    
     console.log(data);
  // Update the X axis
  x.domain(d3.extent(data, function(d) { return d.date }) );
  svg.selectAll(".myXaxis").transition()
    .duration(3000)
    .call(xAxis);

    
  // Update the Y axis
  y.domain([0, d3.max(data, d => d.val) ]);

  // Create the u variable

  svg.selectAll(".dot")
  .data(data)
  .enter()
  .append("circle")
    .attr("class", "dot")
    // .attr("r", 
    //   function(d) {
    //     return (4 + (d.TotalEnrollment * .0006));
    //   })//gave it a base 3.4 plus a proportional amount to the enrollment
    .attr("cx", 
      function(d) {
        return x(d.date);
      })
      .attr("r",8)
    .attr("cy", 
      function(d) {
        return y(d.val);
      })

// xAxisG.call(xAxis);
// yAxisG.call(yAxis);
}

// Initialize the plot with the first dataset
updateBarChart(jsonData);

return {
    updateBarChart: updateBarChart
};
}

var loadLineChart=(id,widths,heights,jsonData)=>{
  // console.log(jsonData);
  let box = document.querySelector('.lineViewCard');
  widths=box.offsetWidth-30;
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 10, bottom: 20, left: 30},
  width = widths - margin.left - margin.right,
  height = heights - margin.top - margin.bottom;
  
  // parse the date / time
  var parseTime = d3.timeParse("%H:%M:%S");
  
  var svg = d3.select(id).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var xAxis = d3.axisBottom().scale(x);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class","myXaxis")


  var y = d3.scaleLinear().range([height, 0]);
  var yAxis = d3.axisLeft().scale(y);
svg.append("g")
  .attr("class","myYaxis")
  

  function updateLineChart(jsonData) {
// console.log(jsonData);
    let data=manipulateDatejsonData(jsonData);
    // console.log(data);
  // format the data
  data.forEach(function(d) {
    d.date =parseTime(d.date);
    d.close = d.close;
  });

  // console.log(data);

    // Create the X axis:
    x.domain(d3.extent(data, function(d) { return d.date }) );
    svg.selectAll(".myXaxis").transition()
      .duration(3000)
      .call(xAxis);
  
    // create the Y axis
    y.domain([0, d3.max(data, function(d) { return d.close  }) ]);
    svg.selectAll(".myYaxis")
      .transition()
      .duration(3000)
      .call(yAxis);
  
    // Create a update selection: bind to the new data
    var u = svg.selectAll(".lineTest")
      .data([data], function(d){ return d.date });
  
    // Updata the line
    u
      .enter()
      .append("path")
      .attr("class","lineTest")
      .merge(u)
      .transition()
      .duration(3000)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); }))
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 2.5)
  }

  updateLineChart(jsonData);
  
  return {
    updateLineChart: updateLineChart
};

}

var loadlocationBarChart=(id,widths,heights,jsonData)=>{
  let box = document.querySelector('.locationViewCard');
  widths=box.offsetWidth-30;
    let dimensions={
        width:widths,
        height:heights,
        id:id,
        margin:{left:80,right:20,bottom:30,top:10}
    }

   

 // set the dimensions and margins of the graph
     let width=dimensions.width-dimensions.margin.left-dimensions.margin.right;
     let height=dimensions.height-dimensions.margin.top-dimensions.margin.bottom;
 
 // append the svg object to the body of the page
 const svg = d3.select(id)
     .append("svg")
     .attr("width", dimensions.width)
     .attr("height", dimensions.height)
     .append("g")
     .attr("transform", `translate(${dimensions.margin.left},${dimensions.margin.top})`);

  
  
  // Add X axis
  var x = d3.scaleLinear()
  .range([ 0, width]);

  const xAxis =  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  

  
  // Y axis
  var y = d3.scaleBand()
  .range([ 0, height ])
  .padding(.1);
  const yAxis =  svg.append("g")


  function updateLocationBarChart(jsonData)
  {
    
    let data=manipulateLocationjsonData(jsonData);
    // console.log(data);

    
  // Update the X axis
  
  
  x.domain([0, d3.max(data, d => d.val) ])
  xAxis.call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

 // Update the Y axis
 y.domain(data.map(function(d) { return d.name; }));

 yAxis.transition().duration(1000).call(d3.axisLeft(y)).selectAll("text").style('font-size','12px');


  // Create the u variable
  var u = svg.selectAll("myRect")
    .data(data)

  u
    .enter()
    .append("rect")
    .transition().duration(1000)
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.name); })
    .attr("width", function(d) { return x(d.val); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")
  }

 updateLocationBarChart(jsonData);

return {updateLocationBarChart:updateLocationBarChart};

}

var loadDataByPageUrl=(id,data)=>{

 function updateUrlChart(jsonData)
  {

 
var data=manipulateNamejsonData(jsonData);
let container=document.getElementById('urlViewsChart__Container');
container.innerHTML="";
let rows1=document.createElement('div');
rows1.setAttribute('class','urlViewsChart__Rows');

let url1=document.createElement('div');
url1.setAttribute('class','urlViewsChart__Url header');
url1.innerText='Trending Page Url';

let data1=document.createElement('div');
data1.setAttribute('class','urlViewsChart__Count header');
data1.innerText='Count';
rows1.append(url1);
rows1.append(data1);
container.append(rows1);


data.forEach(function(item,index){
let rows=document.createElement('div');
index%2==0?rows.setAttribute('class','urlViewsChart__Rows'):rows.setAttribute('class','urlViewsChart__Rows aliceB');

let url=document.createElement('div');
url.setAttribute('class','urlViewsChart__Url');
url.innerText=item.name;

let data=document.createElement('div');
data.setAttribute('class','urlViewsChart__Count');
data.innerText=item.val;
rows.append(url);
rows.append(data);
container.append(rows);

})
  }
updateUrlChart(data);
  
  return {
    updateUrlChart: updateUrlChart
};
}

var loadinstanceViewsBarChart=(id,widths,heights,jsonData)=>{

 let box = document.querySelector('.instanceViewCard');
 widths=box.offsetWidth-30;
  // set the dimensions and margins of the graph
const margin = {top: 0, right: 0, bottom: 0, left: 0},
width = widths - margin.left - margin.right,
height = heights - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#instanceViewsBarChart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      `translate(${margin.left}, ${margin.top})`);

// Read data




// Then d3.treemap computes the position of each element of the hierarchy
// The coordinates are added to the root object above
const treemap = d3.treemap()
.size([width, height])
.padding(4)


// use this information to add rectangles:
var nodes=  svg
  .selectAll("rect")
  
    

// // and to add the text labels
const foreignObject=svg
  .selectAll("foreignObject")
 

    function updateInstanceChart(jsonData)
    {
      svg
  .selectAll("rect").remove();

    let data=manipulateInstancejsonData(jsonData);
    const  newroot= d3.hierarchy(data).sum(function(d){ return d.val})
    const tree = treemap(newroot);
    
   

  nodes
  .data(tree.leaves())
  .join("rect")
  .attr('class','node')
  .transition()
  .duration(1500).delay(500)

    .attr('x', function (d) { return d.x0; })
    .attr('y', function (d) { return d.y0; })
    .attr('width', function (d) { return d.x1 - d.x0; })
    .attr('height', function (d) { return d.y1 - d.y0; })
  
    .style("stroke", "#54faff")
    
    .style("fill", "#167578");


    foreignObject.
    data(newroot.leaves())
    .join("foreignObject")
    .transition()
    .duration(1500).delay(500)
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+5})
      .attr('width', function (d) { return (d.x1 - d.x0)-10; })
      .attr('height', function (d) { return (d.y1 - d.y0)-10; })    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name + " ("+d.data.val+")"})
      .attr("font-size", "13px")
      .attr("font-family", "system-ui")
      .attr()
      .style("color", "white")

   
}
updateInstanceChart(jsonData);
return {
  updateInstanceChart: updateInstanceChart
};


}

var loadinstanceViewsBarChart1=(id,widths,heights,jsonData)=>{

  let data=manipulateInstancejsonData(jsonData);
  // console.log(data);
  // set the dimensions and margins of the graph
const margin = {top: 10, right: 10, bottom: 10, left: 10},
width = widths - margin.left - margin.right,
height = heights - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#instanceViewsBarChart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      `translate(${margin.left}, ${margin.top})`);

// Read data


// stratify the data: reformatting for d3.js
const root = d3.hierarchy(data).sum(function(d){ return d.val}) // Compute the numeric value for each entity

// Then d3.treemap computes the position of each element of the hierarchy
// The coordinates are added to the root object above
const treemap = d3.treemap()
.size([width, height])
.padding(4)
const tree = treemap(root);

// use this information to add rectangles:
var nodes=  svg.datum(root)
  .selectAll("rect")
  .data(tree.leaves())
  .enter().append("rect")
  .attr('class','node')
  .transition()
  .duration(1500)
    .attr('x', function (d) { return d.x0; })
    .attr('y', function (d) { return d.y0; })
    .attr('width', function (d) { return d.x1 - d.x0; })
    .attr('height', function (d) { return d.y1 - d.y0; })
  
    .style("stroke", "#54faff")
    
    .style("fill", "#167578");
    

// // and to add the text labels
const foreignObject=svg.datum(root)
  .selectAll("foreignObject")
  .data(root.leaves())
  .enter().append("foreignObject")
    .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
    .attr("y", function(d){ return d.y0+5})
    .attr('width', function (d) { return (d.x1 - d.x0)-10; })
    .attr('height', function (d) { return (d.y1 - d.y0)-10; })    // +20 to adjust position (lower)
    .text(function(d){ return d.data.name})
    .attr("font-size", "15px")
     .attr("font-family", "cursive")

    .style("color", "white")

    function updateInstanceChart(jsonData)
    {
       datas=manipulateInstancejsonData(jsonData);
   const  newroot= d3.hierarchy(datas).sum(function(d){ return d.val})

  // svg.selectAll("rect")
  // .data(root.leaves())
  // .join("rect")
  // .transition()
  // .duration(500)
  // .attr('width', 0)
  //   .attr('height', 0)

    

  nodes.data(treemap(newroot).leaves())
    .transition()
    .duration(1500)
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })


      foreignObject
  .data(treemap(newroot).leaves())
    .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
    .attr("y", function(d){ return d.y0+5})
    .attr('width', function (d) { return (d.x1 - d.x0)-10; })
    .attr('height', function (d) { return (d.y1 - d.y0)-10; })    // +20 to adjust position (lower)
    .text(function(d){ return d.data.name})
    
    }

    return {
      updateInstanceChart: updateInstanceChart
  };

}

var manipulateNamejsonData=(jsonData)=>{
 
    let newArray=[];
    
   
    jsonData.forEach(function(item,index)
    {  
    //  console.log(item);
      let i=0;
        while(i<jsonData[index].breakdown.length)
        {
          if(item.breakdown[i].counts[0]!=0)
       {
      //    if(item.breakdown[i].name!='coolray:us:en')
      //  {

      
           newArray.push({
            name:item.breakdown[i].name,
            val:Number(item.breakdown[i].counts[0]),
            date:item.name
           })
           }
      // }
       //else{
         
          //  let newItem=newArray.find(x=>x.name===item.breakdown[i].name);
       
          //  if(newItem!=undefined)
          //  newItem.val+=Number(item.breakdown[i].counts[0]);
          //  else
          //  {
          //   if(item.breakdown[i].name!='coolray:us:en')
          //   {
     
      //       newArray.push({
      //           name:item.breakdown[i].name,
      //           val:Number(item.breakdown[i].counts[0]),
      //           date:item.name
      //          })
      // //         }
      //      }

      //  }
      
 //       }  
 i++;
      }

    });
    return newArray;
}

var manipulateLocationjsonData=(jsonData)=>{

  let newArray=[];
  
 
  jsonData.forEach(function(item,index)
  {  let i=0;
      while(i<jsonData[index].breakdown.length)
      {
      if(index==0)
     {
         newArray.push({
          name:item.breakdown[i].name.split('(')[0].substring(0,10),
          val:Number(item.breakdown[i].counts[0])
         })
     }
     else{
       
         let newItem=newArray.find(x=>x.name===item.breakdown[i].name.split('(')[0].substring(0,10));
     
         if(newItem!=undefined)
         newItem.val+=Number(item.breakdown[i].counts[0]);
         else
         {
          newArray.push({
              name:item.breakdown[i].name.split(" ")[0],
              val:Number(item.breakdown[i].counts[0])
             })
         }

     }
     i++;
      }  


  });
  return newArray;
}

var manipulateDatejsonData=(jsonData)=>{
 
  var newArray=[];
  jsonData.forEach(function(item,index){
  
var obj={
  title:item.day+'-'+item.month+'-'+item.year,
  date:new Date(item.name).toLocaleTimeString('it-IT'),
  close:Number(item.breakdownTotal[0])
}
newArray.push(obj);
  })
return newArray;
}

var manipulateInstancejsonData = (jsonData)=>{
  var parentObj={};
  var parentArray=[];
  var newObj={};
  let newArray=[];
    
   
    jsonData.forEach(function(item,index)
    {  let i=0;
        while(i<jsonData[index].breakdown.length)
        {
        if(index==0)
       {
           newArray.push({
            name:item.breakdown[i].name,
            group: "A",
            val:Number(item.breakdown[i].counts[0])
           })
       }
       else{
         
           let newItem=newArray.find(x=>x.name===item.breakdown[i].name);
       
           if(newItem!=undefined)
           newItem.val+=Number(item.breakdown[i].counts[0]);
           else
           {
            newArray.push({
                name:item.breakdown[i].name,
                val:Number(item.breakdown[i].counts[0])
               })
           }

       }
       i++;
        }  


    });
    
newObj.name="instanceView";
newObj.children=newArray;
parentArray.push(newObj);
parentObj.children=parentArray;
return parentObj;
}


