import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddTask from "./AdminPage/AddTask";
import EditTask from "./AdminPage/EditTask";
import FilterTask from "./AdminPage/FilterTask";
import { Outlet } from "react-router-dom";
import Registration from "./Pages/Registration";
import Task from "./AdminPage/Task";
import SingIn from "./Pages/SingIn";
import Nav from "./components/Nav";
import TaskUser from "./UserPage/TaskUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/singin" element={<SingIn />} />
      </Routes>
      <Nav />
      <Routes>
        <Route path="/task" element={<Outlet />}>
          <Route path="/task" element={<Task />} />
          <Route path="add" element={<AddTask />} />
          <Route path="filter" element={<FilterTask />} />
          <Route path="edit/:taskid" element={<EditTask />} />
          <Route path="user" element={<TaskUser />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
