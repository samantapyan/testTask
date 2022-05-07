import firebase from "./../../../services/firebase"


export function requestGetUser(data) {
    console.log("2nd s", data);
    return firebase.getSingleDoc(data)
}