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



// setup routes 

app.get('/', function(req,res){

    // res.sendFile(__dirname + '/login.html');
    res.sendFile(__dirname + '/login.html');

});


// middleware
// app.use(bodyParser.json());
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));



// create schema before post request

const postSchema = new mongoose.Schema({

    Name: { type: String, required: true, unique: true},
    Email:{ type: String, required: true, unique: true},
    Password: { type: String, required: true, unique: true},
    date: { type: Date, default: Date.now }

});

postSchema.pre('save', function(next) {
    // Perform data validation/sanitization here
    next();
  });

const Post = mongoose.model('posts', postSchema);

// Handle form submission in an Express route:
app.post('/sign_up', urlencodedParser, function(req,res){
    console.log(req.body);

    // create model
    const myModel = new Post({
        Name: req.body.username,
        Email: req.body.email,
        Password: req.body.pswrd
    });

    myModel.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
        //   res.status(200).send(result);
             res.sendFile(__dirname +'/dashboard.html');

        }
      });
});

// Let’s create our middleware:
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

//Get One
app.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

app.put('/update',urlencodedParser, function(req, res) {

    console.log(req.body);
    const id = req.body.uid;
    const update ={
          name :req.body.username,
          email : req.body.email,
          password : req.body.pswrd
    } 
    Post.findByIdAndUpdate(id, update, { new: true })
      .then(updatedPost => {
        res.json(updatedPost);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Unable to update post' });
      });
  });
  
// start the server
app.listen(port ,()=>{
    console.log("app is listening at port 4000");
});



    // return res.sendFile(__dirname +'/dashboard.html');



      
      


