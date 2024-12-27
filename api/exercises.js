import express from 'express';
import cors from 'cors';

// Create the Express app
const app = express();
app.use(cors());
app.use(express.json());

// Exercise Data
// Comprehensive Exercise Data
const exercises = [
    // Chest
    { id: 1, name: 'Pushup', target: 'Chest', sets: 3, reps: 8, timePerSet: 2 },
    { id: 2, name: 'Bench Press', target: 'Chest', sets: 3, reps: 10, timePerSet: 4 },
    { id: 3, name: 'Incline Bench Press', target: 'Chest', sets: 3, reps: 10, timePerSet: 4 },
    { id: 4, name: 'Chest Fly', target: 'Chest', sets: 3, reps: 12, timePerSet: 3 },
    { id: 5, name: 'Cable Crossover', target: 'Chest', sets: 3, reps: 12, timePerSet: 3 },
    { id: 6, name: 'Pec Deck', target: 'Chest', sets: 3, reps: 15, timePerSet: 2 },
    
    // Back
    { id: 7, name: 'Pullup', target: 'Back', sets: 3, reps: 8, timePerSet: 3 },
    { id: 8, name: 'Deadlift', target: 'Back', sets: 3, reps: 6, timePerSet: 5 },
    { id: 9, name: 'Bent Over Row', target: 'Back', sets: 3, reps: 10, timePerSet: 4 },
    { id: 10, name: 'Lat Pulldown', target: 'Back', sets: 3, reps: 12, timePerSet: 3 },
    { id: 11, name: 'Seated Row', target: 'Back', sets: 3, reps: 12, timePerSet: 3 },
    { id: 12, name: 'Face Pull', target: 'Back', sets: 3, reps: 12, timePerSet: 2 },
  
    // Legs
    { id: 13, name: 'Squat', target: 'Legs', sets: 3, reps: 12, timePerSet: 4 },
    { id: 14, name: 'Lunge', target: 'Legs', sets: 3, reps: 12, timePerSet: 3 },
    { id: 15, name: 'Leg Press', target: 'Legs', sets: 3, reps: 10, timePerSet: 4 },
    { id: 16, name: 'Hamstring Curl', target: 'Legs', sets: 3, reps: 12, timePerSet: 2 },
    { id: 17, name: 'Leg Extension', target: 'Legs', sets: 3, reps: 15, timePerSet: 2 },
    { id: 18, name: 'Calf Raise', target: 'Legs', sets: 3, reps: 20, timePerSet: 2 },
  
    // Shoulders
    { id: 19, name: 'Shoulder Press', target: 'Shoulders', sets: 3, reps: 12, timePerSet: 3 },
    { id: 20, name: 'Lateral Raise', target: 'Shoulders', sets: 3, reps: 15, timePerSet: 2 },
    { id: 21, name: 'Front Raise', target: 'Shoulders', sets: 3, reps: 12, timePerSet: 2 },
    { id: 22, name: 'Arnold Press', target: 'Shoulders', sets: 3, reps: 10, timePerSet: 3 },
    { id: 23, name: 'Shrugs', target: 'Shoulders', sets: 3, reps: 15, timePerSet: 2 },
    { id: 24, name: 'Face Pull', target: 'Shoulders', sets: 3, reps: 12, timePerSet: 2 },
  
    // Biceps
    { id: 25, name: 'Bicep Curl', target: 'Biceps', sets: 3, reps: 10, timePerSet: 2 },
    { id: 26, name: 'Hammer Curl', target: 'Biceps', sets: 3, reps: 12, timePerSet: 2.5 },
    { id: 27, name: 'Concentration Curl', target: 'Biceps', sets: 3, reps: 12, timePerSet: 2 },
    { id: 28, name: 'Preacher Curl', target: 'Biceps', sets: 3, reps: 12, timePerSet: 3 },
    { id: 29, name: 'Cable Curl', target: 'Biceps', sets: 3, reps: 15, timePerSet: 2 },
    { id: 30, name: 'Incline Dumbbell Curl', target: 'Biceps', sets: 3, reps: 12, timePerSet: 3 },
  
    // Triceps
    { id: 31, name: 'Tricep Dip', target: 'Triceps', sets: 3, reps: 8, timePerSet: 3 },
    { id: 32, name: 'Overhead Tricep Extension', target: 'Triceps', sets: 3, reps: 12, timePerSet: 2 },
    { id: 33, name: 'Tricep Pushdown', target: 'Triceps', sets: 3, reps: 12, timePerSet: 2 },
    { id: 34, name: 'Skullcrusher', target: 'Triceps', sets: 3, reps: 12, timePerSet: 3 },
    { id: 35, name: 'Close-Grip Bench Press', target: 'Triceps', sets: 3, reps: 10, timePerSet: 4 },
    { id: 36, name: 'Kickbacks', target: 'Triceps', sets: 3, reps: 15, timePerSet: 2 },
  
    // Core
    { id: 37, name: 'Plank', target: 'Core', sets: 3, reps: 1, timePerSet: 60 },
    { id: 38, name: 'Crunch', target: 'Core', sets: 3, reps: 20, timePerSet: 2 },
    { id: 39, name: 'Leg Raise', target: 'Core', sets: 3, reps: 15, timePerSet: 2 },
    { id: 40, name: 'Russian Twist', target: 'Core', sets: 3, reps: 20, timePerSet: 2 },
    { id: 41, name: 'Bicycle Crunch', target: 'Core', sets: 3, reps: 20, timePerSet: 2 },
    { id: 42, name: 'Hanging Knee Raise', target: 'Core', sets: 3, reps: 12, timePerSet: 3 },
  ];

// Default Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Exercise API! Use /exercises or /generateWorkout to fetch data.');
});

// Intelligent Workout Plan Generator
app.get('/generateWorkout', (req, res) => {
  const { target, time } = req.query;

  if (!target || !time) {
    return res.status(400).send('Please provide both target muscle(s) and workout time.');
  }

  const targetMuscles = target.split(',');
  const availableTime = parseInt(time, 10);

  const muscleExercises = {};
  targetMuscles.forEach((muscle) => {
    muscleExercises[muscle] = exercises.filter(
      (exercise) => exercise.target.toLowerCase() === muscle.toLowerCase()
    );
  });

  const timePerMuscle = Math.floor(availableTime / targetMuscles.length);
  const workoutPlan = [];
  let totalTime = 0;

  targetMuscles.forEach((muscle) => {
    let muscleTime = 0;
    const selectedExercises = [];
    const availableExercises = [...muscleExercises[muscle]];

    while (muscleTime < timePerMuscle && availableExercises.length > 0) {
      const exercise = availableExercises.shift();
      const exerciseTime = exercise.sets * exercise.timePerSet;

      if (muscleTime + exerciseTime <= timePerMuscle) {
        selectedExercises.push(exercise);
        muscleTime += exerciseTime;
      }
    }

    workoutPlan.push(...selectedExercises);
    totalTime += muscleTime;
  });

  res.json({ workoutPlan, totalTime });
});

// Export as a serverless function
export default app;
