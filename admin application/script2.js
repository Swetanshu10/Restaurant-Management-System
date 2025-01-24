const alogin=document.querySelector("#alogin")
const box2=document.querySelector(".box2")

function abc(){
  alogin.style.marginLeft=`${(box2.offsetWidth-alogin.offsetWidth)/2}px`
}

abc()
window.onresize=abc

import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getAuth,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import {getFirestore,doc,getDoc} from  'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
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
const firestore=getFirestore(firebaseApp)

alogin.addEventListener("click",()=>{
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const checkdoc_ref=doc(firestore,"OAI",user.uid)
      const docsnap=await getDoc(checkdoc_ref)

      if(docsnap.exists()){
        const owdata=docsnap.data()

        if(owdata.Role==="Owner"){
          window.location.href="index4.html"
        }
      }
      else{
        window.location.href="index3.html"
      }
    } else {
      window.location.href="index3.html"
    }
  })
})
