"use strict";
async function data(){
      
  const response = await fetch('/api'); 
  const data = await response.json();
  console.log(data)
  console.log('d3 chart')
}
data(); 

const d = document.getElementById('Success').innerHTML;
console.log(d);

let key = "Democratic Party"

const button = document.getElementById(`${key}`);
    button.addEventListener('click', async event => {
      const data = [document.getElementById(`${key}`).innerHTML];
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const response = await fetch('/req', options);
      const json = await response.json();
      console.log(json);

      chart(json); 
    });


const chart = (data) => {
    
    // d3.json("../data/links.json").then(function(data) {
        const links = data.links
        const nodes = data.nodes
        const color =  d3.scaleOrdinal(d3.schemeCategory10);
        console.log(data);
        console.log('nodes', nodes)
        console.log('links', links)
      
      
        const simulation = d3.forceSimulation(data.nodes)
            .force("link",d3.forceLink(links).id((d,i) => d.id).distance(200))
            .force("charge", d3.forceManyBody())
            .force("x", d3.forceX())
            .force("y", d3.forceY());
        
        const height = window.innerWidth
        const width = window.innerWidth
        const svg = d3.select("#forceChart")
            .append("svg")
            .attr("viewBox", [-width/2,-height/2, width, height]);
      
        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line")
          .attr("stroke-width", (d,i)=> (d.value));
            // .attr("stroke-width", (d,i)=> console.log(Math.sqrt(d[i].value)));
      
        const drag = simulation => {
        
              function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
              }
              
              function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
              }
              
              function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
              }
              
              return d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended);
            }
        
        const node = svg.append("g")
            .attr("stroke", "#fff")
            // .attr("stroke-width", 1.5)
          .selectAll("circle")
          .data(data.nodes)
          .join("circle")
            .attr("r", 5)
            .style("fill", d => color(d.group))
            .call(drag(simulation));
        
          node.append("svg:title")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.id });
      
          var labels = svg.append("g")
            .attr("class", "label")
          .selectAll("text")
          .data(data.nodes)
          .enter().append("text")
            .attr("dx", 6)
            .attr("dy", ".35em")
             .style("font-size",10)
            .text(function(d) { return d.id });
      
        simulation.on("tick", () => {
          link
              .attr("x1", d => d.source.x)
              .attr("y1", d => d.source.y)
              .attr("x2", d => d.target.x)
              .attr("y2", d => d.target.y);
      
          node
              .attr("cx", d => d.x)
              .attr("cy", d => d.y);
              // .attr("transform", function(d) {
              //   return "translate(" + d.x + "," + d.y + ")";
              // })
          labels
              .attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; });  
        });
    // })
};

// chart();



