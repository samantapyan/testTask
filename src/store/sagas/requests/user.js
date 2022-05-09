import firebase from "./../../../services/firebase"


export function requestGetUser(data) {
    return firebase.getSingleDoc(data)
}