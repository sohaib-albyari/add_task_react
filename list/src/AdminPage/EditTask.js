import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPenToSquare,
  faCalendarDays,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function EditTask() {
  const [task, setTask] = useState({});
  const [sections, setSections] = useState("");
  const [users, setUsers] = useState("");

  const [name, setName] = useState("");
  const [check, setCheck] = useState("Not Complete");
  const [department, setDepartment] = useState("");
  const [employee, setEmployee] = useState("");
  const [description, setDescription] = useState("");
  const [startdateTime, setStartDateTime] = useState({});
  const [enddateTime, setEndDateTime] = useState({});

  const { taskid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/depatments")
      .then((res) => setSections(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8000/user")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/task/${taskid}`)
      .then((res) => {
        setTask(res.data);
        setName(res.data.name);
        setCheck(res.data.check);
        setDepartment(res.data.department);
        setEmployee(res.data.employee);
        setDescription(res.data.description);
        setStartDateTime(res.data.startdateTime);
        setEndDateTime(res.data.enddateTime);
      })
      .catch((err) => console.log(err));
  }, [taskid]);

  const formSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/task/${taskid}`, {
        name,
        department,
        employee,
        description,
        check,
        startdateTime,
        enddateTime,
      })
      .then((res) => setTask(res.data))
      .catch((err) => console.log(err));

    Swal.fire({
      title: `Has updated "${task.name}" successfully.`,
      icon: "success",
    }).then((data) => {
      if (data.isConfirmed) {
        navigate("/task");
      }
    });
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="add-page">
          <section>
            <form onSubmit={formSubmit}>
              <h1>Eidt Task</h1>
              <div className="inputbox">
                <input
                  type="text"
                  defaultValue={task.name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
                <label htmlFor="">Task Title</label>
              </div>

              <div className="inputbox">
                <textarea
                  type="text"
                  defaultValue={task.description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  required
                ></textarea>
                <label htmlFor="">Task Description</label>
              </div>

              <div className="inputbox">
                <input
                  type="datetime-local"
                  value={startdateTime[0] + "T" + startdateTime[1]}
                  onChange={(e) => {
                    setStartDateTime(e.target.value.split("T"));
                  }}
                  required
                />
                <div className="icon-container">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ color: "#fff" }}
                  />
                </div>
                <label htmlFor="">Start Task Date</label>
              </div>

              <div className="inputbox">
                <input
                  type="datetime-local"
                  value={enddateTime[0] + "T" + enddateTime[1]}
                  onChange={(e) => {
                    setEndDateTime(e.target.value.split("T"));
                  }}
                  required
                />
                <div className="icon-container">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ color: "#fff" }}
                  />
                </div>
                <label htmlFor="">End Task Date</label>
              </div>

              <div className="inputbox">
                <select
                  name="selectedDepartment"
                  className="form-select"
                  id="validationCustom04"
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  required
                >
                  <option disabled selected value="-">
                    --
                  </option>
                  {sections &&
                    sections.map((dep) => {
                      return (
                        <option
                          selected={dep === department ? true : false}
                          key={dep}
                          value={dep}
                        >
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

              <div className="inputbox">
                <select
                  name="selectedDepartment"
                  className="form-select"
                  id="validationCustom04"
                  onChange={(e) => {
                    setEmployee(e.target.value);
                  }}
                  required
                >
                  <option disabled selected value="-">
                    --
                  </option>
                  {users &&
                    users.map((isuser) => {
                      return (
                        <option
                          selected={isuser.username === employee ? true : false}
                          key={isuser.id}
                          value={isuser.name}
                        >
                          {isuser.username}
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
                <label htmlFor="">User</label>
              </div>

              <div className="checkbtndiv">
                <label htmlFor="">
                  <input
                    className="checkbtn"
                    type="checkbox"
                    checked={check === "Complete" ? true : false}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheck("Complete");
                      } else {
                        setCheck("Not Complete");
                      }
                    }}
                  />
                  Complete Task
                </label>
              </div>
              <div className="btns">
                <button className="btn-task" type="submit">
                  <span><FontAwesomeIcon icon={faPenToSquare} fade size="lg" />
                  &nbsp;Eidt Task</span>
                </button>
                <Link className="btn-task" to={"/task"}>
                  <span>
                    {" "}
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
export default EditTask;
