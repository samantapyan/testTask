import {initializeApp }from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from "@firebase/firestore"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCl_hdyWl4hoFoERZtdIgQ3T7hREDuJDrc",
    authDomain: "test--task.firebaseapp.com",
    projectId: "test--task",
    storageBucket: "test--task.appspot.com",
    messagingSenderId: "440905968142",
    appId: "1:440905968142:web:ec97b5262ab2570147ea5f",
    measurementId: "G-E7L2HT2ND3"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const analytics = getAnalytics(app);
