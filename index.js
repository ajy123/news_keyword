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

