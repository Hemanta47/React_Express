// src/hooks/useUsersList.ts
import { useEffect, useState } from "react";
import axios from "axios";
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

export function useUsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    axios
      .get("http://localhost:3000/users/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const filterData = res.data.data.filter(
          (user: User) => user._id !== loggedInUserId && user.role !== "admin"
        );
        setUsers(filterData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading };
}
