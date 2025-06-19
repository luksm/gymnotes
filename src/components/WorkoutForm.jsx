import React, { useState, useEffect } from "react";

const EXERCISE_OPTIONS = [
  "Barbell Squat",
  "Dumbbell Goblet Squat",
  "Rack Pull",
  "Lying Hamstring Curl",
  "Standing Barbell Shoulder Press",
  "Barbell Bench Press",
  "Dumbbell Pullover",
  "Incline Dumbbell Chest Press",
  "Single Arm Cable Triceps Extension",
];

const WorkoutForm = ({ addWorkout, editWorkout, workoutToEdit, clearEdit }) => {
  const [exercise, setExercise] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [sets, setSets] = useState([{ reps: "", load: "", unit: "lbs" }]);

  useEffect(() => {
    if (workoutToEdit) {
      setExercise(workoutToEdit.exercise);
      setDate(workoutToEdit.date);
      setSets(workoutToEdit.sets);
    }
  }, [workoutToEdit]);

  const handleSetChange = (index, field, value) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = value;
    setSets(updatedSets);
  };

  const addSet = () => {
    setSets([...sets, { reps: "", load: "", unit: "lbs" }]);
  };

  const removeSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workout = { exercise, date, sets };
    workoutToEdit ? editWorkout(workout) : addWorkout(workout);
    clearForm();
  };

  const clearForm = () => {
    setExercise("");
    setDate("");
    setSets([{ reps: "", load: "", unit: "lbs" }]);
    clearEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <select
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        className="p-2 border rounded"
        required
      >
        <option value="">Select Exercise</option>
        {EXERCISE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border rounded"
        required
      />

      {sets.map((set, index) => (
        <div
          key={index}
          className="flex flex-col space-y-2 border p-2 rounded bg-gray-50"
        >
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Reps"
              value={set.reps}
              onChange={(e) => handleSetChange(index, "reps", e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="number"
              placeholder="Load"
              value={set.load}
              onChange={(e) => handleSetChange(index, "load", e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
            <select
              value={set.unit}
              onChange={(e) => handleSetChange(index, "unit", e.target.value)}
              className="p-2 border rounded"
            >
              <option value="lbs">lbs</option>
              <option value="kgs">kgs</option>
            </select>
          </div>
          {sets.length > 1 && (
            <button
              type="button"
              onClick={() => removeSet(index)}
              className="text-red-500 text-sm self-end"
            >
              Remove Set
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addSet}
        className="p-2 bg-gray-200 rounded"
      >
        ➕ Add Set
      </button>

      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        {workoutToEdit ? "Update Workout" : "Add Workout"}
      </button>

      {workoutToEdit && (
        <button
          type="button"
          onClick={clearForm}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default WorkoutForm;
