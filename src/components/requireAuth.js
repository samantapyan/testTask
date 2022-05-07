import {Navigate, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {setUser} from "../store/reducers/userReducer";


export const RequireAuth =({children}) => {
    const auth = getAuth();
    const dispatch = useDispatch()
    const userData = useSelector(state => {
            return    state.user
            }
    )

    console.log("Auth is star",userData);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // const uid = user.uid;
            console.log("Finaly",user);
            const {email, uid} = user
            dispatch(setUser({email, uid}))

        } else {

        }
    });






    console.log("Auth is",userData);
    return userData ? children : <Navigate to={'/login'}/>
}