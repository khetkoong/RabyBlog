// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import {
  addDoc,
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  limit,
  orderBy,
} from 'firebase/firestore';
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
  let result = false;
  await updateProfile(auth?.currentUser, {
    displayName: name,
  });
  result = true;
  return result;
};

const createPost = async (userOwner, post) => {
  let result = false;
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      postOwner: userOwner,
      post: post,
      timestamp: new Date(),
    });
    result = true;
    console.log('Document written with ID: ', docRef.id);
  } catch {
    console.error('Error adding document: ', e);
  }
  return result;
};

const getDataFromDoc = async (docName) => {
  const collections = [];
  const docRef = collection(db, docName);
  const q = query(docRef, orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
    const date = doc.data()?.timestamp?.seconds.toString();
    const newDate = `${date}000`;
    collections.push({
      ...doc.data(),
      timestamp: new Date(+newDate).toString(),
      postId: doc.id,
    });
  });
  return collections;
};

export {
  auth,
  signIn,
  onAuthStateChanged,
  signOut,
  signUp,
  updateProfileName,
  createPost,
  getDataFromDoc,
};
