import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faUserPlus,
  faNotesMedical,
  faBuildingUser,
} from "@fortawesome/free-solid-svg-icons";
import TaskData from "../../components/TaskData";
import axios from "axios";
import Taskhead from "../../components/Taskhead";

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
  }, []);

  return (
    <>
      <section className="intro">
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="main-btn mt-3">
              <Link to={"/task/add_department"} className="btn me-2 task-btn">
                <FontAwesomeIcon icon={faBuildingUser} fade size="lg" />
                <span>&nbsp;Add New Department</span>
              </Link>

              <Link to={"/task/adduser"} className="btn me-2 task-btn">
                <FontAwesomeIcon icon={faUserPlus} fade size="lg" />
                <span>&nbsp;Add New User</span>
              </Link>

              <Link to={"/task/add"} className="btn me-2 task-btn">
                <FontAwesomeIcon icon={faNotesMedical} fade size="lg" />
                <span>&nbsp;Add New Task</span>
              </Link>

              <Link to={"/task/filter"} className="btn me-2 task-btn">
                <FontAwesomeIcon icon={faArrowDownShortWide} fade size="lg" />
                <span>&nbsp;Task Filter</span>
              </Link>
            </div>

            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card mask-custom">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table text-white mb-0">
                        <Taskhead />
                        <tbody>
                          {tasks &&
                            tasks.map((task) => {
                              return (
                                <tr key={task.id}>
                                  <TaskData
                                    setTasks={setTasks}
                                    task={task}
                                    tasks={tasks}
                                  />
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
