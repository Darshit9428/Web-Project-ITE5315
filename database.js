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

var mongoose = require('mongoose');
var port     = process.env.PORT || 8000;
var Restaurant = require('../models/restaurant');

module.exports = {
   url:"mongodb+srv://darshit18:darshit1809@cluster0.lltwcmy.mongodb.net/sample_restaurants?retryWrites=true&w=majority"
};

module.exports.initialize = (connectionStirng) => {

    mongoose.connect(connectionStirng)
    .then( () => {
        console.log('Connected to the database ')
    
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
        process.exit(1);
		
    })
}

module.exports.getRestaurantById = (id) => {
    const get_data = new Promise(function(resolve, reject) {
        Restaurant.findById(id, function(err, res) {
            if (err){
                response=err
                reject(err);
            }
           
            response= res;
            resolve(res)
        });
      });
     
      return get_data;
}

module.exports.getAllRestaurants = (page, perPage, borough) => {
    const get_data = new Promise(function(resolve, reject) {
        
        //console.log(page,perPage,borough);
        
        let findBy = borough ? { borough } : {};
        
        console.log(findBy);

        if(+page && +perPage)
        {
            Restaurant.find(findBy).sort({restaurant_id: +1}).skip(page * +perPage).limit(+perPage).exec(function(err, res) {
                if (err){
                    response=err
                    reject(err);
                }
                response= res;
                resolve(res)
            });
        }
      });
       
      return get_data;
}

module.exports.updateRestaurantById = (id,data) => {
    const get_data = new Promise(function(resolve, reject) {
        
            Restaurant.findByIdAndUpdate({_id:id},data,function(err, res) {
                if (err){
                    response=err
                    reject(err);
                }
                response= res;
                resolve(res)
            });
        
      });
      
      return get_data;
}


module.exports.deleteRestaurantById = (id) => {
    const get_data = new Promise(function(resolve, reject) {
        
            Restaurant.remove({_id:id},function(err, res) {
                if (err){
                    response=err
                    reject(err);
                }
                response= res;
                resolve(res)
            });
        
      });
      
      return get_data;
}




