import { Link } from "react-router-dom";
import logo from "../image/logo.png";
import "../App.css";
import { useAppContext } from "../context/appContext";
function Nav() {
  const { email } = useAppContext();

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <Link to={"/task"} className="navbar-brand">
                <img className="float-start w-25" src={logo} alt="0" />
              </Link>
            </div>
            <div
              className="welcomeMsg col-10"
              style={{ display: email === "" ? "none" : "flex" }}
            >
              <h1 className="float-end text-white-50 text-center m-auto">
                Welcome {email}
              </h1>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Nav;
