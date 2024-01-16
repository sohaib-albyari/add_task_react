import { Link } from "react-router-dom";
import logo from "../image/logo.png";

function Nav(props) {
  console.log(props);
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <Link to={"/task"} className="navbar-brand">
                <img className="float-start w-50" src={logo} alt="Bootstrap" />
              </Link>
            </div>
            <div className="col-6">
              <h1 className="float-end">Welcome {props}</h1>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Nav;
