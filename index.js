const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Message = require('./message.js');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/messages', {
  useNewUrlParser: true
}).then(() => {
  console.log("Connected to Database");
}).catch((err) => {
  console.log("Not Connected to Database ERROR! ", err);
});

app.get('/', (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      console.log(err);
    } else {
      console.log(messages);
      res.render('index.ejs',{
        messages: messages
      });
    }
  });
});

app.post("/update", (req, res) => {
  Message.create({message: req.body.message}, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});