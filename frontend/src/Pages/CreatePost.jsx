import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
//import TextField from '@mui/material/TextField';
import { Button, LinearProgress, Typography } from "@mui/material";
// import { Formik, Form, Field } from 'formik';
import { TextField } from "formik-mui";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../helpers/authContext";

function CreatePost() {
  let Navigate = useNavigate();
  const { authState, setAuthState } = React.useContext(authContext);
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  React.useEffect(() => {
    if (authState.status == false) {
      Navigate("/signIn");
    }
  }, []);

  const onSubmit = (data, { resetForm }) => {
    axios
      .post("http://localhost:3000/posts/", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log("it worked");
        resetForm();
        Navigate("/");
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("you must enter a title"),
    postText: Yup.string().required(),
  });

  return (
    <div>
      <Box

      //   sx={{
      //     '& > :not(style)': { m: 1, width: '25ch' },
      //   }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            {/* <label>Title: </label> */}
            {/* <ErrorMessage name='title' component="span"/> */}
            <Typography variant="h4">Create Post</Typography>
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

            {/* <label>Post: </label> */}
            {/* <ErrorMessage name='postText' component="span"/> */}
            <Field
              id="inputCreatePost"
              name="postText"
              label="Post"
              variant="outlined"
              component={TextField}
            />
            <br />
            <br />

            {/* <label>Username: </label> */}
            {/* <ErrorMessage name='username' component="span"/> */}
            <Button variant="outlined" type="submit">
              Submit
            </Button>
            <Button
              style={{ marginLeft: "30px" }}
              variant="outlined"
              type="submit"
              onClick={() => {
                Navigate(-1);
              }}
            >
              Cancel
            </Button>
          </Form>
        </Formik>
      </Box>
    </div>
  );
}

export default CreatePost;
