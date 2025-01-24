import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,sendEmailVerification} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import {getFirestore,doc,getDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
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

const user_login=document.querySelectorAll(".login")
const fop=document.querySelector("#fop")
const auth=getAuth(firebaseApp)
const firestore=getFirestore(firebaseApp)

const adminBox=document.querySelector(".admin_box")
const signUp=document.querySelector("#signUp")
const loginBanner=document.querySelector("#LoginBanner")
const authBox=document.querySelector("#AuthenticatingBox")

signUp.addEventListener("click",()=>{
    adminBox.scrollBy({top:570,behavior:"smooth"})
})

loginBanner.addEventListener("click",()=>{
    adminBox.scrollBy({top:-570,behavior:"smooth"})
})


user_login.forEach((but)=>{
    but.addEventListener("click",()=>{
        authBox.classList.remove("ihidden")
        const useremail2=document.querySelector("#oe2")
        const pass2=document.querySelector("#op2")

        const index=but.getAttribute("data-index")
        if(index==="1"){

            const useremail=document.querySelector("#oe")
            const pass=document.querySelector("#op")

            createUserWithEmailAndPassword(auth, useremail.value, pass.value)
            .then((userCredential) => {

                sendEmailVerification(auth.currentUser)
                .then(() => {
                    authBox.classList.add("ihidden")
                    alert("Verification email sent, check your email")
                    useremail2.value=useremail.value
                    pass2.value=pass.value
                    useremail.value=""
                    pass.value=""
                    adminBox.scrollBy({top:-570,behavior:"smooth"})
                })

            })
            .catch((error) => {
                authBox.classList.add("ihidden")
                alert("Incorrect Password/Email or account already exists")
            })
            
        }
        else if(index==="2"){

            signInWithEmailAndPassword(auth,useremail2.value, pass2.value)
            .then(async (userCredential) => {
                const user=auth.currentUser

                if(user.emailVerified){
                    try{
                        const checkdoc_ref=doc(firestore,"Users_Info",user.uid)
                        const docsnap=await getDoc(checkdoc_ref)
                    
                        if(docsnap.exists()){
                            authBox.classList.add("ihidden")
                            window.location.href="index1.html"
                        }
                        else{
                            authBox.classList.add("ihidden")
                            window.location.href="index11.html"
                        }
                    }
                    catch(error){
                        authBox.classList.add("ihidden")
                        window.location.href="index11.html"
                    }
                }
                else{
                    authBox.classList.add("ihidden")
                    alert("Email not verified,check your email for verification email")
                }

            })
            .catch((error) => {
                authBox.classList.add("ihidden")
                alert("Incorrect Password/Email or account does not exist")
            })

        }   
    })
})


fop.addEventListener("click",()=>{
    const useremail=document.querySelector("#oe2")

    sendPasswordResetEmail(auth, useremail.value)
    .then(() => {
        alert("Email sent successfully,check your email")
    })
    .catch((error) => {
        alert("Error sending email,please provide correct email")
    })
}) 