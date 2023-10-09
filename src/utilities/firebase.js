// Import the functions you need from the SDKs you need
import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, update, connectDatabaseEmulator } from 'firebase/database';
import { getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_217B5P7p20G3IdSd5QUWPQ2opmCEo4k",
  authDomain: "lostnfound-c4ccf.firebaseapp.com",
  projectId: "lostnfound-c4ccf",
  storageBucket: "lostnfound-c4ccf.appspot.com",
  messagingSenderId: "449979642883",
  appId: "1:449979642883:web:e79e3f497bf6eb8c918a36",
  measurementId: "G-ZMRQTF40W3"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const storage = getStorage(firebase);

export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
  
    useEffect(() => (
      onValue(ref(database, path), (snapshot) => {
       setData( snapshot.val() );
      }, (error) => {
        setError(error);
      })
    ), [ path ]);
  
    return [ data, error ];
};
  
const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
};
  
export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
        update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)))
    }, [database, path]);

    return [updateData, result];
};

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };
  
  const firebaseSignOut = () => signOut(getAuth(firebase));
  
  export { firebaseSignOut as signOut };
  
export const useAuthState = () => {
    const [user, setUser] = useState();
    const [isNorthwesternStudent, setIsNorthwesternStudent] = useState(false);


    useEffect(() => {
        const result = onAuthStateChanged(getAuth(firebase), (user) => {
            setIsNorthwesternStudent(false);
            setUser(user);
            if (user.email.endsWith("northwestern.edu")) {
                setIsNorthwesternStudent(true);
            }
        });
        return result;
    }, []);

    return [user, isNorthwesternStudent];
};