// This is where the workout db schema will go
let mongoose = require("mongoose");
// let workoutSchema = new schema({
//   name: { type: String, required: true },
//   workout: { type: Array }
// });
let Schema = mongoose.Schema;
let ExerciseSchema = new Schema({

  	// Creating a day attribute
  day: {
    type: Date,
    default: Date.now
  },

	// Creating exercise details
  exercises: [
    {
      	// Creating type attribute
      type: String,

      	// Creating name attribute
      name: String,

        // Creating number attribute
      duration: Number,

      	// Creating weight attribute
      weight: Number,
      	// Creating reps attribute
      reps: Number,

      	// Creating sets attribute
      sets: Number,
      
      	// Creating distance attribute
      distance: Number,
    }
  ],
  // Creating total duration attribute
  totalDuration: Number,
});

  let Workout = mongoose.model("Workout", ExerciseSchema);

  module.exports = Workout ;