import {
    initializeApp
} from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
    getAuth
} from 'firebase/auth'
import {
    getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBqtbQY06i1Z3ezsilIN2HT3lpDtdbHSfU", // add to config file
    authDomain: "vue-test-project-c6cd7.firebaseapp.com",
    projectId: "vue-test-project-c6cd7",
    storageBucket: "vue-test-project-c6cd7.appspot.com",
    messagingSenderId: "1033036664141",
    appId: "1:1033036664141:web:949fb8736943fc48237b04",
    measurementId: "G-9MHMHFB3CQ"
};
const app = initializeApp(firebaseConfig);

//utils 
const db = getFirestore(app)
const auth = getAuth(app)
// const analytics = getAnalytics(app);

// collection references 
const usersCollection = db.collection('users')
console.log(process.env.FIREBASE_API_KEY)
export {
    db,
    auth,
    usersCollection
}