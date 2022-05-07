import { getDocs, deleteDoc,  query, where, getDoc, addDoc, collection, orderBy, limit, setDoc, doc } from 'firebase/firestore';
import {db} from './firebaseConfig'


class firebaseService {
    getSingleDoc = (data, callback) => {
        const {id, collectionName} = data
        const docRef = doc(db, collectionName, id);
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                callback(docSnap.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }
    addSingleDoc = (data, collectionName, callback) => {
        addDoc(collection(db, collectionName), data).then(docSnap => {
          callback()
        })
    }
    deleteDoc = (uid, collectioName,  callback) => {
        deleteDoc(doc(db, collectioName, uid)).then(e => {
            callback()
        })
    }


    addBlog = async (blog, callback) => {
        try {
            const docRef = await addDoc(collection(db, "blogs"), blog );
            callback({...blog, uid: docRef.id})
        } catch (e) {
            console.log(" error -", e)
        }
    }
    setBlog = async (blog,uid, callback) => {
        try {
            await setDoc(doc(db, "blogs", uid), blog );
            callback(true)
        } catch (e) {
            console.log(" error -", e)
        }
    }

    getUser = async (uid, callback) => {
        try {
            const q = query(collection(db, "users"), where('uid', '==', uid));
            const querySnapshot = await getDocs(q);

            let result = []
            querySnapshot.forEach((doc) => {
                result.push({uid:doc.id, ...doc.data()})
            });



            callback(result.length ? result[0]: false)

        } catch (e) {
            console.log("Some erroR -----------------------", e)
        }
    }

    getBlogs = async (callback) => {
        try {
           let result = []
            const q = query(collection(db, "blogs"), orderBy('date'), limit(10));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                result.push({uid:doc.id, ...doc.data()})
            });



            callback(result)
        } catch (e) {
            console.log("Some erro", e)
        }
    }

     addUser = async (userData, callback) => {
        try {
            await addDoc(collection(db, "users"), userData );
            callback(true)
        } catch (e) {
            console.log("Some error", e)
        }
    }

}


const app = new firebaseService()
export default app