import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Signin.css';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import Switch from '@material-ui/core/Switch';

function Signin() {
    const [isStudent, setIsStudent] = useState(true);
    const [admissionId, setAdmissionId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { dispatch } = useContext(AuthContext);

    const loginCall = async (userCredential, dispatch) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + "api/auth/signin", userCredential);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err });
            setError("Wrong Password Or Username");
        }
    };

    const handleForm = (e) => {
        e.preventDefault();
        if (!password || (isStudent && !admissionId) || (!isStudent && !employeeId)) {
            setError("Please fill in all fields");
            return;
        }
        isStudent
            ? loginCall({ admissionId, password }, dispatch)
            : loginCall({ employeeId, password }, dispatch);
    };

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <form onSubmit={handleForm}>
                    <h2 className="signin-title">Log in</h2>
                    <p className="line"></p>
                    <div className="persontype-question">
                        <p>Are you a Staff member?</p>
                        <Switch
                            onChange={() => setIsStudent(!isStudent)}
                            color="primary"
                            checked={!isStudent}
                        />
                    </div>
                    <div className="error-message"><p>{error}</p></div>
                    <div className="signin-fields">
                        <label htmlFor={isStudent ? "admissionId" : "employeeId"}>
                            <b>{isStudent ? "Admission ID" : "Employee ID"}</b>
                        </label>
                        <input
                            className='signin-textbox'
                            type="text"
                            placeholder={isStudent ? "Enter Admission ID" : "Enter Employee ID"}
                            name={isStudent ? "admissionId" : "employeeId"}
                            value={isStudent ? admissionId : employeeId}
                            onChange={(e) => {
                                isStudent ? setAdmissionId(e.target.value) : setEmployeeId(e.target.value);
                            }}
                            required
                        />
                        <label htmlFor="password"><b>Password</b></label>
                        <input
                            className='signin-textbox'
                            type="password"
                            minLength='6'
                            placeholder="Enter Password"
                            name="psw"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="signin-button" type="submit">Log In</button>
                    <a className="forget-pass" href="#home">Forgot password?</a>
                </form>
                <div className='signup-option'>
                    <p className="signup-question">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signin;