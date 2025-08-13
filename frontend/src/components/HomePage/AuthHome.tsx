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

export default function AuthHome({ token }: { token: string }) {

    const [userData, setUserData] = useState<InAuthUser[]>([])

    async function fetchData() {
        await axios.get("http://localhost:3000/users/list", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setUserData(response.data.data)
            })
            .catch(error => alert(error))
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="p-2 w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 items-start">
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
