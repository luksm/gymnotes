import React from "react";

const lbsToKg = (lbs) => (lbs * 0.453592).toFixed(2);
const kgToLbs = (kg) => (kg * 2.20462).toFixed(2);

const WorkoutList = ({ workouts, deleteWorkout, setWorkoutToEdit }) => {
  const getHeaviestLoad = (sets) => {
    if (!sets || sets.length === 0) return 0;
    const loads = sets.map((set) =>
      set.unit === "lbs" ? parseFloat(set.load) : parseFloat(set.load) * 2.20462
    );
    return Math.max(...loads).toFixed(2);
  };

  return (
    <div className="space-y-4 mt-6">
      {workouts.map((workout, index) => (
        <div key={index} className="p-4 border rounded bg-white shadow-sm">
          <div className="mb-2">
            <h2 className="text-lg font-semibold">{workout.exercise}</h2>
            <p className="text-sm text-gray-600">Date: {workout.date}</p>
            <p className="text-sm text-gray-600">
              Heaviest Load: {getHeaviestLoad(workout.sets)} lbs
            </p>
          </div>

          <div className="space-y-2">
            {workout.sets.map((set, i) => (
              <div
                key={i}
                className="flex justify-between text-sm bg-gray-50 p-2 rounded"
              >
                <span>Set {i + 1}</span>
                <span>{set.reps} reps</span>
                <Load load={set.load} unit={set.unit} />
              </div>
            ))}
          </div>

          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => setWorkoutToEdit(workout)}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteWorkout(index)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

function Load({ load, unit }) {
  if (unit !== "lbs" && unit !== "kgs") {
    return (
      <span>
        {load} {unit}
      </span>
    );
  }
  if (unit === "lbs") {
    return (
      <span>
        {load} lbs ({lbsToKg(load)} kg)
      </span>
    );
  }
  if (unit === "kgs") {
    return (
      <span>
        {kgToLbs(load)} lbs ({load} kg)
      </span>
    );
  }
  return null;
}

export default WorkoutList;
