import { useEffect, useState } from "react"

// components
import WorkForm from "../components/WorkForm"
import WorkoutDetails from "../components/WorkoutDetails"

import { useWorkoutContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
  // const [workouts, setWorkouts] = useState(null)

  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext()

  const [workout, setWorkout] = useState(null);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}` 
        }
      })
      const json = await response.json()

      if (response.ok) {
        // setWorkouts(json)
        dispatch({ type: "SET_WORKOUTS", payload: json })
      }
    }

    if(user)  fetchWorkouts()
  }, [setWorkout, dispatch, flag, user])
  const styl  = {color: 'red', textAlign: 'center', paddingTop: '150px'}
  return (
    <div className="home">
      <div className="workouts">
        {workouts ? workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} setFlag={setFlag} />
        ))
      : <h2 style={styl}>Please Login In To See The Workouts</h2>
      }
      </div>
      <WorkForm workout={workout} setWorkout={setWorkout} setFlag={setFlag}  />
    </div>
  )
}

export default Home