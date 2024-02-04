import { Link, useNavigate, useParams } from "react-router-dom";
import "../../cssPage/tableStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
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
      title: `Are you sure to complete task "${taskDetails.name}"?`,
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
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="add-page">
          <section>
            <form onSubmit={formSubmit}>
              <h1>Details Task</h1>

              <div className="inputbox">
                <input type="text" value={taskDetails.name} disabled />
                <label className="label_user" htmlFor="">
                  Task Title
                </label>
              </div>

              <div className="inputbox">
                <textarea
                  type="text"
                  defaultValue={taskDetails.description}
                  disabled
                ></textarea>
                <label className="label_user" htmlFor="">
                  Task Description
                </label>
              </div>

              {taskDetails.links &&
                taskDetails.links.map((link) => {
                  console.log(link.value);
                  return (
                    <div className="inputbox" key={link.id}>
                      <Link to={link.value} target="_blank">
                        {link.value}
                      </Link>
                      <label className="label_user" htmlFor="">
                        Link {link.id}
                      </label>
                    </div>
                  );
                })}

              <div className="btns">
                <button className="btn-task" type="submit">
                  <span>
                    <FontAwesomeIcon icon={faCheck} fade size="lg" />{" "}
                    &nbsp;Complete Task
                  </span>
                </button>

                <Link className="btn-task" to={"/user"}>
                  <span>
                    <FontAwesomeIcon icon={faXmark} fade size="lg" />
                    &nbsp;Cancel
                  </span>
                </Link>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
export default TaskUserDetails;
