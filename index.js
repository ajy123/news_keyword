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
    fs.readFile("public/data/key.json", (err, data)=>{
        if (err) throw err;
        let day = JSON.parse(data);
        // console.log(day)
        const keys = Object.keys(day)
        response.json(keys)
    });
})

// the request is receive 
app.post('/req',(request,response)=>{
    console.log(request.body);
    const tryout = request.body;
    // request.body to create link data
    fs.readFile("public/data/article_nyt.json", (err, info)=>{
        const selected = []

        if (err) throw err;
        let day = JSON.parse(info);
        for(let i = 0; i < day.length; i++){
            for(let j = 0; j< day[i]['keywords'].length; j++){
                if(day[i]['keywords'][j]['value'] == tryout[0]){
                    selected.push(day[i])
                }
            }
        }
        console.log(selected) // all the article that has that keyword
    
    const data = {"name":tryout[0],"children":[]}

    //re draw the data
    const date = []
    for(let i = 0; i < selected.length; i ++){
        date.push(selected[i].date.slice(0,4))
    }
    var unique = date.filter((v, i, a) => a.indexOf(v) === i); 
    // console.log(unique)
    const final = {"name":tryout[0],"children":[]}

    // const dateData = []
    for(let i = 0; i < unique.length; i ++){
        final.children.push({"name":unique[i],"children":[]})
    }
    // console.log(final)
    console.log(final.children[0].name)
    for(let i = 0; i < final.children.length; i ++){
       for(let j = 0; j < selected.length; j ++){
            if(selected[j].date.slice(0,4) == final.children[i].name){
                final.children[i].children.push({"name":selected[j].headline})
            }
        }
    }
   
    console.log(final)

// ### script for d3 force graph
        // //create nodes 
        // const node = []

        // for(let i = 0; i < selected.length; i++){
        //     //year node
        //     console.log(selected[i].date.slice(0,4))
        //     node.push({
        //         "id":selected[i].date.slice(0,4),
        //         "group":"year"
        //     })
        //     //month node
        //     console.log(selected[i].date.slice(5,7))
        //     node.push({
        //         "id":selected[i].date.slice(5,7),
        //         "group":"month"
        //     })
        //     //headline node
        //     console.log(selected[i].headline)
        //     node.push({
        //         "id":selected[i].headline,
        //         "group":"headline"
        //     })
        //     //keyword node
        //     for(let j = 0; j < selected[i].keywords.length; j ++){
        //         // if(selected[i].keywords[j].name == "persons"){
        //         //     // check if the striing has (
        //         //         if(selected[i].keywords[j].value.includes("(") == true){
        //         //             console.log(selected[i].keywords[j].value)
        //         //             var name = selected[i].keywords[j].value.substring( 0, selected[i].keywords[j].value.indexOf("("));
        //         //             console.log(name);
        //         //             var lastName = name.substring( 0, name.indexOf(","));
        //         //             console.log(lastName);
        //         //             var firstName = name.substring(name.indexOf(",")+1, name.length());
        //         //             console.log(firstName)
        //         //             node.push({
        //         //                 "id":firstName + " " + lastName,
        //         //                 "group":"keyword"
        //         //             })
        //         //         }else{
        //         //             var lastName = name.substring( 0, name.indexOf(","));
        //         //             console.log(lastName);
        //         //             var firstName = name.substring(name.indexOf(",")+1, name.length());
        //         //             console.log(firstName)
        //         //             node.push({
        //         //                 "id":firstName + " " + lastName,
        //         //                 "group":"keyword"
        //         //             })
        //         //         }
        //         // }else{
        //             node.push({
        //                 "id":selected[i].keywords[j].value,
        //                 "group":"keyword"
        //             })
        //         // }
        //     }
        // }
        // // console.log(nodes)
        
        // nodes = node.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));
        // console.log(nodes)

        // const links = []
        // //create link
        // for(let i = 0; i < selected.length; i++){
        //     //// make sure there is no repeat link
        //     //// make sure there is no repeat link
        //     links.push({
        //         "source": selected[i].date.slice(0,4),
        //         "target": selected[i].date.slice(5,7),
        //         "id": selected[i].date.slice(0,7),
        //         "value": 2
        //     })
        //     for(let j = 0; j < selected[i].keywords.length; j ++){
        //         links.push({
        //             "source": selected[i].date.slice(5,7),
        //             "target": selected[i].keywords[j].value,
        //             "id": selected[i].date,
        //             "value": 2
        //         })
        //         links.push({
        //             "source": selected[i].keywords[j].value,
        //             "target": selected[i].headline,
        //             "id": selected[i].date,
        //             "value": 2
        //         })
        //     }
        // }
// ### end of the script for d3 force graph 


        // console.log(links)
        // // change unique to nodes 
        // //send the nodes and link back to response.json
        // response.json({
        //     nodes,links
        // })

        response.json({
            // data
            // strat
            final
        })

    });
    
})

