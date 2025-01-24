import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getFirestore,getDoc,doc,query,orderBy,collection,getDocs} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import {getAuth,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js'
import run from "./script4.js"

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
let d_class,e_d,butt

const dish_amount=document.querySelector("#number")
let total_dishes=0


async function dish_loader(){

    const bvw_col=query(collection(firestore,'bvw'),orderBy('visibility'))
    const bnvw_col=query(collection(firestore,'bnvw'),orderBy('visibility'))
    const lvw_col=query(collection(firestore,'lvw'),orderBy('visibility'))
    const lnvw_col=query(collection(firestore,'lnvw'),orderBy('visibility'))

    await getDocs(bvw_col).then((querySnapshot)=>{
        querySnapshot.forEach(document => {
            const dish_data=document.data()

            if(dish_data['visibility']===true){  
                d_class="enable"
                e_d="E"
                total_dishes++
                butt=`<button class="counter" id=${"bv"+document.id[3]} data-index="2" disabled>+</button>`
            }
            else{
                d_class="A_N"
                e_d="D"
                butt=`<button class="counter" id=${"bv"+document.id[3]} data-index="2">+</button>`
            }
                const dish_template=`
                <div class="veg-item" id="${document.id}">
                  <img id="logo" src="${dish_data["Image"]}">
                  <p id=${"dt_bv"+document.id[3]} class="disht tc1"><b>${dish_data["Title"]}</b></p>
                  <p class="dish_description tc1"><b>${dish_data["Description"]}</b></p>
                  <p class="vi_Cost tc1" id=${"cbv"+document.id[3]}><b>Rs. ${dish_data["Price"]}</b></p>
                  <p class="dt tc1"><b>Serving time:${dish_data["delTime"]}</b></p>
                  <div class="QUANT">
                    <button class="counter" id=${"bv"+document.id[3]} data-index="1">-</button>
                    <p class="${d_class}" id=${"pbv"+document.id[3]}>${e_d}</p>
                    ${butt}
                  </div>
                </div>
                `
            bvw.insertAdjacentHTML('afterbegin',dish_template)
        })
    });
    await getDocs(bnvw_col).then((querySnapshot)=>{
        querySnapshot.forEach(document => {
            const dish_data=document.data()

            if(dish_data['visibility']===true){
                d_class="enable"
                e_d="E"
                total_dishes++
                butt=`<button class="counter" id=${"bnv"+document.id[4]} data-index="2" disabled>+</button>`
            }
            else{
                d_class="A_N"
                e_d="D"
                butt=`<button class="counter" id=${"bnv"+document.id[4]} data-index="2">+</button>`
            }

            const dish_template=`
                <div class="veg-item" id="${document.id}">
                  <img id="logo" src="${dish_data["Image"]}">
                  <p id=${"dt_bnv"+document.id[4]} class="disht tc2"><b>${dish_data["Title"]}</b></p>
                  <p class="dish_description tc2"><b>${dish_data["Description"]}</b></p>
                  <p class="vi_Cost tc2" id=${"cbnv"+document.id[4]}><b>Rs. ${dish_data["Price"]}</b></p>
                  <p class="dt tc2"><b>Serving time:${dish_data["delTime"]}</b></p>
                  <div class="QUANT">
                    <button class="counter" id=${"bnv"+document.id[4]} data-index="1">-</button>
                    <p class="${d_class}" id=${"pbnv"+document.id[4]}>${e_d}</p>
                    ${butt}
                  </div>
                </div>
                `
            bnvw.insertAdjacentHTML('afterbegin',dish_template)
        });
    })
    await getDocs(lvw_col).then((querySnapshot)=>{
        querySnapshot.forEach(document => {
            const dish_data=document.data()

            if(dish_data['visibility']===true){
                d_class="enable"
                e_d="E"
                total_dishes++
                butt=`<button class="counter" id=${"lv"+document.id[3]} data-index="2" disabled>+</button>`
            }
            else{
                d_class="A_N"
                e_d="D"
                butt=`<button class="counter" id=${"lv"+document.id[3]} data-index="2">+</button>`
            }

            const dish_template=`
                <div class="veg-item l_color" id="${document.id}">
                  <img id="logo" src="${dish_data["Image"]}">
                  <p id=${"dt_lv"+document.id[3]} class="disht tc1"><b>${dish_data["Title"]}</b></p>
                  <p class="dish_description tc1"><b>${dish_data["Description"]}</b></p>
                  <p class="vi_Cost tc1" id=${"clv"+document.id[3]}><b>Rs. ${dish_data["Price"]}</b></p>
                  <p class="dt tc1"><b>Serving time:${dish_data["delTime"]}</b></p>
                  <div class="QUANT">
                    <button class="counter" id=${"lv"+document.id[3]} data-index="1">-</button>
                    <p class="${d_class}" id=${"plv"+document.id[3]}>${e_d}</p>
                    ${butt}
                  </div>
                </div>
                `
            lvw.insertAdjacentHTML('afterbegin',dish_template)
        });
    })
    await getDocs(lnvw_col).then((querySnapshot)=>{
        querySnapshot.forEach(document => {
            const dish_data=document.data()

            if(dish_data['visibility']===true){
                d_class="enable"
                e_d="E"
                total_dishes++
                butt=`<button class="counter" id=${"lnv"+document.id[4]} data-index="2" disabled>+</button>`
            }
            else{
                d_class="A_N"
                e_d="D"
                butt=`<button class="counter" id=${"lnv"+document.id[4]} data-index="2">+</button>`
            }

            const dish_template=`
                <div class="veg-item l_color" id="${document.id}">
                  <img id="logo" src="${dish_data["Image"]}">
                  <p id=${"dt_lnv"+document.id[4]} class="disht tc2"><b>${dish_data["Title"]}</b></p>
                  <p class="dish_description tc2"><b>${dish_data["Description"]}</b></p>
                  <p class="vi_Cost tc2" id=${"clnv"+document.id[4]}><b>Rs. ${dish_data["Price"]}</b></p>
                  <p class="dt tc2"><b>Serving time:${dish_data["delTime"]}</b></p>
                  <div class="QUANT">
                    <button class="counter" id=${"lnv"+document.id[4]} data-index="1">-</button>
                    <p class=${d_class} id=${"plnv"+document.id[4]}>${e_d}</p>
                    ${butt}
                  </div>
                </div>
                `
            lnvw.insertAdjacentHTML('afterbegin',dish_template)
        });
    })
    
    dish_amount.innerHTML=`${total_dishes}`
}

function loading_complete(){
    loader.style.display="none"
    main_content.style.display="initial"
}