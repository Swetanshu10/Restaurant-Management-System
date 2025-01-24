import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getFirestore,doc,getDocs,getDoc,collection,deleteDoc,query,orderBy,updateDoc,onSnapshot} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import {getAuth,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
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
})

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

    title.style.marginLeft=`${(window.innerWidth/3 + (percentage * (maxTitleSize - minTitleSize)))}px`
    cap.style.marginLeft=`${window.innerWidth/2.8 + (percentage * (maxTitleSize - minTitleSize))}px`
    logo.style.left=`${window.innerWidth/42 + (percentage * (maxTitleSize - minTitleSize))}px`

    title.style.top=`${(window.innerHeight/15 - (percentage * (maxTitleSize - minTitleSize)))}px`
    cap.style.top=`${(window.innerHeight/8 - (percentage * (maxTitleSize - minTitleSize)))}px`
}

title_func()
window.onresize=title_func

const tablesMap=new Map()
const unsubscribe1=onSnapshot(query(collection(firestore,'tables')),(snapShot)=>{
    snapShot.docChanges().forEach(async change => {
        const firebaseDoc=change.doc.id
        const table_data=change.doc.data()
  
        if(!tablesMap.has(firebaseDoc)){
            tablesMap.set(firebaseDoc,table_data)
        }
        else if(tablesMap.has(firebaseDoc)){
            const tablesObject=tablesMap.get(firebaseDoc)
  
            if(tablesObject['T1']!==table_data['T1']){
                tablesObject['T1']=table_data['T1']
                tablesMap.set(firebaseDoc,tablesObject)
            }
  
            if(tablesObject['T2']!==table_data['T2']){
                tablesObject['T2']=table_data['T2']
                tablesMap.set(firebaseDoc,tablesObject)
            }
  
            if(tablesObject['T3']!==table_data['T3']){
                tablesObject['T3']=table_data['T3']
                tablesMap.set(firebaseDoc,tablesObject)
            }
  
            if(tablesObject['T4']!==table_data['T4']){
                tablesObject['T4']=table_data['T4']
                tablesMap.set(firebaseDoc,tablesObject)
            }
  
            if(tablesObject['T5']!==table_data['T5']){
                tablesObject['T5']=table_data['T5']
                tablesMap.set(firebaseDoc,tablesObject)
            }
  
            if(tablesObject['T6']!==table_data['T6']){
                tablesObject['T6']=table_data['T6']
                tablesMap.set(firebaseDoc,tablesObject)
            }
  
            if(tablesObject['T7']!==table_data['T7']){
                tablesObject['T7']=table_data['T7']
                tablesMap.set(firebaseDoc,tablesObject)
            }
  
            if(tablesObject['T8']!==table_data['T8']){
                tablesObject['T8']=table_data['T8']
                tablesMap.set(firebaseDoc,tablesObject)
            }
        }
    })
})

const order_collection=collection(firestore,'MO_collection')
const user_collection=collection(firestore,'Users_Info')

const md_insert=document.querySelector(".list_of_orders")
const oid=document.querySelector("#order_id")
const n1=document.querySelector("#N1")
const sn=document.querySelector("#s_n")
const tableList=document.querySelector("#tableList")
const veg_list=document.querySelector(".veg_order")
const nonveg_list=document.querySelector(".nonveg_order")
const price_list=document.querySelector(".Price")
const urp=document.querySelector("#urp")
const ownerreview=document.querySelector("#ownerreview")
const ownerReviewMap=new Map()

