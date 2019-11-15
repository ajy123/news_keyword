"use strict";

async function data(){
      
  const response = await fetch('/api'); 
  const data = await response.json();
  console.log(data) // list of keyword
}

data(); 
  let b = ["Education (K-12)","#MeToo Movement","New York City",
  "Women and Girls","Blacks","Computers and the Internet","Ethics (Personal)"
  ,"Television","Labor and Jobs","Democratic Party", "Books and Literature"
  ,"Discrimination","United States International Relations","Republican Party"
  ,"Presidential Election of 2016","News and News Media"
  ,"Health Insurance and Managed Care","Colleges and Universities","Fashion and Apparel"]

  // create list of button with class btn default 
  for(let i=0; i < b.length; i ++){
    var bu = document.createElement("button");
    bu.id = b[i];
    bu.innerHTML = b[i];

    var body = document.getElementById("keyword");
    body.appendChild(bu);

    bu.addEventListener ("click", function() {
      // alert("did something");
      console.log(b[i]) 
      show(b[i])
    });
  }

// fix this  //
function searchFunction(){
  var input, filter, ul, li, a , i; 
  input = document.getElementById("searchTextbox")
  filter = input.value
  ul = document.getElementById("keyword")
  li = document.getElementsByTagName('button')
  for(i = 0; i < li.length; i++){
    console.log(li[i].innerHTML)

    if(li[i].innerHTML.indexOf(filter) > -1){
      li[i].style.display = '';
    }else{
      li[i].style.display = 'none';
    }
  }
}

async function show(data){
      const key = [document.getElementById(data).innerHTML];
      const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(key)
      };
      const response = await fetch('/req', options);
      const json = await response.json();
      console.log(json);
      hierarchy(json.final);
}

// const chart = (data) => {
    
//     // d3.json("../data/links.json").then(function(data) {
//         const links = data.links
//         const nodes = data.nodes
//         const color =  d3.scaleOrdinal(d3.schemeCategory10);
//         console.log(data);
//         console.log('nodes', nodes)
//         console.log('links', links)
      
      
//         const simulation = d3.forceSimulation(data.nodes)
//             .force("link",d3.forceLink(links).id((d,i) => d.id).distance(200))
//             .force("charge", d3.forceManyBody())
//             .force("x", d3.forceX())
//             .force("y", d3.forceY());
        
//         const height = window.innerWidth
//         const width = window.innerWidth
//         const svg = d3.select("#forceChart")
//             .append("svg")
//             .attr("viewBox", [-width/2,-height/2, width, height]);
      
//         const link = svg.append("g")
//             .attr("stroke", "#FFF")
//             .attr("stroke-opacity", 0.6)
//           .selectAll("line")
//           .data(links)
//           .join("line")
//           .attr("stroke-width", (d,i)=> (d.value));
//             // .attr("stroke-width", (d,i)=> console.log(Math.sqrt(d[i].value)));
      
//         const drag = simulation => {
        
//               function dragstarted(d) {
//                 if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//                 d.fx = d.x;
//                 d.fy = d.y;
//               }
              
//               function dragged(d) {
//                 d.fx = d3.event.x;
//                 d.fy = d3.event.y;
//               }
              
//               function dragended(d) {
//                 if (!d3.event.active) simulation.alphaTarget(0);
//                 d.fx = null;
//                 d.fy = null;
//               }
              
//               return d3.drag()
//                   .on("start", dragstarted)
//                   .on("drag", dragged)
//                   .on("end", dragended);
//             }
        
//         const node = svg.append("g")
//             .attr("stroke", "#fff")
//             // .attr("stroke-width", 1.5)
//           .selectAll("circle")
//           .data(data.nodes)
//           .join("circle")
//             .attr("r", 5)
//             .style("fill", d => color(d.group))
//             .call(drag(simulation));
        
//           node.append("svg:title")
//             .attr("dx", 12)
//             .attr("dy", ".35em")
//             .text(function(d) { return d.id });
      
