import { Link, useNavigate } from "react-router-dom";
import logo from "../image/logo.png";
import "../App.css";
import { useAppContext } from "../context/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
function Nav() {
  const { userName, setUserName } = useAppContext();

  const navigate = useNavigate();

  const handelSubmit = () => {
    setUserName("");
    navigate("/singin");
  };

  return (
    <>
      <nav
        className="navbar"
        style={{ display: userName === "" ? "none" : "flex" }}
      >
        <div className="container-fluid">
          <div className="row nav-item">
            <div className="col-2">
              <Link to={"/task"} className="navbar-brand">
                <img className="float-start w-25" src={logo} alt="0" />
              </Link>
            </div>
            <div
              className="welcomeMsg col-3"
              // style={{ display: userName === "" ? "none" : "flex" }}
            >
              <h1 className="float-end text-white-50 text-center m-auto">
                Welcome {userName}
              </h1>
            </div>
            <div className="col-2">
              <Link
                // to={"/singin"}
                onClick={handelSubmit}
                className="float-start btn btn-warning text-light m-2"
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
