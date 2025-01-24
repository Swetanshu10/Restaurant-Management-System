import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getFirestore,doc,getDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import {getAuth,signInWithEmailAndPassword,sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js'

const firebaseApp=initializeApp({
    apiKey: "AIzaSyB6V6movKnNmJ1Zib02_ZZvbUzr-9c4xrs",
    authDomain: "desi-food-express.firebaseapp.com",
    projectId: "desi-food-express",
    storageBucket: "desi-food-express.appspot.com",
    messagingSenderId: "527507473429",
    appId: "1:527507473429:web:49f6ced5142150c9473a1c",  
    measurementId: "G-VYN390X6QX" 
})

const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaEnterpriseProvider("6LdbDT0qAAAAAEVlsP7EwNylLZyJIYKukslpbgtg"),
  isTokenAutoRefreshEnabled: true 
});


const auth=getAuth(firebaseApp)
const login=document.querySelector("#login")
const fop=document.querySelector("#fop")
const firestore=getFirestore(firebaseApp)

login.addEventListener("click",()=>{
    const authBox=document.querySelector("#AuthenticatingBox")
    authBox.classList.remove("ihidden")

    const email=document.querySelector("#oe")
    const password=document.querySelector("#op")

    signInWithEmailAndPassword(auth,email.value, password.value)
    .then(async (userCredential) => {
      const user=auth.currentUser

      if(user){
        const checkdoc_ref=doc(firestore,"OAI",user.uid)
        const docsnap=await getDoc(checkdoc_ref)

        if(docsnap.exists()){
          const owdata=docsnap.data()
 
          if(owdata.Role==="Owner"){
            authBox.classList.add("ihidden")
            window.location.href="index4.html"
          }
        }
        else{
          authBox.classList.add("ihidden")
          alert("Invalid credentials")
        }
      }

    })
    .catch((error) => {
      authBox.classList.add("ihidden")
      alert("Incorrect Password/Email")
    })
})
 

fop.addEventListener("click",()=>{
  const useremail=document.querySelector("#oe")

  sendPasswordResetEmail(auth, useremail.value)
  .then(() => {
    alert("Email sent successfully,check your email")
  })
  .catch((error) => {
    alert("Error sending email,please provide correct email")
  })

}) 