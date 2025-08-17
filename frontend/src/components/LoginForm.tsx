import axios from "axios";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import { Eye, EyeClosed } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type Credentials = z.infer<typeof LoginSchema>;

export default function LoginForm() {

    const { setAuthState } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Credentials>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: Credentials) => {
        try {
            const response = await axios.post("http://localhost:3000/users/login", data);
            const accessToken = response.data.accessToken;
            localStorage.setItem("token", accessToken);

            // decode role from JWT
            const decoded: { role: "admin" | "professional"; id: string } = jwtDecode(accessToken);

            // update auth state
            setAuthState({ isAuth: true, role: decoded.role });

            // redirect based on role
            if (decoded.role === "admin") {
                navigate("/admin/", { replace: true });
            } else if (decoded.role === "professional") {
                navigate("/professional/home", { replace: true });
            }
        } catch (err: any) {
            console.error("Login failed:", err);
            alert(err.response?.data?.message || "Login failed");
        }
    };


    return (
        <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-slate-900 via-sky-900 to-blue-500">
            <div className="backdrop-blur-md bg-black/30 border border-white/20 shadow-xl rounded-2xl p-8 w-[90%] max-w-md text-white">
                <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    {/* Email */}
                    <TextField
                        label="Email"
                        id="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        placeholder="example@gmail.com"
                        fullWidth
                        variant="outlined"
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

                    {/* Password */}
                    <TextField
                        label="Password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        placeholder="password"
                        fullWidth
                        variant="outlined"
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
                            "& .MuiFormHelperText-root": {
                                fontSize: ".9rem",
                                fontWeight: "bold",
                                color: "#b46969"
                            },
                            input: { color: "#fff" },
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: "#3b82f6",
                            "&:hover": {
                                backgroundColor: "#2563eb",
                            },
                            fontWeight: "bold",
                            color: "#fff",
                        }}
                    >
                        Login
                    </Button>
                </form>

                <p className="text-center mt-6 text-gray-300 text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-400 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
