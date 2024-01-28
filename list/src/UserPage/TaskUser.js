import { useEffect, useState } from "react";
// import {  useParams } from "react-router-dom";
import axios from "axios";

import { useAppContext } from "../context/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";

function TaskUser() {
  const { userName } = useAppContext();

  const [taskCheck, setTaskCheck] = useState("Not Checked");

  const [task, setTask] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/task")
      .then((res) => setTask(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formSubmit = (id) => {
    console.log(taskCheck);
    axios
      .patch(`http://localhost:8000/task/${id}`, {
        check: taskCheck,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setTaskCheck("");
  };
  return (
    <>
      <section className="intro">
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card mask-custom">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table text-white mb-0">
                        <thead>
                          <tr>
                            <th>Task</th>
                            <th>Employee</th>
                            <th>Start Task</th>
                            <th>End Task</th>
                            <th>Complete</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {task &&
                            task.map((userTask) => {
                              if (userTask.employee === userName) {
                                // if (
                                //   userTask.check &&
                                //   userTask.check === "Not Checked"
                                // ) {
                                return (
                                  <tr key={userTask.id}>
                                    <td>{userTask.name}</td>
                                    <td>{userTask.employee}</td>
                                    <td>
                                      {userTask.startdateTime[0]}{" "}
                                      {userTask.startdateTime[1]}
                                    </td>
                                    <td>
                                      {userTask.enddateTime[0]}{" "}
                                      {userTask.enddateTime[1]}
                                    </td>
                                    <td>
                                      <input
                                        className="checkbtn"
                                        type="checkbox"
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setTaskCheck("Checked");
                                          } else {
                                            setTaskCheck("Not Checked");
                                          }
                                          formSubmit(userTask.id);
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <OverlayTrigger
                                        overlay={
                                          <Tooltip id="t-2">Details</Tooltip>
                                        }
                                      >
                                        <Link
                                          to={`/user/details`}
                                          className="btn btn-info btn-sm ms-2"
                                        >
                                          <FontAwesomeIcon icon={faInfo} />
                                        </Link>
                                      </OverlayTrigger>
                                    </td>
                                  </tr>
                                );
                              }
                              // }
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
export default TaskUser;
