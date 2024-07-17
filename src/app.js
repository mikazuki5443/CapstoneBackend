const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

module.exports = app;