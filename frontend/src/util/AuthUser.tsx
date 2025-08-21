import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProfile = async (id: string) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`http://localhost:3000/professor/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
};

export const useProfile = (id: string) => {
    return useQuery({
        queryKey: ["profile", id],
        queryFn: () => fetchProfile(id),
        staleTime: 1000 * 60 * 5,
    });
};
