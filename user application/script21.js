import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getFirestore,query,collection,onSnapshot,doc,setDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import {getAuth} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js'
import {nanoid} from "./nanoid.js"

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
const firestore=getFirestore(firebaseApp)

const loaderBox=document.querySelector("#loader")
const maincontent=document.querySelector("main")

const dishRecordsKeeper=()=>{
  let dishRecordsVeg=new Map()
  let dishRecordsNonVeg=new Map()
  let totalPrice=0

  const addDish=(querySnap,category,dishID,dishName,dishQuantity,dishPrice)=>{
    if(!querySnap.empty){
      if(category==="Veg" && !dishRecordsVeg.has(dishID)){
        dishRecordsVeg.set(dishID,{
          dishTitle:dishName,
          dishAmount:dishQuantity,
          dishCost:dishPrice
        })

      }
      else if(category==="nonVeg" && !dishRecordsNonVeg.has(dishID)){
        dishRecordsNonVeg.set(dishID,{
          dishTitle:dishName,
          dishAmount:dishQuantity,
          dishCost:dishPrice
        })
      }
    }
  }

  const displayDishQuant=(dishID,category)=>{
    if(category==="Veg"){
      if(dishRecordsVeg.has(dishID)){
        return dishRecordsVeg.get(dishID).dishAmount
      }else{
        return null
      }
    }
    else if(category==="nonVeg"){
      if(dishRecordsNonVeg.has(dishID)){
        return dishRecordsNonVeg.get(dishID).dishAmount
      }else{
        return null
      }
    }
  }

  const updateQuantity=(dishID,category,quant)=>{
    if(category==="Veg"){
      if(dishRecordsVeg.has(dishID)){
        const currentAmount=dishRecordsVeg.get(dishID).dishAmount
        dishRecordsVeg.get(dishID).dishAmount=currentAmount+quant

        totalPrice+=dishRecordsVeg.get(dishID).dishCost*quant
      }
    }
    else if(category==="nonVeg"){
      if(dishRecordsNonVeg.has(dishID)){
        const currentAmount=dishRecordsNonVeg.get(dishID).dishAmount
        dishRecordsNonVeg.get(dishID).dishAmount=currentAmount+quant

        totalPrice+=dishRecordsNonVeg.get(dishID).dishCost*quant
      }
      
    }
  }

  const foodList=()=>{
    const vegArray=[]
    const nonVegArray=[]

    dishRecordsVeg.forEach((value,key)=>{
      if(value.dishAmount>0){
        vegArray.push(value)
      }
    })

    dishRecordsNonVeg.forEach((value,key)=>{
      if(value.dishAmount>0){
        nonVegArray.push(value)
      }
    })

    return {
      vegArray:vegArray,
      nonVegArray:nonVegArray
    }
  }

  const totalPriceCalc=()=>{
    return totalPrice
  }

  const removeDish=(querySnap,dishID)=>{
    if(!querySnap.empty){
      if(dishRecordsVeg.has(dishID)){
        totalPrice-=dishRecordsVeg.get(dishID).dishCost*dishRecordsVeg.get(dishID).dishAmount
        dishRecordsVeg.delete(dishID)
      }
      else if(dishRecordsNonVeg.has(dishID)){
        totalPrice-=dishRecordsNonVeg.get(dishID).dishCost*dishRecordsNonVeg.get(dishID).dishAmount
        dishRecordsNonVeg.delete(dishID)
      }
      price_display.innerHTML=totalPrice
    }
  }

  return {
    addDish:addDish,
    displayDishQuant:displayDishQuant,
    updateQuantity:updateQuantity,
    foodList:foodList,
    totalPriceCalc:totalPriceCalc,
    removeDish:removeDish
  }
}

const globalDishObject=dishRecordsKeeper()
const price_display=document.querySelector(".number")

async function dishManagement(quantity_but,dishID,container){
  
  quantity_but.forEach((item)=>{
    item.addEventListener("click",()=>{
      const parentID=container.getAttribute("id")
      let foodCategory
  
      if((parentID==="bvw") || (parentID==="lvw")){
        foodCategory="Veg"
      }
      else if((parentID==="bnvw") || (parentID==="lnvw")){
        foodCategory="nonVeg"
      }
  
      const quantityBox=document.querySelector("#qb"+dishID)
  
      const count=globalDishObject.displayDishQuant(dishID,foodCategory)
      const data_index=item.getAttribute("data-index")
  
      if((parseInt(data_index,10))%2!==0){
        if(count>0){
          const count_int=(parseInt(count,10))-1
          quantityBox.innerHTML=`${count_int}`
          globalDishObject.updateQuantity(dishID,foodCategory,-1)
          price_display.innerHTML=globalDishObject.totalPriceCalc()
        }
      }
      else if((parseInt(data_index,10))%2===0){
        const count_int=(parseInt(count,10))+1
        quantityBox.innerHTML=`${count_int}`
        globalDishObject.updateQuantity(dishID,foodCategory,1)
        price_display.innerHTML=globalDishObject.totalPriceCalc()
      }
    })
  })
}

