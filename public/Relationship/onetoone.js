//  import modules 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// create object of imported modules 
 const app = express();
 const port  = process.env.PORT || 4000;
const urlencodedparser = bodyParser.urlencoded({extended:false});
const Schema = mongoose.Schema;


// setup a connection with mongodb & configure  by using mongoose driver

mongoose.connect(("mongodb://127.0.0.1:27017/Bughunter") ,{ useNewUrlParser: true ,
useUnifiedTopology: true}).then(() => {
    console.log('Connected to MongoDB')})
    .catch((err) =>{
      console.error('Error connecting to mongodb',err);
    });

    // prepare 1st schema
    const schema1 = new mongoose.Schema({
        Name: {type:String , required:true },
        Designation: { type:String , required:true},
        relation1:[ { type: mongoose.Schema.Types.ObjectId, ref:"Employee_details"}]

    });
    // create  1st model 


    // prepare 2nd schema

    const schema2 = new mongoose.Schema({
        Phoneno:{type:Number , required:true},
        Qualification:{ type:String , required:true},
        relation2:[ { type: mongoose.Schema.Types.ObjectId, ref:"Employee"}]
    })

    // create 2nd model 
    const model1 = mongoose.model('Employee', schema1);

    const model2 = mongoose.model('Employee_details',schema2);

    // const employee = new model1({Name:"aman",Designation:"QA"});
    // const employee_details = new model2({Phoneno:1234567890,Qualification:"BCA",relation:employee._id});

    // employee.save();
    // employee_details.save();

    // model1.find({},function(err,docs){
    //         if (err) {
    //                       console.log(err);
    //                     } else {
    //                       console.log(docs);
    //                     }
    //     }
    // );
     model2.find({}).populate(
        "relation2").exec((err, post) => {
            if (err) {
              console.log(err);
            } else {
              console.log(post);
            }
          });


    // model2.find({});
    app.listen(port ,()=>{
        console.log("app is listening at port 4000");
    });



