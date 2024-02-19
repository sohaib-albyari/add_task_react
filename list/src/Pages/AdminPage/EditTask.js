import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faXmark,
  // faPenToSquare,
  faCalendarDays,
  faCaretDown,
  faTrash,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import BottomBtn from "../../components/BottomBtn";

function EditTask() {
  // const [task, setTask] = useState({});
  const [sections, setSections] = useState("");
  const [users, setUsers] = useState("");

  const [taskData, setTaskData] = useState({
    name: "",
    department: "",
    employee: "",
    description: "",
    check: "",
    startdateTime: [],
    enddateTime: [],
    links: "",
  });

  const [check, setCheck] = useState("Not Complete");


  // const [name, setName] = useState("");
  // const [department, setDepartment] = useState("");
  // const [employee, setEmployee] = useState("");
  // const [description, setDescription] = useState("");
  // const [startdateTime, setStartDateTime] = useState({});
  // const [enddateTime, setEndDateTime] = useState({});

  const [links, setLinks] = useState([{ id: 1, value: "" }]);

  const addInputField = () => {
    setLinks([...links, { id: links.length + 1, value: "" }]);
  };

  const deleteInputField = (id) => {
    const updatedLinks = links.filter((field) => field.id !== id);
    setLinks(updatedLinks);
  };

  const handleInputChange = (id, value) => {
    const updatedLinks = links.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setLinks(updatedLinks);
  };

  const { taskid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/departments")
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
        taskData.name = res.data.name;
        taskData.department = res.data.department;
        taskData.employee = res.data.employee;
        taskData.description = res.data.description;
        taskData.startdateTime = res.data.startdateTime;
        taskData.enddateTime = res.data.enddateTime;
        setLinks(res.data.links)
        // taskData.links = res.data.links;
        taskData.check = res.data.check;

        // setTask(res.data);
        // setName(res.data.name);
        // setCheck(res.data.check);
        // setDepartment(res.data.department);
        // setEmployee(res.data.employee);
        // setDescription(res.data.description);
        // setStartDateTime(res.data.startdateTime);
        // setEndDateTime(res.data.enddateTime);
        // setLinks(res.data.links);
      })
      .catch((err) => console.log(err));
  }, [taskid]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "startdateTime" || name === "enddateTime") {
      let time = [];
      time = value.split("T");
      setTaskData({ ...taskData, [name]: time });
    } else {
      setTaskData({ ...taskData, [name]: value });
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    taskData.links = links;
    taskData.check = check;
    axios
      .put(`http://localhost:8000/task/${taskid}`, {
        name: taskData.name,
        department: taskData.department,
        employee: taskData.employee,
        description: taskData.description,
        check: taskData.check,
        startdateTime: taskData.startdateTime,
        enddateTime: taskData.enddateTime,
        links: taskData.links,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    Swal.fire({
      title: `Has updated "${taskData.name}" successfully.`,
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
                  name="name"
                  defaultValue={taskData.name}
                  // onChange={(e) => {
                  //   setName(e.target.value);
                  // }}
                  onChange={handleInput}
                  required
                />
                <label htmlFor="">Task Title</label>
              </div>

              <div className="inputbox">
                <textarea
                  type="text"
                  name="description"
                  defaultValue={taskData.description}
                  // onChange={(e) => {
                  //   setDescription(e.target.value);
                  // }}
                  onChange={handleInput}
                  required
                ></textarea>
                <label htmlFor="">Task Description</label>
              </div>

              <div className="inputbox">
                <input
                  type="datetime-local"
                  name="startdateTime"
                  value={
                    taskData.startdateTime[0] + "T" + taskData.startdateTime[1]
                  }
                  // onChange={(e) => {
                  //   setStartDateTime(e.target.value.split("T"));
                  // }}
                  onChange={handleInput}
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
                  name="enddateTime"
                  value={
                    taskData.enddateTime[0] + "T" + taskData.enddateTime[1]
                  }
                  // onChange={(e) => {
                  //   setEndDateTime(e.target.value.split("T"));
                  // }}
                  onChange={handleInput}
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
                  name="department"
                  className="form-select"
                  id="validationCustom04"
                  // onChange={(e) => {
                  //   setDepartment(e.target.value);
                  // }}
                  onChange={handleInput}
                  required
                >
                  <option disabled selected value="-">
                    --
                  </option>
                  {sections &&
                    sections.map((dep) => {
                      return (
                        <option
                          selected={
                            dep.department === taskData.department
                              ? true
                              : false
                          }
                          key={dep.id}
                          value={dep.department}
                        >
                          {dep.department}
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
                  name="employee"
                  className="form-select"
                  id="validationCustom04"
                  // onChange={(e) => {
                  //   setEmployee(e.target.value);
                  // }}
                  onChange={handleInput}
                  required
                >
                  <option disabled selected value="-">
                    --
                  </option>
                  {users &&
                    users.map((isuser) => {
                      if (taskData.department === isuser.department) {
                        return (
                          <option
                            selected={
                              isuser.username === taskData.employee
                                ? true
                                : false
                            }
                            key={isuser.id}
                            value={isuser.name}
                          >
                            {isuser.username}
                          </option>
                        );
                      }
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

              {links &&
                links.map((link) => {
                  return (
                    <div className="inputbox" key={link.id}>
                      <input
                        type="text"
                        defaultValue={link.value}
                        onChange={(e) => {
                          handleInputChange(link.id, e.target.value);
                        }}
                        required
                      />
                      <label className="label_user" htmlFor="">
                        Link {link.id}
                      </label>

                      <div
                        className="icon-container delete-link"
                        onClick={() => deleteInputField(link.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "#fff", zIndex: 100 }}
                        />
                        <span className="ms-1">Delete</span>
                      </div>
                    </div>
                  );
                })}

              <div className="checkbtndiv">
                <label htmlFor="">
                  <input
                    className="checkbtn"
                    name="check"
                    type="checkbox"
                    checked={taskData.check === "Complete" ? true : false}
                    // value={taskData.check}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheck("Complete");
                      } else {
                        setCheck("Not Complete");
                      }
                    }}
                    // onChange={handleInput}
                  />
                  Complete Task
                </label>
              </div>

              <div className="btns">
                <button
                  type="button"
                  className="btn-task"
                  onClick={addInputField}
                >
                  <span>
                    <FontAwesomeIcon icon={faLink} fade size="lg" /> Add Link
                  </span>
                </button>

                <BottomBtn to={"/task"} value={"Eidt Task"} />

                {/* <button className="btn-task" type="submit">
                  <span>
                    <FontAwesomeIcon icon={faPenToSquare} fade size="lg" />
                    &nbsp;Eidt Task
                  </span>
                </button>

                <Link className="btn-task" to={"/task"}>
                  <span>
                    {" "}
                    <FontAwesomeIcon icon={faXmark} fade size="lg" />
                    &nbsp;Cancel
                  </span>
                </Link> */}
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
export default EditTask;
