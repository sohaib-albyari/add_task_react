import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPlus,
  faCaretDown,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import "../cssPage/AddEditFilterTask.css";

function AddTask() {
  const [sections, setSections] = useState("");
  const [users, setUsers] = useState("");
  const [employee, setEmployee] = useState("");
  const [name, setName] = useState("");
  const [check, setCheck] = useState("Not Checked");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [startdateTime, setStartDateTime] = useState({});
  const [enddateTime, setEndDateTime] = useState({});

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

  const navigate = useNavigate();

  const cBtn = document.querySelector(".checkbtn");
  const formSubmit = (e) => {
    if (cBtn.checked) {
      setCheck("Checked");
    }
    e.preventDefault();

    axios
      .post("http://localhost:8000/task", {
        name: name,
        department: department,
        employee: employee,
        description: description,
        check: check,
        startdateTime: [startdateTime[0], startdateTime[1]],
        enddateTime: [enddateTime[0], enddateTime[1]],
      })
      .then((res) => {
        res.data();
      })
      .catch((err) => console.log(err));

    Swal.fire({
      title: `Has Added "${name}" successfully.`,
      icon: "success",
    }).then((data) => {
      if (data.isConfirmed) {
        navigate("/task");
      }
    });
  };
  return (
    <>
      {/* <form
        className="border border-info rounded container d-block w-50"
        onSubmit={formSubmit}
      >
        <h1>Add Task</h1>
        <div className="row mb-3 mt-3">
          <div className="col-3 inputbox">
            <label html htmlFor="TaskName" className="col-form-label fs-6">
              Task Name
            </label>
          </div>
          <div className="col-9 inputbox">
            <input
              type="text"
              className="form-control"
              id="TaskName"
              placeholder="Task Name"
              aria-describedby="Task Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
        </div>

        <div className="row mb-3 mt-3">
          <div className="col-3 inputbox">
            <label html htmlFor="TaskName" className="col-form-label">
              Task Description
            </label>
          </div>
          <div className="col-9 inputbox">
            <textarea
              type="text"
              className="form-control"
              id="TaskName"
              placeholder="Task Description"
              aria-describedby="Task Name"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            ></textarea>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-3 inputbox">
            <label html htmlFor="TaskDate" className="col-form-label">
              Start Task Date
            </label>
          </div>
          <div className="col-auto inputbox">
            <input
              type="datetime-local"
              className="form-control"
              id="TaskDate"
              placeholder="Task Date"
              aria-describedby="Task Date"
              onChange={(e) => {
                setStartDateTime(e.target.value.split("T"));
              }}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-3 inputbox">
            <label html htmlFor="TaskDate" className="col-form-label">
              End Task Date
            </label>
          </div>
          <div className="col-auto inputbox">
            <input
              type="datetime-local"
              className="form-control"
              id="TaskDate"
              placeholder="Task Date"
              aria-describedby="Task Date"
              onChange={(e) => {
                setEndDateTime(e.target.value.split("T"));
              }}
              required
            />
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-3 inputbox">
            <label html htmlFor="validationCustom04" className="form-label">
              Department
            </label>
          </div>

          <div className="col-auto inputbox">
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
                    <option key={dep} value={dep}>
                      {" "}
                      {dep}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-3 inputbox">
            <label html htmlFor="validationCustom04" className="form-label">
              User
            </label>
          </div>

          <div className="col-auto inputbox">
            <select
              name="selectedDepartment"
              className="form-select"
              id="validationCustom04"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              required
            >
              <option disabled selected value="-">
                --
              </option>
              {users &&
                users.map((employee) => {
                  return (
                    <option key={employee.id} value={employee.name}>
                      {" "}
                      {employee.username}
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
            html htmlFor="flexCheckDefault"
          >
            Complete Task
          </label>
        </div>

        <button type="submit" className="btn btn-success mb-3">
          <FontAwesomeIcon
            icon={faPlus}
            fade
            size="lg"
            style={{ color: "#ffffff" }}
          />{" "}
          Add Task
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
      </form> */}

      <div className="container-fluid p-0">
        <div className="add-page">
          <section>
            <form onSubmit={formSubmit}>
              <h1>Add Task</h1>
              <div className="inputbox">
                <input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
                <label htmlFor="">Task Name</label>
              </div>

              <div className="inputbox">
                <textarea
                  type="text"
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
                        <option key={dep} value={dep}>
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
                    users.map((employee) => {
                      return (
                        <option key={employee.id} value={employee.name}>
                          {" "}
                          {employee.username}
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
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheck("Checked");
                      } else {
                        setCheck("Not Checked");
                      }
                    }}
                  />
                  Complete Task
                </label>
              </div>

              <button className="btn-task" type="submit">
                <FontAwesomeIcon icon={faPlus} fade size="lg" />
                &nbsp;Add Task
              </button>
              <button className="btn-task">
                <Link className="exit" to={"/task"}>
                  <FontAwesomeIcon icon={faXmark} fade size="lg" />
                  &nbsp;Cancel
                </Link>
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
export default AddTask;