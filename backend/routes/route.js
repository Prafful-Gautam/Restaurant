const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//create connection
const db  = require('../config/db');

//Connect Db
db.connect((err) => {
  if(err) {throw err}
  console.log('db connection established');
})

//Create Db
router.get('/creatdb', (req, res) => {
  let sql = "SHOW DATABASES LIKE 'restaurant'";
  db.query(sql, (err, result) => {
    if(err) throw err;
    if(result !== null){
      let selectDb = 'USE restaurant';
      db.query(selectDb, (err,result) => {
        if(err) throw err;
        res.send(result);
      })
      res.send(result);
    } else {
      let createDb = 'CREATE DATABASE restaurant';
      db.query(createDb, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
      });
    }

  })


});

//Create city-tables
router.get('/city-table', (req, res) => {
  let city_table = 'CREATE TABLE city(city_id int auto_increment, name varchar(255), UNIQUE(name), primary key(city_id));';

      db.query(city_table, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('City Table created...');
      });

  });

//create restaurant_table

router.get('/restaurant-table', (req, res) => {
  let useDb = 'USE restaurant';
  let restaurant_table = 'CREATE TABLE restaurant(restaurant_id int AUTO_INCREMENT, city_id int, name VARCHAR(255), type VARCHAR(50), UNIQUE(name), PRIMARY KEY(restaurant_id), FOREIGN KEY(city_id) REFERENCES city(city_id))';

  db.query(useDb, (err, result) => {
    if(err) throw err;

  });


  db.query(restaurant_table, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Restaurant Table created...');
  });
});

router.get('/food-table', (req, res) => {

  let food_table = 'CREATE TABLE food(food_id int AUTO_INCREMENT, restaurant_id int, name VARCHAR(255), imagePath VARCHAR(255), UNIQUE(name), PRIMARY KEY(food_id), FOREIGN KEY(restaurant_id) REFERENCES restaurant(restaurant_id))';

  db.query(food_table, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Food Table created...');
  });


})



module.exports = router;
