const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const db = require('./config/db');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser')

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
const {
  engine
} = require('express-handlebars');
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    getImage: (images) => { return images[0] },
    code: (str) => String(str).slice(0, 6) + '***' + String(str).slice(-4), 
    checkout: (number) => (number == 1) ? 'Tiền mặt' : 'Ví điện tử',
    role: (role) => (role == true) ? 'Quản lý' : 'Nhân viên',
    opm: (email) => (email != 'admin@gmail.com') ? 'display: none' : '',
    manager: (e) => (e != true) ? 'display: none' : '',
    online: (status) => {
      if(status==true){
        return `<div class="d-flex flex-row align-items-center"><i class="fas fa-circle" style="color: green; margin-right: 3px"></i><b>Offline</b></div>`;
      } else {
        return `<div class="d-flex flex-row align-items-center"><i class="fas fa-circle" style="color: red; margin-right: 3px"></i><b>Offline</b></div>`;
      }
    },
    deleteProductButton: (code) => (code==3) ? 'display: none' : '',
    restoreProductButton: (code) => (code==3) ? '' : 'display: none',
    sellOutProductButton: (code) => (code==3 || code==2) ? 'display: none' : '',
    sellingProductButton: (code) => (code==2) ? '' : 'display: none',
    buttons: (code) => (code==1) ? '' : 'display: none',
    orderButton: (code) => (code==1) ? 'Xử lý' : 'Xem',
    convert: (date) => String(date).slice(0, 24),
    colors: (number) => {
      switch(number){
        case 1:
        return 'blue'

        case 2:
        return 'green'

        case 3:
        return 'violet'

        case 1:
        return 'red'

      }
    }, 
    productColors: (number) => (number == 1) ? 'green' : ( number == 2 ? 'black' : 'red'), 
    sortable: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default';
      const icons = {
        default: 'swap-vertical-outline',
        asc: 'chevron-up-outline',
        desc: 'chevron-down-outline'
      };
      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      }

      const icon = icons[sortType];
      const type = types[sortType];

      return `<a href="?_sort&column=${field}&type=${type}">
        <ion-icon name="${icon}" style="color: blue; margin-left: 10px"></ion-icon>
      </a>`
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));




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