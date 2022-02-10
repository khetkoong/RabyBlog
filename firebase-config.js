// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { addDoc, getFirestore, collection } from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as signOutFirebase,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

// Initialize Firebase
const app = !getApps()?.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();
const db = getFirestore();

const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signOut = () => {
  return signOutFirebase(auth);
};

const signUp = (email, password, displayName, cb) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userId = user?.uid;
      try {
        const docRef = await addDoc(collection(db, 'users'), {
          email: email,
          displayName: displayName,
          userId: userId,
        });
        if (cb) {
          updateProfile(user, {
            displayName: displayName,
          });
          cb(true, user);
        }
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        cb(false);
        console.error('Error adding document: ', e);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export { auth, signIn, onAuthStateChanged, signOut, signUp };
