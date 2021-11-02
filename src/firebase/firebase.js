import {
    initializeApp
} from "firebase/app";
import {
    getDatabase,
    ref,
    set
} from "firebase/database"

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID
};
const app = initializeApp(firebaseConfig);

const db = getDatabase(app)

export async function saveMessage(messageDto, test) {
    try {
      
        set(ref(db, "messages/" + test), {
            firstName: messageDto.firstName,
            lastName: messageDto.lastName,
            emailAddress: messageDto.emailAddress,
            message: messageDto.message,
        })
    } catch (error) {
      throw new error
    }
}


