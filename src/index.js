import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, doc, getDoc, getDocs, setDoc, onSnapshot, collection, addDoc, updateDoc, deleteDoc, deleteField } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: 'AIzaSyCK4Orh1fxPGvaE7aud6aPOy-bRQWMmKZM',
    authDomain: 'fir-demo-project-2af42.firebaseapp.com',
    databaseURL: "https://fir-demo-project-2af42-default-rtdb.firebaseio.com",
    projectId: 'fir-demo-project-2af42',
    storageBucket: 'fir-demo-project-2af42.appspot.com',
    messagingSenderId: '272557091575',
    appId: '1:272557091575:web:b97384a0ac577c96fc01f2'
});

// const auth = getAuth(firebaseApp);
// // const db = getFirestore(firebaseApp);
const firestore = getFirestore();

// onAuthStateChanged(auth, user => {
//     if(user != null) {
//         console.log('logged in');
//     } else {
//         console.log('No user');
//     }
// });

// const hikingTrails = doc(firestore, 'trailsHiked/T1');
// function writeTrails() {
//     const docData = {
//         Name: "Cress Creek Nature Trail",
//         Length: 3,
//         Difficulty: "easy"
//     };
//     setDoc(hikingTrails, docData, {merge: true})
//         // .then(() => {
//         //     console.log('This value has been written to the database');
//         // })
//         // .catch((error) => {
//         //     console.log('I got an error! ${error}');
//         // })
// }


// var stdNo = 0;
// var tbody = document.getElementById('tbody1');

// function AddItemsToTable(name, length, difficulty){
//     let trow = document.createElement("trow");
//     let td1 = document.createElement('td');
//     let td2 = document.createElement('td');
//     let td3 = document.createElement('td');
//     let td4 = document.createElement('td');
//     td1.innerHTML= ++stdNo;
//     td2.innerHTML= name;
//     td3.innerHTML= length;
//     td4.innerHTML= difficulty;


//     trow.appendChild(td1);
//     trow.appendChild(td2);
//     trow.appendChild(td3);
//     trow.appendChild(td4);


//     tbody.appendChild(trow);
// }

// function AddAllItemsToTable(TheTrail){
//     stdNo=0;
//     tbody.innerHTML="";
//     TheTrail.forEach(element => {
//         AddItemsToTable(element.Name, element.Length, element.Difficulty);
        
//     });
// }

// async function GetAllDataOnce(){
//     const querySnapshot = await getDocs(collection(firestore,"trailsHiked"));

//     var trails = [];

//     querySnapshot.forEach(doc => {
//         trails.push(doc.data());
//     });

//     AddAllItemsToTable(trails);
// }
// async function GetAllDataRealtime(){
//     const dbref = collection(firestore,"trailsHiked");

//     onSnapshot(dbref,(querySnapshot) => {
//         var trails = [];

//         querySnapshot.forEach(doc => {
//             trails.push(doc.data());
//         });

//         AddAllItemsToTable(trails);
//     });
// }

// window.onload = GetAllDataOnce;

let NameBox = document.getElementById("Namebox");
let LengthBox = document.getElementById("Lengthbox");
let DifBox = document.getElementById("Difbox");

let InsBtn = document.getElementById("InsBtn");
let SelBtn = document.getElementById("SelBtn");
let UpdBtn = document.getElementById("UpdBtn");
let DelBtn = document.getElementById("DelBtn");
let ClrBtn = document.getElementById("ClrBtn");



async function AddDocument_AutoId(){
    var ref = collection(firestore, 'trailsHiked');

    const docRef = await addDoc(
        ref, {
            Name: NameBox.value,
            Length: LengthBox.value,
            Difficulty: DifBox.value
        }
    )
    .then(()=>{
        alert("data added successfuly")
    })
    .catch((error)=>{
        alert("Unsuccessuful operation, error:" +error);
    })
    console.log("document id is "+ docRef.id)
}
async function AddDocument_CustomId(){
    var ref = doc(firestore, 'trailsHiked', NameBox.value);

    await setDoc(
        ref, {
            Name: NameBox.value,
            Length: LengthBox.value,
            Difficulty: DifBox.value
        }
    )
    .then(()=>{
        alert("data added successfuly")
    })
    .catch((error)=>{
        alert("Unsuccessuful operation, error:" +error);
    })
}

async function GetADocument(){
    var ref = doc(firestore, 'trailsHiked', NameBox.value);
    const docSnap = await getDoc(ref);
    
    if(docSnap.exists()){
        NameBox.value = docSnap.data().Name;
        LengthBox.value = docSnap.data().Length;
        DifBox.value = docSnap.data().Difficulty;
    }
    else{
        alert("No Such Document");
    }
}

async function UpdateFieldsInADocument(){
    var ref = doc(firestore, 'trailsHiked', NameBox.value);

    await setDoc(
        ref, {
            Name: NameBox.value,
            Length: LengthBox.value,
            Difficulty: DifBox.value
        }
    )
    .then(()=>{
        alert("data updated successfuly")
    })
    .catch((error)=>{
        alert("Unsuccessuful operation, error:" +error);
    })
}

async function DeleteDocument(){
    var ref = doc(firestore, 'trailsHiked', NameBox.value);
    const docSnap = await getDoc(ref);
    
    if(!docSnap.exists()){
        alert("Document does not exist");
        return;
    }

    await deleteDoc(ref)
    .then(() =>{
        alert("data deleted successfully");
    })
    .catch((error)=>{
        alert("Unsuccessufl operation, error:"+ error)
    })
}

async function ClearInputs(){
    NameBox.value = "";
    LengthBox.value = "";
    DifBox.value = "";
}

InsBtn.addEventListener("click", AddDocument_CustomId);
SelBtn.addEventListener("click", GetADocument);
UpdBtn.addEventListener("click", UpdateFieldsInADocument);
DelBtn.addEventListener("click", DeleteDocument);
ClrBtn.addEventListener("click", ClearInputs);





console.log('It Works!')
// writeTrails();

