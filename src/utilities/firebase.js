// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);