import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsersList } from "../../util/UserList";
import { Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material";
import { useProfile } from "../../util/AuthUser";
import { AuthContext, type IAuthContext } from "../../App";

export interface IListQuestionSet {
    _id: string;
    title: string;
    optionId: string;
    questionCount: number;
}

export interface IOption {
    _id: string;
    name: string;
    description: string

}

function AuthHome() {
    const { id } = useContext<IAuthContext>(AuthContext);
    const [questionSets, setQuestionSet] = useState<IListQuestionSet[]>([]);
    const { users, loading } = useUsersList()
    const [options, setOption] = useState<IOption[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const { data: profile } = useProfile(id || "");

    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            setIsLoading(false);
            return;
        }

        async function fetchData() {
            axios
                .get("http://localhost:3000/api/questions/set/list", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    setQuestionSet(response?.data?.questionSet);
                })
                .catch(() => { })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        async function fetchOption() {
            axios
                .get("http://localhost:3000/api/options/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    setOption(response?.data.data);
                    console.log(response.data.data);

                })
                .catch(() => { })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        fetchData();
        fetchOption();
    }, []);

    // Toggle Options
    const handleToggle = (id: string) => {
        setSelectedOptions((prev) =>
            prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
        );
    };

    // Filter Using Option
    const filterQuestionSet = questionSets.filter((q) => {
        return selectedOptions.length === 0 ?
            questionSets :
            selectedOptions.includes(q.optionId)
    })

    console.log(profile);

    if (loading || isLoading) {
        return <p className="p-6 text-gray-600">Loading...</p>;
    }

    return (
        <div className="h-full w-full grid grid-cols-12 bg-gray-50">
            {/* LEFT SIDEBAR */}
            <aside className="col-span-3 border-r bg-white shadow-sm p-4 flex flex-col gap-6">
                <div className="p-4 flex justify-center flex-col items-center bg-gradient-to-r from-gray-700 to-sky-400">
                    <div className=" ">
                        <img
                            src={profile.profilePicture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-2 border-white"
                        />
                    </div>
                    <h2 className="text-lg font-semibold text-white">{profile.user.name}</h2>

                </div>


                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">Options</h2>
                    <FormControl component="fieldset" variant="standard" sx={{ m: 1 }}>
                        <FormGroup>
                            {options.map((option) => (
                                <FormControlLabel
                                    key={option._id}
                                    control={
                                        <Checkbox
                                            checked={selectedOptions.includes(option._id)}
                                            onChange={() => handleToggle(option._id)}
                                        />
                                    }
                                    label={option.name}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>

                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main className="col-span-6 p-6 overflow-y-auto">
                {filterQuestionSet.length === 0 ?
                    (<p className="p-6 text-gray-600">No question sets found.</p>)
                    : (<>
                        <h2 className="text-2xl font-bold mb-6">Posts</h2>

                        <div className="space-y-6">
                            {filterQuestionSet.map((question) => {
                                const TakeQuizHandler = () => {
                                    navigate(`/questionset/${question._id}/attempt`);
                                };

                                return (
                                    <div
                                        key={question._id}
                                        className="bg-white ring-1 ring-gray-500 rounded-xl shadow-sm hover:shadow-md transition"
                                    >
                                        {/* Header */}
                                        <div className="flex items-center gap-3 px-4 py-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">Admin</p>
                                                <p className="text-xs text-gray-500">2h ago</p>
                                            </div>
                                        </div>

                                        {/* Image */}
                                        <div className="h-52 w-full bg-gray-100 flex items-center justify-center">
                                            <span className="text-gray-400 text-sm">Quiz Image</span>
                                        </div>

                                        {/* Content */}
                                        <div className="px-4 py-3 space-y-2">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {question.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {question.questionCount}{" "}
                                                {question.questionCount === 1 ? "Question" : "Questions"}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="px-4 pb-3">
                                            <button
                                                onClick={TakeQuizHandler}
                                                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
                                            >
                                                Attempt Quiz
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>)
                }
            </main>

            {/* RIGHT SIDEBAR */}
            <aside className="col-span-3 border-l bg-white shadow-sm p-4">
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Featured People</h2>
                    <ul className="space-y-3">
                        {users.slice(0, 5).map((user) => (
                            <Link key={user._id} to={`/profile/${user._id}`}>
                                <li className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition">
                                    <div className="h-10 w-10 flex-shrink-0">
                                        <img
                                            className="h-full w-full object-cover rounded-full border border-gray-300 shadow-sm"
                                            src={user.profile?.profilePicture || "/default-avatar.png"}
                                            alt={user.name}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                                        {user.profile?.bio && (
                                            <p className="text-xs text-gray-500 line-clamp-1">{user.profile.bio}</p>
                                        )}
                                    </div>
                                </li>
                            </Link>
                        ))}

                    </ul>
                </div>
            </aside>

        </div>
    );
}

export default AuthHome;
