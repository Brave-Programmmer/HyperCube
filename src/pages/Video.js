import React, { useState, useEffect } from "react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebsae.config";
import { useParams } from "react-router-dom";

function Video() {
  const [loading, setLoading] = useState(true);
  const [Blogs, setBlogs] = useState([]);
  let { id } = useParams();
  console.log(id);
  useEffect(async () => {
    const colRef = collection(firestore, "videos");
    const myquery = query(colRef, where("slug", "==", id));
    const docSnap = await getDocs(myquery);
    setBlogs(docSnap.docs.map((doc) => ({ ...doc.data() })));
    console.log(Blogs);
    setTimeout(() => {
      if (Blogs != null) {
        setLoading(false);
      }
    }, 2000);
  }, []);
  console.log(Blogs);

  return <></>;
}

export default Video;
