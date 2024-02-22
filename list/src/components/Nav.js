import { Link } from "react-router-dom";
import logo from "../image/logo.png";
import "../App.css";
import { useAppContext } from "../context/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function Nav() {
  const { userName, setUserName } = useAppContext();

  // const navigate = useNavigate();

  useEffect(() => {
    if (userName === "") {
      // navigate("/singin");
    }
  }, [userName]);

  const handelSubmit = () => {
    setUserName("");
  };

  return (
    <>
      <nav
        className="navbar"
        // style={{ display: userName === "" ? "none" : "flex" }}
      >
        <div className="container-fluid">
          <div className="row nav-item">
            <div className="col-3 nav-brand">
              <Link to={"/task"} className="navbar-brand">
                <img className="float-start w-25" src={logo} alt="0" />
              </Link>
            </div>
            <div
              className="welcomeMsg col-6"
              style={{ visibility: userName === "" ? "hidden" : "visible" }}
            >
              <h1 className="float-end text-white-50 text-center m-auto">
                Welcome {userName}
              </h1>
            </div>
            <div className="col-3 log-btn">
              <Link
                to={"/"}
                onClick={handelSubmit}
                className="w-50 btn btn-warning text-light"
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  fade
                  size="lg"
                  style={{ color: "#ffffff" }}
                />
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Nav;
