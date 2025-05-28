import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    userType: 'student',
    userFullName: '',
    admissionId: '',
    employeeId: '',
    age: '',
    dob: '',
    gender: '',
    address: '',
    mobileNumber: '',
    email: '',
    password: '',
    isAdmin: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic client-side validation
    if (!formData.userType || !formData.userFullName || !formData.email || !formData.password || !formData.mobileNumber) {
      setError('Please fill in all required fields.');
      return;
    }

    if ((formData.userType === 'student' && !formData.admissionId) || (formData.userType === 'employee' && !formData.employeeId)) {
      setError(`Please provide ${formData.userType === 'student' ? 'Admission ID' : 'Employee ID'}.`);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await axios.post(process.env.VITE_URL + "api/register", formData);
      setSuccess('Registration successful!');
      setFormData({
        userType: 'student',
        userFullName: '',
        admissionId: '',
        employeeId: '',
        age: '',
        dob: '',
        gender: '',
        address: '',
        mobileNumber: '',
        email: '',
        password: '',
        isAdmin: false,
      });
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <form onSubmit={handleSubmit}>
          <h2 className="register-title">Register</h2>
          <p className="line"></p>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <div className="register-fields">
            <label><b>User Type</b></label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="register-select"
              required
            >
              <option value="student">Student</option>
              <option value="employee">Employee</option>
            </select>
            <label><b>Full Name</b></label>
            <input
              type="text"
              name="userFullName"
              value={formData.userFullName}
              onChange={handleChange}
              className="register-textbox"
              placeholder="Enter Full Name"
              required
            />
            {formData.userType === 'student' && (
              <>
                <label><b>Admission ID</b></label>
                <input
                  type="text"
                  name="admissionId"
                  value={formData.admissionId}
                  onChange={handleChange}
                  className="register-textbox"
                  placeholder="Enter Admission ID"
                />
              </>
            )}
            {formData.userType === 'employee' && (
              <>
                <label><b>Employee ID</b></label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="register-textbox"
                  placeholder="Enter Employee ID"
                />
              </>
            )}
            <label><b>Age</b></label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="register-textbox"
              placeholder="Enter Age"
            />
            <label><b>Date of Birth</b></label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="register-textbox"
            />
            <label><b>Gender</b></label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="register-select"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label><b>Address</b></label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="register-textbox"
              placeholder="Enter Address"
            />
            <label><b>Mobile Number</b></label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="register-textbox"
              placeholder="Enter Mobile Number"
              required
            />
            <label><b>Email</b></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="register-textbox"
              placeholder="Enter Email"
              required
            />
            <label><b>Password</b></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="register-textbox"
              placeholder="Enter Password"
              minLength="6"
              required
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="register-checkbox"
              />
              <b>Admin User</b>
            </label>
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <div className="signin-option">
          <p className="signin-question">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;