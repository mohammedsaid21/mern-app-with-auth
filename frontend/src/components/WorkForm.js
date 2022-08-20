import React, { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkForm = ({ workout, setWorkout, setFlag }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const [err, setErr] = useState();

  const submitWorkout = async (e) => {
    e.preventDefault();

    if (!user) {
      setErr("You Must be logged in");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(workout),
    };

    const response = await fetch("/api/workouts/", requestOptions).catch(
      (error) => setErr(error)
    );

    const json = response.json();

    if (!response.ok) {
      setErr(json.error);
    }
    if (response.ok) {
      dispatch({ type: "CREATE_WORKOUTS", payload: json });
      setFlag((prev) => !prev);
    }
  };

  const onChange1 = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form className="workout-form" onSubmit={submitWorkout}>
        <h4>Add New Workout</h4>
        <input
          onChange={onChange1}
          type="text"
          placeholder="Enter your Title"
          name="title"
        />
        <input
          onChange={onChange1}
          type="number"
          placeholder="Enter your Load"
          name="load"
        />
        <input
          onChange={onChange1}
          type="number"
          placeholder="Enter your Reps"
          name="reps"
        />
        <span>{err}</span>
        <button>Submit Data</button>
      </form>
    </div>
  );
};

export default WorkForm;
