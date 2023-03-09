var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bycrypt = require('bcrypt');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const port  = process.env.PORT || 4000;
const jwt = require('jsonwebtoken');


// create object of the imported module

var app = express();
// const MONGODB_URI = 'mongodb://127.0.0.1:27017/signupUsers';

// setup connection with mongodb & configure mongoose driver

mongoose.connect('mongodb://127.0.0.1:27017/signupUsers',{ useNewUrlParser: true ,
useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB')})
  .catch((err) =>{
    console.error('Error connecting to mongodb',err);
  });

  // prepare schema

const postSchema = new mongoose.Schema({
    Email:{ type: String, required: true, unique: true},
    Password: { type: String, required: true}   
});


// prepare model
const Post = mongoose.model('loginUser', postSchema);


// create routes

// homepage 

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/authentication.html');
    // console.log(req.body);

});
// Middleware to parse JSON
// app.use(bodyParser.json);

// Middleware to handle authentication


// error handling middleware 
// app.use((err, req, res, next) =>{

//     console.error(err.status);
//     res.status(500).send(" Oops something went wrong");
// });
app.post('/fetch',urlencodedParser, async (req,res) => {

    
        const password = req.body.pswrd;
        const hashedPassword = await bycrypt.hash(password, 10);
        console.log(hashedPassword);

    // create model
    const myModel = new Post({
        Email: req.body.email,
        Password: hashedPassword
    });

    await myModel.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
        //   res.status(200).send(result);
             res.sendFile(__dirname +'/dashboard.html');

        }
      });
    });

    app.post("/authentication",urlencodedParser, async (req,res) => {
            const Email = req.body.email;
            const password = req.body.pswrd;
          
            console.log(Email,password);

            const user = await Post.findOne({Email});
            if(!user){
                return res.status(401).send('Invalid email ');
            }
            const isMatch = await bycrypt.compare(password,user.Password);
            console.log(isMatch);
            if (!isMatch) {
                return res.status(401).send('Invalid  password');
              }
              const token = jwt.sign({ _id: user._id }, 'secret-key');
              res.send({ token });
    })
      


 // start the server
 app.listen(port ,()=>{
    console.log("app is listening at port 4000");
});