const dishCard=async (querySnapshot,container,cat,dish_data,doc)=>{
  
  let dish_template,variableHtml,isAvailable=false

  if(dish_data['visibility']===true){
    variableHtml=`
    <article class="QUANT">
      <button class=${"b"+doc.id} data-index="1">-</button>
      <p class="A_N" id=${"qb"+doc.id}>0</p>
      <button class=${"b"+doc.id} data-index="2">+</button>
    </article>
    `

    isAvailable=true
  }
  else{
    variableHtml=`
    <h5 class="unavailable">Unavailable</h5>
    `
  }

  dish_template=`
  <section class="veg-item" id="${doc.id}">

    <img id="logo" src="${dish_data["Image"]}" loading="lazy">
    <section class="dishInfo">
      <h4 class="disht">${dish_data["Title"]}</h4>
      <p class="Serving">Serving:${dish_data["delTime"]}</p>

      <section class="oInfo">
        <p class="dishPrice">Rs. ${dish_data["Price"]}</p>
        ${variableHtml}
      </section>
    </section>

    <p class="dish_description">${dish_data["Description"]}</p>

  </section>
  `

  globalDishObject.removeDish(querySnapshot,doc.id)
  if(isAvailable){
    container.insertAdjacentHTML('afterbegin',dish_template)
    globalDishObject.addDish(querySnapshot,cat,doc.id,dish_data["Title"],0,parseInt(dish_data["Price"],10))
    const b1=document.querySelectorAll(`.b${doc.id}`)
    await dishManagement(b1,doc.id,container)
    
    if(!loaderBox.classList.contains("notVisible")){
      loaderBox.classList.add("notVisible")
    }
    if(maincontent.classList.contains("notVisible")){
      maincontent.classList.remove("notVisible")
    }
  }
  else{
    container.insertAdjacentHTML('beforeend',dish_template)
    
    if(!loaderBox.classList.contains("notVisible")){
      loaderBox.classList.add("notVisible")
    }
    if(maincontent.classList.contains("notVisible")){
      maincontent.classList.remove("notVisible")
    }
  }
  
}

const bvw=document.querySelector("#bvw")
const bvw_col=query(collection(firestore,'bvw'))

const bnvw=document.querySelector("#bnvw")
const bnvw_col=query(collection(firestore,'bnvw'))

const lvw=document.querySelector("#lvw")
const lvw_col=query(collection(firestore,'lvw'))

const lnvw=document.querySelector("#lnvw")
const lnvw_col=query(collection(firestore,'lnvw'))


const searchBar=document.querySelector("#searchBar")

searchBar.addEventListener("input",(event)=>{
  const input=event.target.value.toLowerCase()

  document.querySelectorAll(".veg-item").forEach((card)=>{
    const isVisible=card.querySelector(".disht").innerHTML.toLowerCase().includes(input)
    card.classList.toggle("notVisible",!isVisible)
  })

})

let unsubscribe1,unsubscribe2,unsubscribe3,unsubscribe4

const dish_loader=async ()=>{

  unsubscribe1=onSnapshot(bvw_col,(snapShot)=>{
    snapShot.docChanges().forEach(async change => {
      const firebaseDoc=change.doc
      const dish_data=change.doc.data()
  
      try{
        const modDoc=document.querySelector(`#${firebaseDoc.id}`)
        const docParent=modDoc.parentNode
        docParent.removeChild(modDoc)
        await dishCard(snapShot,bvw,"Veg",dish_data,firebaseDoc)
      }
      catch(error){
        await dishCard(snapShot,bvw,"Veg",dish_data,firebaseDoc)
      }
    })
  })

  unsubscribe2=onSnapshot(bnvw_col,(snapShot)=>{
    snapShot.docChanges().forEach(async change => {
      const firebaseDoc=change.doc
      const dish_data=change.doc.data()
  
      try{
        const modDoc=document.querySelector(`#${firebaseDoc.id}`)
        const docParent=modDoc.parentNode
        docParent.removeChild(modDoc)
        await dishCard(snapShot,bnvw,"nonVeg",dish_data,firebaseDoc)
      }
      catch(error){
        await dishCard(snapShot,bnvw,"nonVeg",dish_data,firebaseDoc)
      }
    })
  })

  unsubscribe3=onSnapshot(lvw_col,(snapShot)=>{
    snapShot.docChanges().forEach(async change => {
      const firebaseDoc=change.doc
      const dish_data=change.doc.data()
  
      try{
        const modDoc=document.querySelector(`#${firebaseDoc.id}`)
        const docParent=modDoc.parentNode
        docParent.removeChild(modDoc)
        await dishCard(snapShot,lvw,"Veg",dish_data,firebaseDoc)
      }
      catch(error){
        await dishCard(snapShot,lvw,"Veg",dish_data,firebaseDoc)
      }
    })
  })

  unsubscribe4=onSnapshot(lnvw_col,(snapShot)=>{
    snapShot.docChanges().forEach(async change => {
      const firebaseDoc=change.doc
      const dish_data=change.doc.data()
  
      try{
        const modDoc=document.querySelector(`#${firebaseDoc.id}`)
        const docParent=modDoc.parentNode
        docParent.removeChild(modDoc)
        await dishCard(snapShot,lnvw,"nonVeg",dish_data,firebaseDoc)
      }
      catch(error){
        await dishCard(snapShot,lnvw,"nonVeg",dish_data,firebaseDoc)
      }
    })
  })
}
await dish_loader()

