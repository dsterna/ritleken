import 'firebase/firestore'

import firebase from 'firebase/app'

let firebaeConfig = {
    apiKey: "AIzaSyCam1vXotzoIfZT7DyTbF8XSnLe0he-Uto",
    authDomain: "adealbreaker-c9190.firebaseapp.com",
    databaseURL: "https://adealbreaker-c9190.firebaseio.com",
    projectId: "adealbreaker-c9190",
    storageBucket: "adealbreaker-c9190.appspot.com",
    messagingSenderId: "621961109952",
    appId: "1:621961109952:web:ae70fc224efd7b3cb8e825"
}

firebase.initializeApp(firebaeConfig)
export default firebase