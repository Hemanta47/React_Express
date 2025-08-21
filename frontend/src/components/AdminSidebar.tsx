import { FileQuestionIcon, LayoutDashboard, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
    const [openQuestions, setOpenQuestions] = useState(false);
    const location = useLocation();

    // Helper to check active route
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="flex flex-col h-full bg-gray-900 text-gray-200 p-4">
            {/* Brand */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-center text-indigo-400">Connecto</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/admin/"
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive("/admin/")
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-800"
                                }`}
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/user"
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive("/admin/users")
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-800"
                                }`}
                        >
                            <User className="w-5 h-5" />
                            <span>Users</span>
                        </Link>
                    </li>

                    {/* Dropdown for Questions */}
                    <li>
                        <button
                            onClick={() => setOpenQuestions(!openQuestions)}
                            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                            <span className="flex items-center gap-3">
                                <FileQuestionIcon className="w-5 h-5" />
                                Questions
                            </span>
                            <ChevronDown
                                className={`w-4 h-4 transition-transform ${openQuestions ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        <ul
                            className={`ml-3 mt-1 space-y-1 overflow-hidden transition-all duration-200 ${openQuestions ? "max-h-40" : "max-h-0"
                                }`}
                        >
                            <li>
                                <Link
                                    to="/admin/questionset/create"
                                    className={`block px-2 py-1 rounded text-sm transition ${isActive("/admin/questionset/create")
                                        ? "bg-gray-700 text-white"
                                        : "hover:bg-gray-800"
                                        }`}
                                >
                                    Create
                                </Link>
                            </li>
                            {/* <li>
                                <Link
                                    to="/admin/questionset/list"
                                    className={`block px-2 py-1 rounded text-sm transition ${isActive("/admin/questionset/list")
                                        ? "bg-gray-700 text-white"
                                        : "hover:bg-gray-800"
                                        }`}
                                >
                                    List
                                </Link>
                            </li> */}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
