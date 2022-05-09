import {
  Box,
  Button,
  Stack,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardActionArea,
  Grid,
  useMediaQuery,
  Dialog,
  DialogTitle,
  List,
  TextField,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, firestore, storage } from "../firebsae.config";

function Admin() {
  const matches = useMediaQuery("(max-width:860px)");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState();
  const [videoData, setVideoData] = useState();
  const [loading, setLoading] = useState(true);
  const [videoloading, setVideoloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const handleClickOpen = () => {
    setOpen(!open);
  };
  const onFileChange = (e) => {
    const fileRef = e.target[0].file[0];
    const storageRef = ref(storage, `/file/Videos/${fileRef}`);
    uploadBytesResumable(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };
  // const [user, setUser] = useState("");
  useEffect(async () => {
    const video_query = query(
      collection(firestore, "videos"),
      where("auth", "==", email)
    );
    const videos = await getDocs(video_query);
    console.log(videos.docs.map((doc) => ({ ...doc.data() })));
    setVideoData(videos.docs.map((doc) => ({ ...doc.data() })));
    if (videoData != null) {
      setVideoloading(false);
    }
  }, [loading == false]);

  onAuthStateChanged(auth, async (user) => {
    setEmail(user.email);
    const q = query(
      collection(firestore, "channel"),
      where("email", "==", user.email)
    );
    const ch_names = await getDocs(q);
    setUserData(ch_names.docs.map((doc) => ({ ...doc.data() })));
    if (userData != null) {
      setLoading(false);
    } else {
      setLoading(true);
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
            {loading == false ? (
              userData.map((doc) => {
                return (
                  <>
                    <Box>
                      <Typography>{doc.ch_name}</Typography>
                      <Typography>{doc.subs}</Typography>
                    </Box>
                    <Box>
                      <Button
                        color="error"
                        variant="contained"
                        sx={{ marginTop: "20px", marginLeft: "39px" }}
                        onClick={() => {
                          handleClickOpen();
                        }}
                      >
                        Create
                      </Button>
                    </Box>
                  </>
                );
              })
            ) : (
              <h4>Loading</h4>
            )}
          </Stack>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              margin: "20px",
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <Grid container spacing={2} direction="column">
              {videoloading == false ? (
                videoData.map((doc) => {
                  return (
                    <>
                      <Grid item sm={matches ? "2" : "8"}>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="200"
                              image={`${doc.thumbnail}`}
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {doc.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {/* desc here */}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Link to={`/Video/${doc.slug}`}>
                              <Button size="small" color="primary">
                                Play
                              </Button>
                            </Link>
                          </CardActions>
                        </Card>
                      </Grid>
                      <Grid item sm={matches ? "2" : "8"}>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="200"
                              image={`${doc.thumbnail}`}
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {doc.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {/* desc here */}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Link to={`/Video/${doc.slug}`}>
                              <Button size="small" color="primary">
                                Play
                              </Button>
                            </Link>
                          </CardActions>
                        </Card>
                      </Grid>
                    </>
                  );
                })
              ) : (
                <h1>Loading</h1>
              )}
            </Grid>
          </Stack>
        </Box>
        <Dialog open={open}>
          <Stack direction="row">
            <DialogTitle sx={{ marginRight: "100px" }}>
              Create Video
            </DialogTitle>
            <Button
              onClick={() => {
                handleClickOpen();
              }}
            >
              x
            </Button>
          </Stack>
          <List
            sx={{
              pt: 0,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <form onSubmit={() => {}}>
              <TextField
                variant="outlined"
                color="primary"
                label="Enter the title"
              />
              <TextField
                variant="outlined"
                color="primary"
                label="Enter the slug"
              />
              <label className="file">
                <input
                  type="file"
                  id="file"
                  className="custom-file-input"
                  aria-label="File browser example"
                  onChange={(e) => {
                    onFileChange(e);
                  }}
                />
                <span className="file-custom"></span>
              </label>
              <Button color="error" variant="contained">
                Create
              </Button>
            </form>
          </List>
        </Dialog>
      </Box>
    </>
  );
}

export default Admin;
