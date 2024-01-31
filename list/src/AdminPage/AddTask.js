import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPlus,
  faCaretDown,
  faCalendarDays,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import "../cssPage/AddEditFilterTask.css";

function AddTask() {
  const [sections, setSections] = useState("");
  const [users, setUsers] = useState("");
  const [employee, setEmployee] = useState("");
  const [name, setName] = useState("");
  const [check, setCheck] = useState("Not Complete");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [startdateTime, setStartDateTime] = useState({});
  const [enddateTime, setEndDateTime] = useState({});

  const [links, setLinks] = useState([]);

  const [link, setLink] = useState({});

  const [linkValue, setLinkValue] = useState("");

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

  const deleteLink = (index) => {
    console.log(links);

    setLinks(
      links.map((value, i) => {
        // console.log(i + "  " + index);
        if (i !== index) {
          return links.splice(index, 1);
        }
        return links;
      })
    );

    // const filtered = links.splice(index,1);
    // setLinks(filtered);
    // links.filter(link => )
    // setLink(Object.entries(link).splice(index,1))
  };

  // console.log(links, "LINKS");
  // console.log(link, "LINK");

  const formSubmit = (e) => {
    // setLink((prev) => [...prev, linkValue]);
    // console.log(linkValue);
    e.preventDefault();
    setCheck("Not Complete");
    axios
      .post("http://localhost:8000/task", {
        name: name,
        department: department,
        employee: employee,
        description: description,
        check: check,
        startdateTime: [startdateTime[0], startdateTime[1]],
        enddateTime: [enddateTime[0], enddateTime[1]],
        // links: link,
      })
      .then((res) => res)
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

  const [inputFields, setInputFields] = useState([{ id: 1, value: "" }]);

  const addInputField = () => {
    setInputFields([...inputFields, { id: inputFields.length + 1, value: "" }]);
  };

  const deleteInputField = (id) => {
    const updatedInputFields = inputFields.filter((field) => field.id !== id);
    setInputFields(updatedInputFields);
  };

  const handleInputChange = (id, value) => {
    const updatedInputFields = inputFields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setInputFields(updatedInputFields);
  };

  return (
    <>
      {/* <div>
        {inputFields.map((field) => (
          <div className="inputbox" key={field.id}>
            <input
              type="text"
              value={field.value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
            <button onClick={() => deleteInputField(field.id)}>Delete</button>
          </div>
        ))}
      </div> */}

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
                <label htmlFor="">Task Title</label>
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

              {/* {links &&
                links.map((l, index) => {
                  return (
                    <div key={index} id={`${index}`} className="inputbox">
                      <input
                        type="text"
                        onChange={(e) => {
                          setLink({ ...link, [index]: e.target.value });
                        }}
                        required
                      />
                      <div
                        className="icon-container delete-link"
                        onClick={() => deleteLink(index)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "#fff", zIndex: 100 }}
                        />
                      </div>
                      <label htmlFor="">Link</label>
                    </div>
                  );
                })} */}

              <div>
                {inputFields.map((field) => (
                  <div className="inputbox" key={field.id}>
                    <input
                      type="text"
                      // value={field.value}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
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
              </div>

              <div className="btns">
                {/* <button class="btn-task">
                  <span>Hover me!</span>
                </button> */}
                <button
                  type="button"
                  className="btn-task"
                  onClick={addInputField}
                  // onClick={(e) => setLinks((prev) => [...prev, ""])}
                >
                  <span>
                    {" "}
                    <FontAwesomeIcon icon={faPlus} fade size="lg" /> Add Link
                  </span>
                </button>

                <button className="btn-task" type="submit">
                  <span>
                    <FontAwesomeIcon icon={faPlus} fade size="lg" />
                    &nbsp;Add Task
                  </span>
                </button>

                {/* <button className="btn-task"> */}

                <Link className="btn-task" to={"/task"}>
                  <span>
                    {" "}
                    <FontAwesomeIcon icon={faXmark} fade size="lg" />
                    &nbsp;Cancel
                  </span>
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
export default AddTask;
