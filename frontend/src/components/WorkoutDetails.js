import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout, setFlag }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const deleteWorkout = async () => {

    if( !user ) return

    const requestOptions = {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    };

    const response = await fetch(`/api/workouts/${workout._id}`, requestOptions)
      // .then((response) => response.json())
      .catch((error) => console.log(error));

    const json = response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
      setFlag((prev) => !prev);
    }
  };

  return (
    <>
      <div className="workout-details">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4> {workout.title} </h4>
          <span onClick={() => deleteWorkout()}>X</span>
        </div>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Number of reps: </strong>
          {workout.reps}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </>
  );
};

export default WorkoutDetails;
