// Requiring the dependecies
let workdb = require("../models/workout")
module.exports = (app) => {

    // Get requests
    app.get("/api/workouts", (request, respond) => {
        workdb.find({})
            .then(dataWorkout => {
                dataWorkout.forEach(workdb => {
                    let sumDuration = 0;
                    workdb.exercises.forEach(exercise => {
                        sumDuration += exercise.duration;
                    });
                    workdb.totalDuration = sumDuration;
                });
                respond.json(dataWorkout);
            }).catch(err => {
                respond.json(err);
            });
    });
    
     app.get("/api/workouts/range", (request, respond) => {
        workdb.find({}).then(dataWorkout => {
            respond.json(dataWorkout);
        }).catch(err => {
            respond.json(err);
        });

    });


    // Put requests
    app.put("/api/workouts/:id", (request, respond) => {

        workdb.findOneAndUpdate(
            { _id: request.params.id },
            {
                $inc: { totalDuration: request.body.duration },
                $push: { exercises: request.body }
            },
            { new: true }).then(dataWorkout => {
                respond.json(dataWorkout);
            }).catch(err => {
                respond.json(err);
            });

    });

    // Post requests
    app.post("/api/workouts", ({ body }, respond) => {
        let workouts = new workdb(body);
        (workouts) => {
            workouts.forEach(workdb => {
                let sumDuration = 0;
                workdb.exercises.forEach(exercise => {
                    sumDuration += exercise.duration;
                });
                workdb.totalDuration = sumDuration;
            });
        }
        workdb.create(workouts).then((workoutdb => {
            console.log(workoutdb);
            respond.json(workoutdb);
        })).catch(err => {
            respond.json(err);
        });
    });

   

}