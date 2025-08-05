import { NavLink, useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export default function Navbar() {
    const accessToken = localStorage.getItem("token");
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="w-full h-20 bg-gray-900 px-6 shadow-md">
            <nav className="max-w-screen-xl mx-auto h-full flex justify-between items-center">
                <div className="text-white text-xl font-bold tracking-wide">
                    MyApp
                </div>

                {/* Navigation Links */}
                <ul className="flex items-center gap-6">
                    <NavLink
                        to="/"
                        className="text-white text-base hover:text-blue-400 transition-colors duration-150"
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/about"
                        className="text-white text-base hover:text-blue-400 transition-colors duration-150"
                    >
                        About
                    </NavLink>

                    {accessToken ? (
                        <>
                            <div className="flex items-center gap-2 pl-3 border-l border-gray-600">
                                <User className="text-blue-400" size={24} />
                                <button
                                    onClick={logoutHandler}
                                    className="text-white text-base hover:text-red-400 transition-colors duration-150"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="text-white text-base hover:text-blue-400 transition-colors duration-150"
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="text-white text-base hover:text-blue-400 transition-colors duration-150"
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
