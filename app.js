/******************************************************************************
***
* ITE5315 – Project
* I declare that this assignment is my own work in accordance with Humber Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Group member Name: _Darshit,Sanjay_ Student IDs: _N01427924,N01481527___ Date: _____29-11-22_______
******************************************************************************
***/

var express = require('express');
var mongoose = require('mongoose');
var app = express();
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)

var port = process.env.PORT || 8000;

database.initialize(database.url);

app.use(bodyParser.urlencoded({ 'extended': 'true' }));         // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

var Restaurant = require('./models/restaurant');


app.get('/api/restaurant/:id', function(req, res) {
	
    let id = req.params.id;
	console.log("Waiting for promise");

    database.getRestaurantById(id).then((result) => {
        console.log(result)
        res.send(result)
    }).catch((error) => {
        console.error(error)
        res(error)
    });
});

app.get('/api/restaurant/:page/:perPage/:borough', function(req, res) {
	
    let page = req.params.page;
    let perPage = req.params.perPage;
    let borough = req.params.borough;

    console.log(page,perPage,borough);
	console.log("Waiting for promise");

    database.getAllRestaurants(page,perPage,borough).then((result) => {
        console.log(result)
        res.send(result)
    }).catch((error) => {
        console.error(error)
        res(error)
    });
});
	
app.post('/api/restaurant', function (req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);

    Restaurant.create({
        
            address : {
                building : req.body.building,
                coord : [-73.84971759999999,40.8304811],
                street : req.body.street,
                zipcode : req.body.zipcode
            },
            borough : req.body.borough,
            cuisine : req.body.cuisine,
            grades : [
                {
                    date: req.body.date , 
                    grade :  req.body.grade,
                    score : req.body.score
                }
            ],
            name : req.body.name,
            restaurant_id : req.body.restaurant_id    
        
    }, function (err, response) {
        if (err)
            res.send(err);
        Restaurant.find(function (err, rest) {
            if (err)
                res.send(err)
            res.json(rest);
        });
    });
});

app.put('/api/restaurant/:id', function(req, res) {
	
    let id = req.params.id;

    var data = {
        
        address : {
            building : req.body.building,
            coord : [-73.84971759999999,40.8304811],
            street : req.body.street,
            zipcode : req.body.zipcode
        },
        borough : req.body.borough,
        cuisine : req.body.cuisine,
        grades : [
            {
                date: req.body.date , 
                grade :  req.body.grade,
                score : req.body.score
            }
        ],
        name : req.body.name,
        restaurant_id : req.body.restaurant_id    
}

	console.log("Waiting for promise");
    database.updateRestaurantById(id,data).then((result) => {
        console.log(result)
        res.send('Updated Restaurant Succesfully')
    }).catch((error) => {
        console.error(error)
        res(error)
    });
});


app.delete('/api/restaurant/:id', function (req, res) {
    
    let id = req.params.id;
    console.log("Waiting for promise");

    database.deleteRestaurantById(id).then((result) => {
        console.log(result)
        res.send('Deleted Succesfully')
    }).catch((error) => {
        console.error(error)
        res(error)
    });
});


app.listen(port);
console.log("App listening on port : " + port);