var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var bodyParser = require('body-parser');

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

const filter = {Name:"Shyam"};
const update ={Password:"12345"};

//  Post.findOneAndUpdate(filter,update,{ new: true }, function(err, doc) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(doc);
//     }
//   });

//    query data
const query = Post.find({Name:'Raju'});
console.log(query.getFilter());


  // start the server
app.listen(port ,()=>{
    console.log("app is listening at port 4000");
});