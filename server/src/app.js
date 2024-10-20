const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('swagger.json');

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
app.use('/appointments', require('./routes/appointment'));
app.use('/services', require('./routes/service'));
app.use('/doctors', require('./routes/doctor'));
app.use('/patients', require('./routes/patient'));
app.use('/receptionists', require('./routes/receptionist'));
app.use('/offices', require('./routes/office'));
app.use('/service-category', require('./routes/serviceCategory'));
app.use('/specializations', require('./routes/specialization'));
app.use('/results', require('./routes/result'));
app.use('/documents', require('./routes/documents'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
