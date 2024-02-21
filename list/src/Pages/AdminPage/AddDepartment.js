import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BottomBtn from "../../components/BottomBtn";

function AddDepartment() {
  const [departments, setDepartments] = useState("");
  const [department, setDepartment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();
    let isExists = 0;
    departments &&
      departments.map((dep) => {
        if (dep.department === department) {
          isExists++;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Department already exists!`,
          });
        }
        return isExists;
      });

    if (isExists === 0) {
      axios
        .post("http://localhost:8000/departments", {
          department: department,
        })
        .then((res) =>
          Swal.fire({
            title: `Has Added "${department}" successfully.`,
            icon: "success",
          })
            .then((data) => {
              if (data.isConfirmed) {
                navigate("/task");
              }
            })
            .catch((err) => console.log(err))
        );
    }

    // axios
    //   .post("http://localhost:8000/departments", {
    //     department: department,
    //   })
    //   .then((res) => res.data)
    //   .catch((err) => console.log(err));

    // Swal.fire({
    //   title: `Has Added "${department}" successfully.`,
    //   icon: "success",
    // }).then((data) => {
    //   if (data.isConfirmed) {
    //     navigate("/task");
    //   }
    // });
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="add-page">
          <section>
            <form onSubmit={formSubmit}>
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
                <BottomBtn to={"/task"} value={"Add Department"} />

                {/* <button className="btn-task" type="submit">
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
                </Link> */}
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default AddDepartment;
