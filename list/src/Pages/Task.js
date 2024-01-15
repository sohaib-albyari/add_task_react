
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowDownShortWide, faRightFromBracket, } from "@fortawesome/free-solid-svg-icons";
import TaskData from "../components/TaskData";

function Task() {
    const [tasks, setTasks] = useState([]);
    const getAllTasks = () => {
        fetch('http://localhost:8000/task').then((res) => res.json()).then((data) => setTasks(data));
    }


    useEffect(() => {
        getAllTasks();
    }, []);

    return (
        <>
            <h1>Task page</h1>
            <Link to={'/singin'} className="float-start btn btn-warning text-light m-2"><FontAwesomeIcon icon={faRightFromBracket} fade size="lg" style={{ color: "#ffffff", }} /> Log Out</Link>
            <Link to={'/task/add'} className="btn btn-success mt-3"><FontAwesomeIcon icon={faPlus} fade size="lg" style={{ color: "#ffffff", }} /> Add New Task</Link>
            <Link to={'/task/filter'} className="btn btn-primary mt-3 ms-3"><FontAwesomeIcon icon={faArrowDownShortWide} fade size="lg" style={{ color: "#ffffff", }} /> Task Filter</Link>
            <table className="table table-striped mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Task</th>
                        <th>Department</th>
                        <th>Employee</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Check</th>
                        <th>Operation</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        tasks && tasks.map((task) => {
                            return (
                                <tr key={task.id}>
                                    <TaskData task={task} />
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>



            

        </>
    )
}
export default Task;