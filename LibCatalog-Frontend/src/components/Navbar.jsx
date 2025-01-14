import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useLocation, useNavigate  } from "react-router-dom";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const [userOrAdmin, setUserOrAdmin] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    // const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        let storedUser = localStorage.getItem("user")
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserOrAdmin(parsedUser);
        }

        let storedAdmin = localStorage.getItem("admin")
        if (storedAdmin) {
            const parsedAdmin = JSON.parse(storedAdmin);
            setUserOrAdmin(parsedAdmin);
            setIsAdmin(true);
        }
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // const handleSearchChange = (event) => {
    //     setSearchQuery(event.target.value);
    // };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("admin");
        setUserOrAdmin(null);
        navigate("/");
        toast.success("Successfully logged out.");
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-blue-950 py-4">
            <div className="container mx-auto flex justify-between items-center">
                {!isAdmin ? (
                <Link to="/">
                    <div className="flex items-center space-x-4">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHDkd2V9dHdLORn-D1AMr73gMiH2Mmqan8LjxZ2sILBg&s" alt="Library Logo" className="ml-8 w-12 h-12 rounded-full" />
                        <div className="text-xl font-semibold text-white">LibCatalog</div>
                    </div>
                </Link>
                ) : (
                    <div className="flex items-center space-x-4">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHDkd2V9dHdLORn-D1AMr73gMiH2Mmqan8LjxZ2sILBg&s" alt="Library Logo" className="ml-8 w-12 h-12 rounded-full" />
                        <div className="text-xl font-semibold text-white">LibCatalog</div>
                    </div>
                )}
                <ul className="flex space-x-8"> {/* Ubah space-x-4 menjadi space-x-8 untuk menambahkan jarak */}
                    <li><a href="" className="text-white"></a></li>
                </ul>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        { userOrAdmin ? (
                            <div>
                                <div className="flex items-center" onClick={toggleDropdown}>
                                    <button className="flex items-center text-white focus:outline-none">
                                        { isAdmin ? (
                                            <img className="mr-4 w-12 h-12 rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg" alt="User Avatar" />
                                        ) : 
                                            (<img className="mr-4 w-12 h-12 rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg" alt="User Avatar" />)
                                        }
                                    </button>
                                    <div className="text-left mr-8">
                                        <span className="block text-sm text-white">Welcome</span>
                                        <span className="block text-sm text-white">{userOrAdmin.nama}</span>
                                    </div>
                                </div>
                            
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                        <div className="px-4 py-3">
                                            <span className="block text-sm text-gray-900">{userOrAdmin.nama}</span>
                                            <span className="block text-sm text-gray-500 truncate">{userOrAdmin.username}</span>
                                        </div>
                                        <ul>
                                            { !isAdmin ? (
                                                <li>
                                                <Link to="/userProfile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                            </li>
                                            ) : (
                                                null
                                            )}
                                            <li>
                                                <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            (location.pathname === '/login' || location.pathname === '/register') ? null : (
                                <div>
                                    <Link to="/login">
                                        <button className="ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-300 focus:outline-none">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/register">
                                        <button className="mr-4 ml-4 py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-300 focus:outline-none">
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                            )
                        )}
                        
                        {/* {dropdownOpen && (
                            
                        )} */}


                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
