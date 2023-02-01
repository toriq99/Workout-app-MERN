const express = require('express');
const router = express.Router();
const {
    createWorkout,
    getWorkouts,
    getWorkoutid,
    updateWorkout,
    deleteWorkout
} = require('../controller/workoutController')


// GET all workout
router.get('/', getWorkouts)

// GET single workout
router.get('/:id', getWorkoutid)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router;