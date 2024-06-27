import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../helpers/authContext";
import { Link } from "react-router-dom";

function Profile() {
  let Navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const { authState, setAuthState } = React.useContext(authContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/userinfo/${id}`)
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(`http://localhost:3000/posts//byUserId/${id}`)
      .then((res) => {
        setUserPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const changePassword = () => {
    Navigate("/changepassword");
  };

  return (
    <div style={{ backgroundColor: "#77B0AA" }}>
      <Typography variant="h2">Username:{username}</Typography>
      {authState.username == username && (
        <Button
          variant="outlined"
          style={{ color: "white" }}
          onClick={changePassword}
        >
          Change Password
        </Button>
      )}
      <Typography variant="h4">Posts by {username}</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {userPosts.map((post) => (
          <Card key={post.id} sx={{ minWidth: 275, m: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2">
                {post.postText}
                <br />
              </Typography>

              <Typography sx={{ fontSize: 14 }}>{post.Likes.length}</Typography>
            </CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {post.username}
            </Typography>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default Profile;
