import AuthHome from "../components/HomePage/AuthHome";
import UnauthHome from "../components/HomePage/UnauthHome";

export default function Home() {

    const accessToken = localStorage.getItem("token")

    if (accessToken) {

        return (
            <>
                <AuthHome token={accessToken} />
            </>
        )
    }
    else {

        return <UnauthHome />
    }
}