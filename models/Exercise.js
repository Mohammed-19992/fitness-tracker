let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ExerciseSchema = new Schema({
	// creating type attribute
	type: String,

    // creating name attribute
	name: String,

	// creating duration attribute
	duration: Number,

	// creating distance attribute
	distance: Number,

	// creating weight attribute
	weight: Number,

	// creating reps attribute
	reps: Number,

	// creating sets attribute
	sets: Number,
});

let Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;