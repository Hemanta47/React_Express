import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="w-full">
            <ul className="flex w-full h-20 gap-2.5 items-center justify-center">
                <NavLink style={{ color: "#fff", textDecoration: "none", border: "2px solid grey", padding: "0.2rem .5rem " }} to={"/"}>Home</NavLink>
                <NavLink style={{ color: "#fff", textDecoration: "none", border: "2px solid grey", padding: "0.2rem .5rem " }} to={"/about"}>About</NavLink>
                <NavLink style={{ color: "#fff", textDecoration: "none", border: "2px solid grey", padding: "0.2rem .5rem " }} to={"/login"}>Login</NavLink>
                <NavLink style={{ color: "#fff", textDecoration: "none", border: "2px solid grey", padding: "0.2rem .5rem " }} to={"/register"}>Register</NavLink>
            </ul>
        </header>
    )
}