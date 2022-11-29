/******************************************************************************
***
* ITE5315 – Project
* I declare that this assignment is my own work in accordance with Humber Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Group member Name: _Darshit,Sanjay_ Student IDs: _N01427924,N01481527____ Date: _____29-11-22_______
******************************************************************************
***/

// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ResSchema = new Schema({
    address : {
        building : String,
        coord : [Number],
        street : String,
        zipcode : String
    },
    borough : String,
    cuisine : String,
    grades : [
        {
            date: Date , 
            grade :  String ,
            score : Number
        }
    ],
    name : String,
    restaurant_id : String
    
});
module.exports = mongoose.model('Restaurant',ResSchema);
