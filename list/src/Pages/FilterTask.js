import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TaskData from "../components/TaskData";
import axios from "axios";

function FilterTask() {
  const [task, setTask] = useState("");
  const [sections, setSections] = useState("");

  const [check, setCheck] = useState("");
  const [department, setDepartment] = useState("");

  const getAllTasks = () => {
    axios
      .get("http://localhost:8000/task")
      .then((res) => setTask(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8000/depatments")
      .then((res) => setSections(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllTasks();
  }, []);


  return (
    <>
      <h1>Filter Task</h1>
      <Link to={"/task"} className="btn btn-success mt-3">
        <FontAwesomeIcon
          icon={faHouse}
          fade
          size="lg"
          style={{ color: "#ffffff" }}
        />{" "}
        Back To Task Page
      </Link>

      <div className="row mt-3 mb-3">
        <div className="ms-1 col-auto">
          <label className="form-check-label" htmlFor="Select">
            Department
          </label>
        </div>
        <div className="col-2">
          <select
            className="form-select"
            id="Select"
            aria-label="Default select example"
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          >
            <option>--</option>
            <option value="All">All</option>
            {sections &&
              sections.map((dep) => {
                return (
                  <option key={dep} value={dep}>
                    {" "}
                    {dep}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="ms-1 col-auto">
          <label className="form-check-label" htmlFor="Select">
            Check
          </label>
        </div>
        <div key={task.id} className="col-2">
          <select
            className="form-select"
            id="Select"
            aria-label="Default select example"
            onChange={(e) => {
              setCheck(e.target.value);
            }}
          >
            <option>--</option>
            <option value="All">All</option>
            <option value="Checked">Checked</option>
            <option value="Not Checked">Not Checked</option>
          </select>
        </div>
      </div>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Department</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Check</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {task &&
            task.map((task) => {
              if (department === "All") {
                if (check === "All") {
                  return (
                    <tr key={task.id}>
                      <TaskData task={task} />
                    </tr>
                  );
                } else if (check === task.check) {
                  return (
                    <tr key={task.id}>
                      <TaskData task={task} />
                    </tr>
                  );
                }
              } else if (department === task.department) {
                if (check === "All") {
                  return (
                    <tr key={task.id}>
                      <TaskData task={task} />
                    </tr>
                  );
                } else if (check === task.check) {
                  return (
                    <tr key={task.id}>
                      <TaskData task={task} />
                    </tr>
                  );
                }
              }
              return true;
            })}
        </tbody>
      </table>
    </>
  );
}
export default FilterTask;
