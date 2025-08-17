import { NavLink } from "react-router-dom";
import {
    User,
    Menu,
    X,
    ChevronDown,
    LogOut,
    Settings,
    Users,
    House,
    Search,
} from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext, type IAuthContext } from "../App";
import { Button, TextField, InputAdornment } from "@mui/material";
import sm from "../assets/sm.jpg";

export default function Navbar() {
    const { isAuth, setAuthState, role, id } = useContext<IAuthContext>(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setAuthState({ isAuth: false, role: "guest", id: "" });
        setMenuOpen(false);
        setProfileMenu(false);
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-2 px-3 py-2 text-base transition-colors duration-150 rounded-lg ${isActive
            ? "text-white font-semibold bg-gray-800"
            : "text-white hover:text-blue-400"
        }`;

    return (
        <header className="relative w-full bg-gray-900 px-6 shadow-md z-50">
            <nav className="max-w-screen-xl mx-auto h-20 flex justify-between items-center">
                {/* Brand */}
                <div className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent font-mono uppercase md:text-3xl text-2xl font-bold tracking-widest">
                    Connecto
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-4 relative">
                    {isAuth && role === "professional" && (
                        <>
                            <NavLink to="/professional/home" className={navLinkClass}>
                                <House /> Home
                            </NavLink>
                            <NavLink to="/people" className={navLinkClass}>
                                <Users /> People
                            </NavLink>

                            {/* Search bar */}
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Search..."
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        color: "white",
                                        backgroundColor: "rgba(255,255,255,0.1)",
                                        borderRadius: "10px",
                                    },
                                    "& input::placeholder": { color: "rgba(255,255,255,0.7)" },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search className="text-white" size={18} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Profile dropdown */}
                            <div className="relative">
                                <div className="flex items-center gap-2 ml-4 cursor-pointer">
                                    <img
                                        src={sm}
                                        className="h-10 w-10 object-cover rounded-full border border-gray-600"
                                        alt="user"
                                    />
                                    <button
                                        onClick={() => setProfileMenu((prev) => !prev)}
                                        className="text-white hover:text-blue-400"
                                    >
                                        <ChevronDown size={18} />
                                    </button>
                                </div>

                                {profileMenu && (
                                    <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg py-2 z-50">
                                        <NavLink
                                            to={`/profile/${id}`}
                                            className="flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                            onClick={() => setProfileMenu(false)}
                                        >
                                            <User size={16} /> Profile
                                        </NavLink>
                                        <NavLink
                                            to={"/setting"}
                                            className="flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                            onClick={() => setProfileMenu(false)}
                                        >
                                            <Settings size={16} /> Settings
                                        </NavLink>
                                        <button
                                            onClick={logoutHandler}
                                            className="flex w-full gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left rounded-lg"
                                        >
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {!isAuth && (
                        <>
                            <NavLink to="/" className={navLinkClass}>
                                Home
                            </NavLink>
                            <NavLink to="/about" className={navLinkClass}>
                                About
                            </NavLink>
                            <Button
                                variant="contained"
                                sx={{
                                    color: "white",
                                    textTransform: "capitalize",
                                    borderRadius: "10px",
                                    px: 2,
                                }}
                                href="/login"
                            >
                                Sign In
                            </Button>
                        </>
                    )}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-gray-900/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out z-40 rounded-b-xl">
                    <div className="flex flex-col px-6 py-5 space-y-3">
                        {isAuth && role === "professional" ? (
                            <>
                                {/* Profile image on mobile */}
                                <div className="flex items-center gap-3 mb-3">
                                    <img
                                        src={sm}
                                        className="h-14 w-14 rounded-full object-cover border border-gray-600"
                                        alt="user"
                                    />
                                    <span className="text-white font-semibold text-lg">
                                        Professional
                                    </span>
                                </div>

                                {/* Search bar */}
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    placeholder="Search..."
                                    sx={{
                                        margin: "10px",
                                        "& .MuiOutlinedInput-root": {
                                            color: "white",
                                            backgroundColor: "rgba(255,255,255,0.1)",
                                            borderRadius: "10px",
                                        },
                                        "& input::placeholder": { color: "rgba(255,255,255,0.7)" },
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search className="text-white" size={18} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <NavLink
                                    to="/professional/home"
                                    className={navLinkClass}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <House /> Home
                                </NavLink>
                                <NavLink
                                    to="/people"
                                    className={navLinkClass}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Users /> People
                                </NavLink>
                                <NavLink
                                    to={`/profile/${id}`}
                                    className={navLinkClass}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <User size={18} /> Profile
                                </NavLink>
                                <NavLink
                                    to="/setting"
                                    className={navLinkClass}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Settings size={18} /> Settings
                                </NavLink>
                                <button
                                    onClick={logoutHandler}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium cursor-pointer"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/"
                                    className={navLinkClass}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/about"
                                    className={navLinkClass}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    About
                                </NavLink>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        textTransform: "capitalize",
                                        fontWeight: "bold",
                                        borderRadius: "10px",
                                    }}
                                    href="/login"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Sign In
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
