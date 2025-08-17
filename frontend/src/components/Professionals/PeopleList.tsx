import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

function PeopleList({
    id,
    name,
    profilePicture,
    bio,
}: {
    id: string;
    name: string;
    profilePicture: string;
    bio?: string;
}) {
    return (
        <Link
            to={`/profile/${id}`}
            className="flex flex-col md:flex-row items-center md:items-start bg-white border rounded-lg shadow-sm hover:shadow-md transition p-4 gap-4"
        >
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                <img
                    src={profilePicture || "/default-avatar.png"}
                    alt={`${name} avatar`}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                {bio && (
                    <p className="text-sm text-gray-600 mt-1 break-all line-clamp-2">
                        {bio}
                    </p>
                )}
            </div>

            {/* Follow Button */}
            <div className="mt-2 md:mt-0">
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<Plus />}
                    onClick={(e) => {
                        e.preventDefault(); // prevent Link navigation
                        alert(`Followed ${name}`);
                    }}
                >
                    Follow
                </Button>
            </div>
        </Link>
    );
}

export default PeopleList;
