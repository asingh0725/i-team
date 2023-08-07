import React, { useState, useEffect } from "react";
import { auth, db as firestore, storage } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);

      const fetchProfilePic = async () => {
        const userDoc = await getDoc(doc(firestore, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setProfilePic(userDoc.data().profilePic);
        }
      };
      
      fetchProfilePic();
    }
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, 'profilePictures/' + user.uid);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(storageRef);
      await setDoc(doc(firestore, "users", user.uid), {
        profilePic: downloadURL
      }, { merge: true });
      setProfilePic(downloadURL);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return user ? (
    <div>
      <h1>My Page</h1>
      <p>Email: {user.email}</p>
      {profilePic && <img src={profilePic} alt="Profile" />}
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default MyPage;