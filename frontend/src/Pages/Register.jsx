import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, LinearProgress, Typography } from "@mui/material";
import { TextField } from "formik-mui";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let Navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4)
      .max(16)
      .required("username should not be empty"),
    password: Yup.string().required(),
  });
  const onSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:3000/auth/", data).then((res) => {
      console.log("it worked");
      resetForm();
      Navigate("/");
    });
  };
  return (
    <>
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
            <br />
            <br />
            <Typography variant="h4">Registeration</Typography>
            <br />
            <br />
            <Field
              id="inputCreatePost"
              name="username"
              label="username"
              variant="outlined"
              component={TextField}
            />

            <br />
            <br />

            {/* <label>Post: </label> */}
            {/* <ErrorMessage name='postText' component="span"/> */}
            <Field
              id="inputCreatePost"
              name="password"
              label="password"
              variant="outlined"
              component={TextField}
            />
            <br />
            <br />
            <Button variant="outlined" type="submit">
              Sign Up
            </Button>
          </Form>
        </Formik>
      </Box>
    </>
  );
}
