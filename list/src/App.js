import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import AddTask from "./Pages/AddTask";
import EditTask from "./Pages/EditTask";
import FilterTask from "./Pages/FilterTask";
import { Outlet } from "react-router-dom";
import Registration from "./Pages/Registration";
import Task from "./Pages/Task";
import SingIn from "./Pages/SingIn";
import Nav from "./components/Nav";
import { useEffect, useState } from "react";

function App() {
  const loc = useLocation();
  const [uname, setUname] = useState("");

  useEffect(() => {
    setUname(loc.state?.username);
    console.log(uname);
  }, []);

  return (
    <>
      <div className="App">
        <Nav name={uname} />
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/singin" element={<SingIn />} />
          <Route path="/task" name={uname} element={<Outlet />}>
            <Route path="/task" name={uname} element={<Task />} />
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
