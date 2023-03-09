const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();
const urlencodedparser = bodyparser.urlencoded({extended:false});
const schema = mongoose.schema;
const   port = process.env.PORT || 4000;


mongoose.connect(('mongodb://127.0.0.1:27017/Bughunter'),{useNewUrlParser: true ,
useUnifiedTopology: true}).then(() => {
    console.log('Connected to MongoDB')})
    .catch((err) =>{
      console.error('Error connecting to mongodb',err);
    });

    const crudSchema = new mongoose.Schema({
        Name:{type:String , required:true,unique:true},
        Password:{type:String , required:true},
        createdAt:{type: Date, default: Date.now}
    });

    const post = mongoose.model('CRUD',crudSchema);

    // const newUser = new post({
    //     Name:'Mohit',
    //     Password:'1234567890'
    // });

    // // save to the database 
    // newUser.save(function(err, user){
    //     if(err) throw err;
    //     console.log(user);
    // })

    // Read operation by using mongoose driver
    post.find({Name:'Mohit'}, function(err,docs){
        if(err) throw err;
        console.log(docs);

    });

    // UPDATE operation 
    post.updateOne({Name:"Mohit"},{Password:"12346"}, function(err,docs){
        if(err) throw err;
        console.log(docs);
    });

    post.deleteOne({Name:"Mohit"}, function(err,docs){
        if(err) throw err;
        console.log(docs);
    })

    app.listen(port ,()=>{
        console.log("app is listening at port 4000");
    });