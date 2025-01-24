import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getFirestore,collection,setDoc,doc,getDoc,updateDoc} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import {getStorage,ref,uploadBytes,getDownloadURL} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js'
import {getAuth,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js'
import ImageCompressor from "./index.js"

const title=document.querySelector("#M_title")

function title_margin(){
  title.style.marginLeft=`${(window.innerWidth-title.offsetWidth)/2.1}px`
}

window.onload=title_margin
window.onresize=title_margin

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

const storage=getStorage(firebaseApp)
const submit_form=document.querySelector(".add_box")
const message=document.querySelector("#orderFetched")
var col,value_id,docref
const progressBox=document.querySelector("#AuthenticatingBox")

const imageProcessing=async (image)=>{
  const options = {
    file: image,
    quality:0.75,
    mimeType:'image/webp',
    success: async function (result) {
      const storage_ref=await ref(storage,'images/'+result.name)
      const uploadtask=uploadBytes(storage_ref,result)

      const value_ref=doc(firestore,'dish_id_collection','dish_id')

      const time_option=document.querySelector(".options")
      const selected_value=time_option.options[time_option.selectedIndex].value

      const vn_option=document.querySelector(".vnv")
      const sv2=vn_option.options[vn_option.selectedIndex].value

      const d_title=document.querySelector("#dtitle").value
      const d_des=document.querySelector("#ddes").value
      const d_price=document.querySelector("#dprice").value
      const d_delTime=document.querySelector("#d_delTime").value 

      if(selected_value==="Starters" && sv2==="VEG"){
        getDoc(value_ref).then((docSnapshot)=>{
          if(docSnapshot.exists){
            value_id=docSnapshot.get('value1')
          }
        })
        col=collection(firestore,"bvw")

        uploadtask.then((snapshot) => {
          return getDownloadURL(storage_ref); 
        })
        .then((downloadURL) => {
          docref=doc(col,'bvi'+value_id)

          const data={
            "Image":downloadURL,
            "Title":d_title,
            "Description":d_des,
            "Price":d_price,
            "delTime":d_delTime,
            "visibility":false
          }

          setDoc(docref,data)
          updateDoc(value_ref,{
            'value1':value_id+1
          })
        })
        .catch((error) => {
          alert('Upload failed:', error)
        })
      }

      else if(selected_value==="Starters" && sv2==="NON-VEG"){
        getDoc(value_ref).then((docSnapshot)=>{
          if(docSnapshot.exists){
            value_id=docSnapshot.get('value2')
          }
        })
        col=collection(firestore,"bnvw")

        uploadtask.then((snapshot) => {
          return getDownloadURL(storage_ref)
        })
        .then((downloadURL) => {
          docref=doc(col,'bnvi'+value_id)
          const data={
            "Image":downloadURL,
            "Title":d_title,
            "Description":d_des,
            "Price":d_price,
            "delTime":d_delTime,
            "visibility":false
          }
          setDoc(docref,data)
          updateDoc(value_ref,{
            'value2':value_id+1
          })
        })
        .catch((error) => {
          alert('Upload failed:', error);
        })
      }

      else if(selected_value==="Main course" && sv2==="VEG"){
        getDoc(value_ref).then((docSnapshot)=>{
          if(docSnapshot.exists){
            value_id=docSnapshot.get('value3')
          }
        })
        col=collection(firestore,"lvw")

        uploadtask.then((snapshot) => {
          return getDownloadURL(storage_ref)
        })
        .then((downloadURL) => {
          docref=doc(col,'lvi'+value_id)
          const data={
            "Image":downloadURL,
            "Title":d_title,
            "Description":d_des,
            "Price":d_price,
            "delTime":d_delTime,
            "visibility":false
          }
          setDoc(docref,data)
          updateDoc(value_ref,{
            'value3':value_id+1
          })
        })
        .catch((error) => {
          alert('Upload failed:', error);
        })
      }

      else if(selected_value==="Main course" && sv2==="NON-VEG"){
        getDoc(value_ref).then((docSnapshot)=>{
          if(docSnapshot.exists){
            value_id=docSnapshot.get('value4')
          }
        })
        col=collection(firestore,"lnvw")

        uploadtask.then((snapshot) => {
          return getDownloadURL(storage_ref)
        })
        .then((downloadURL) => {
          docref=doc(col,'lnvi'+value_id)
          const data={
            "Image":downloadURL,
            "Title":d_title,
            "Description":d_des,
            "Price":d_price,
            "delTime":d_delTime,
            "visibility":false
          }
          setDoc(docref,data)
          updateDoc(value_ref,{
            'value4':value_id+1
          })
        })
        .catch((error) => {
          alert('Upload failed:', error)
        })
      }

      progressBox.classList.add("ihidden")
      message.classList.replace("ofnv","ofv")

      setTimeout(()=>{
        message.classList.replace("ofv","ofnv")
      },2000)
    }
  }

  new ImageCompressor(options)
}

submit_form.addEventListener("submit",(e)=>{
  e.preventDefault()
  progressBox.classList.remove("ihidden")
  const image=document.querySelector("#Image").files[0] 
  imageProcessing(image)  
})