const orderDisplay=async (ocd)=>{
    let o_id=1
    md_insert.replaceChildren()
  
    ocd.forEach(async element => {
        let readed,r2,r3
        const order_document=element.data()
        const doc_ts=order_document['ttl'].toDate()
        const doc_year=doc_ts.getFullYear()
        const doc_month=doc_ts.getMonth()
        const doc_date=doc_ts.getDate()
        const morningBookedTables=order_document["bookedTables"][0]["morning"]
        const afternoonBookedTables=order_document["bookedTables"][0]["afternoon"]
        const nightBookedTables=order_document["bookedTables"][0]["night"]

        if(order_document['visited1']===false){
            readed="ORDERS"
            r2="NAME"
            r3="DEL"
        }
        else{
            readed="visited"
            r2="NAME2"
            r3="DEL2"
        }

        const user_docref=doc(user_collection,order_document["User"])
        const userd=await getDoc(user_docref)
        const dataa=userd.data()

        var order_button=`
        <article class=${readed} id=${'o'+o_id}>
            <button id=${'NAME'+o_id} class=${r2}>${dataa['nickName']}</button>
            <button class=${r3} id=${'del'+o_id}>-</button>
        </article>
        `

        ownerReviewMap.set(('o'+o_id),order_document["OwnerReview"])
        
        md_insert.insertAdjacentHTML('beforeend',order_button)
        const button=document.querySelector("#NAME"+o_id)
        
        button.addEventListener("click",async ()=>{
            const order=button.parentElement
            order.classList.replace(readed,"visited")

            button.classList.replace(r2,"NAME2")

            const siblingButton=button.nextElementSibling
            siblingButton.classList.replace(r3,"DEL2")


            oid.innerText=`${doc_date}/${doc_month+1}/${doc_year}`
                
            n1.innerText=dataa['Name']
            sn.innerHTML=`<i class="fa-solid fa-phone"></i>${dataa['Contact']}`

            tableList.replaceChildren()
            if(morningBookedTables.length>0){
                tableList.insertAdjacentHTML('beforeend',`<li>10 A.M.-1 P.M.</li>`)
                morningBookedTables.forEach(element => {
                    const table=`
                    <li>${element}</li>
                    `
                    tableList.insertAdjacentHTML('beforeend',table)
                })
            }

            if(afternoonBookedTables.length>0){
                tableList.insertAdjacentHTML('beforeend',`<li>3 P.M.-6 P.M.</li>`)
                afternoonBookedTables.forEach(element => {
                    const table=`
                    <li>${element}</li>
                    `
                    tableList.insertAdjacentHTML('beforeend',table)
                })
            }

            if(nightBookedTables.length>0){
                tableList.insertAdjacentHTML('beforeend',`<li>7 P.M.-10 P.M.</li>`)
                nightBookedTables.forEach(element => {
                    const table=`
                    <li>${element}</li>
                    `
                    tableList.insertAdjacentHTML('beforeend',table)
                })
            }
                  
            veg_list.replaceChildren()
            let vegdish_map=order_document["vegOrders"]
                
            for(let index=0;index<vegdish_map.length;index++){
                const veg_dish=`
                <li><p class="d_n">${vegdish_map[index].dishTitle}</p><p class="quantity">${vegdish_map[index].dishAmount}</p></li>
                `
                veg_list.insertAdjacentHTML('beforeend',veg_dish)
            }

            nonveg_list.replaceChildren()
            let nonvegdish_map=order_document["nonVegOrders"]
                
            for(let index=0;index<nonvegdish_map.length;index++){
                const nonveg_dish=`
                <li><p class="d_n">${nonvegdish_map[index].dishTitle}</p><p class="quantity">${nonvegdish_map[index].dishAmount}</p></li>
                `
                nonveg_list.insertAdjacentHTML('beforeend',nonveg_dish)
            }
                
            price_list.replaceChildren()
            price_list.insertAdjacentHTML('beforeend',`<p class="cost" id="c1">COST</p>`)
                
            const price_temp=`
            <p class="s_cost" id="sc1">Rs.${order_document["tPrice"]}</p>
            `
            price_list.insertAdjacentHTML('beforeend',price_temp)

            let temp,temp2

            if(order_document["UserReview"]===""){
                temp2=`No comments from user`
            }
            else{
                temp2=order_document["UserReview"]
            }
            
            urp.innerText=`
            ${temp2}
            `

            const ownerReviewID=order.getAttribute("id")

            if(ownerReviewMap.get(ownerReviewID)===''){
                temp=`
                <input type="text" placeholder="Add comment/review" id="orp"></input>
                <button class="osb" id=${"rsb"+o_id}>Save</button>
                `
            }
            else{
                temp=`
                <p id="orp">${ownerReviewMap.get(ownerReviewID)}</p>
                `
            }

            ownerreview.replaceChildren()
            ownerreview.insertAdjacentHTML("beforeend",temp)

            try{
                const orb=document.querySelector("#rsb"+o_id)

                orb.addEventListener("click",async ()=>{
                    const oreview=document.querySelector("#orp").value

                    ownerreview.replaceChildren()
                    temp=`
                    <p id="orp">${oreview}</p>
                    `
                    ownerreview.insertAdjacentHTML("beforeend",temp)

                    const odocref=await doc(collection(firestore,"MO_collection"),element.id)

                    await updateDoc(odocref,{
                        "OwnerReview":oreview
                    })

                    ownerReviewMap.set(ownerReviewID,oreview)


                })
            }
            catch{}

            await updateDoc(doc(order_collection,element.id),{
                'visited1':true
            })

        })
                    
        const d_b2=document.querySelector("#del"+o_id)
        const deleted_order=document.querySelector(("#o"+o_id))
        
        d_b2.addEventListener("click",async ()=>{
                        
            deleted_order.classList.add("notVisible")
            oid.innerText=``
            n1.innerText=``
            sn.innerHTML=`<i class="fa-solid fa-phone"></i>`
            urp.innerText=``
            tableList.replaceChildren()
            price_list.replaceChildren()
            veg_list.replaceChildren()
            nonveg_list.replaceChildren()
            ownerreview.replaceChildren()

            morningBookedTables.forEach((table)=>{
                const currentTableStatus=tablesMap.get("morning")
                currentTableStatus[table]=false
                tablesMap.set("morning",currentTableStatus)
            })

            afternoonBookedTables.forEach((table)=>{
                const currentTableStatus=tablesMap.get("afternoon")
                currentTableStatus[table]=false
                tablesMap.set("afternoon",currentTableStatus)
            })

            nightBookedTables.forEach((table)=>{
                const currentTableStatus=tablesMap.get("night")
                currentTableStatus[table]=false
                tablesMap.set("morning",currentTableStatus)
            })

            const morningTableDoc=doc(collection(firestore,"tables"),"morning")
            const afternoonTableDoc=doc(collection(firestore,"tables"),"afternoon")
            const nightTableDoc=doc(collection(firestore,"tables"),"night")
            const updated_docref=doc(order_collection,element.id)

            await updateDoc(morningTableDoc,tablesMap.get("morning"))
            await updateDoc(afternoonTableDoc,tablesMap.get("afternoon"))
            await updateDoc(nightTableDoc,tablesMap.get("night"))
            await deleteDoc(updated_docref)
                            
        })
        o_id++
    })

}

