import './Register.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Register = () => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Account created!");
        const formData = {
            fullName,
            username,
            password,
            role,
        };
        console.log('Form Data: ', formData);
        clearForm();
    };

    return (
        <div className="register-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
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
                        <PasswordErrorMessage />
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
                    <Link to="/" className="text-blue-600"> Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;