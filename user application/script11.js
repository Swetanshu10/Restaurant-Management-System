import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getAuth,onAuthStateChanged,EmailAuthProvider,reauthenticateWithCredential,deleteUser,updateProfile} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import {getFirestore,doc,setDoc,getDoc,deleteDoc,collection,query,where,getDocs,limit} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
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
const userForm=document.querySelector("#mainForm")

const dataManager=()=>{
    let userDict=new Map(),actualName="",firstTime=true

    const addRecord=(userName,disName)=>{
        if(!userDict.has(userName)){
            userDict.set(userName,disName)
            actualName=userName
            firstTime=false
        }
    }

    const getRecord=()=>{
        if(userDict.has(actualName)){
            return {
                "Name":actualName,
                "disName":userDict.get(actualName)
            }
        }
    }

    const isNew=()=>{
        return firstTime
    }

    return {
        addRecord:addRecord,
        getRecord:getRecord,
        isNew:isNew
    }
}

const userObject=dataManager()

async function AuthCheck(){
    onAuthStateChanged(auth, async (user) => {
        if (user) { 
            if(user.emailVerified){
                const docref=doc(firestore,'Users_Info',user.uid)
                const doc1=await getDoc(docref)

                await formFill(doc1)

                loader.classList.add("loaderHide")
                userForm.classList.remove("loaderHide")
            }
            else{
                alert("your email is not verified, please check mail for verification email")
                window.location.href="index.html"
            }
        }
        else{
            window.location.href="index.html"
        }
    })
}

window.addEventListener("pageshow",async ()=>{
    await AuthCheck()
})

async function formFill(doc1){
    if(doc1.exists()){
        const info=doc1.data()

        document.querySelector("#name").value=info['Name']
        document.querySelector("#name").readOnly=true
        document.querySelector("#name").setAttribute("class","nonEdit")

        document.querySelector("#nn").value=info["nickName"]
        document.querySelector("#nn").readOnly=true
        document.querySelector("#nn").setAttribute("class","nonEdit")

        document.querySelector("#num_1").value=info["Contact"]
        userObject.addRecord(info['Name'],info["nickName"])
    }
    else{
        return
    }
}

const form=document.querySelector(".add_box")
const authBox=document.querySelector("#AuthenticatingBox")
const statusMess=document.querySelector("#status")

form.addEventListener("submit",async (e)=>{
    e.preventDefault()
    statusMess.innerText=`Submiting...`
    authBox.classList.remove("ihidden") 

    const name=userObject.isNew()===true?document.querySelector("#name").value:userObject.getRecord()["Name"]
    const nn=userObject.isNew()===true?document.querySelector("#nn").value:userObject.getRecord()["disName"]
    const mob_num=document.querySelector("#num_1").value

    const safeName=DOMPurify.sanitize(name)
    const safeNn=DOMPurify.sanitize(nn)
    const safeMobNum=DOMPurify.sanitize(mob_num)

    const user=auth.currentUser
    const udoc=query(collection(firestore,"NickName_Collection"),where("nickName","==",safeNn),where("User","!=",user.uid),limit(1))
    const user_docs=await getDocs(udoc)

    if(user_docs.empty){
        const userdoc_ref=doc(firestore,"Users_Info",user.uid)
    
        await setDoc(userdoc_ref,{ 
            "Name":safeName,
            "nickName":safeNn,
            "Contact":safeMobNum
        })
    
        if(userObject.isNew()){
            const nn_doc=doc(firestore,"NickName_Collection",user.uid.split("").reverse().join(""))
            
            await setDoc(nn_doc,{
                "User":user.uid,
                "nickName":safeNn
            })

            await updateProfile(user,{
                displayName:safeNn
            })
        }
    
        authBox.classList.add("ihidden")
        window.location.href="index1.html"
    }
    else{
        authBox.classList.add("ihidden")
        alert("Display name already exists,choose another one")
    }
})


const da=document.querySelector("#du")
const del_p=document.querySelector("#del_p")

da.addEventListener("click",()=>{
    statusMess.innerText=`Deleting account.....`
    authBox.classList.remove("ihidden")

    const user=auth.currentUser
    const credentials=EmailAuthProvider.credential(user.email,del_p.value)

    reauthenticateWithCredential(user,credentials)
    .then(async ()=>{
        const odoc=query(collection(firestore,"MO_collection"),where("User","==",user.uid),limit(1))
        const u_orders=await getDocs(odoc)

        if(u_orders.empty){
            const udocRef=doc(firestore,"Users_Info",user.uid)
            const udoc=await getDoc(udocRef)
            if(udoc.exists()){
                await deleteDoc(udocRef) 
            }

            const nndocRef=doc(firestore,"NickName_Collection",user.uid.split("").reverse().join(""))
            const nndoc=await getDoc(nndocRef)
            if(nndoc.exists()){
                await deleteDoc(nndocRef)
            } 

            deleteUser(user)
            .then(() => {
                authBox.classList.add("ihidden")
                alert("Account deleted successfully")
                window.location.href="index.html"
            })
            .catch((error) => {
                authBox.classList.add("ihidden")
                alert("Unknown error occured,try again")
            })

        }
        else{
            authBox.classList.add("ihidden")
            alert("Can't delete account because your placed orders are still not removed,contact owners")
        }
    })
    .catch((error) =>{
        authBox.classList.add("ihidden")
        alert("Error!,try again")
    })
})