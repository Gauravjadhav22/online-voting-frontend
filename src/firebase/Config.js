
// import { useCollectionData } from "react-firebase-hooks/firestore"
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'




// Initialize Firebase
firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: "online-voting-system-faadf",
  storageBucket: "online-voting-system-faadf.appspot.com",
  messagingSenderId: "713140413530",
  appId: "1:713140413530:web:82a8c37cde75bd90aee463",
  measurementId: "G-L71XKNV0MV"
});
const auth = firebase.auth();
// var provider = new firebase.auth.GoogleAuthProvider(); 
export const firestore = firebase.firestore();
export {
  auth
  // ,provider
}
  ;