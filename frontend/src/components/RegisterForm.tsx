import { zodResolver } from "@hookform/resolvers/zod";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

// Schema with confirm password
const userSchema = z
    .object({
        name: z.string().min(1, { message: "Name required" }),
        email: z.string().email(),
        password: z.string().min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string().min(1, { message: "Confirm password required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

type RegisterType = z.infer<typeof userSchema>;

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterType>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: RegisterType) => {
        const { confirmPassword, ...userData } = data;
        axios
            .post("http://localhost:3000/users/create", userData)
            .then((res) => {
                console.log(res.data);
                alert("User Created");
                window.location.href = ("/login")
            })
            .catch((err) => {
                const errors = err.response?.data?.message || "An error occurred";
                console.error(errors);
                alert(errors);
            });
    };

    return (
        <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-slate-900 via-sky-900 to-blue-500">
            <div className="flex flex-col backdrop-blur-lg bg-black/40 border border-white/20 shadow-2xl rounded-2xl p-8 w-[90%] max-w-md text-white">
                <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
                    Create Account
                </h1>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <TextField
                        label="Name"
                        {...register("name")}
                        placeholder="John Doe"
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
                            input: { color: "#fff" },
                        }}
                    />

                    {/* Email */}
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
                            input: { color: "#fff" },
                        }}
                    />

                    {/* Password */}
                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="••••••••"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                        InputLabelProps={{ style: { color: "#60a5fa" } }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <Eye className="text-white" /> : <EyeClosed className="text-white" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& label.Mui-focused": { color: "#3b82f6" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#60a5fa" },
                                "&:hover fieldset": { borderColor: "#3b82f6" },
                                "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                                color: "#fff",
                            },
                            input: { color: "#fff" },
                        }}
                    />

                    {/* Confirm Password */}
                    <TextField
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        placeholder="••••••••"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
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
                            input: { color: "#fff" },
                        }}
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "#3b82f6",
                            "&:hover": { backgroundColor: "#2563eb" },
                            fontWeight: "bold",
                        }}
                    >
                        Register
                    </Button>
                </form>

                {/* Already have an account */}
                <p className="text-sm text-gray-300 mt-4 text-center">
                    Already have an account?{" "}
                    <NavLink to="/login" className="text-blue-400 hover:underline">
                        Login
                    </NavLink>
                </p>
            </div>
        </div>
    );
}
