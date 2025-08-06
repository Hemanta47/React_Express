import axios from "axios"
import { useEffect, useState } from "react"
import MyInformation from "../MyInformation"


export interface InAuthUser {
    _id: string
    name: string
    email: string
    password: string
    role: string
    __v: number
}

export default function AuthHome() {

    const [userData, setUserData] = useState<InAuthUser[]>([])

    const accessToken = localStorage.getItem("token")

    async function fetchData() {
        await axios.get("http://localhost:3000/api/verify/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                console.log(response.data.data)
                setUserData(response.data.data)
            })
            .catch(error => alert(error))
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            {
                userData?.map((user, index) => {
                    return (
                        <MyInformation
                            key={index}
                            id={user?._id}
                            name={user?.name}
                            email={user?.email} />
                    )
                })
            }
        </div>
    )
}
