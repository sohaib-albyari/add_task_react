import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
function Operation(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, [tasks]);

  const getAllTasks = () => {
    axios
      .get("http://localhost:8000/task")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();

  const deleteTask = (props) => {
    Swal.fire({
      title: `Are you sure to delete task "${props.task.name}"?`,
      showCancelButton: true,
      icon: "question",
      confirmButtonText: "Delete",
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .delete(`http://localhost:8000/task/${props.task.id}`)
          .then((res) => {
            setTasks((prev) => prev.filter((t) => t.id !== props.task.id));
            navigate("/task");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <td>
      <button
        type="button"
        className="btn btn-danger btn-sm ms-2"
        onClick={() => {
          deleteTask(props);
          getAllTasks(tasks);
          navigate("/task");
        }}
      >
        <FontAwesomeIcon icon={faTrash} beat size="lg" />
      </button>

      <Link
        to={`/task/edit/${props.task.id}`}
        className="btn btn-primary btn-sm ms-2"
      >
        <FontAwesomeIcon icon={faPenToSquare} beat size="lg" />
      </Link>
    </td>
  );
}
export default Operation;
