import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';


function AddTask() {
    const [sections, setSections] = useState("");
    const [users, setUsers] = useState("");
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [check, setCheck] = useState("Not Checked");
    const [department, setDepartment] = useState("");
    const [description, setDescription] = useState("");
    const [startdateTime, setStartDateTime] = useState({});
    const [enddateTime, setEndDateTime] = useState({});

    useEffect(() => {
        fetch('http://localhost:8000/depatments').then((res) => res.json()).then((data) => { setSections(data); })
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/user').then((res) => res.json()).then((data) => { setUsers(data); })
    }, []);

    const navigate = useNavigate();

    const cBtn = document.querySelector('.checkbtn');
    const formSubmit = (e) => {
        if (cBtn.checked) {
            setCheck("Checked");
        }
        e.preventDefault();



        fetch("http://localhost:8000/task",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    department: department,
                    employee: user,
                    description: description,
                    check: check,
                    startdateTime: [
                        startdateTime[0],
                        startdateTime[1],
                    ],
                    enddateTime: [
                        enddateTime[0],
                        enddateTime[1],
                    ],
                })
            }).then((res) => res.json()).then((data) => { });


        Swal.fire({
            title: `Has Added "${name}" successfully.`,
            icon: 'success',
        }).then((data) => {
            if (data.isConfirmed) {
                navigate('/task');
            }
        });

    };


    return (
        <>
            <h1>Add Task</h1>

            <form className="border border-info rounded container d-block w-50" onSubmit={formSubmit}>
                <div className="row mb-3 mt-3">
                    <div className="col-3">
                        <label htmlFor="TaskName" className="col-form-label fs-6">Task Name</label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" id="TaskName" placeholder="Task Name" aria-describedby="Task Name" onChange={(e) => { setName(e.target.value) }} required />
                    </div>
                </div>

                <div className="row mb-3 mt-3">
                    <div className="col-3">
                        <label htmlFor="TaskName" className="col-form-label">Task Description</label>
                    </div>
                    <div className="col-9">
                        <textarea type="text" className="form-control" id="TaskName" placeholder="Task Description" aria-describedby="Task Name" onChange={(e) => { setDescription(e.target.value) }} required></textarea>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-3">
                        <label htmlFor="TaskDate" className="col-form-label">Start Task Date</label>
                    </div>
                    <div className="col-auto">
                        <input type="datetime-local" className="form-control" id="TaskDate" placeholder="Task Date" aria-describedby="Task Date" onChange={(e) => { setStartDateTime((e.target.value).split("T")); }} required />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-3">
                        <label htmlFor="TaskDate" className="col-form-label">End Task Date</label>
                    </div>
                    <div className="col-auto">
                        <input type="datetime-local" className="form-control" id="TaskDate" placeholder="Task Date" aria-describedby="Task Date" onChange={(e) => { setEndDateTime((e.target.value).split("T")); }} required />
                    </div>
                </div>

                <div className="row mt-3 mb-3">
                    <div className="col-3">
                        <label htmlFor="validationCustom04" className="form-label">Department</label>
                    </div>

                    <div className="col-auto">
                        <select name="selectedDepartment" className="form-select" id="validationCustom04" onChange={(e) => { setDepartment(e.target.value); }} required>
                            <option disabled selected value="-">--</option>
                            {

                                sections && sections.map((dep) => {
                                    return (
                                        <option key={dep} value={dep}> {dep}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="row mt-3 mb-3">
                    <div className="col-3">
                        <label htmlFor="validationCustom04" className="form-label">User</label>
                    </div>

                    <div className="col-auto">
                        <select name="selectedDepartment" className="form-select" id="validationCustom04" onChange={(e) => { setUser(e.target.value); }} required>
                            <option disabled selected value="-">--</option>
                            {

                                users && users.map((employee) => {
                                    return (
                                        <option key={employee.id} value={employee.name}> {employee.username}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>


                <div className="form-check form-check">
                    <input className="form-check-input checkbtn" type="checkbox" id="flexCheckDefault" aria-label="Checkbox for following text input" onChange={(e) => {
                        if (e.target.checked) {
                            setCheck("Checked");
                        } else {
                            setCheck("Not Checked");
                        }
                    }} />
                    <label className="form-check-label float-start" htmlFor="flexCheckDefault">
                        Complete Task
                    </label>
                </div>
                <button type="submit" className="btn btn-success mb-3"><FontAwesomeIcon icon={faPlus} fade size="lg" style={{ color: "#ffffff", }} /> Add Task</button>

                <Link to={'/task'} className="btn btn-danger ms-2 mb-3"><FontAwesomeIcon icon={faXmark} fade size="lg" style={{ color: "#ffffff", }} /> Cancel</Link>

            </form>
        </>
    )
}
export default AddTask;