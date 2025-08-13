import { Button } from "@mui/material";

export default function UnauthHome() {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-6">
            <h1 className="text-4xl font-bold">Welcome to home</h1>
            <Button variant="contained" href={'/login'}>Get Started</Button>
        </div>
    )
}
