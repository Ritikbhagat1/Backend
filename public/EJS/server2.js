const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlencodedparser = bodyParser.urlencoded({extended:false});
const app = express();
app.set("view engine", "ejs");




mongoose.connect(("mongodb://127.0.0.1:27017/file")  ,{ useNewUrlParser: true ,
    useUnifiedTopology: true}).then(() => {
        console.log('Connected to MongoDB')})
        .catch((err) =>{
          console.error('Error connecting to mongodb',err);
        });


      const imageSchema = new mongoose.Schema({
        name:String,
        contentType:String,
        data:Buffer
      });

      const Image =mongoose.model('Image',imageSchema);

      const multer = require('multer');
      const storage = multer.memoryStorage();
      const upload= multer({storage: storage});
``

      // route for magic page
      app.get("/", function(req,res){
        const data = { message: "hello" };
      res.render("../view/partials/magic", data);
      });

      app.post("/post",urlencodedparser , function(req,res){
         
      })
      app.post('/upload',upload.single('myFile'), (req,res,next) =>{
        const image = new Image({
          name:req.file.originalname,
          contentType: req.file.mimetype,
          data: req.file.buffer
        });
      

      image.save((err) =>{
        if(err){
          return next(err);
        }

        res.send('file uploaded successfully');
      });

      });

      app.get('/image/:id', (req, res, next) => {
        const id = req.params.id
        ;
      
        Image.findOne({ _id:id }, (err, image) => {
          if (err) {
            return next(err);
          }
      
          res.set('Content-Type', image.contentType);
          res.send(image.data);
        });
      });
      

app.listen(4000,function(){
  console.log(" server is listening at port 4000");
});
 

