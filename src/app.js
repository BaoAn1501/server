const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const db = require('./config/db');
db.connect();
var session = require('express-session');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'myKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

const route = require('./routes');
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})