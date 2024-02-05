import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddDepartment() {
  const [department, setDepartment] = useState("");

  const navigate = useNavigate();


  const formSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/departments", {
        department: department,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    Swal.fire({
      title: `Has Added "${department}" successfully.`,
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
            <form
            onSubmit={formSubmit}
            >
              <h1>Add Department</h1>

              <div className="inputbox">
                <input
                  type="text"
                  name="username"
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  required
                />
                <label htmlFor="">Department Name</label>
              </div>

              <div className="btns">
                <button className="btn-task" type="submit">
                  <span>
                    <FontAwesomeIcon icon={faPlus} fade size="lg" />
                    &nbsp;Add Department
                  </span>
                </button>

                <Link className="btn-task" to={"/task"}>
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

export default AddDepartment;
