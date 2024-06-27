import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../helpers/authContext";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const { authState, setAuthState } = React.useContext(authContext);
  let Navigate = useNavigate();

  useEffect(() => {
    if (authState.status == false) {
      Navigate("/signIn");
    } else {
      axios
        .get("http://localhost:3000/posts/", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          setPosts(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const likePost = (postId) => {
    axios
      .post(
        "http://localhost:3000/likes/",
        { PostId: postId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setPosts(
          posts.map((postItem) => {
            if (postItem.id === postId) {
              if (res.data.liked) {
                // If liked, add a new like to the array
                return { ...postItem, Likes: [...postItem.Likes, 0] };
              } else {
                // If unliked, remove the last like from the array
                const likesArray = [...postItem.Likes];
                likesArray.pop();
                return { ...postItem, Likes: likesArray };
              }
            } else {
              return postItem;
            }
          })
        );
      });
  };

  const editPost = (postId) => {
    Navigate(`/editpost/${postId}`);
  };

  return (
    <div style={{ backgroundColor: "#77B0AA" }}>
      <Typography variant="h2">Posts</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {posts.map((post) => (
          <Card key={post.id} sx={{ minWidth: 275, m: 2 }}>
            <CardContent
              sx={{ cursor: "pointer" }}
              onClick={() => {
                Navigate(`/post/${post.id}`);
              }}
            >
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2">
                {post.postText}
                <br />
              </Typography>
            </CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <Link to={`/profile/${post.UserId}`}>{post.username}</Link>
            </Typography>
            <CardActions>
              <Button variant="outlined" onClick={() => likePost(post.id)}>
                Like
              </Button>
              <Typography sx={{ fontSize: 14 }}>{post.Likes.length}</Typography>
            </CardActions>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default Home;
