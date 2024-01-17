import { Link, useLocation } from "react-router-dom";
import logo from "../image/logo.png";
import "../App.css";
import { useEffect, useState } from "react";
function Nav(props) {
  const loc = useLocation();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(loc.state?.username);
  }, [name, loc.state?.username]);

  return (
    <>
      <nav
        style={{ display: name === undefined ? "none" : "flex" }}
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
                Welcome {name}
              </h1>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Nav;
