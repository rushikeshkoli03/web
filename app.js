var express = require('express');
var mongoose = require('mongoose');
var expressSanitizer = require('express-sanitizer');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect("mongodb://rushi:BoSs@35.188.66.33:27017/test");

app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.use(methodOverride('_method'));

var userSchema = new mongoose.Schema({
   name: String,
   email: String,
   contact: String,
   created: {type: Date, default: Date.now()}
});

var User = mongoose.model("user", userSchema);

app.get("/", function(req, res) {
   res.render("index.ejs");
})

app.get("/myprofile", function(req, res) {
   res.render("myprofile.ejs");
})

app.get("/add", function(req, res) {
   res.render("add.ejs");
})

app.post("/add", function(req, res) {
   req.body.user.body = req.sanitize(req.body.user.body);
   User.create(req.body.user, function(err, newUser) {
      if(err) {
         console.log(err);
         res.redirect("/add");
      } else {
         console.log(newUser);
         res.redirect("/");
      }
   })
})

app.listen(8080, function() {
   console.log("Server started");
});
