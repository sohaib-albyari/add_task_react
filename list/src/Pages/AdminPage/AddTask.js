import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPlus,
  faCaretDown,
  faCalendarDays,
  faTrash,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import "../../cssPage/AddEditFilterTask.css";
import BottomBtn from "../../components/BottomBtn";

function AddTask() {
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

  const [sections, setSections] = useState("");
  const [users, setUsers] = useState("");

  // const [employee, setEmployee] = useState("");
  // const [name, setName] = useState("");
  // const [check, setCheck] = useState("Not Complete");
  // const [department, setDepartment] = useState("");
  // const [description, setDescription] = useState("");
  // const [startdateTime, setStartDateTime] = useState({});
  // const [enddateTime, setEndDateTime] = useState({});

  const [links, setLinks] = useState([{ id: 1, value: "" }]);

  // const [file, setFile] = useState("");

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
    taskData.check = "Not Complete";

    axios
      .post("http://localhost:8000/task", {
        name: taskData.name,
        department: taskData.department,
        employee: taskData.employee,
        description: taskData.description,
        check: taskData.check,
        startdateTime: taskData.startdateTime,
        enddateTime: taskData.enddateTime,
        links: taskData.links,
      })
      .then((res) => res)
      .catch((err) => console.log(err));

    Swal.fire({
      title: `Has Added "${taskData.name}" successfully.`,
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
              <h1>Add Task</h1>

              <div className="inputbox">
                <input
                  type="text"
                  name="name"
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
                        <option key={dep.id} value={dep.department}>
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
                    users.map((employee) => {
                      if (employee.department === taskData.department) {
                        return (
                          <option key={employee.id} value={employee.name}>
                            {employee.username}
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

              {/* <div className="inputbox">
                <input type="file" name="file" onChange={handleFile} required />
                <label className="file-le" htmlFor="">
                  Image
                </label>
              </div> */}

              <>
                {links.map((field) => (
                  <div className="inputbox" key={field.id}>
                    <input
                      type="text"
                      name="links"
                      value={field.value}
                      onChange={(e) => {
                        handleInputChange(field.id, e.target.value);
                      }}
                      // onChange={handleInput}
                    />
                    <label htmlFor="">Link</label>

                    <div
                      className="icon-container delete-link"
                      onClick={() => deleteInputField(field.id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#fff", zIndex: 100 }}
                      />
                      <span className="ms-1">Delete</span>
                    </div>
                  </div>
                ))}
              </>

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
                <BottomBtn to={"/task"} value={"Add Task"} />

                {/* <button className="btn-task" type="submit">
                  <span>
                    <FontAwesomeIcon icon={faPlus} fade size="lg" />
                    &nbsp;Add Task
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
export default AddTask;
