import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../firebsae.config";

function Home() {
  const [toasted, setToasted] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if(user){
      toast.info(`🦄 Welcome ${user.email}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  });
  return (
    <>
      <ToastContainer />
    </>
  );
}

export default Home;