const tablesMap=new Map()
const userBookedTables={
  'morning':[],
  'afternoon':[],
  'night':[]
}

function tableStatus(time,table,status){
  if(status===true || status===false){
    const currentStatus=tablesMap.get(time)
    currentStatus[table]=status
    tablesMap.set(time,currentStatus)
  }

  if(status===true){
    userBookedTables[time].push(table)
  }
  else if(status===false){
    userBookedTables[time].splice(userBookedTables[time].indexOf(table),1)
  }

}

const timeSlots=document.querySelector("#restaurantTiming")

function bookButtonEventHandler(buttonRef){
  if(buttonRef!==null){
    let isBooked
    buttonRef.addEventListener("click",()=>{
      const time=timeSlots.value
      const tableID=buttonRef.parentNode.id
      
      if(!tablesMap.get(time)[tableID]){
        buttonRef.classList.add("seatBookedButton")
        buttonRef.innerText="Cancel"
        isBooked=true
      }
      else{
        buttonRef.classList.remove("seatBookedButton")
        buttonRef.innerHTML="Book"
        isBooked=false
      }
  
      tableStatus(time,tableID,isBooked)
    })
  }
}

const tableManager=(time,tables)=>{
  tables.forEach((table)=>{
    const currentStatus=tablesMap.get(time)[table]
    const tableRef=document.querySelector(`#${table}`)
    const lastChild=tableRef.lastElementChild
    let updatedTableDisplay

    if(currentStatus===false){
      if(lastChild.classList.contains("tableStatus") || lastChild.classList.contains("seatBookButton")){
        tableRef.removeChild(lastChild)
      }

      updatedTableDisplay=`
      <button class="seatBookButton">Book</button>
      `
    }
    else if(currentStatus===true){
      if(lastChild.classList.contains("seatBookButton") || lastChild.classList.contains("tableStatus")){
        tableRef.removeChild(lastChild)
      }

      updatedTableDisplay=`
        <p class="tableInfo tableStatus">Booked</p>
      `
    }
    tableRef.insertAdjacentHTML("beforeend",updatedTableDisplay)

    const bookButton=tableRef.querySelector("button")
    bookButtonEventHandler(bookButton,time,table)

  })
}

timeSlots.addEventListener("change",()=>{
  tableManager(timeSlots.value,['T1','T2','T3','T4','T5','T6','T7','T8'])
})

const unsubscribe5=onSnapshot(query(collection(firestore,'tables')),(snapShot)=>{
  snapShot.docChanges().forEach(async change => {
    const firebaseDoc=change.doc.id
    const table_data=change.doc.data()
    let changedTableArray=[]

    if(!tablesMap.has(firebaseDoc)){
      tablesMap.set(firebaseDoc,table_data)
      changedTableArray=['T1','T2','T3','T4','T5','T6','T7','T8']
    }
    else if(tablesMap.has(firebaseDoc)){
      const tablesObject=tablesMap.get(firebaseDoc)

      if(tablesObject['T1']!==table_data['T1']){
        tablesObject['T1']=table_data['T1']
        tablesMap.set(firebaseDoc,tablesObject)
        changedTableArray.push('T1')
      }

      if(tablesObject['T2']!==table_data['T2']){
        tablesObject['T2']=table_data['T2']
        tablesMap.set(firebaseDoc,tablesObject)
        changedTableArray.push('T2')
      }

      if(tablesObject['T3']!==table_data['T3']){
        tablesObject['T3']=table_data['T3']
        tablesMap.set(firebaseDoc,tablesObject)
        changedTableArray.push('T3')
      }

      if(tablesObject['T4']!==table_data['T4']){
        tablesObject['T4']=table_data['T4']
        tablesMap.set(firebaseDoc,tablesObject)
        changedTableArray.push('T4')
      }

      if(tablesObject['T5']!==table_data['T5']){
        tablesObject['T5']=table_data['T5']
        tablesMap.set(firebaseDoc,tablesObject)
        changedTableArray.push('T5')
      }

      if(tablesObject['T6']!==table_data['T6']){
        tablesObject['T6']=table_data['T6']
        tablesMap.set(firebaseDoc,tablesObject)
        changedTableArray.push('T6')
      }

      if(tablesObject['T7']!==table_data['T7']){
        tablesObject['T7']=table_data['T7']
        tablesMap.set(firebaseDoc,tablesObject)
        changedTableArray.push('T7')
      }

      if(tablesObject['T8']!==table_data['T8']){
        tablesObject['T8']=table_data['T8']
        tablesMap.set(firebaseDoc,tablesObject)
        changedTableArray.push('T8')
      }
    }

    if(timeSlots.value===firebaseDoc){
      tableManager(firebaseDoc,changedTableArray)
    }

  })
})



