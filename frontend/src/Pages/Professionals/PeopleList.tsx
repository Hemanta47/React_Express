import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useUsersList } from "../../util/UserList";

function PeopleList() {
    const { users, loading } = useUsersList();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <p className="text-gray-600">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="h-full w-full p-2">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <Link
                        key={user._id}
                        to={`/profile/${user._id}`}
                        className="flex flex-col md:flex-row items-center md:items-start bg-white border rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.001] transition-all p-5 gap-4"
                    >
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200 shadow-sm">
                            <img
                                src={user.profile?.profilePicture || "/default-avatar.png"}
                                alt={`${user.name} avatar`}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                            {user.profile?.bio && (
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {user.profile.bio}
                                </p>
                            )}
                        </div>

                        {/* Follow Button */}
                        <div className="mt-3 md:mt-0">
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<Plus />}
                                sx={{
                                    borderRadius: "20px",
                                    textTransform: "none",
                                    fontSize: "0.85rem",
                                    paddingX: "12px",
                                }}
                                onClick={(e) => {
                                    e.preventDefault(); // prevent Link navigation
                                    alert(`Followed ${user.name}`);
                                }}
                            >
                                Follow
                            </Button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PeopleList;
