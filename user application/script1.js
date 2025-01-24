import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getAuth,signOut,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
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
})

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

const title=document.querySelector("#title");
const cap=document.querySelector("#caption");
const sub_menu=document.querySelector(".contact_submenu")
const nav=document.querySelector("#nav-list")
const bars=document.querySelector("#bars")
const fa_bars=document.querySelector(".fa-bars")
const fa_xmark=document.querySelector(".fa-xmark")
const main_c=document.querySelector("#bdy")

const reset=()=>{
    title.style.fontSize=`${0.05*window.innerWidth}px`
    cap.style.fontSize=`${0.035*window.innerWidth}px`
    sub_menu.style=""

    if(nav.classList.contains("c1")){
        nav.classList.replace("c1","c2")
        main_c.classList.remove("scroll_disable")
    }

    nav.style=""

    fa_xmark.style.display="none"
    fa_bars.style.display="inline-block"
}

reset();
window.onresize=reset;

fa_bars.addEventListener("click",()=>{

    fa_bars.style.display="none"
    fa_xmark.style.display="inline-block"
    nav.style.width=`${bars.offsetWidth}px`
    nav.style.height=`${window.innerHeight-bars.clientHeight-12+window.scrollY}px`

    nav.classList.replace("c2","c1")
    main_c.classList.add("scroll_disable")
})

fa_xmark.addEventListener("click",()=>{
    fa_xmark.style.display="none"
    fa_bars.style.display="inline-block"
    
    nav.classList.replace("c1","c2")
    main_c.classList.remove("scroll_disable")
}) 

const cu=document.querySelector("#cu")
let clicked=false
cu.addEventListener("click",()=>{
    if(clicked===false){
        sub_menu.style.zIndex="2"
        sub_menu.style.opacity="1"
        sub_menu.style.transition="opacity .3s linear"
        clicked=true
    }
    else{
        sub_menu.style=""
        clicked=false
    }
})

const breakfast_but=document.querySelector("#t1")
const lunch_but=document.querySelector("#t2")
const veg_but=document.querySelector("#BVEG")
const nonveg_but=document.querySelector("#BNONVEG")

const bvw=document.querySelector("#bvw")
const bnvw=document.querySelector("#bnvw")
const lvw=document.querySelector("#lvw")
const lnvw=document.querySelector("#lnvw")

breakfast_but.addEventListener("click",()=>{
    breakfast_but.style.color="rgba(222, 30, 62,0.8)"
    breakfast_but.style.borderBottom="3px solid rgba(222, 30, 62,0.8)"

    lunch_but.style.color="grey"
    lunch_but.style.borderBottom="none"

    lvw.style.display="none"
    lnvw.style.display="none"

    if(veg_but.style.borderBottom!=="none"){
        bvw.style.display="block"
        bnvw.style.display="none"
    }
    else{
        bnvw.style.display="block"
        bvw.style.display="none"
    }
})

lunch_but.addEventListener("click",()=>{
    lunch_but.style.color="rgba(222, 30, 62,0.8)"
    lunch_but.style.borderBottom="3px solid rgba(222, 30, 62,0.8)"

    breakfast_but.style.color="grey"
    breakfast_but.style.borderBottom="none"

    bvw.style.display="none"
    bnvw.style.display="none"

    if(veg_but.style.borderBottom!=="none"){
        lvw.style.display="block"
        lnvw.style.display="none"
    }
    else{
        lnvw.style.display="block"
        lvw.style.display="none"
    }
})

veg_but.addEventListener("click",()=>{
    veg_but.style.color="green"
    veg_but.style.borderBottom="2px solid green"

    nonveg_but.style.color="grey"
    nonveg_but.style.borderBottom="none"

    bnvw.style.display="none"
    lnvw.style.display="none"

    if(breakfast_but.style.borderBottom!=="none"){
        bvw.style.display="block"
    }
    else if(lunch_but.style.borderBottom!=="none"){
        lvw.style.display="block"
    }
})

nonveg_but.addEventListener("click",()=>{
    nonveg_but.style.color="red"
    nonveg_but.style.borderBottom="2px solid red"

    veg_but.style.color="grey"
    veg_but.style.borderBottom="none"

    bvw.style.display="none"
    lvw.style.display="none"

    if(breakfast_but.style.borderBottom!=="none"){
        bnvw.style.display="block"
    }
    else if(lunch_but.style.borderBottom!=="none"){
        lnvw.style.display="block"
    }
})

const log_out=document.querySelector("#Logout")

log_out.addEventListener("click",()=>{
    
    signOut(auth).then(() => {
        window.location.href="index.html"
    })
    .catch((error) => {
        alert("error occured while logging out")
    })
})