var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const port  = process.env.PORT || 4000;

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//  establish a connection with database

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/signupUsers',{ useNewUrlParser: true })
.then(() => {
  console.log('Connected to MongoDB')});

var db = mongoose.connection;

// configure mongodb
db.on('error', console.log.bind(console , "connection error"));
db.once('open',function(callback){
    console.log("connection succeeded");
})




  const postSchema = new mongoose.Schema({

    Name: { type: String, required: true, unique: true},
    Email:{ type: String, required: true, unique: true},
    Password: { type: String, required: true, unique: true},
    date: { type: Date, default: Date.now }

});

const Post = mongoose.model('posts', postSchema);

// homepage
app.get('/', function(req,res){

    // res.sendFile(__dirname + '/login.html');
    res.sendFile(__dirname + '/fetch.html');

});


//Get One
app.post("/fetch", urlencodedParser, (req, res) => {
    // res.json(res.user);
    console.log(req.body);

    Post.find({Name:req.body.username,Password:req.body.pswrd},(err, docs) => {
        if (err) {
          console.error(err);
        } else {
          console.log(docs);
          res.send(docs);
        }
      });
      

  });




  
  // start the server
app.listen(port ,()=>{
    console.log("app is listening at port 4000");
});