//           var labels = svg.append("g")
//             .attr("class", "label")
//           .selectAll("text")
//           .data(data.nodes)
//           .enter().append("text")
//             .attr("dx", 6)
//             .attr("dy", ".35em")
//              .style("font-size",10)
//             // .text(function(d) { return d.id });
      
//         simulation.on("tick", () => {
//           link
//               .attr("x1", d => d.source.x)
//               .attr("y1", d => d.source.y)
//               .attr("x2", d => d.target.x)
//               .attr("y2", d => d.target.y);
      
//           node
//               .attr("cx", d => d.x)
//               .attr("cy", d => d.y);
//               // .attr("transform", function(d) {
//               //   return "translate(" + d.x + "," + d.y + ")";
//               // })
//           labels
//               .attr("x", function(d) { return d.x; })
//               .attr("y", function(d) { return d.y; });  
//         });
//     // })
// };



// D3 hierarchy chart

const hierarchy = (data) =>{
  d3.select("svg").remove();

  const radius = 400
  const tree = d3.tree()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)

  const root = tree(d3.hierarchy(data)
      .sort((a, b) => d3.ascending(a.data.name, b.data.name)));
  
  console.log(root)
  const height = window.innerWidth
  const width = window.innerWidth

  const svg = d3.select("#forceChart")
      .append("svg")
      .attr("viewBox", [-width/2,-height/2.75, width, height])
      .style("font", "10px sans-serif")
      .style("margin", "15px");

  const link = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
  .selectAll("path")
  .data(root.links())
  // .data(console.log())
  .join("path")
    .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d=> d.y));
  
  const hover = svg.append("g")
  .attr("stroke-linejoin", "round")
  .attr("stroke-width", 10)
.selectAll("g")
.data(root.descendants().reverse())
.join("g")
  .attr("transform", d => `
    rotate(${d.x * 180 / Math.PI - 90})
    translate(${d.y},0)
  `).append("circle")
  .attr("r", d => d.children ? 5 : 0.5)
  .attr("stroke", d => d.children ? "#333" : "#999")



  const node = svg.append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 10)
    // .attr("fill", "none")
  .selectAll("g")
  .data(root.descendants().reverse())
  .join("g")
    .attr("transform", d => `
      rotate(${d.x * 180 / Math.PI - 90})
      translate(${d.y},0)
    `);

  const div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)


  node.append("circle")
    .attr("stroke", d => d.children ? "none" : "#999")
    .attr("stroke-width", 1.5)
    .attr("opacity", d => d.children ? 1 : 0.1)
    .attr("fill", d => d.children ? "#333" : "none")
    // .attr("fill", "none")
    .attr("r", d => d.children ? 5 : 20)
    .on("mouseover", function(d){
      div.transition()
        .duration(100)
        .style("opacity",1)
        var element = d3.select(this)
          element.style("fill", "Black")
          div.html("<span style = 'font-weight: bold'>" 
          + d.data.name + "<br>")
          div.style("visibility", "visible")
          .style("left", (d3.event.pageX - 20) + "px")    
          .style("top", (d3.event.pageY - 35) + "px")
        })
        .on("mousemove", function(d){
          div.style("left", (d3.event.pageX) + "px")    
          .style("top", (d3.event.pageY - 35) + "px")
        })
        .on("mouseout", function(d){
          div.transition()
          .duration(500)
          div.style("visibility", "hidden")
          var element = d3.select(this)
          element.style("fill", d.pixel)
        });

  
  node.filter(function(d){return d.data.parent == null})
    .append("text")
    .text(function(d){
      // console.log(d)
      if(d.parent == null || d.depth == 1){
        return d.data.name
      }else{
        return null
      }
    })
    .attr("dy", "0.31em")
    .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
    .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
    .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
  .clone(true).lower()
    .attr("stroke", "white");
  }


  // create how to read
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      window.alert("Hover over the outer circle to discover questions The New York Times was asking from 2010-2019 Sept");
      this.classList.toggle("active");
      // var content = this.nextElementSibling;
    });
  }

  // create footer