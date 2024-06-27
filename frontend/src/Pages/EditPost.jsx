import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { TextField } from "formik-mui";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../helpers/authContext";
import { useParams } from "react-router-dom";

function EditPost() {
  let { id } = useParams();
  const [post, setPost] = React.useState({});
  let navigate = useNavigate();
  const { authState } = React.useContext(authContext);

  React.useEffect(() => {
    if (!authState.status) {
      navigate("/signIn");
    } else {
      axios
        .get(`http://localhost:3000/posts/byId/${id}`)
        .then((res) => {
          setPost(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [authState.status, id, navigate]);

  const initialValues = {
    title: "",
    postText: "",
  };

  const onSubmit = (data, { resetForm }) => {
    axios
      .put(`http://localhost:3000/posts/${id}`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log("Update successful");
        resetForm();
        navigate("/");
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must enter a title"),
    postText: Yup.string().required("You must enter post text"),
  });

  return (
    <div>
      <Box>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formik) => {
            React.useEffect(() => {
              if (post.title) {
                formik.setValues({
                  title: post.title,
                  postText: post.postText,
                });
              }
            }, [post]);

            return (
              <Form>
                <Typography variant="h4">Edit Post</Typography>
                <br />
                <br />
                <Field
                  id="inputCreatePost"
                  name="title"
                  label="Title"
                  variant="outlined"
                  component={TextField}
                />
                <br />
                <br />
                <Field
                  id="inputCreatePost"
                  name="postText"
                  label="Post"
                  variant="outlined"
                  component={TextField}
                />
                <br />
                <br />
                <Button variant="outlined" type="submit">
                  Update
                </Button>
                <Button
                  style={{ marginLeft: "30px" }}
                  variant="outlined"
                  type="submit"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </div>
  );
}

export default EditPost;
