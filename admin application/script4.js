import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getAuth,signOut} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import {getFirestore,doc,updateDoc,setDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
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

const auth=getAuth(firebaseApp)
const firestore=getFirestore(firebaseApp)


export default async function run(){

const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaEnterpriseProvider("6LdbDT0qAAAAAEVlsP7EwNylLZyJIYKukslpbgtg"),
    isTokenAutoRefreshEnabled: true 
});

const dish_counter_div=document.querySelector("#number")
const dish_buttons=document.querySelectorAll(".counter")

dish_buttons.forEach((but)=>{
    but.addEventListener("click",()=>{
        const but_id=but.getAttribute("id")
        const button_list=document.querySelectorAll("#"+but_id)
        const e_d=document.querySelector("#p"+but_id)
        const index=but.getAttribute("data-index")

        const dish_counter=dish_counter_div.innerHTML
        const dish_counter_value=parseInt(dish_counter,10)

        const dish_id=but.parentNode.parentNode.getAttribute("id")
        const wrapper_id=but.parentNode.parentNode.parentNode.getAttribute("id")
        const dish_ref=doc(firestore,wrapper_id,dish_id)

        if(index%2===0){
            dish_counter_div.innerHTML=`${dish_counter_value+1}`
            e_d.innerHTML=`E`
            e_d.classList.replace("A_N","enable")
            button_list[0].disabled=false;
            button_list[1].disabled=true;
            updateDoc(dish_ref,{
                "visibility":true
            })
        }
        else if(index%2!==0 && dish_counter_value>0 && button_list[1].disabled===true){
            dish_counter_div.innerHTML=`${dish_counter_value-1}`
            e_d.innerHTML=`D`
            e_d.classList.replace("enable","A_N")
            button_list[0].disabled=true;
            button_list[1].disabled=false;
            updateDoc(dish_ref,{
                "visibility":false
            })
        }

    })
})

const searchBar=document.querySelector("#searchBar")

searchBar.addEventListener("input",(event)=>{
  const input=event.target.value.toLowerCase()

  document.querySelectorAll(".veg-item").forEach((card)=>{
    const isVisible=card.querySelector(".disht").innerHTML.toLowerCase().includes(input)
    card.classList.toggle("notVisible",!isVisible)
  })

})

const breakfast_but=document.querySelector("#t1")
const lunch_but=document.querySelector("#t2")
const veg_but=document.querySelector("#BVEG")
const nonveg_but=document.querySelector("#BNONVEG")

const cbv=document.querySelector("#cbv")
const cbnv=document.querySelector("#cbnv")
const clv=document.querySelector("#clv")
const clnv=document.querySelector("#clnv")


breakfast_but.addEventListener("click",()=>{
    breakfast_but.style.color="rgba(222, 30, 62,0.8)"
    breakfast_but.style.borderBottom="3px solid rgba(222, 30, 62,0.8)"

    lunch_but.style.color="grey"
    lunch_but.style.borderBottom="none"

    clv.style.display="none"
    clnv.style.display="none"

    if(veg_but.style.borderBottom!=="none"){
        cbv.style.display="block"
        cbnv.style.display="none"
    }
    else{
        cbnv.style.display="block"
        cbv.style.display="none"
    }
})

lunch_but.addEventListener("click",()=>{
    lunch_but.style.color="rgba(222, 30, 62,0.8)"
    lunch_but.style.borderBottom="3px solid rgba(222, 30, 62,0.8)"

    breakfast_but.style.color="grey"
    breakfast_but.style.borderBottom="none"

    cbv.style.display="none"
    cbnv.style.display="none"

    if(veg_but.style.borderBottom!=="none"){
        clv.style.display="block"
        clnv.style.display="none"
    }
    else{
        clnv.style.display="block"
        clv.style.display="none"
    }
})

veg_but.addEventListener("click",()=>{
    veg_but.style.color="green"
    veg_but.style.borderBottom="2px solid green"

    nonveg_but.style.color="grey"
    nonveg_but.style.borderBottom="none"

    cbnv.style.display="none"
    clnv.style.display="none"

    if(breakfast_but.style.borderBottom!=="none"){
        cbv.style.display="block"
    }
    else if(lunch_but.style.borderBottom!=="none"){
        clv.style.display="block"
    }
})

nonveg_but.addEventListener("click",()=>{
    nonveg_but.style.color="red"
    nonveg_but.style.borderBottom="2px solid red"

    veg_but.style.color="grey"
    veg_but.style.borderBottom="none"

    cbv.style.display="none"
    clv.style.display="none"

    if(breakfast_but.style.borderBottom!=="none"){
        cbnv.style.display="block"
    }
    else if(lunch_but.style.borderBottom!=="none"){
        clnv.style.display="block"
    }
})

const leftb=document.querySelectorAll("#move1")
const rightb=document.querySelectorAll("#move2")
const bvw=document.querySelector("#bvw")
const bnvw=document.querySelector("#bnvw")
const lvw=document.querySelector("#lvw")
const lnvw=document.querySelector("#lnvw")

