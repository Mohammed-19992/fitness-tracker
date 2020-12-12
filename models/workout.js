let mongoose = require("mongoose");

// let workoutSchema = new schema({
//   name: { type: String, required: true },
//   workout: { type: Array }
// });

let Schema = mongoose.Schema;

let WorkoutSchema = new Schema({
	// Creating a day attribute
	day: {
		type: Date,
	},
	// creating exercise details
	exercises: [
		{
			type: Schema.Types.ObjectId,
			ref: "Exercise",
		},
	],
});

let Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;