import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function Operation({setTasks,task,tasks}) {
  // const [tasks, setTasks] = useState([]);

  const [dlTasks, setDlTasks] = useState("");

  // useEffect(() => {
  //   getAllTasks();
  // }, []);

  // const getAllTasks = () => {
  //   axios
  //     .get("http://localhost:8000/task")
  //     .then((res) => setTasks(res.data))
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    setTasks(tasks.filter((t) => t.id !== dlTasks));
  }, [dlTasks, tasks,setTasks]);

  const navigate = useNavigate();

  const deleteTask = (id) => {
    Swal.fire({
      title: `Are you sure to delete task "${task.name}"?`,
      showCancelButton: true,
      icon: "question",
      confirmButtonText: "Delete",
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .delete(`http://localhost:8000/task/${task.id}`)
          .then((res) => {
            setDlTasks(id);
            // setTasks((prev) => prev.filter((t) => t.id !== task.id));
            navigate("/task");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <td>
      <OverlayTrigger overlay={<Tooltip id="t-1">Delete</Tooltip>}>
        <button
          id="delete"
          type="button"
          className="btn btn-danger btn-sm ms-2"
          onClick={() => {
            deleteTask(task.id);
            // getAllTasks(tasks);
            navigate("/task");
          }}
        >
          <FontAwesomeIcon icon={faTrash} beat size="lg" />
        </button>
      </OverlayTrigger>

      <OverlayTrigger overlay={<Tooltip id="t-2">Edit</Tooltip>}>
        <Link
          to={`/task/edit/${task.id}`}
          className="btn btn-primary btn-sm ms-2"
        >
          <FontAwesomeIcon icon={faPenToSquare} beat size="lg" />
        </Link>
      </OverlayTrigger>
    </td>
  );
}
export default Operation;
