import {
  faEnvelope,
  faLock,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../image/logo.png";
import side from "../image/side.png";

function Registration() {
  const [users, setUsers] = useState([]);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getAllUsers = () => {
    fetch("http://localhost:8000/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    let con = 0;
    users &&
      users.map((user) => {
        if (user.email.match(email)) {
          con++;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Email already exists!`,
          });
        }

        return con;
      });
    if (con === 0) {
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire({
            icon: "success",
            title: "The user has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/singin");
        });
    }
  };

  return (
    <>
      <div className="LoginPageContainer">
        <div className="LoginPageInnerContainer">
          <div className="ImageContianer">
            <img src={side} className="GroupImage" alt="" />
          </div>
          <div className="LoginFormContainer">
            <div className="LoginFormInnerContainer">
              <div className="LogoContainer">
                <img src={logo} className="logo" alt="" />
              </div>
              <header className="header">Sing up</header>
              <header className="subHeader">
                Welcome to <b>Novel Era</b> Please Enter your Details
              </header>

              <form onSubmit={handelSubmit}>
                <div className="inputContainer">
                  <label className="label" forhtml="userName">
                    <FontAwesomeIcon
                      icon={faUser}
                      size="xl"
                      style={{ color: "#3f3f459e" }}
                    />
                    <span>&nbsp; User Name*</span>
                  </label>
                  <input
                    type="text"
                    className="input"
                    id="userName"
                    placeholder="Enter your User Name"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="inputContainer">
                  <label className="label" forhtml="emailAddress">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      size="xl"
                      style={{ color: "#3f3f459e" }}
                    />
                    <span>&nbsp; Email Address*</span>
                  </label>
                  <input
                    type="email"
                    className="input"
                    id="emailAddress"
                    placeholder="Enter your Email Address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="inputContainer">
                  <label className="label" forhtml="password">
                    <FontAwesomeIcon
                      icon={faLock}
                      size="xl"
                      style={{ color: "#3f3f459e" }}
                    />
                    <span>&nbsp; Password*</span>
                  </label>
                  <input
                    type="password"
                    className="input"
                    id="password"
                    placeholder="Enter your Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="OptionsContainer">
                  <div className="checkboxContainer">
                    <input
                      type="checkbox"
                      id="RememberMe"
                      className="checkbox"
                    />
                    <label forhtml="RememberMe">Remember me</label>
                  </div>
                  <Link to={"/singin"} className="ForgotPasswordLink">
                    <FontAwesomeIcon icon={faRightToBracket} fade size="lg" /> I
                    have an account
                  </Link>
                </div>
                <button className="LoginButton">Sing Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
