import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from 'zod'


const userSchema = z.object({
    name: z.string().min(1, { message: "Name required" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password need to be 8 character" }),
})

type register = z.infer<typeof userSchema>

// import MyInformation from "./MyInformation"
export default function RegisterForm() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<register>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: register) => {
        console.log(data);
        axios
            .post("http://localhost:3000/users/create", data)
            .then(res => {
                console.log(res.data);
                alert("User Created")
            })
            .catch(err => {
                const errors = err.response?.data?.message || "An error occured"
                console.error(errors);
                alert(errors)
            });
    }
    return (
        <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-gray-500 via-sky-900 to-blue-700">
            <div className="flex flex-col backdrop-blur-md bg-black/30 border border-white/20 shadow-xl rounded-2xl p-8 w-[90%] max-w-md text-white">
                <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">Register Form</h1>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Name"
                        {...register("name")}
                        placeholder="John"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        fullWidth
                        InputLabelProps={{ style: { color: "#60a5fa" } }}
                        sx={{
                            "& label.Mui-focused": { color: "#3b82f6" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#60a5fa" },
                                "&:hover fieldset": { borderColor: "#3b82f6" },
                                "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                                color: "#fff",
                            },
                            "& .MuiFormHelperText-root": {
                                fontSize: ".9rem",
                                fontWeight: "bold",
                            },
                            input: { color: "#fff" },
                        }}
                    />
                    <TextField
                        label="Email"
                        {...register("email")}
                        placeholder="john@gmail.com"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                        InputLabelProps={{ style: { color: "#60a5fa" } }}
                        sx={{
                            "& label.Mui-focused": { color: "#3b82f6" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#60a5fa" },
                                "&:hover fieldset": { borderColor: "#3b82f6" },
                                "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                                color: "#fff",
                            },
                            "& .MuiFormHelperText-root": {
                                fontSize: ".9rem",
                                fontWeight: "bold",
                            },
                            input: { color: "#fff" },
                        }}
                    />
                    <TextField
                        label="Password"
                        {...register("password")}
                        placeholder="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                        InputLabelProps={{ style: { color: "#60a5fa" } }}
                        sx={{
                            "& label.Mui-focused": { color: "#3b82f6" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#60a5fa" },
                                "&:hover fieldset": { borderColor: "#3b82f6" },
                                "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                                color: "#fff",
                            },
                            "& .MuiFormHelperText-root": {
                                fontSize: ".9rem",
                                fontWeight: "bold",
                            },
                            input: { color: "#fff" },
                        }}
                    />

                    <Button type="submit" variant="contained">Register</Button>
                </form>
            </div>
        </div>
    );
}

