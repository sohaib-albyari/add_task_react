import { Link, useNavigate, useParams } from "react-router-dom";
import "../cssPage/tableStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,  faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function TaskUserDetails() {
  const navigate = useNavigate();

  const [taskDetails, setTaskDetails] = useState("");

  const { taskid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/task/${taskid}`)
      .then((res) => setTaskDetails(res.data))
      .catch((err) => console.log(err));
  }, [taskid]);

  const formSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: `Are you sure to submit complete task "${taskDetails.name}"?`,
      showCancelButton: true,
      icon: "question",
      confirmButtonText: "Complete",
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .patch(`http://localhost:8000/task/${taskid}`, {
            check: "Complete",
          })
          .then((res) => {
            navigate("/user");
          })
          .catch((err) => console.log(err));
      }
    });

    // Swal.fire({
    //   title: `Has updated "${taskDetails.name}" successfully.`,
    //   icon: "success",
    // }).then((data) => {
    //   if (data.isConfirmed) {
    //     axios
    //       .patch(`http://localhost:8000/task/${taskid}`, {
    //         check: "Checked",
    //       })
    //       .then((res) => res.data)
    //       .catch((err) => console.log(err));
    //     navigate("/user");
    //   }
    // });
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="add-page">
          <section>
            <form onSubmit={formSubmit}>
              <h1>Details Task</h1>
              <div className="inputbox">
                <input
                  type="text"
                  // onChange={(e) => {
                  //   setName(e.target.value);
                  // }}
                  value={taskDetails.name}
                  disabled
                />
                <label className="label_user" htmlFor="">
                  Task Title
                </label>
              </div>

              <div className="inputbox">
                <textarea
                  type="text"
                  // onChange={(e) => {
                  //   setDescription(e.target.value);
                  // }}
                  defaultValue={taskDetails.description}
                  disabled
                ></textarea>
                <label className="label_user" htmlFor="">
                  Task Description
                </label>
              </div>

              {/* <div className="inputbox">
                <input
                  type="datetime-local"
                  defaultValue={
                    taskDetails.startdateTime[0] +
                    "T" +
                    taskDetails.startdateTime[1]
                  }
                  disabled
                />
                <div className="icon-container">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ color: "#fff" }}
                  />
                </div>
                <label htmlFor="">Start Task Date</label>
              </div> */}

              {/* <div className="inputbox">
                <input
                  type="datetime-local"
                  // defaultValue={
                  //   taskDetails.enddateTime[0] +
                  //   "T" +
                  //   taskDetails.enddateTime[1]
                  // }
                  disabled
                />
                <div className="icon-container">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ color: "#fff" }}
                  />
                </div>
                <label htmlFor="">End Task Date</label>
              </div> */}
              <div className="btns">
                <button className="btn-task" type="submit">
                  <span><FontAwesomeIcon icon={faCheck} fade size="lg" />{" "}
                  &nbsp;Complete Task</span>
                </button>
                {/* <button className="btn-task"> */}
                  <Link className="btn-task" to={"/user"}>
                    <span><FontAwesomeIcon icon={faXmark} fade size="lg" />
                    &nbsp;Cancel</span>
                  </Link>
                {/* </button> */}
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
export default TaskUserDetails;
