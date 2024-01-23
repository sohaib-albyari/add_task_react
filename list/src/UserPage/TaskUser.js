import { useEffect, useState } from "react";
// import {  useParams } from "react-router-dom";
import axios from "axios";

import Operation from "../components/Operation";
import { useAppContext } from "../context/appContext";

function TaskUser() {
  const { userName } = useAppContext();

  //   const { userid } = useParams();

  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/task")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {/* <h1 className="text-white">User Page</h1>
      {user &&
        user.map((u) => {
            return (
              <tr key={u.id}>
                <TaskData task={u} />
              </tr>
            );
          })} */}

      <section className="intro">
        {/* <h1 className=" mt-3">Task page</h1> */}
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
                            {/* <th>ID</th> */}
                            <th>Task</th>
                            {/* <th>Department</th> */}
                            <th>Employee</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Complete</th>
                            <th>Operation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {user &&
                            user.map((userTask) => {
                              if (userTask.employee === userName) {
                                return (
                                  <tr key={userTask.id}>
                                    {/* <td>{userTask.id}</td> */}
                                    <td>{userTask.name}</td>
                                    {/* <td>{userTask.department}</td> */}
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
                                      {/* <div className="checkbtndiv"> */}
                                        {/* <label htmlFor=""> */}
                                          <input
                                            className="checkbtn"
                                            type="checkbox"
                                            // onChange={(e) => {
                                            //   if (e.target.checked) {
                                            //     setCheck("Checked");
                                            //   } else {
                                            //     setCheck("Not Checked");
                                            //   }
                                            // }}
                                          />
                                          {/* Complete Task */}
                                        {/* </label> */}
                                      {/* </div> */}
                                    </td>
                                    {/* <td>{userTask.check}</td> */}
                                    <Operation task={userTask} />
                                    {/* <TaskData task={task} /> */}
                                  </tr>
                                );
                              }
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
