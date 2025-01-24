import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getAuth,onAuthStateChanged,signOut} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js'

const firebaseApp=initializeApp({
    apiKey: "AIzaSyB6V6movKnNmJ1Zib02_ZZvbUzr-9c4xrs",
    authDomain: "desi-food-express.firebaseapp.com",
    projectId: "desi-food-express",
    storageBucket: "desi-food-express.appspot.com",
    messagingSenderId: "527507473429",
    appId: "1:527507473429:web:38b4508969d147aa473a1c",
    measurementId: "G-5SBNZSTD7X"
})

const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaEnterpriseProvider("6LcjbT0qAAAAAH8vACi8Hkb77mdrdfhGJ9wS9wR2"),
    isTokenAutoRefreshEnabled: true 
});

const auth=getAuth(firebaseApp)

function AuthCheck(){
    onAuthStateChanged(auth,(user) => {
      if (!user) {
        window.location.href="index.html"
      }
      if(!user.emailVerified){
        alert("your email is not verified, please check mail for verification email")
        window.location.href="index.html"
      }
      if(user.displayName===null){
        window.location.href="index11.html"
      }
    })
}
window.addEventListener("pageshow",AuthCheck)