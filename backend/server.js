require('dotenv').config();
const express = require('express');
const workoutRoutes = require('./routes/workout');
const mongoose = require('mongoose')

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// connect mongodb
mongoose.connect(process.env.MONG_URI)
.then(() => {
    // listen to server
    app.listen(process.env.PORT, () => {
        console.log('Connceted to db & listening port ', process.env.PORT);
    })  
})
.catch((err) => {
    
});

// routes
app.use('/api/workouts', workoutRoutes);

