const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");
const con = require("./connection");

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var transporter = nodemailer.createTransport( {
  service: 'gmail',
  auth: {
    user: 'pandeykedarnath18200@gmail.com',
    pass: 'Shubh2018@4662'
  }
});

var message = "";

app.get("/", function(req, res) {
  res.render("pn");
});
app.get("/registerNew", function(req, res) {
  res.render("registerNew", {message : message});
})

app.post("/registerNew", function(req, res) {
  var name = req.body.name;
  var address = req.body.address;
  var degree = req.body.degree;
  var mno = req.body.mno;
  var email = req.body.email;

  con.connect(function(error) {
    if(error) console.log(error);

    var sql = "INSERT INTO userdetail (name, address, degree, mno, email) VALUES('"+name+"', '"+address+"', '"+degree+"', '"+mno+"', '"+email+"')";
    con.query(sql, function(err, result) {
      if(err) console.log(err);

      message = "";
      message = "Thank You for you intrest. You will get an email soon.";

      var mailOptions = {
        from: 'pandeykedarnath18200@gmail.com',
        to: email,
        subject: "Application form",
        text: `We want to know more about you kindly send your resume and additional documents to us`
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.redirect("registerNew");
    });
  });
});



app.listen(3000, function() {
  console.log("Server started at 3000 port.");
});
