import { Link } from "react-router-dom";
import logo from "../image/logo.png";
import "../App.css";
function Nav(props) {
  console.log(props.name);
  return (
    <>
      <nav
        style={{ display: props.name === undefined ? "none" : "flex" }}
        className="navbar"
        id="h"
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <Link to={"/task"} className="navbar-brand">
                <img className="float-start w-50" src={logo} alt="0" />
              </Link>
            </div>
            <div className="welcomeMsg col-10">
              <h1 className="float-end text-white-50 text-center m-auto">
                Welcome {props.name}
              </h1>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Nav;
