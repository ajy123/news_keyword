const express = require('express'); 
const app = express();
const fetch = require('node-fetch');
const fs = require('fs');
// require('dotenv').config();

"use strict";
app.listen(process.env.PORT || 3000,() => console.log('listening at 3000')); 
app.use(express.static('public'));
app.use(express.json({limit: '5mb'}));

app.get('/api', (request,response)=> {
    console.log('data is here');
    fs.readFile("public/data/article_nyt.json", (err, data)=>{
        if (err) throw err;
        let day = JSON.parse(data);
        response.json(day)
    });
})

// the request is receive 
app.post('/req',(request,response)=>{
    console.log(request.body);
    const tryout = request.body;
    // request.body to create link data
    fs.readFile("public/data/article_nyt.json", (err, data)=>{
        const selected = []

        if (err) throw err;
        let day = JSON.parse(data);
        for(let i = 0; i < day.length; i++){
            for(let j = 0; j< day[i]['keywords'].length; j++){
                if(day[i]['keywords'][j]['value'] == tryout[0]){
                    selected.push(day[i])
                }
            }
        }
        console.log(selected)

        //create nodes 
        const node = []

        for(let i = 0; i < selected.length; i++){
            //year node
            console.log(selected[i].date.slice(0,4))
            node.push({
                "id":selected[i].date.slice(0,4),
                "group":"year"
            })
            //*** make sure the id is not repetitive *****//
            //https://stackoverflow.com/questions/39885893/how-to-find-duplicate-values-in-a-javascript-array-of-objects-and-output-only-u

            //month node
            console.log(selected[i].date.slice(5,7))
            node.push({
                "id":selected[i].date.slice(5,7),
                "group":"month"
            })
            //headline node
            console.log(selected[i].headline)
            node.push({
                "id":selected[i].headline,
                "group":"headline"
            })
            //keyword node
            for(let j = 0; j < selected[i].keywords.length; j ++){
                console.log(selected[i].keywords[j].value)
                node.push({
                    "id":selected[i].keywords[j].value,
                    "group":"keyword"
                })
            }
        }
        // console.log(nodes)
        
        nodes = node.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));
        console.log(nodes)

        const links = []
        //create link
        for(let i = 0; i < selected.length; i++){
            //// make sure there is no repeat link
            //// make sure there is no repeat link
            links.push({
                "source": selected[i].date.slice(0,4),
                "target": selected[i].date.slice(5,7),
                "id": selected[i].date.slice(0,7),
                "value": 2
            })
            for(let j = 0; j < selected[i].keywords.length; j ++){
                links.push({
                    "source": selected[i].date.slice(5,7),
                    "target": selected[i].keywords[j].value,
                    "id": selected[i].date,
                    "value": 2
                })
                links.push({
                    "source": selected[i].keywords[j].value,
                    "target": selected[i].headline,
                    "id": selected[i].date,
                    "value": 2
                })
            }
        }

        console.log(links)
        // change unique to nodes 
        //send the nodes and link back to response.json
        response.json({
            nodes,links
        })

    });
    
})

