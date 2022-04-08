import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { auth, firestore } from "../firebsae.config";

function Home() {
  const [toasted, setToasted] = useState(false);
  const [blogs, setBlogs] = useState();
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(4);
  const [allBlog, setAllBlog] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    Finding();
    const blog = [{ Title: "Top Vscode Extensions", slug: "vscodeextensions" }];
    setAllBlog(blog);
  }, [loading]);
  const Finding = async () => {
    const colRef = collection(firestore, "videos");
    const myquery = query(colRef, orderBy("title"), limit(page));
    const docSnap = await getDocs(myquery);
    setBlogs(docSnap.docs.map((doc) => ({ ...doc.data(), data: doc.data() })));
    console.log(blogs);
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };

  return (
    <>
      <ToastContainer />

      {loading == true ? (
        <Backdrop sx={{ color: "#fff" }} open={true}>
          {" "}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            <CircularProgress color="secondary" />{" "}
          </Box>{" "}
        </Backdrop>
      ) : (
        // console.log(blogs)
        blogs.map((doc) => {
          return (
            <>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${doc.thumbnail}`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {doc.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
            </>
          );
        })
      )}

      {/* <video width="750" height="500" controls>
        <source
          src={`https://firebasestorage.googleapis.com/v0/b/forumfeed-83986.appspot.com/o/2022-03-16%2016-50-33.mp4?alt=media&token=d7eadaaa-89b9-40d0-b8f9-053bc33d7751`}
          type="video/mp4"
        />
      </video> */}
    </>
  );
}

export default Home;
