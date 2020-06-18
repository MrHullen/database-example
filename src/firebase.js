// Firebase App is always required and must be listed first
import firebase from 'firebase/app'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

/* How to get the firebaseConfig variable:
 * 1. Go to your Firebase Project Console (https://console.firebase.google.com/)
 * 2. Go to Project Settings (cog icon in top left)
 * 3. Scroll down to 'Your apps' and add a web app
 * 4. Give it a nickname and then copy the code for the firebaseConfig variable
*/
let firebaseConfig = {
  apiKey: "AIzaSyDNcbKNoPkXjKeuV4BErns-hRSQM4CpdJs",
  authDomain: "database-example-5aff3.firebaseapp.com",
  databaseURL: "https://database-example-5aff3.firebaseio.com",
  projectId: "database-example-5aff3",
  storageBucket: "database-example-5aff3.appspot.com",
  messagingSenderId: "1061996890495",
  appId: "1:1061996890495:web:34a71d30a2f3e3c40db24a"
}

// start Firebase
firebase.initializeApp(firebaseConfig)

// export the authentication information so that the rest of the app can use it
export const auth = firebase.auth()

// export the sign-in provider so that the rest of the app can use it
/* How to set the authentication provider:
 * 1. Go to your Firebase Project Console (https://console.firebase.google.com/)
 * 2. In the Develop menu (left) go to Authentication and the Sign-in Method tab
 * 3. Edit the sign-in method you want to use
 * 4. Make sure it's set to 'enabled'
*/
export const googleProvider = new firebase.auth.GoogleAuthProvider()

// export the database so that the rest of the app can use it
export const db = firebase.firestore()