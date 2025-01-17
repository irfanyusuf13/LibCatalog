import './Login.css';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });
    const [role, setRole] = useState("");

    const clearForm = () => {
        setUsername("");
        setPassword({
            value: "",
            isTouched: false,
        });
        setRole("");
    };

    const handleLoginAdmin = (event) => {
        event.preventDefault();
        fetch("http://localhost:5000/login/admin", { // jd admin
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password: password.value }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.message === "Login berhasil") {
                localStorage.setItem("admin", JSON.stringify(data.data));
                clearForm();
                toast.success("Login berhasil");
                navigate("/admin");
            } else {
                toast.error("Login gagal");
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error("Terjadi kesalahan");
        });
    }

    const handleLoginUser = (event) => {
        event.preventDefault();
        fetch("http://localhost:5000/login/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password: password.value }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.message === "Login berhasil") {
                localStorage.setItem("user", JSON.stringify(data.data));
                const loggedInUser = localStorage.getItem("user");
                if (loggedInUser) {
                    clearForm();
                    toast.success("Login berhasil");
                    navigate("/");
                    console.log("Login berhasil");
                }
            } else {
                toast.error("Login gagal");
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error("Terjadi kesalahan");
        });
    }

    return (
        <div>
            <Navbar />
            <div className="register-form-container">
                <ToastContainer />
                <form className="register-form">
                    <h2 className="form-title">Login</h2>
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
                    <div className="form-group">
                        {role === '' ? (
                            <button disabled type="submit" className="register-button">Login</button>
                        ) : (
                            role === 'admin' ? (
                                <button onClick={handleLoginAdmin} type="submit" className="register-button">LOGIN</button>
                            ) : (
                                <button onClick={handleLoginUser} type="submit" className="register-button">LOGIN</button>
                            )
                        )}
                    </div>
                    <div className="form-footer">
                        <label>
                            Don't have an account? 
                        </label>
                        <Link to="/register" className="text-blue-600"> Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
