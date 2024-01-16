import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import AddTask from "./Pages/AddTask";
import EditTask from "./Pages/EditTask";
import FilterTask from "./Pages/FilterTask";
import { Outlet } from "react-router-dom";
import Registration from "./Pages/Registration";
import Task from "./Pages/Task";
import SingIn from "./Pages/SingIn";
import logo from "./image/logo.png";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";

function App() {
  // const [uname, setUname] = useState(" ");
  // const loc = useLocation();
  // useEffect(() => {
  //   setUname(loc.state.uname);
  // }, [uname]);

  // console.log(uname);

  return (
    <>
      <div className="App">
        {/* <nav
          style={{ display: uname !== "" ? "block" : "none" }}
          className="navbar"
        >
          <div className="container">
            <div className="row">
              <div className="col-2">
                <Link to={"/task"} className="navbar-brand">
                  <img className="float-start w-50" src={logo} alt="logo" />
                </Link>
              </div>
              <div className="col-6">
                <h1 className="float-end">Welcome {uname}</h1>
              </div>
            </div>
          </div>
        </nav> */}
        {/* <Nav u={uname} /> */}
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/singin" element={<SingIn />} />
          <Route path="/task" element={<Outlet />}>
            <Route path="/task" element={<Task />} />
            <Route path="add" element={<AddTask />} />
            <Route path="filter" element={<FilterTask />} />
            <Route path="edit/:taskid" element={<EditTask />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
export default App;
