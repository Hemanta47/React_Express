import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Github, Linkedin } from "lucide-react";
import { AuthContext } from "../../App";
import { useParams } from "react-router-dom";

interface Skill {
    name: string;
    level: "Beginner" | "Intermediate" | "Advanced";
}

interface ProfileData {
    _id: string;
    user: { _id: string; name: string };
    bio?: string;
    profilePicture?: string;
    skills?: Skill[];
    github?: string;
    linkedin?: string;
    portfolioUrl?: string;
}

function ProfilePage() {
    const { id } = useParams();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token")
        axios
            .get(`http://localhost:3000/professor/profile/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => setProfile(res.data.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-gray-600">Loading profile...</p>
            </div>
        );

    if (!profile)
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-gray-600">Profile not found</p>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img
                    src={profile.profilePicture || "/default-avatar.png"}
                    alt={profile.user.name}
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{profile.user.name}</h1>
                    {profile.bio && <p className="mt-2 text-gray-700">{profile.bio}</p>}

                    {/* Social Links */}
                    <div className="flex gap-3 mt-4">
                        {profile.github && (
                            <Button
                                variant="outlined"
                                startIcon={<Github />}
                                component="a"
                                href={profile.github}
                                target="_blank"
                            >
                                GitHub
                            </Button>
                        )}
                        {profile.linkedin && (
                            <Button
                                variant="outlined"
                                startIcon={<Linkedin />}
                                component="a"
                                href={profile.linkedin}
                                target="_blank"
                            >
                                LinkedIn
                            </Button>
                        )}
                        {profile.portfolioUrl && (
                            <Button
                                variant="outlined"
                                component="a"
                                href={profile.portfolioUrl}
                                target="_blank"
                            >
                                Portfolio
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-3">
                        {profile.skills.map((skill) => (
                            <span
                                key={skill.name}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                            >
                                {skill.name} ({skill.level})
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