const fetchOrdersBox=document.querySelector("#AuthenticatingBox")

const showOrders=async ()=>{
    fetchOrdersBox.classList.remove("ihidden")

    let order_collection_docs=query(order_collection,orderBy('ttl','desc'))
    let querySnapShot=await getDocs(order_collection_docs)
    await orderDisplay(querySnapShot)

    fetchOrdersBox.classList.add("ihidden")
}

showOrders()

const reload=document.querySelector("#reload")
reload.addEventListener("click",showOrders)

const searchBar=document.querySelector("#dni")

searchBar.addEventListener("input",(event)=>{
    const input=event.target.value.toLowerCase()
  
    document.querySelectorAll(".list_of_orders article").forEach((foodOrder)=>{
      const isVisible=foodOrder.querySelector("button").innerHTML.toLowerCase().includes(input)
      foodOrder.classList.toggle("notVisible",!isVisible)
    })
})

const div1=document.querySelector("#main_container")
let scrollAmount,startX=0

div1.addEventListener("touchstart",(event)=>{
    startX=event.touches[0].clientX
})

div1.addEventListener("touchmove",(event)=>{
    const deltaX=event.touches[0].clientX-startX

    if(deltaX>20){
        scrollAmount=(div1.clientWidth)*-1                                
        div1.scrollBy({left:scrollAmount,behavior:"smooth"})
    }
    else if(deltaX<-20){
        scrollAmount=(div1.clientWidth)*1
        div1.scrollBy({left:scrollAmount,behavior:"smooth"})
    }

})