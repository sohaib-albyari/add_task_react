import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddTask from "./Pages/AdminPage/AddTask";
import EditTask from "./Pages/AdminPage/EditTask";
import FilterTask from "./Pages/AdminPage/FilterTask";
import { Outlet } from "react-router-dom";
// import Registration from "./Pages/Registration";
import Task from "./Pages/AdminPage/Task";
import SingIn from "./Pages/SingIn";
import Nav from "./components/Nav";
import TaskUser from "./Pages/UserPage/TaskUser";
import TaskUserDetails from "./Pages/UserPage/UserTaskDetails";
import AddUser from "./Pages/AdminPage/AddUser";
import AddDepartment from "./Pages/AdminPage/AddDepartment";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Registration />} /> */}
        <Route exact path="/" element={<SingIn />} />
      </Routes>
      <Nav />
      <Routes>
        <Route path="/task" element={<Outlet />}>
          <Route path="/task" element={<Task />} />
          <Route path="add" element={<AddTask />} />
          <Route path="adduser" element={<AddUser />} />
          <Route path="add_department" element={<AddDepartment />} />
          <Route path="filter" element={<FilterTask />} />
          <Route path="edit/:taskid" element={<EditTask />} />
        </Route>
        <Route path="/user" element={<Outlet />}>
          <Route path="/user" element={<TaskUser />} />
          <Route path="details/:taskid" element={<TaskUserDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
