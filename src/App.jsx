import React, { useState, useEffect } from "react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";

const App = () => {
  const [workouts, setWorkouts] = useState(
    JSON.parse(localStorage.getItem("workouts")) || []
  );
  const [workoutToEdit, setWorkoutToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (workout) => setWorkouts([...workouts, workout]);

  const editWorkout = (updated) => {
    setWorkouts(workouts.map((w) => (w === workoutToEdit ? updated : w)));
    setWorkoutToEdit(null);
  };

  const deleteWorkout = (index) => {
    setWorkouts(workouts.filter((_, i) => i !== index));
  };

  const clearEdit = () => setWorkoutToEdit(null);

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* App logo in a fixed header bar with title on the side */}
      <header className="flex items-center justify-between mb-6">
        <img
          src="/gymnotes/logo.svg"
          alt="GymNotes Logo"
          className="h-10 w-10"
        />
        <h1 className="text-xl font-bold">GymNotes</h1>
      </header>

      <WorkoutForm
        addWorkout={addWorkout}
        editWorkout={editWorkout}
        workoutToEdit={workoutToEdit}
        clearEdit={clearEdit}
      />
      <WorkoutList
        workouts={workouts}
        deleteWorkout={deleteWorkout}
        setWorkoutToEdit={setWorkoutToEdit}
      />
    </div>
  );
};

export default App;
