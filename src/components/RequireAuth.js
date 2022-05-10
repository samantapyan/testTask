import {Navigate} from 'react-router-dom'
import { useAuthState} from 'react-firebase-hooks/auth'
import {useEffect} from 'react'
import {auth} from "../services/firebaseConfig";
import {useDispatch} from 'react-redux'
import {setUser} from "../store/reducers/userReducer";


export const RequireAuth =({children}) => {
    const dispatch = useDispatch()
    const [user] = useAuthState(auth)

    useEffect(() => {
        if (user && user?.email && user?.uid) {
            dispatch(setUser({email:user.email, uid:user.uid }))
        }
    }, [user])

    return user ? children : <Navigate to={'/login'}/>
}