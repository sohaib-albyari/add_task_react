import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowDownShortWide,
} from "@fortawesome/free-solid-svg-icons";
import TaskData from "../components/TaskData";
import axios from "axios";

function Task() {
  const [tasks, setTasks] = useState([]);
  const getAllTasks = () => {
    axios
      .get("http://localhost:8000/task")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllTasks();
  }, [tasks]);

  return (
    <>
      {/* <h1>Task page</h1>

      <Link to={"/task/add"} className="btn btn-success mt-3">
        <FontAwesomeIcon
          icon={faPlus}
          fade
          size="lg"
          style={{ color: "#ffffff" }}
        />
        Add New Task
      </Link>
      <Link to={"/task/filter"} className="btn btn-primary mt-3 ms-3">
        <FontAwesomeIcon
          icon={faArrowDownShortWide}
          fade
          size="lg"
          style={{ color: "#ffffff" }}
        />
        Task Filter
      </Link> */}
      {/* <table className="table table-striped mt-5">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Department</th>
            <th>Employee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Check</th>
            <th>Operation</th>
          </tr>
        </thead>

        <tbody>
          {tasks &&
            tasks.map((task) => {
              return (
                <tr key={task.id}>
                  <TaskData task={task} />
                </tr>
              );
            })}
        </tbody>
      </table> */}

      <section className="intro">
        {/* <h1 className=" mt-3">Task page</h1> */}
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="mt-3 w-50 d-flex">
              <Link to={"/task/add"} className="btn me-2 task-btn">
                <FontAwesomeIcon
                  icon={faPlus}
                  fade
                  size="lg"
                />
                Add New Task
              </Link>
              <Link to={"/task/filter"} className="btn task-btn">
                <FontAwesomeIcon
                  icon={faArrowDownShortWide}
                  fade
                  size="lg"
               />
                Task Filter
              </Link>
            </div>

            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card mask-custom">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table text-white mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Task</th>
                            <th>Department</th>
                            <th>Employee</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Check</th>
                            <th>Operation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks &&
                            tasks.map((task) => {
                              return (
                                <tr key={task.id}>
                                  <TaskData task={task} />
                                </tr>
                              );
                            })}
                        </tbody>
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
export default Task;
