import {
  faCaretDown,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BottomBtn from "../../components/BottomBtn";

function AddUser() {
  const [departments, setDepartments] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    department: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/departments")
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => console.log(err));
  },[]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name + ": " + value);
    setUserData({ ...userData, [name]: value });
  };

  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/user", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        depatment: userData.depatment,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    Swal.fire({
      title: `Has Added "${userData.username}" successfully.`,
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
              <h1>Add User</h1>

              <div className="inputbox">
                <input
                  type="text"
                  name="username"
                  onChange={handleInput}
                  required
                />
                <label htmlFor="">User Name</label>
              </div>

              <div className="inputbox">
                <input
                  type="email"
                  name="email"
                  onChange={handleInput}
                  required
                />
                <label htmlFor="">Email</label>
              </div>

              <div className="inputbox">
                <input
                  type="text"
                  name="password"
                  onChange={handleInput}
                  required
                />
                <label htmlFor="">password</label>
              </div>

              <div className="inputbox">
                <select
                  name="depatment"
                  className="form-select"
                  id="validationCustom04"
                  onChange={handleInput}
                  required
                >
                  <option disabled selected value="-">
                    --
                  </option>
                  {departments &&
                    departments.map((dep) => {
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

              <div className="btns">
              <BottomBtn to={"/task"} value={"Add User"} />
                {/* <button className="btn-task" type="submit">
                  <span>
                    <FontAwesomeIcon icon={faPlus} fade size="lg" />
                    &nbsp;Add User
                  </span>
                </button>

                <Link className="btn-task" to={"/task"}>
                  <span>
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

export default AddUser;
