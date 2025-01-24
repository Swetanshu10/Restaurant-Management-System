import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getFirestore,doc,updateDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
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


const firestore=getFirestore(firebaseApp)

export default async function run(){

const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaEnterpriseProvider("6LdbDT0qAAAAAEVlsP7EwNylLZyJIYKukslpbgtg"),
    isTokenAutoRefreshEnabled: true 
});

const title=document.querySelector("#title")
const cap=document.querySelector("#caption")

const minTitleSize = 18; 
const maxTitleSize = 32;
const minCaptionSize = 16;
const maxCaptionSize = 30;

function title_func(){
    const width = window.innerWidth; // Get current device width
    const percentage = (width - 320) / (1530 - 320); // Calculate percentage within range

    const titleFontSize = minTitleSize + (percentage * (maxTitleSize - minTitleSize));
    const captionFontSize = minCaptionSize + (percentage * (maxCaptionSize - minCaptionSize));

    title.style.fontSize = `${titleFontSize}px`; // Set font size for title
    cap.style.fontSize = `${captionFontSize}px`; // Set font size for caption
}

title_func()
window.onresize=title_func

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


const edit_but=document.querySelectorAll(".add")

edit_but.forEach((item)=>{
    item.addEventListener("click",()=>{
        const input_p1=document.createElement("input")
        input_p1.setAttribute("type","text")
        input_p1.setAttribute("id","p1")
        input_p1.setAttribute("maxlength","24")

       const input_p2=document.createElement("input")
       input_p2.setAttribute("type","text")
       input_p2.setAttribute("id","p2")
       input_p2.setAttribute("maxlength","222")

       const input_p3=document.createElement("input")
       input_p3.setAttribute("type","number")
       input_p3.setAttribute("id","p3")

       const input_p4=document.createElement("input")
       input_p4.setAttribute("type","text")
       input_p4.setAttribute("id","p4")
       input_p4.setAttribute("maxlength","29")

        const button_id=item.getAttribute("id")
        const p1=document.querySelector("#p1"+button_id)
        const p2=document.querySelector("#p2"+button_id)
        const p3=document.querySelector("#p3"+button_id)
        const p4=document.querySelector("#p4"+button_id)
        const parent_width=document.querySelector(".veg-item").offsetWidth

        input_p1.setAttribute("value",p1.innerText)
        input_p1.style.display="block"
        input_p1.style.width=`${p1.offsetWidth}px`
        input_p1.style.marginTop=`1.27rem`

        input_p2.setAttribute("value",p2.innerText)
        input_p2.style.display="block"
        input_p2.style.width=`${p2.offsetWidth}px`
        input_p2.style.marginTop=`1.27rem`

        input_p3.setAttribute("value",parseInt(p3.innerText.match(/\d+/),10))
        input_p3.style.display="block"
        input_p3.style.width=`${p3.offsetWidth}px`
        input_p3.style.marginTop=`1.27rem`

        input_p4.setAttribute("value",p4.innerText)
        input_p4.style.display="block"
        input_p4.style.width=`${p4.offsetWidth}px`
        input_p4.style.marginTop=`1.27rem`
        input_p4.style.marginBottom=`1.27rem`

        const percentage = (window.innerWidth - 320) / (1530 - 320); 
        const captionFontSize = 17 + (percentage * (2.2));

        input_p1.style.fontSize=`${captionFontSize}px`
        input_p2.style.fontSize=`${captionFontSize}px`
        input_p3.style.fontSize=`${captionFontSize}px`
        input_p4.style.fontSize=`${captionFontSize}px`

        const parent=item.parentNode
        parent.replaceChild(input_p1,p1)
        parent.replaceChild(input_p2,p2)
        parent.replaceChild(input_p3,p3)
        parent.replaceChild(input_p4,p4)

        const save_but=document.createElement("button")
        save_but.setAttribute("class","saved")
        save_but.innerHTML=`Save`
        parent.replaceChild(save_but,item)

        save_but.addEventListener("click",()=>{
            p1.innerHTML=`<b>${input_p1.value}</b>`
            parent.replaceChild(p1,input_p1)

            p2.innerHTML=`<b>${input_p2.value}</b>`
            parent.replaceChild(p2,input_p2)

            p3.innerHTML=`<b>Rs. ${input_p3.value}</b>`
            parent.replaceChild(p3,input_p3)

            p4.innerHTML=`<b>${input_p4.value}</b>`
            parent.replaceChild(p4,input_p4)

            parent.replaceChild(item,save_but)

            const dish_id=item.parentNode.getAttribute("id")
            const collection_id=item.parentNode.parentNode.getAttribute("id")
            const doc_ref=doc(firestore,collection_id,dish_id)
            
            updateDoc(doc_ref,{
                "Title":p1.innerText,
                "Description":p2.innerText,
                "Price":input_p3.value,
                "delTime":p4.innerText
            })
        })
    })
})
}
