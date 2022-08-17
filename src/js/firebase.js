import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAP43wEpuyohjDwu9XglrJkW62KZ8eVWM8',
  authDomain: 'vue-noteballs-udemy-project.firebaseapp.com',
  projectId: 'vue-noteballs-udemy-project',
  storageBucket: 'vue-noteballs-udemy-project.appspot.com',
  messagingSenderId: '121985630570',
  appId: '1:121985630570:web:137768dce190e2d4baa513'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {
    db,
    auth
}