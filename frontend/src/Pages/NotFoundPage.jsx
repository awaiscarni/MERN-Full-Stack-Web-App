import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NotFoundPage extends Component {
  static propTypes = {};

  render() {
    return (
      <>
        <h1>Page Not Found !</h1>
        <p>
          Go back to home: <Link to={"/"}>Home</Link>
        </p>
      </>
    );
  }
}

export default NotFoundPage;
