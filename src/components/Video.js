import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
function Video(props) {
  console.log(props);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [props.data])
  
  return (
    <>
      <Box>
        <Box>
          {loading == false ? props.data.map((data, index) => {
            console.log(props.data[0].videoURL);
            return (
              <div key={index} style={{height:'90vh'}}>
                <video width={"100%"} height={"100%"} controls>
                  <source src={props.data[0].videoURL} type="video/mp4" />
                </video>
              </div>
            );
          }) :<h1>Loading</h1>}
        </Box>
      </Box>
    </>
  );
}

export default Video;
