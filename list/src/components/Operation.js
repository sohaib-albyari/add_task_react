import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function Operation(props) {
    const [tasks, setTasks] = useState([]);

    const getAllTasks = () => {
        fetch('http://localhost:8000/task').then((res) => res.json()).then((data) => setTasks(data));
    }

    useEffect(() => {
        getAllTasks();
    }, [tasks]);

    const navigate = useNavigate();


    const deleteTask = (props) => {
        Swal.fire({
            title: `Are you sure to delete task "${props.task.name}"?`,
            showCancelButton: true,
            icon: 'question',
            confirmButtonText: "Delete",
        }).then((data) => {
            if (data.isConfirmed) {
                fetch(`http://localhost:8000/task/${props.task.id}`, {
                    method: "DELETE",
                }).then((res) => res.json()).then((data) => { setTasks(prev => prev.filter(t => t.id !== props.task.id)); navigate('/task') });
            }
        });

    }

    return (
        <td>
            <button className="btn btn-danger btn-sm ms-2" onClick={() => { deleteTask(props); getAllTasks(tasks); navigate('/task') }}><FontAwesomeIcon icon={faTrash} beat size="lg" /> Delete</button>
            <Link to={`/task/edit/${props.task.id}`} className="btn btn-primary btn-sm ms-2"><FontAwesomeIcon icon={faPenToSquare} beat size="lg" /> Edit</Link>
        </td>
    )
}
export default Operation;
