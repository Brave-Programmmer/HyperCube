import { Box, Button, Stack, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { auth, firestore } from "../firebsae.config";

function Admin() {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true)
  // const [user, setUser] = useState("");
  onAuthStateChanged(auth, async (user) => {
    // setUser(user);
    const q = query(
      collection(firestore, "channel"),
      where("email", "==", user.email)
    );
    const ch_names = await getDocs(q);
    setUserData(ch_names.docs.map((doc) => ({ ...doc.data() })));
    if(userData != null){
      setLoading(false)
    }else{
      setLoading(true)
    }
  });

  return (
    <>
      <Box>
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
            {loading == false ? userData.map((doc) => {
              return (
                <Box>
                  <Typography>{doc.ch_name}</Typography>
                  <Typography>{doc.subs}</Typography>
                </Box>
              );
            }):<h4>Loading</h4>}
            <Box>
              <Button color="error" variant="contained">
                Subscribe
              </Button>
            </Box>
          </Stack>
        </Box>
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
          ></Stack>
        </Box>
      </Box>
    </>
  );
}

export default Admin;
