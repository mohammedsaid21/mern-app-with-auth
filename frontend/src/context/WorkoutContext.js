import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
  // set workout === When you get the All Object from the server
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
    } 
  //  create new workout
    case 'CREATE_WORKOUTS':
      return {
        workouts: [action.payload, ...state.workouts]
      }
    case 'DELETE_WORKOUTS':
      return {
        workouts: state.workouts.filter(w => w._id !== action.payload._id)
      }
    default: return state
  }
}

export const WorkoutsContextProvider = ( { children } ) => {

  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  })
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}