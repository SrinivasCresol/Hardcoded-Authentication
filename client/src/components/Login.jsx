import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

export default function Login() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const setValue = (e) => {
    const { name, value } = e.target;

    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://hardcoded-login.onrender.com/login",
        inputValue
      );
      if (response.status === 200) {
        const { token } = response.data;
        sessionStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
      console.log("Catch Block Error:", error);
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Welcome Back, Log In</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={inputValue.email}
              onChange={setValue}
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
            />
          </div>
          <div className="form_input">
            <label htmlFor="password">Password</label>
            <div className="two">
              <input
                type="password"
                onChange={setValue}
                value={inputValue.password}
                name="password"
                id="password"
                placeholder="Enter Your password"
              />
            </div>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
