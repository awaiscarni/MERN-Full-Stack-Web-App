import * as React from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../helpers/authContext";

function ChangePassword() {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const { authState } = React.useContext(authContext);
  let navigate = useNavigate();

  const onSubmit = () => {
    axios
      .put(
        "http://localhost:3000/auth/changepassword",
        { oldPassword: oldPassword, newPassword: newPassword },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert("Password changed successfully");
          navigate(-1);
        }
      });
  };

  return (
    <div>
      <Typography variant="h4">Change Password</Typography>
      <br />
      <label htmlFor="oldpass">Old password: </label>
      <input
        id="oldpass"
        type="password"
        name="oldpass"
        onChange={(e) => {
          setOldPassword(e.target.value);
        }}
      />
      <br />
      <label htmlFor="newpass">New password: </label>
      <input
        id="newpass"
        type="password"
        name="newpass"
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <br />
      <br />
      <Button variant="outlined" type="submit" onClick={onSubmit}>
        Submit
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
    </div>
  );
}

export default ChangePassword;
