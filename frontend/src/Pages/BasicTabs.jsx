import React from "react";
import { authContext } from "../../helpers/authContext";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Button, LinearProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const { authState, setAuthState } = useContext(authContext);
  let Navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    Navigate("/signIn");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#F8F6E3" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {!authState.status
            ? [
                <Tab
                  key="register"
                  label="Register"
                  {...a11yProps(2)}
                  component={Link}
                  to={"/register"}
                />,
                <Tab
                  key="signIn"
                  label="Sign In"
                  {...a11yProps(3)}
                  component={Link}
                  to={"/signIn"}
                />,
              ]
            : [
                <>
                  <Tab
                    key="home"
                    label="Home"
                    {...a11yProps(0)}
                    component={Link}
                    to={"/"}
                  />
                  <Tab
                    key="create"
                    label="Create Post"
                    {...a11yProps(1)}
                    component={Link}
                    to={"/createPost"}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Button variant="text" onClick={logOut}>
                      Log Out
                    </Button>
                    <Typography
                      variant="h5"
                      style={{ marginLeft: "10px", marginRight: 10 }}
                    >
                      {authState.username}
                    </Typography>
                  </div>
                </>,
              ]}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* Item One */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* Item Two */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* Item Three */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {/* Item Three */}
      </CustomTabPanel>
    </Box>
  );
}
