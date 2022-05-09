import {Navigate} from 'react-router-dom'
import { useAuthState} from 'react-firebase-hooks/auth'
import {auth} from "../services/firebaseConfig";


export const RequireAuth =({children}) => {
    const [user] = useAuthState(auth)
    return user ? children : <Navigate to={'/login'}/>
}