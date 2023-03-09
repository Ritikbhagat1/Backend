
const mongoose = require('mongoose');
var uri = "mongodb://0.0.0.0:27017/users";

const Schema = mongoose.Schema;
const db=mongoose.connection;


mongoose.connect(uri ,function(err,db){
    if(err) throw err;
      console.log("collection created");
    });
    
//creating schemas
const userSchema = new Schema({
    
    username : {type: String, required: true , unique: true},
    email: {type: String, required: true , unique: true}
},{collections:'userCredentials'});

var model=mongoose.model("model",userSchema); 

var carname=new model({username:'swift',email:'hatchbac@gmail.com'});

db.on('error', function (err) { throw err }); 

db.once('open', function() {
   console.log('mongoose connected!');

    carname.save(function (err, data) {
     if (err){
         console.log(err); 
         db.close();
        }
     else{
         console.log(data.name + " saved to collection."); 
        //  db.close();
        }
   });
   
});     

