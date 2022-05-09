import firebase from "./../../../services/firebase"

export function requestAddTextBlock(textBlockData) {
    console.log("adding TEXT bLOCK", textBlockData);
    try {
        let request =  firebase.addSingleDoc(textBlockData, 'textBlocks')
        return request
    } catch (e) {}
}


export function requestGetTextBlock() {
    try {
        return firebase.getDocs('textBlocks')
    } catch (e) {}
}

export function requestUpdatTextBlock(data) {
    try {
        return  firebase.setSingleDoc('textBlocks', data)

    } catch (e) {}
}


