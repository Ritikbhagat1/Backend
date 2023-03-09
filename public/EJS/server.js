const bodyParser = require('body-parser');
const express = require('express');
const Grid = require('gridfs-stream');



const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const urlencodedparser = bodyParser.urlencoded({extended:false});


// configure and connect mongodb by using mongoose server
mongoose.connect(("mongodb://127.0.0.1:27017/Bughunter") ,{ useNewUrlParser: true ,
  useUnifiedTopology: true}).then(() => {
      console.log('Connected to MongoDB')})
      .catch((err) =>{
        console.error('Error connecting to mongodb',err);
      });


  

      //prepare schema
      const crudSchema = new mongoose.Schema({
        Name:{type:String , required:true,unique:true},
        Password:{type:String , required:true},
        createdAt:{type: Date, default: Date.now}
    });

    const post = mongoose.model('CRUD',crudSchema);

// setting up to view engine to ejs
app.set("view engine", "ejs");



// route for magic page
app.get("/magic", function(req,res){
  res.render("../view/partials/magic");

});

app.post("/post",urlencodedparser, function(req,res){

  const name =req.body.name;
  post.find({Name:name}, function(err,docs){
    if(err) throw err;
    console.log(docs);
    const data = { title: "My Page Title", message: "Hello World" };

    res.render('../view/partials/magic', { data:data });
});
});

app.post("/action_page" , function(req,res){
    if(err) throw err;
    console.log("file received successfully");
    res.send(" thank for updating the file");
});

app.listen(4000,function(){
  console.log(" server is listening at port 4000");
});