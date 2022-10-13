const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const db = require('./config/db');
const path = require('path');
const morgan = require('morgan');
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));
const {
  engine
} = require('express-handlebars');
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));




db.connect();
var session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(session({
  secret: 'myKey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

const route = require('./routes');
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})