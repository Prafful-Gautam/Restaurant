const express = require('express');
const postRouter = express.Router();
const db = require('../config/db');

//Get city
postRouter.get('/city', (req, res)=>{
 console.log(req.query)
 let cityId = req.query.cityId;
 let getCity = 'Select name from city where city_id = '+ cityId;
 db.query(getCity, (err, result) => {
   if(err) throw err;
   console.log(result);
   return res.status(201).json(result[0])
 })
})

postRouter.post('/add-restaurant', (req, res) => {
  console.log(req.body);
  let city = {name: req.body.city};

  getCity = `select city_id from city where name='${city.name}'`;
  db.query(getCity, (err, result) => {
    if(err){throw err};
    // console.log(result);
    if(result.length === 0){
      console.log('result not found');
      let addCity = 'INSERT INTO city set ?'
      db.query(addCity, city, (err, result) => {
        if(err){throw err};
        console.log(result);
      })
    }
    if(result.length === 0 || result.length !== 0){
      db.query(getCity, (err, result) => {
        if(err){throw err};
        console.log('cityID--->', result);
        let addRest = {name: req.body.name, type: req.body.type, city_id: result[0].city_id};
        console.log(addRest);
        let sql = 'INSERT INTO restaurant set ?'
        db.query(sql, addRest, (err, result) => {
          if(err) return res.status(400).json(err);
          console.log('restaurant added--->',result);
          return res.status(201).json({message: 'Restaurant added'});
        })
      })
    }

  })

  });

//Get restaurants
postRouter.get('/get-restaurants', (req, res) => {
  let getRestaurants = 'SELECT * FROM restaurant';
  db.query(getRestaurants, (err, result) => {
    if(err) throw err;
    return res.status(201).json(result);
  })
})
postRouter.get('/get-restaurant', (req, res) => {
  let getRestaurant = `SELECT * FROM restaurant where restaurant_id = ${req.query.restId}`;
  console.log(req.query);
  db.query(getRestaurant, (err, result) => {
    if (err) throw err;
    return res.status(201).json(result);
  })
})

//get restaurant by city
postRouter.get('/restaurantbycity', (req, res) => {
  let getCity = `SELECT city_id FROM city where name = '${req.query.cname}'`;

  db.query(getCity, (err, result) => {
    if(err) throw err;

    if(result.length !== 0)
   {
      let getRestaurantByCity = `SELECT * FROM restaurant where city_id = ${result[0].city_id}`
      console.log(getRestaurantByCity);
      db.query(getRestaurantByCity, (err, result) => {
        if(err) throw err;
        return res.status(201).json(result);
      })
    } else{
      return res.status(201).json([]);
    }
  })
})


//Add food in restaurant
postRouter.post('/add-food', (req, res) => {
const url = req.protocol + '://' + req.get('host');
console.log('file--------->', +req.body.restaurant_id);
let addFood = {restaurant_id: +req.body.restaurant_id, name: req.body.name, imagePath: url + "/images/" + req.file.filename};
console.log(addFood);
let sql = 'INSERT INTO food set ?';
db.query(sql, addFood, (err, result) => {
  if(err)throw err;
  return res.status(201).json({message: 'food added successfully'});
})
})

//Get all food
postRouter.get('/food', (req,res) => {
  console.log(req.query.restId);
  let getFoods = 'SELECT * FROM food where restaurant_id = '+ req.query.restId
  db.query(getFoods, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.status(201).json(result);
  })
})

//Delete food
postRouter.delete('/food', (req, res) => {
  let del = `DELETE FROM food WHERE food_id = ${req.query.food_id}`;
  console.log(del);
  db.query(del, (err, result) => {
    if(err) throw err;
    console.log(result);
    return res.status(201).json({message: "Food deleted"});
  })
})

module.exports = postRouter;
