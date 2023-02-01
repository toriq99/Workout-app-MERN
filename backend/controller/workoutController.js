const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');


// get all workout
const getWorkouts = async(req, res) => {
    const allWorkouts = await Workout.find({}).sort({createdAt: -1});

    res.json(allWorkouts).status(200);
}

//get single workout
const getWorkoutid = async(req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err:'No such Workout'});
    }

    const singleWorkout = await Workout.findById(id);

    if (!singleWorkout) {
        return res.status(404).json({err : 'No such workout'});
    }

    res.status(200).json(singleWorkout);
}

//create new workout
const createWorkout = async(req, res) => {
    const {title, reps, load} = req.body;

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill all the fields", emptyFields})
    }

    //add doc to db
    try {
        const workout = await Workout.create({title, reps, load});
        res.status(200).json(workout);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

//delete workout
const deleteWorkout = async(req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err:'No such Workout'});
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(400).json({err : 'No such workout'});
    }

    res.status(200).json(deleteWorkout);
}

//update workout
const updateWorkout = async(req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err:'No such Workout'});
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    });

    if (!workout) {
        return res.status(404).json({err: 'No such workout'});
    }

    res.json(workout).status(200);
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkoutid,
    updateWorkout,
    deleteWorkout
}