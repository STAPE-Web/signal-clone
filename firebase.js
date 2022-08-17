import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore'
import 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB9rXJE7w7HXGGryneYlxkYqjyUL3WCKhg",
    authDomain: "signal-clone-6c7a2.firebaseapp.com",
    projectId: "signal-clone-6c7a2",
    storageBucket: "signal-clone-6c7a2.appspot.com",
    messagingSenderId: "306969736532",
    appId: "1:306969736532:web:b716092e582a4ea30f84c1"
};

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

export { db, auth };