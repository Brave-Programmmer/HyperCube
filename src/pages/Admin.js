import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import UserContext from "../context/User/UserContext";

function Admin() {
  const context = useContext(UserContext);
  console.log(context.data);
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
            
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Admin;
