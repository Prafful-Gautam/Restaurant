const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./backend/routes/route');
const postRouters = require('./backend/routes/post');
const db = require('./backend/config/db')

const extractFile = require('./backend/middleware/file');

const app = express();
port = 3000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  next();
});
app.use('/images/', express.static(path.join(__dirname, './backend/images')));

app.use('/', (req, res, next) =>{
  let useDb = 'USE restaurant';
  db.query(useDb, (err, result)=> {
    if(err) throw err;
    console.log(result);
  })
  next();
})

app.use('/create', router);
app.use('/insert', extractFile, postRouters);
// app.use('/food', postRouters.addFood);

app.listen('3000', () => {
  console.log('Server is running at port', port);
})
