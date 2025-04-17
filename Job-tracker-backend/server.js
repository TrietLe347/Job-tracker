const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/jobs',jobRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000,() => console.log('Server running on port 5000'));
    })
    .catch(err => console.error(err));

    console.log('Loaded secret:', process.env.JWT_SECRET);