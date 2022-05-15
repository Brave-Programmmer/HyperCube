import React, { useState, useEffect } from "react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { firestore, auth } from "../firebsae.config";
import { useParams } from "react-router-dom";
import Video from "../components/Video";
import { Box, Typography, Stack } from "@mui/material";
function Videos() {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);

  const [userData, setUserData] = useState();
  const [Blogs, setBlogs] = useState([]);
  let { id } = useParams();
  console.log(id);
  useEffect(async () => {
    const colRef = collection(firestore, "videos");
    const myquery = query(colRef, where("slug", "==", id));
    const docSnap = await getDocs(myquery);
    setBlogs(docSnap.docs.map((doc) => ({ ...doc.data() })));
    // console.log(Blogs);
    setTimeout(() => {
      if (Blogs != null) {
        setLoading(false);
      }
    }, 2000);
  }, []);
  onAuthStateChanged(auth, async (user) => {
    const q = query(
      collection(firestore, "channel"),
      where("email", "==", user.email)
    );

    const ch_names = await getDocs(q);
    setUserData(ch_names.docs.map((doc) => ({ ...doc.data() })));
    if (userData != null) {
      setLoading1(false);
    } else {
      setLoading1(true);
    }
  });
  return (
    <>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Video data={Blogs} />
        <Box sx={{ width: "100%" }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              margin: "20px",
              backgroundColor: "rgba(0,0,0,0.2)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Box>
              {loading1 == false ? (
                userData.map((doc) => {
                  return <Typography>Channel Name: {doc.ch_name}</Typography>;
                })
              ) : (
                <h1>Loading</h1>
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Videos;
