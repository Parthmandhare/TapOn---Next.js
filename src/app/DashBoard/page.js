"use client"

import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

import Link from "next/link"



const page = () => {
  const router = useRouter();

  const[displayUser, setDisplayUser] = useState("Please Login Bhai!");
  const[userID, setUserID] = useState("");

  const[displayCname , setdisplayCname] = useState("");
  const[displaylink1 , setdisplaylink1] = useState("");
  const[displayPhoneNo , setdisplayPhoneNo] = useState("");

  const[displayUserName, setDisplayUserName] = useState("");

  // variables for inputing the data

  const[InputCname , setInputCname] = useState("");
  const[Inputlink1 , setInputlink1] = useState("");
  const[InputPhoneNo , setInputPhoneNo] = useState("");


  useEffect(()=>{
      auth.onAuthStateChanged((user)=>{
      setDisplayUser(user.displayName);
      console.log(user.uid);
      setUserID(user.uid);
    })
  })

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      console.log("Loged Out");
      router.push('/Login');
    }).catch((error) => {
      console.log(error.message);
    });
  }


  const getData = async () => {
    const docRef = doc(db, "UserInfo", userID);

    const docData = await getDoc(docRef);

    console.log(docData.data());

    setdisplayCname(docData.data().Company_Name);
    setdisplaylink1(docData.data().Link);
    setdisplayPhoneNo(docData.data().PhoneNumber);
    setDisplayUserName(docData.data().User_Name)
  }

  let isNullOrWhiteSpaces = value =>{
    value = value.toString();
    return (value == null || value.replaceAll(' ', '').length < 1);
  }

  const submitInNewWay = (e) =>{

    e.preventDefault();

    if(isNullOrWhiteSpaces (InputCname) || isNullOrWhiteSpaces(InputPhoneNo) || isNullOrWhiteSpaces(Inputlink1)){
      alert("Fill all the field Bro!");
      return;
    }

    const data = {
      User_Name: displayUser,
      Company_Name : InputCname,
      PhoneNumber : InputPhoneNo,
      Link: Inputlink1
    }

    const userRef = doc(collection(db, "UserInfo"), userID);

    setDoc(userRef, data)
    .then(() => {
        console.log("Document has been added successfully");
        setInputCname("");
        setInputPhoneNo("");
        setInputlink1("");
    })
    .catch(error => {
        console.log(error);
    })

  }
  

  return (
    <>
       <h1>Hello {displayUser}</h1>

        <h3>Detail Form!</h3>

       <input type="text" placeholder='Enter Company name' value={InputCname} onChange={(e) => {setInputCname(e.target.value)}}/>
       <input type="text" placeholder='Enter Phone No' value={InputPhoneNo} onChange={(e) => {setInputPhoneNo(e.target.value)}}/>
       <input type="text" placeholder='Enter Link' value={Inputlink1} onChange={(e) => {setInputlink1(e.target.value)}}/>

       <button onClick={submitInNewWay}>Submit In new Way!</button>

       {/* practice purpose */}
       <button onClick={getData}>Get the data</button>

       <button onClick={handleSignOut} >SignOut!</button>

          {displayCname }

          {displaylink1}  
          
          {displayPhoneNo }
       
       <h1>Your Name</h1>

       {displayUserName}

       <Link href="/Update">Update The info!</Link>

    </>
  )
}

export default page