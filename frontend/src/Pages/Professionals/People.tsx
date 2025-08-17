import { useEffect, useState } from "react";
import axios from "axios";
import PeopleList from "../../components/Professionals/PeopleList";
import { jwtDecode } from "jwt-decode";


interface User {
    _id: string;
    name: string;
    role: string;
    profile?: {
        profilePicture?: string;
        bio?: string;
    };
}

function People() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    let loggedInUserId: string | null = null;

    if (token) {
        try {
            const decoded: { id: string } = jwtDecode(token);
            loggedInUserId = decoded.id;
        } catch (err) {
            console.error("Invalid token", err);
        }
    }

    console.log(loggedInUserId);

    useEffect(() => {
        const token = localStorage.getItem("token")
        console.log(token);

        axios
            .get("http://localhost:3000/users/list", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                const filterData = res.data.data.filter(
                    (user: User) => {
                        return user._id !== loggedInUserId && user.role !== "admin"
                    }
                )
                console.log(filterData);
                setUsers(filterData)

            }
            )
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [loggedInUserId]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-gray-600">Loading users...</p>
            </div>
        );

    return (
        <div className="max-w-8/9 mx-auto px-4 py-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
                <PeopleList
                    key={user._id}
                    id={user._id}
                    name={user.name}
                    profilePicture={user.profile?.profilePicture || "/default-avatar.png"}
                    bio={user.profile?.bio}
                />
            ))}
            {users.map((user) => (
                <PeopleList
                    key={user._id}
                    id={user._id}
                    name={user.name}
                    profilePicture={user.profile?.profilePicture || "/default-avatar.png"}
                    bio={user.profile?.bio}
                />
            ))}
            {users.map((user) => (
                <PeopleList
                    key={user._id}
                    id={user._id}
                    name={user.name}
                    profilePicture={user.profile?.profilePicture || "/default-avatar.png"}
                    bio={user.profile?.bio}
                />
            ))}
        </div>
    );
}


export default People;
