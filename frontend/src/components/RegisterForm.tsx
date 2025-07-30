import axios from "axios";
import { useState } from "react"

// import MyInformation from "./MyInformation"
export default function RegisterForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !email || !password) {
            alert("All fields are required");
            return;
        }
        const finalData = {
            name,
            email,
            password,
        }
        axios.post("http://localhost:3000/users/create", finalData)
            .then(res => {
                alert("User registered successfully")
                console.log(res.data);
                setName("");
                setEmail("");
                setPassword("");
            })
            .catch(err => {
                const errors = err.response?.data?.message || "An error occured"
                console.error(errors);
                alert(errors);
            });
    };

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };


    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };




    return (
        <>
            <h1 style={{ margin: "1rem 0" }}>Register Form</h1>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: '10px',
                    maxWidth: '300px',
                    margin: 'auto'
                }}
                onSubmit={handleSubmit}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="Name">
                        Name:
                    </label>
                    <input className="border border-white" type="text" name="Name" onChange={handleName} value={name} id="Name" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="Email">
                        Email:
                    </label>
                    <input className="border border-white" type="email" name="Email" onChange={handleEmail} value={email} id="Email" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="Password">
                        Password:
                    </label>
                    <input className="border border-white" type="password" name="Password" onChange={handlePassword} value={password} id="Password" />
                </div>
                <button type="submit" style={{ padding: ".5rem", background: "blue", color: "white", fontSize: "1.3rem" }}>Register</button>
            </form>
        </>
    );
}