const main_c=document.querySelector("#bdy")
async function orderBooking(){
  
  const proceedButton=document.querySelector("#order3")
  const darkBackground=document.querySelector(".darkBackground")
  
  proceedButton.addEventListener("click",()=>{
    darkBackground.classList.remove("notVisible")
    main_c.classList.add("scroll_disable")
  })
  
  const goBack=document.querySelector("#GoBack")
  goBack.addEventListener("click",()=>{
    darkBackground.classList.add("notVisible")
    main_c.classList.remove("scroll_disable")
  })

  const placeOrder=document.querySelector("#PlaceOrder")
  placeOrder.addEventListener("click",async ()=>{
  
    const dishCart=globalDishObject.foodList()
    const vegOrders=dishCart.vegArray
    const nonVegOrders=dishCart.nonVegArray
  
    if(vegOrders.length===0 && nonVegOrders.length===0){
      alert("Your cart is empty")
      return
    }

    if(userBookedTables['morning'].length===0 
      && userBookedTables['afternoon'].length===0 
      && userBookedTables['night'].length===0){

      alert("Please select a table")
      return
    }

    const tablesDocRef=doc(firestore,"tables","morning")
    const tablesDocRef2=doc(firestore,"tables","afternoon")
    const tablesDocRef3=doc(firestore,"tables","night")

    await setDoc(tablesDocRef,tablesMap.get("morning"))
    await setDoc(tablesDocRef2,tablesMap.get("afternoon"))
    await setDoc(tablesDocRef3,tablesMap.get("night"))
  
    const user=auth.currentUser
    const order_docref=doc(firestore,"MO_collection",nanoid())
    const now=new Date()

    const arrayOfTables=new Array()
    arrayOfTables.push(userBookedTables)
    
    await setDoc(order_docref,{
      "User":user.uid,
      "dname":user.displayName,
      "vegOrders":vegOrders,
      "nonVegOrders":nonVegOrders,
      "ttl":now,
      "visited1":false, 
      "tPrice":globalDishObject.totalPriceCalc(),
      "UserReview":"",
      "OwnerReview":"",
      "bookedTables":arrayOfTables
    })
    
    window.location.href="index12.html"
  })
}

await orderBooking()

window.addEventListener("pagehide",()=>{
  unsubscribe1()
  unsubscribe2()
  unsubscribe3()
  unsubscribe4()
  unsubscribe5()
})


const cartButton=document.querySelector("#cart")
const cartSection=document.querySelector("#cartSection")
const dishList=document.querySelector("#dishList")
const cartGoBack=document.querySelector("#GoBack2")
  
cartButton.addEventListener("click",()=>{
  cartSection.classList.remove("notVisible")
  main_c.classList.add("scroll_disable")
  let dishTemp

  dishList.replaceChildren()

  const orderDishes=globalDishObject.foodList()
  const vegOrders=orderDishes.vegArray
  const nonVegOrders=orderDishes.nonVegArray

  vegOrders.forEach((item)=>{
    dishTemp=`
    <section>
      <article><p>${item.dishTitle}</p></article>
      <article>x${item.dishAmount}</article>
      <article><img src="./Images/iR.svg"/> ${item.dishAmount*item.dishCost}</article>
    </section>
    `
    dishList.insertAdjacentHTML('beforeend',dishTemp)
  })


  nonVegOrders.forEach((item)=>{
    dishTemp=`
    <section>
      <article><p>${item.dishTitle}</p></article>
      <article>x${item.dishAmount}</article>
      <article><img src="./Images/iR.svg"/> ${item.dishAmount*item.dishCost}</article>
    </section>
    `
    dishList.insertAdjacentHTML('beforeend',dishTemp)
  })
  
})
  
cartGoBack.addEventListener("click",()=>{
  cartSection.classList.add("notVisible")
  main_c.classList.remove("scroll_disable")
})