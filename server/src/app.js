require('dotenv').config({ path: './server/.env' });

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const passport = require('passport');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const {errorHandler} = require('./middleware/errors');
const path = require("node:path");
const upload = require("./middleware/fileUploads");

const {sequelize, testConnection, syncDatabase } = require('./db/connection');
const {seedDatabase} = require('./db/seeder');

testConnection();
/*seedDatabase()
    .then(() => {
        console.log('Database seeded successfully.');
    })
    .catch((error) => {
        console.error('Error during seeding:', error);
    });*/

const app = express();
const sess = {
    secret: 'secret',
    cookie: {}
};

app.use('/uploads', express.static(path.join(__dirname, '../', 'uploads'), {
    setHeaders: (res, path) => {
        res.setHeader('Cache-Control', 'no-store');
    },
    fallthrough: false
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(session(sess));

var corsOptions = {
    origin: 'http://localhost:5173', //client
    credentials: true
};

app.use(cors(corsOptions));
app.use(errorHandler);

app.use('/swagger/index', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
app.use('/payments', require('./routes/payment'));
app.use('/prescriptions', require('./routes/prescription'));
app.use('/procedures', require('./routes/procedure'));

// files
app.post('/upload', upload.single('profile_pic'), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        res.status(200).json({
            message: 'File uploaded successfully',
            filePath: `http://localhost:${process.env.PORT || 5000}/uploads/${file.filename}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error uploading file: ${error.message}` });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