let startingX1,deltaX1,startingX2,deltaX2,startingX3,deltaX3,
startingX4,deltaX4

bvw.addEventListener("touchstart",(event)=>{
    startingX1=event.touches[0].clientX
})
bvw.addEventListener("touchmove",(event)=>{
    deltaX1=event.touches[0].clientX-startingX1
    let scrollAmount

    if(deltaX1<-40){
        scrollAmount=(bvw.clientWidth-5.5)*1
    }
    else if(deltaX1>40){
        scrollAmount=(bvw.clientWidth-5.5)*-1
    }
    bvw.scrollBy({left:scrollAmount,behavior:"smooth"})
})

bnvw.addEventListener("touchstart",(event)=>{
    startingX2=event.touches[0].clientX
})
bnvw.addEventListener("touchmove",(event)=>{
    deltaX2=event.touches[0].clientX-startingX2
    let scrollAmount

    if(deltaX2<-40){
        scrollAmount=cbnv.clientWidth*1
    }
    else if(deltaX2>40){
        scrollAmount=cbnv.clientWidth*-1
    }
    
    bnvw.scrollBy({left:scrollAmount,behavior:"smooth"})
})

lvw.addEventListener("touchstart",(event)=>{
    startingX3=event.touches[0].clientX
})
lvw.addEventListener("touchmove",(event)=>{
    deltaX3=event.touches[0].clientX-startingX3
    let scrollAmount

    if(deltaX3<-40){
        scrollAmount=clv.clientWidth*1
    }
    else if(deltaX3>40){
        scrollAmount=clv.clientWidth*-1
    }

    lvw.scrollBy({left:scrollAmount,behavior:"smooth"})
})

lnvw.addEventListener("touchstart",(event)=>{
    startingX4=event.touches[0].clientX
})
lnvw.addEventListener("touchmove",(event)=>{
    deltaX4=event.touches[0].clientX-startingX4
    let scrollAmount

    if(deltaX4<-40){
        scrollAmount=clnv.clientWidth*1
    }
    else if(deltaX4>40){
        scrollAmount=clnv.clientWidth*-1
    }

    lnvw.scrollBy({left:scrollAmount,behavior:"smooth"})
})

leftb.forEach((but)=>{
    but.addEventListener("click",()=>{
        const index=but.getAttribute("data-index")

        if(index==="1"){
            const scrollAmount=(bvw.clientWidth-5.5)*-1
            bvw.scrollBy({left:scrollAmount,behavior:"smooth"})
        }
        else if(index==="3"){
            const scrollAmount=cbnv.clientWidth*-1
            bnvw.scrollBy({left:scrollAmount,behavior:"smooth"})
        }
        else if(index==="5"){
            const scrollAmount=clv.clientWidth*-1
            lvw.scrollBy({left:scrollAmount,behavior:"smooth"})
        }
        else if(index==="7"){
            const scrollAmount=clnv.clientWidth*-1
            lnvw.scrollBy({left:scrollAmount,behavior:"smooth"})
        }
    })
})

rightb.forEach((but)=>{
    but.addEventListener("click",()=>{
        const index=but.getAttribute("data-index")

        if(index==="2"){
            const scrollAmount=(bvw.clientWidth-5.5)*1
            bvw.scrollBy({left:scrollAmount,behavior:"smooth"})
        }
        else if(index==="4"){
            const scrollAmount=cbnv.clientWidth*1
            bnvw.scrollBy({left:scrollAmount,behavior:"smooth"})
        }
        else if(index==="6"){
            const scrollAmount=clv.clientWidth*1
            lvw.scrollBy({left:scrollAmount,behavior:"smooth"})
        }
        else if(index==="8"){
            const scrollAmount=clnv.clientWidth*1
            lnvw.scrollBy({left:scrollAmount,behavior:"smooth"})
        }
    })
})

const nav=document.querySelector("#nav-list")
const bars=document.querySelector("#bars")
const fa_bars=document.querySelector(".fa-bars")
const fa_xmark=document.querySelector(".fa-xmark")
const main_c=document.querySelector("#bdy")

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

const title=document.querySelector("#title");
const cap=document.querySelector("#caption");

const text_resize=()=>{
    title.style.fontSize=`${0.05*window.innerWidth}px`
    cap.style.fontSize=`${0.035*window.innerWidth}px`

    if(nav.classList.contains("c1")){
        nav.classList.replace("c1","c2")
        main_c.classList.remove("scroll_disable")
    }

    nav.style=""

    fa_xmark.style.display="none"
    fa_bars.style.display="inline-block"
}

text_resize();
window.onresize=text_resize;

const log_out=document.querySelector("#Logout")

log_out.addEventListener("click",()=>{
    signOut(auth).then(() => {
        window.location.href="index.html"
    })
    .catch((error) => {
        console.log("ERROR")
    }) 
})
}

