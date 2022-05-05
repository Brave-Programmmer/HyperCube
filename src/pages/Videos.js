import React, { useState, useEffect } from "react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebsae.config";
import { useParams } from "react-router-dom";
import Video from "../components/Video";
import { Box, Button, Stack, Typography } from "@mui/material";
function Videos() {
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
              <Typography>Brave Programmer</Typography>
              <Typography>20.1M</Typography>
            </Box>
            <Box>
              <Button color="error" variant="contained">
                Subscribe
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Videos;
