import { Button } from "@mui/material";
import { Github, Linkedin, Globe } from "lucide-react";
import { useParams } from "react-router-dom";
import { useProfile } from "../../util/AuthUser";

function ProfilePage() {
    const { id } = useParams();
    const { data: profile, isLoading, isError } = useProfile(id!);

    if (isLoading) return <p>Loading profile...</p>;
    if (isError || !profile) return <p>Profile not found</p>;

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

            <div className="px-6 pb-6 relative">
                <div className="-mt-14">
                    <img
                        src={profile.profilePicture || "/default-avatar.png"}
                        alt={profile.user.name}
                        className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                    />
                </div>

                <div className="mt-3">
                    <h1 className="text-2xl font-bold">{profile.user.name}</h1>
                    {profile.bio && <p className="mt-1 text-gray-700">{profile.bio}</p>}
                </div>

                <div className="flex gap-3 mt-4 flex-wrap">
                    {profile.github && (
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Github size={18} />}
                            href={profile.github}
                            target="_blank"
                        >
                            GitHub
                        </Button>
                    )}
                    {profile.linkedin && (
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Linkedin size={18} />}
                            href={profile.linkedin}
                            target="_blank"
                        >
                            LinkedIn
                        </Button>
                    )}
                    {profile.portfolioUrl && (
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Globe size={18} />}
                            href={profile.portfolioUrl}
                            target="_blank"
                        >
                            Portfolio
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
