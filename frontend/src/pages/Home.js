import { useEffect }from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import {useAuthContext} from "../hooks/useAuthContext"
// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const {user}=useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      //we need to add authorization headers
      const response = await fetch('/api/workouts',{ 
        headers:{ 
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json() // the response that we get from the server 

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json}) // the payload contains the data from the server
      }
    }
    // verify if there's a user login in 
    if (user){ 
    fetchWorkouts()
    }

  }, [dispatch,user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home