import axios from "axios"
import { useEffect } from "react"

function AuthHome() {

    useEffect(() => {
        const token = localStorage.getItem("token");

        async function fetchData() {
            const res = await axios.get("http://localhost:3000/professor/profile/", {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(res);
        }

        fetchData()
    }, [])
    return (
        <div>AuthHome</div>
    )
}

export default AuthHome