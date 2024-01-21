import { Link } from "react-router-dom";
import logo from "../image/logo.png";
import "../App.css";
import { useContext } from "react";
import { ListContext } from "../context/ListContext";
function Nav() {
  const value = useContext(ListContext);
  // console.log(value);

  return (
    <>
      <nav
        style={{ display: value === undefined ? "none" : "flex" }}
        className="navbar"
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
                Welcome {value}
              </h1>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Nav;
