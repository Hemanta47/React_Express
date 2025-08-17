// src/pages/professional/CreateProfile.tsx
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    TextField,
    Typography,
    Select,
    MenuItem,
    IconButton,
    Avatar,
    Card,
    CardContent,
    Divider,
} from "@mui/material";
import { Delete, Upload } from "lucide-react";

// ✅ Zod Schema
const skillSchema = z.object({
    name: z.string().min(1, "Skill name is required"),
    level: z.enum(["Beginner", "Intermediate", "Advanced"]),
});

const profileSchema = z.object({
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    profilePicture: z.string().url("Invalid image URL").optional().or(z.literal("")),
    skills: z.array(skillSchema).min(1, "At least one skill is required"),
    github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
    linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
    portfolioUrl: z.string().url("Invalid Portfolio URL").optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

function CreateProfileForm() {
    const navigate = useNavigate();

    const {
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            bio: "",
            profilePicture: "",
            skills: [{ name: "", level: "Beginner" }],
            github: "",
            linkedin: "",
            portfolioUrl: "",
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "skills" });
    const profilePicture = watch("profilePicture");

    // Upload Image to Cloudinary
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ProfileImage");

        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dafbhcbnr/image/upload",
                formData
            );
            setValue("profilePicture", res.data.secure_url);
        } catch (err) {
            console.error("Cloudinary upload failed:", err);
            alert("Image upload failed, try again.");
        }
    };

    const onSubmit = async (data: ProfileFormData) => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post("http://localhost:3000/professor/profile/create", data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 201) {
                navigate("/professional/home")
            }
        } catch (error) {
            console.error("Error creating profile:", error);
            alert("Failed to create profile. Please try again.");
        }
    };

    return (
        <Box className="flex justify-center items-center py-10 bg-gray-50 min-h-screen">
            <Card className="w-full max-w-3xl shadow-lg rounded-2xl">
                <CardContent className="p-6">
                    <Typography variant="h5" fontWeight="bold" mb={2}>
                        Create Your Profile
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Complete your professional profile so others can discover your skills and work.
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Bio */}
                        <Box>
                            <Typography fontWeight="500" mb={1}>
                                About You
                            </Typography>
                            <TextField
                                label="Bio"
                                {...register("bio")}
                                multiline
                                rows={3}
                                fullWidth
                                error={!!errors.bio}
                                helperText={errors.bio?.message}
                            />
                        </Box>

                        <Divider />

                        {/* Profile Picture */}
                        <Box>
                            <Typography fontWeight="500" mb={1}>
                                Profile Picture
                            </Typography>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<Upload />}
                            >
                                Upload Image
                                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                            </Button>
                            {profilePicture && (
                                <Box mt={2} display="flex" alignItems="center" gap={2}>
                                    <Avatar src={profilePicture} sx={{ width: 70, height: 70 }} />
                                    <Typography variant="body2" color="textSecondary">
                                        Profile picture uploaded
                                    </Typography>
                                </Box>
                            )}
                            {errors.profilePicture && (
                                <Typography color="error">{errors.profilePicture.message}</Typography>
                            )}
                        </Box>

                        <Divider />

                        {/* Skills */}
                        <Box>
                            <Typography fontWeight="500" mb={1}>
                                Skills
                            </Typography>
                            {fields.map((field, index) => (
                                <Box
                                    key={field.id}
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                    mb={2}
                                >
                                    <TextField
                                        placeholder="Skill Name"
                                        {...register(`skills.${index}.name`)}
                                        error={!!errors.skills?.[index]?.name}
                                        helperText={errors.skills?.[index]?.name?.message}
                                    />
                                    <Controller
                                        name={`skills.${index}.level`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field}>
                                                <MenuItem value="Beginner">Beginner</MenuItem>
                                                <MenuItem value="Intermediate">Intermediate</MenuItem>
                                                <MenuItem value="Advanced">Advanced</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {index > 0 && (
                                        <IconButton onClick={() => remove(index)} color="error">
                                            <Delete />
                                        </IconButton>
                                    )}
                                </Box>
                            ))}
                            <Button
                                variant="outlined"
                                onClick={() => append({ name: "", level: "Beginner" })}
                            >
                                + Add Skill
                            </Button>
                            {errors.skills && (
                                <Typography color="error">{errors.skills.message as string}</Typography>
                            )}
                        </Box>

                        <Divider />

                        {/* Links */}
                        <Box>
                            <Typography fontWeight="500" mb={1}>
                                Social & Portfolio Links
                            </Typography>
                            <TextField
                                label="GitHub URL"
                                {...register("github")}
                                fullWidth
                                margin="normal"
                                error={!!errors.github}
                                helperText={errors.github?.message}
                            />
                            <TextField
                                label="LinkedIn URL"
                                {...register("linkedin")}
                                fullWidth
                                margin="normal"
                                error={!!errors.linkedin}
                                helperText={errors.linkedin?.message}
                            />
                            <TextField
                                label="Portfolio URL"
                                {...register("portfolioUrl")}
                                fullWidth
                                margin="normal"
                                error={!!errors.portfolioUrl}
                                helperText={errors.portfolioUrl?.message}
                            />
                        </Box>

                        <Divider />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                            sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
                        >
                            {isSubmitting ? "Saving..." : "Create Profile"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default CreateProfileForm;
