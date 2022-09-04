const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const adminRouter = require('./routes/adminRoutes');

const errorController = require('./controllers/errorController');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan('tiny'));

app.use('/admin', adminRouter);
app.use('*', errorController);

module.exports = app;
