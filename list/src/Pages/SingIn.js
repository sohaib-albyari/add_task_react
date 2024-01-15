import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import '../cssPage/singin.css';
import logo from '../image/logo.png';
import emailicon from '../image/email.png';
import passwordicon from '../image/pass.png';
import side from '../image/side.png';


function SingIn() {
    const [users, setUsers] = useState("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/user').then((res) => res.json()).then((data) => setUsers(data));
    }, [])

    const navigate = useNavigate();

    const handelSubmit = (e) => {
        e.preventDefault();
        let con = 0;
        let employee = '';
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === password) {
                con++;
                employee = users[i].username;
            }
        }
        if (con === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Email or Password!",
            });
        } else {
            // navigate('/Home', { state: { user: employee } })
            navigate('/task', { state: { user: employee } })
        }
    }
    return (
        <>
            <div className="LoginPageContainer">
                <div className="LoginPageInnerContainer">
                    <div className="ImageContianer">
                        <img src={side} className="GroupImage" alt="" />
                    </div>
                    <div className="LoginFormContainer">
                        <div className="LoginFormInnerContainer">
                            <div className="LogoContainer">
                                <img src={logo} className="logo" alt="" />
                            </div>
                            <header className="header">Log In</header>
                            <header className="subHeader">Welcome to <b>Novel Era</b> Please Enter your Details</header>

                            <form onSubmit={handelSubmit}>
                                <div className="inputContainer">
                                    <label className="label" Forhtml="emailAddress">
                                        <img src={emailicon} className="labelIcon" alt="" /><span>Email
                                            Address*</span></label>
                                    <input type="email" className="input" id="emailAddress" placeholder="Enter your Email Address" onChange={(e) => { setEmail(e.target.value) }} required />
                                </div>
                                <div className="inputContainer">
                                    <label className="label" Forhtml="emailAddress">
                                        <img src={passwordicon} className="labelIcon" alt="" />
                                        <span>Password*</span>
                                    </label>
                                    <input type="password" className="input" id="emailAddress" placeholder="Enter your Password" onChange={(e) => { setPassword(e.target.value) }} required />
                                </div>
                                <div className="OptionsContainer">
                                    <div className="checkboxContainer">
                                        <input type="checkbox" id="RememberMe" className="checkbox" />
                                        <label Forhtml="RememberMe">Remember
                                            me</label>
                                    </div>
                                    <Link to={"/"} className="ForgotPasswordLink"><FontAwesomeIcon icon={faRightToBracket} fade size="lg" /> Registration</Link>

                                </div>
                                <button className="LoginButton">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SingIn;