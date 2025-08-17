import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../App";

export default function ProfessionalProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuth, role } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [profileExists, setProfileExists] = useState(false);

    useEffect(() => {
        const checkProfile = async () => {
            if (!isAuth) {
                setLoading(false);
                return;
            }

            if (role !== "professional") {
                setLoading(false);
                return;
            }

            const token = localStorage.getItem("token");

            try {
                await axios.get("http://localhost:3000/api/profile/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfileExists(true);
            } catch (err: any) {
                if (err.response?.status === 404) {
                    setProfileExists(false);
                } else {
                    console.error("Profile check failed:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        checkProfile();
    }, [isAuth, role]);

    if (loading) return <div>Loading...</div>;

    if (!isAuth) return <Navigate to="/login" replace />;
    if (role !== "professional") return <Navigate to="/" replace />;

    return profileExists ? <>{children}</> : <Navigate to="/profile/create" replace />;
}
