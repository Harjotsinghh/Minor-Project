const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);

const authRoutes = require('./routes/auth');
const infoRoutes = require('./routes/info');

app.set('views', 'views');
app.set('view engine','ejs');

const mongoDb_URI = 'mongodb+srv://harjot:JD4CN2vk6ZAYXsK@cluster0.vuvyc.mongodb.net/minor_proj?retryWrites=true&w=majority';

var store = new mongoDbStore({
    uri: mongoDb_URI,
    collection :'mySessions'
});

app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret:'aja_mexico_chaliae',
    saveUninitialized:false,
    resave:false,
    store:store,
}));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(authRoutes);
app.use(infoRoutes);

mongoose.connect(mongoDb_URI,{useNewUrlParser: true,useUnifiedTopology: true })
.then(result =>{
    app.listen(8080);
})
.catch(err=> {
    console.log(err);
});