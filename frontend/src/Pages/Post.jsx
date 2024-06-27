import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { authContext } from "../../helpers/authContext";
import { useNavigate } from "react-router-dom";

function Post() {
  let { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState, setAuthState } = React.useContext(authContext);
  let Navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/byId/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    axios.get(`http://localhost:3000/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3000/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          console.log("comment added!");
          let commentToAdd = {
            commentBody: newComment,
            username: res.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3000/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          console.log("comment deleted!");
          setComments(
            comments.filter((val) => {
              return val.id != id;
            })
          );
        }
      });
  };

  const deletePost = (postId) => {
    axios
      .delete(`http://localhost:3000/posts/${postId}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        Navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editPost = (postId) => {
    Navigate(`/editpost/${postId}`);
  };

  // console.log(id);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "700px" }}>
        <h1>{post.id}</h1>
        <h2>{post.title}</h2>
        <p>{post.postText}</p>
        <h4>{post.username}</h4>
        {authState.username == post.username && (
          <Button
            variant="outlined"
            style={{ color: "blue" }}
            onClick={() => {
              editPost(post.id);
            }}
          >
            Edit
          </Button>
        )}

        {authState.username == post.username && (
          <Button
            style={{ marginLeft: "20px", color: "red" }}
            variant="outlined"
            onClick={() => deletePost(post.id)}
          >
            Delete
          </Button>
        )}

        <Button
          style={{ marginLeft: "20px" }}
          variant="outlined"
          type="submit"
          onClick={() => {
            Navigate(-1);
          }}
        >
          Back
        </Button>
      </div>

      <div style={{ width: "700px" }}>
        <h2>Comments</h2>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="comment"
            label="Comment..."
            variant="standard"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Box>
        <Stack spacing={2} direction="row">
          <Button
            variant="outlined"
            onClick={addComment}
            style={{ marginLeft: "300px" }}
          >
            Add
          </Button>
        </Stack>

        {comments.map((comment, i) => (
          <div key={i}>
            <Card sx={{ minWidth: 100 }}>
              <CardContent>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {comment.username}
        </Typography> */}
                <Typography variant="h5" component="div">
                  {comment.commentBody}
                </Typography>

                {/* <Typography variant="body2">
        {comment.commentBody}
        
          <br />
        </Typography> */}
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {comment.username}
                </Typography>
              </CardContent>
              {authState.username === comment.username && (
                <CardActions>
                  <Button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                    size="small"
                    color="error"
                    variant="outlined"
                    style={{ marginLeft: "300px" }}
                  >
                    Delete
                  </Button>
                </CardActions>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
