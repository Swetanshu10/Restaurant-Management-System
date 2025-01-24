import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getFirestore,getDoc,doc,query,orderBy,collection,getDocs} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import {getAuth,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js'
import run from "./script5.js"

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

async function AuthCheck(){
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const checkdoc_ref=doc(firestore,"OAI",user.uid)
      const docsnap=await getDoc(checkdoc_ref)

      if(!docsnap.exists()){
        window.location.href="index.html"
      }
    } else {
      window.location.href="index.html"
    }
  })
}

window.addEventListener("pageshow",async ()=>{
  await AuthCheck()
  await dish_loader()
  await run()
  loading_complete()
})


const bvw=document.querySelector("#bvw")
const bnvw=document.querySelector("#bnvw")
const lvw=document.querySelector("#lvw")
const lnvw=document.querySelector("#lnvw")

const loader=document.querySelector("#Loader")
const main_content=document.querySelector("#main")

async function dish_loader(){

  const bvw_col=query(collection(firestore,'bvw'),orderBy('visibility'))
  const bnvw_col=query(collection(firestore,'bnvw'),orderBy('visibility')) 
  const lvw_col=query(collection(firestore,'lvw'),orderBy('visibility'))
  const lnvw_col=query(collection(firestore,'lnvw'),orderBy('visibility'))


  await getDocs(bvw_col).then((querySnapshot)=>{
    querySnapshot.forEach(document => {
      const dish_data=document.data()

      const dish_template=`
      <div class="veg-item" id="${document.id}">
        <img id="logo" src="${dish_data["Image"]}">
        <p id=${"p1bv"+document.id[3]} class="tc1 disht"><b>${dish_data["Title"]}</b></p>
        <p id=${"p2bv"+document.id[3]} class="tc1 dish_description"><b>${dish_data["Description"]}</b></p>
        <p id=${"p3bv"+document.id[3]} class="tc1"><b>Rs. ${dish_data["Price"]}</b></p>
        <p id=${"p4bv"+document.id[3]} class="dt tc1"><b>${dish_data["delTime"]}</b></p>
        <button class="add" id=${"bv"+document.id[3]}>Edit</button>
      </div>
      `
      bvw.insertAdjacentHTML('afterbegin',dish_template)
    })                                                                                    
  });
  await getDocs(bnvw_col).then((querySnapshot)=>{
    querySnapshot.forEach(document => {
      const dish_data=document.data()

      const dish_template=`
      <div class="veg-item" id="${document.id}">
        <img id="logo" src="${dish_data["Image"]}">
        <p id=${"p1bnv"+document.id[4]} class="tc2 disht"><b>${dish_data["Title"]}</b></p>
        <p id=${"p2bnv"+document.id[4]} class="tc2 dish_description"><b>${dish_data["Description"]}</b></p>
        <p id=${"p3bnv"+document.id[4]} class="tc2"><b>Rs. ${dish_data["Price"]}</b></p>
        <p id=${"p4bnv"+document.id[4]} class="dt tc2"><b>${dish_data["delTime"]}</b></p>
        <button class="add" id=${"bnv"+document.id[4]}>Edit</button>
      </div>
      `
      bnvw.insertAdjacentHTML('afterbegin',dish_template)
    });
  })
  await getDocs(lvw_col).then((querySnapshot)=>{
    querySnapshot.forEach(document => {
      const dish_data=document.data()

      const dish_template=`
      <div class="veg-item l_color" id="${document.id}">
        <img id="logo" src="${dish_data["Image"]}">
        <p id=${"p1lv"+document.id[3]} class="tc1 disht"><b>${dish_data["Title"]}</b></p>
        <p id=${"p2lv"+document.id[3]} class="tc1 dish_description"><b>${dish_data["Description"]}</b></p>
        <p id=${"p3lv"+document.id[3]} class="tc1"><b>Rs. ${dish_data["Price"]}</b></p>
        <p id=${"p4lv"+document.id[3]} class="dt tc1"><b>${dish_data["delTime"]}</b></p>
        <button class="add" id=${"lv"+document.id[3]}>Edit</button>
      </div>
      `
      lvw.insertAdjacentHTML('afterbegin',dish_template)
    });
  })
  await getDocs(lnvw_col).then((querySnapshot)=>{
    querySnapshot.forEach(document => {
      const dish_data=document.data()

      const dish_template=`
      <div class="veg-item l_color" id="${document.id}">
        <img id="logo" src="${dish_data["Image"]}">
        <p id=${"p1lnv"+document.id[4]} class="tc2 disht"><b>${dish_data["Title"]}</b></p>
        <p id=${"p2lnv"+document.id[4]} class="tc2 dish_description"><b>${dish_data["Description"]}</b></p>
        <p id=${"p3lnv"+document.id[4]} class="tc2"><b>Rs. ${dish_data["Price"]}</b></p>
        <p id=${"p4lnv"+document.id[4]}  class="dt tc2"><b>${dish_data["delTime"]}</b></p>
        <button class="add" id=${"lnv"+document.id[4]}>Edit</button>
      </div>
      `
      lnvw.insertAdjacentHTML('afterbegin',dish_template)
    })
  })
}

function loading_complete(){
  loader.style.display="none"
  main_content.style.display="initial"
}