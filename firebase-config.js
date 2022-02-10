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
  apiKey: 'AIzaSyDPqu_dWvqMbFRfvRWbOCnYkbwtgaHMBW8',
  authDomain: 'khet-aabba.firebaseapp.com',
  databaseURL:
    'https://khet-aabba-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'khet-aabba',
  storageBucket: 'khet-aabba.appspot.com',
  messagingSenderId: '973136242528',
  appId: '1:973136242528:web:a3858d0a90cd3ed534a005',
  measurementId: 'G-FLJ73ST17K',
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

const updateProfileName = async (name) => {
  const res = await updateProfile(auth?.currentUser, {
    displayName: name,
  });
  console.log('res updateProfile: ', res);
};

export { auth, signIn, onAuthStateChanged, signOut, signUp, updateProfileName };
