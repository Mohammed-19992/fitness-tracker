
// Dependencies
let express = require("express");
let path = require("path");
let logger = require("morgan");
let mongoose = require("mongoose");

// let exerciseRoutes = require("./routes/exercises");
// let workoutRoutes = require("./routes/workouts");

// Setting up the port of the application
let PORT = process.env.PORT || 8080;

// Connecting to the workout database
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost/workout',
	{
	  useNewUrlParser: true,
	  useUnifiedTopology: true,
	  useCreateIndex: true,
	  useFindAndModify: false
	}
  );
  

// const URI = process.env.MONGODB_URI || "mongodb://localhost/workout"

// mongoose.connect(URI, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

// Bringing in models
let db = require("./models");

// Createing an instance of the express app.
let app = express();

app.use(logger("dev"));

// Boddy parser handling post requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Hosting static Files so css and js files can be retrieved
app.use(express.static("public"));

/******************************* Routes ****************************/

app.get("/exercise", (request, respond) => {
	respond.sendFile(path.join(__dirname, "./public/exercise.html"));
});
app.get("/stats", (request, respond) => {
	respond.sendFile(path.join(__dirname, "./public/stats.html"));
});
app.get("/stats", (request,respond) => {
	respond.sendFile(path.join(__dirname, 'public', 'stats.html'));
  });

/******************************* MiddleWare **************************/

// Get Requests
app.get("/api/workouts", (request, respond) => {
	db.Workout.find({}, null, { sort: { day: 1 } })
		.populate("exercises")
		.then((dbWorkout) => {
			respond.json(dbWorkout);
		})
		.catch((error) => {
			respond.json(error);
		});
});

app.get("/api/workouts/range", (request, respond) => {
	db.Workout.find({}, null, { sort: { day: 1 } })
		.populate("exercises")
		.then((dbWorkout) => {
			respond.json(dbWorkout);
		})
		.catch((error) => {
			respond.json(error);
		});
});

// Put Requests
app.put("/api/workouts/:id", (request, respond) => {
	var workoutID = request.params.id;
	db.Exercise.create(request.body)
		.then(({ _id }) =>
			db.Workout.findOneAndUpdate(
				{ _id: workoutID },
				{ $push: { exercises: _id } },
				{ new: true }
			)
		)
		.then((dbWorkout) => {
			respond.json(dbWorkout);
		})
		.catch((err) => {
			respond.json(error);
		});
});

// Post Requests
app.post("/api/workouts", (request, respond) => {
	db.Workout.create(request.body)
		.then((dbWorkout) => {
			respond.json(dbWorkout);
		})
		.catch((error) => {
			respond.json(error);
		});
});


/************************** Connecting to database *************************/

// Starting the server so it can begin listening to requests.
app.listen(PORT, () => {
	console.log(`The application is listening on: ${PORT}`);
});
