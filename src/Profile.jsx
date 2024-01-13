import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from './firebase';

const Profile = () => {
    const { id } = useParams();
    // const [userID, setUserID] = useState("");
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // useEffect(() => {
    //   auth.onAuthStateChanged((user) => {
    //     console.log("Auth State Changed:", user); // Log user details
    //     setUserID(user.uid);
    //     console.log("userID:", userID); // Log userID value
    //   });
    // }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
  
        try {
          console.log("Fetching data for userID:", id); // Log userID before fetching
          const docRef = doc(db, "UserInfo", id);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setError("Profile not found");
          }
        } catch (error) {
          console.error("Error:", error); // Log detailed error message
          setError("Error loading profile");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [id]);

    
  
  return (
    <div>
      {isLoading && <p>Loading profile...</p>}
      {error && <p>Error: {error}</p>}
      {userData && (
        <div>
          {/* Display user information here */}
          <h2>{userData.Company_Name}</h2>
          <h5>{userData.User_Name}</h5>
          <h5>{userData.PhoneNumber}</h5>
          <h5>{userData.Link}</h5>
          <h5>{userData.Facebook_Link}</h5>
          <h5>{userData.Instagram_Link}</h5>
          <h5>{userData.X_Link}</h5>
          <h5>{userData.Address}</h5>
          
          {/* <img src={userData.Profile_URl} alt="not found" /> */}
          {/* ...other fields... */}
        </div>
      )}
    </div>
  );
};

export default Profile;