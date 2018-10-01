import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "60px" }}>
        Welcome to <span style={{ color: "rgb(183, 28, 28)" }}>Contact</span>
        Manager
      </h2>
      <div
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <Link
          style={{ backgroundColor: "#b71c1c", margin: "30px 20px 0 0" }}
          className="waves-effect waves-light btn"
          to="/login"
        >
          Login
        </Link>
        <Link
          style={{ backgroundColor: "#b71c1c", marginTop: "30px" }}
          className="waves-effect waves-light btn"
          to="/Register"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
