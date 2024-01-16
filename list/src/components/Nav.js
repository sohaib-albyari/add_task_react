import { Link } from "react-router-dom";
import logo from "../image/logo.png";
import "../App.css";
function Nav(props) {
  console.log(props.name);
  return (
    <>
      <nav
        style={{ display: props.name === undefined ? "none" : "block" }}
        className="navbar"
        id="h"
      >
        <div className="container">
          <div className="row">
            <div className="col-2">
              <Link to={"/task"} className="navbar-brand">
                <img className="float-start w-50" src={logo} alt="0" />
              </Link>
            </div>
            <div className="col-6">
              <h1 className="float-end">Welcome {props.name}</h1>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Nav;
