const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

require('./config/passport')(passport);
require('dotenv').config();

const app = express();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


//mongoose.connect()
app.get('/', (req, res) => {
    res.send("<h1>Главная страница</h1>");
});

app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));