import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "../cssPage/singin.css";
import logo from "../image/logo.png";
import side from "../image/side.png";
import axios from "axios";
import { useAppContext } from "../context/appContext";

function SingIn() {
  const { userName, setUserName } = useAppContext();
  //
  const [users, setUsers] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/user")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    let con = 0;

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        con++;
        setUserName(users[i].username);
        if (users[i].username === "admin") {
          navigate("/task");
        } else {
          navigate("/user");
        }
        break;
      }
    }

    if (con === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Email or Password!",
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
              <header className="header">Log In</header>
              <header className="subHeader">
                Welcome to <b>Novel Era</b> Please Enter your Details
              </header>

              <form onSubmit={handelSubmit}>
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    id="PasswordAddress"
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
                  <Link to={"/"} className="ForgotPasswordLink">
                    <FontAwesomeIcon icon={faRightToBracket} fade size="lg" />{" "}
                    Registration
                  </Link>
                </div>
                <button className="LoginButton">Log In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SingIn;
