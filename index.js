// Author - Erik Jones
const { request, response } = require('express');
const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '10mb'}));


const db = new Datastore('locations.db');
db.loadDatabase();

app.get('/info', (request,response) => {
    db.find({},(err,data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
    
});

app.post('/info', (request, response) => {
    console.log('I got a request');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    db.insert(data);
    console.log(request.body);
    
    response.json({
        status: 'success',
        latitude: request.body.lat1,
        longitude: request.body.lng1
    });
});
