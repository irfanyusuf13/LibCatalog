import './Register.css';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });
    const [role, setRole] = useState("");

    const getIsFormValid = () => {
        return (
            fullName &&
            username &&
            password.value.length >= 8 &&
            role !== ""
        );
    };

    const clearForm = () => {
        setFullName("");
        setUsername("");
        setPassword({
            value: "",
            isTouched: false,
        });
        setRole("");
    };

    const handleRegister = async (event) => {
        event.preventDefault();
    
        const formData = {
            nama: fullName,
            username: username,
            password: password.value,
            role: role,
        };
        const url = (role === 'admin' ? "http://localhost:5000/register/admin" : "http://localhost:5000/register/user");

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                toast.success("Account created!");
                clearForm();
                setTimeout(() => {
                    navigate("/login");
                }, 1500); // Delay to show the toast message
            } else {
                const errorData = await response.json();
                if (errorData.error === "Username already exists") {
                    toast.error("Username already exists");
                } else {
                    toast.error("Error: Username already exists");
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('An error occurred during registration.');
        }
    };
    

    return (
        <div>
            <Navbar />
            <div className="register-form-container">
                <ToastContainer />
                <form className="register-form" onSubmit={handleRegister}>
                    {console.log(role)}
                    <h2 className="form-title">Sign Up</h2>
                    <div className="form-group">
                        <label>
                            Full Name <sup>*</sup>
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full name"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Username <sup>*</sup>
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Password <sup>*</sup>
                        </label>
                        <input
                            value={password.value}
                            type="password"
                            onChange={(e) => setPassword({ ...password, value: e.target.value })}
                            onBlur={() => setPassword({ ...password, isTouched: true })}
                            placeholder="Password"
                        />
                        {password.isTouched && password.value.length < 8 && (
                            <div className="error-message">Password must be at least 8 characters long</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>
                            Role <sup>*</sup>
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="register-button" disabled={!getIsFormValid()}>
                        CREATE ACCOUNT
                    </button>
                    <div className="form-footer">
                        <label>
                            Already have an account? 
                        </label>
                        <Link to="/login" className="text-blue-600"> Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
