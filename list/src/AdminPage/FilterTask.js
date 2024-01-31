import { faCaretDown, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TaskData from "../components/TaskData";
import axios from "axios";

function FilterTask() {
  const [tasks, setTasks] = useState("");
  const [sections, setSections] = useState("");

  const [check, setCheck] = useState("");
  const [department, setDepartment] = useState("");

  const getAllTasks = () => {
    axios
      .get("http://localhost:8000/task")
      .then((res) => setTasks(res.data))
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
      <section className="intro">
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="mt-3 w-50 d-flex">
              <Link to={"/task"} className="btn task-btn">
                <FontAwesomeIcon icon={faHouse} fade size="lg" /> Back To Task
                Page
              </Link>
            </div>

            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card mask-custom">
                  <div className="filter-option d-flex">
                    <div className="inputbox w-25">
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
                      <div className="icon-container">
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          style={{ color: "#fff" }}
                        />
                      </div>
                      <label htmlFor="">Department</label>
                    </div>

                    <div className="inputbox w-25">
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
                        <option value="Complete">Complete</option>
                        <option value="Not Complete">Not Complete</option>
                      </select>
                      <div className="icon-container">
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          style={{ color: "#fff" }}
                        />
                      </div>
                      <label htmlFor="">Complete</label>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table text-white mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Department</th>
                            <th>Employee</th>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Complete</th>
                            <th>Operation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks &&
                            tasks.map((task) => {
                              if (department === "All") {
                                if (check === "All") {
                                  return (
                                    <tr key={task.id}>
                                      <TaskData
                                        setTasks={setTasks}
                                        tasks={tasks}
                                        task={task}
                                      />
                                    </tr>
                                  );
                                } else if (check === task.check) {
                                  return (
                                    <tr key={task.id}>
                                      <TaskData
                                        setTasks={setTasks}
                                        tasks={tasks}
                                        task={task}
                                      />
                                    </tr>
                                  );
                                }
                              } else if (department === task.department) {
                                if (check === "All") {
                                  return (
                                    <tr key={task.id}>
                                      <TaskData
                                        setTasks={setTasks}
                                        tasks={tasks}
                                        task={task}
                                      />
                                    </tr>
                                  );
                                } else if (check === task.check) {
                                  return (
                                    <tr key={task.id}>
                                      <TaskData
                                        setTasks={setTasks}
                                        tasks={tasks}
                                        task={task}
                                      />
                                    </tr>
                                  );
                                }
                              }
                              return true;
                            })}
                        </tbody>
                        {/* <tbody>
                          {tasks &&
                            tasks.map((task) => {
                              return (
                                <tr key={task.id}>
                                  <TaskData task={task} />
                                </tr>
                              );
                            })}
                        </tbody> */}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default FilterTask;
