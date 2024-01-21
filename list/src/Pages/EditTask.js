import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function EditTask() {
  const [task, setTask] = useState({});
  const [sections, setSections] = useState("");
  const [users, setUsers] = useState("");

  const [name, setName] = useState("");
  const [check, setCheck] = useState("Not Checked");
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
        check,
        department,
        employee,
        description,
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
      <h1>Eidt Task</h1>
      <form
        className="border border-info rounded container d-block w-50"
        onSubmit={formSubmit}
      >
        <div className="row mb-3 mt-3">
          <div className="col-2">
            <label htmlFor="TaskName" className="col-form-label">
              Task Name
            </label>
          </div>
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              id="TaskName"
              placeholder="Task Name"
              aria-describedby="Task Name"
              defaultValue={task.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="row mb-3 mt-3">
          <div className="col-2">
            <label htmlFor="TaskName" className="col-form-label">
              Task Description
            </label>
          </div>
          <div className="col-10">
            <textarea
              type="text"
              className="form-control"
              id="TaskName"
              placeholder="Task Description"
              aria-describedby="Task Name"
              defaultValue={task.description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-2">
            <label htmlFor="TaskDate" className="col-form-label">
              Start Task Date
            </label>
          </div>
          <div className="col-auto">
            <input
              type="datetime-local"
              className="form-control"
              id="TaskDate"
              placeholder="Task Date"
              aria-describedby="Task Date"
              value={startdateTime[0] + "T" + startdateTime[1]}
              onChange={(e) => {
                setStartDateTime(e.target.value.split("T"));
              }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-2">
            <label htmlFor="TaskDate" className="col-form-label">
              End Task Date
            </label>
          </div>
          <div className="col-auto">
            <input
              type="datetime-local"
              className="form-control"
              id="TaskDate"
              placeholder="Task Date"
              aria-describedby="Task Date"
              value={enddateTime[0] + "T" + enddateTime[1]}
              onChange={(e) => {
                setEndDateTime(e.target.value.split("T"));
              }}
            />
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-2">
            <label className="form-check-label" htmlFor="Select">
              Department
            </label>
          </div>
          <div className="col-auto">
            <select
              className="form-select"
              id="Select"
              aria-label="Default select example"
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            >
              <option style={{ display: "none" }} selected>
                --
              </option>
              {sections &&
                sections.map((dep) => {
                  return (
                    <option
                      selected={dep === department ? true : false}
                      defaultValue={dep}
                      key={dep.id}
                    >
                      {" "}
                      {dep}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-2">
            <label className="form-check-label" htmlFor="Select">
              User
            </label>
          </div>
          <div className="col-auto">
            <select
              key="0"
              className="form-select"
              id="Select"
              aria-label="Default select example"
              onChange={(e) => {
                setEmployee(e.target.value);
              }}
            >
              <option style={{ display: "none" }} selected>
                --
              </option>
              {users &&
                users.map((u) => {
                  return (
                    <option
                      selected={u.username === employee ? true : false}
                      defaultValue={u.username}
                      key={u.id}
                    >
                      {" "}
                      {u.username}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="form-check form-check">
          <input
            className="form-check-input checkbtn"
            type="checkbox"
            id="flexCheckDefault"
            checked={check === "Checked" ? true : false}
            aria-label="Checkbox for following text input"
            onChange={(e) => {
              if (e.target.checked) {
                setCheck("Checked");
              } else {
                setCheck("Not Checked");
              }
            }}
          />
          <label
            className="form-check-label float-start"
            htmlFor="flexCheckDefault"
          >
            Complete Task
          </label>
        </div>

        <button type="submit" className="btn btn-success mb-3">
          <FontAwesomeIcon
            icon={faPenToSquare}
            fade
            size="lg"
            style={{ color: "#ffffff" }}
          />{" "}
          Eidt Task
        </button>

        <Link to={"/task"} className="btn btn-danger ms-2 mb-3">
          <FontAwesomeIcon
            icon={faXmark}
            fade
            size="lg"
            style={{ color: "#ffffff" }}
          />{" "}
          Cancel
        </Link>
      </form>
    </>
  );
}
export default EditTask;
