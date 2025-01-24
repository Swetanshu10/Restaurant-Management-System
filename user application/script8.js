const minTitleSize = 18; 
const maxTitleSize = 32;
const minCaptionSize = 16;
const maxCaptionSize = 30;

const logo=document.querySelector("#LOGO")
const title=document.querySelector("#title")
const cap=document.querySelector("#caption")

function title_func(){
    const width = window.innerWidth; // Get current device width
    const percentage = (width - 320) / (1530 - 320); // Calculate percentage within rangxxxxx

    const titleFontSize = minTitleSize + (percentage * (maxTitleSize - minTitleSize));
    const captionFontSize = minCaptionSize + (percentage * (maxCaptionSize - minCaptionSize));

    title.style.fontSize = `${titleFontSize}px`; // Set font size for title
    cap.style.fontSize = `${captionFontSize}px`; // Set font size for caption
}

title_func()
window.onresize=title_func

import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getFirestore,doc,collection,query,where,updateDoc,getDocs,orderBy} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import {getAuth,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
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
const firestore=getFirestore(firebaseApp)

const loader=document.querySelector("#Loader")
const mainContent=document.querySelector("#main")

function AuthCheck(){
  onAuthStateChanged(auth,async (user) => {
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
    const uOrders=query(collection(firestore,"MO_collection"),orderBy("ttl","desc"),where("User","==",user.uid))
  
    await orderLoading(uOrders)
  })
}
window.addEventListener("pageshow",AuthCheck)

async function orderLoading(uOrders){

  const uoDocs=await getDocs(uOrders)
  if(uoDocs.empty){

    const orderBox=document.querySelector("#ohSection")
    orderBox.insertAdjacentHTML('beforebegin',
      `<p id=info>No orders found,place orders to review them here</p>`
    )
    loader.classList.add("notVisible")
    mainContent.classList.remove("notVisible")
    return
  }

  const obSection=document.querySelector("#obSection")
  obSection.replaceChildren()

  const dishesSection=document.querySelector("#innerDishBox")
  
  let o_id=1 
  const urMap=new Map()

  uoDocs.forEach(element => {
    const orderData=element.data()

    const timestamp=orderData["ttl"].toDate()
    const date=timestamp.getDate()
    const month=timestamp.getMonth()+1
    const year=timestamp.getFullYear()
    let hours=timestamp.getHours(),tz

    if(hours>=12){
      if(hours>12){
        hours=hours-12
      }
      tz="PM"
    }
    else{
      if(hours==0){
        hours=12
      }
      tz="AM"
    }
    const orderTime=hours+":"+timestamp.getMinutes()+" "+tz
        
    const obTemplate=`
    <button class="oButtons" id=${"o"+o_id}>${date+"/"+month+"/"+year}</button>
    `
    obSection.insertAdjacentHTML('beforeend',obTemplate)

    const orderButton=document.querySelector("#o"+o_id)
    const obID=orderButton.getAttribute("id")
    urMap.set(obID,orderData["UserReview"])

    orderButton.addEventListener("click",()=>{
      dishesSection.replaceChildren()

      let extraInfo=`
      <article class="dishInfo">
        <p class="dishT">Time</p>
        <p class="dishP">${orderTime}</p>
      </article>
      `

      dishesSection.insertAdjacentHTML('beforeend',extraInfo)

      let vegdish_map=orderData["vegOrders"]
          
      for(let index=0;index<vegdish_map.length;index++){
        let veg_dish=` 
        <article class="dishInfo">
          <p class="dishT vdishes">${vegdish_map[index].dishTitle}</p>
          <p class="dishP vdishes">${"x"+vegdish_map[index].dishAmount}</p>
        </article>
        `
          
        dishesSection.insertAdjacentHTML('beforeend',veg_dish)
      }

      let nonvegdish_map=orderData["nonVegOrders"]
          
      for(let index=0;index<nonvegdish_map.length;index++){
        let nonveg_dish=`
        <article class="dishInfo">
          <p class="dishT nvdishes">${nonvegdish_map[index].dishTitle}</p>
          <p class="dishP nvdishes">${"x"+nonvegdish_map[index].dishAmount}</p>
        </article>
        `

        dishesSection.insertAdjacentHTML('beforeend',nonveg_dish)
      }

      extraInfo=`
      <article class="dishInfo">
        <p class="dishP">Total: ${"Rs."+orderData["tPrice"]}</p>
      </article>
      `

      dishesSection.insertAdjacentHTML('beforeend',extraInfo)

      let ur

      if(urMap.get(obID)===""){
        ur=`
        <input type="text" class="review1" id=${"uri"+o_id} placeholder="Add comment/review" />
        <button class="reviewButton" id=${"urb"+o_id}>Save</button>
        `
      }
      else{
        ur=`
        <p class="review2">${urMap.get(obID)}</p>
        `
      }

      const userReview=`
      <article class="dishInfo reviewbox" id=${"urev"+o_id}>
      ${ur}
      </article>
      `
      dishesSection.insertAdjacentHTML('beforeend',userReview)

      let or
      if(orderData["OwnerReview"]===""){
        or="No comments from owner"
      }
      else{
        or=orderData["OwnerReview"]
      }

      const ownerReview=`
      <article class="dishInfo reviewbox">
        <p class="review11">${or}</p>
      </article> 
      `

      dishesSection.insertAdjacentHTML('beforeend',ownerReview)
      const urb=document.querySelector("#urb"+o_id)

      try{
        urb.addEventListener("click",async ()=>{
          const urev=document.querySelector("#urev"+o_id)
          const uri=document.querySelector("#uri"+o_id).value

          if(uri!==""){
            const safeData=DOMPurify.sanitize(uri)
            ur=`<p class="review2">${safeData}</p>`

            urev.replaceChildren()
            urev.innerHTML=ur

            const odoc=doc(collection(firestore,"MO_collection"),element.id)
            urMap.set(obID,safeData)
            await updateDoc(odoc,{
              "UserReview":safeData
            })
          }
        })
      }
      catch{}
       
    })
    o_id++;
    if(!loader.classList.contains("notVisible")){
      loader.classList.add("notVisible")
    }
    if(mainContent.classList.contains("notVisible")){
      mainContent.classList.remove("notVisible")
    }

  })
}