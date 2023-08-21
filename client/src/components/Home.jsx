import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

export default function Home() {
  const navigate = useNavigate();

  const logoutUser = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = sessionStorage.getItem("token") !== null;

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <section>
      <div className="form_data">
        <div className="form-heading">
          <h1>Dashboard</h1>
        </div>
        <button className="btn" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </section>
  );
}
