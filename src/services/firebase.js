import { getDocs, deleteDoc,  query, getDoc, addDoc, collection, setDoc, doc } from 'firebase/firestore';
import {db} from './firebaseConfig'


class firebaseService {
    getSingleDoc = (data, callback) => {
        const {id, collectionName} = data
        const docRef = doc(db, collectionName, id);
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                callback(docSnap.data())
            }
        })
    }

    getDocs = (collectionName) => {
        try {
            let result = []
            const q = query(collection(db, collectionName))
            return getDocs(q);
        } catch (e) {
        }
    }

    addSingleDoc = (data, collectionName) => {
        return addDoc(collection(db, collectionName), data)
    }

    deleteSingleDoc = (uid, collectioName,  callback) => {
        try {
            deleteDoc(doc(db, collectioName, uid)).then(e => {
                callback()
            }).catch(e => {
            })
        }
        catch (e) {
        }
    }

    setSingleDoc = async (collectionName, data) => {
        try {
            const { id } = data
            return setDoc(doc(db, collectionName, id), data);
        } catch (e) {
        }
    }

     addUser = async (userData, callback) => {
        try {
            await addDoc(collection(db, "users"), userData );
            callback(true)
        } catch (e) {
        }
    }

}


const app = new firebaseService()
export default app