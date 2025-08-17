import { Button } from "@mui/material";

export default function UnauthHome() {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-6 text-center p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white">
            {/* Title */}
            <h1 className="text-5xl font-extrabold tracking-tight">
                Welcome to <span className="text-blue-400">Connecto</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg max-w-xl text-gray-200">
                Connecto helps you build meaningful connections and stay engaged with the people that matter.
                Whether for work, study, or community — everything starts with a connection.
            </p>

            {/* Actions */}
            <div className="flex gap-4 mt-4">
                <Button
                    variant="contained"
                    href={'/login'}
                    sx={{
                        backgroundColor: "#3b82f6",
                        fontWeight: "bold",
                        px: 3, py: 1.2,
                        "&:hover": { backgroundColor: "#2563eb" },
                    }}
                >
                    Get Started
                </Button>
                <Button
                    variant="outlined"
                    href={'/about'}
                    sx={{
                        borderColor: "#60a5fa",
                        color: "#60a5fa",
                        fontWeight: "bold",
                        px: 3, py: 1.2,
                        "&:hover": { borderColor: "#3b82f6", color: "#3b82f6" },
                    }}
                >
                    Learn More
                </Button>
            </div>
        </div>
    );
}
