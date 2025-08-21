import { Button, TextField, Card, CardContent, CardHeader } from "@mui/material"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import axios from "axios"

const OptionSchema = z.object({
    name: z.string().min(3, "Name is required"),
    description: z.string().min(5, "Description is required"),
})

type Option = z.infer<typeof OptionSchema>

function CreateOption() {
    const [isOptionOpen, setOption] = useState<boolean>(false)
    const token = localStorage.getItem("token");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Option>({
        resolver: zodResolver(OptionSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    const onSubmit = async (data: Option) => {
        try {
            const response = await axios.post("http://localhost:3000/api/options/create", data, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response);
        } catch (error) {

        }
        finally {
            reset()
            setOption(false)
        }
    }

    return (
        <div>
            {/* Toggle Button */}
            <Button
                variant={isOptionOpen ? "outlined" : "contained"}
                color={isOptionOpen ? "error" : "primary"}
                onClick={() => setOption(!isOptionOpen)}
            >
                {isOptionOpen ? "Close" : "Create Option"}
            </Button>

            {isOptionOpen && (
                <Card className="max-w-2xl" sx={{
                    marginTop: ".5rem",
                    boxShadow: "none",
                    border: "1px solid #9c9c9c"
                }}>
                    <CardHeader
                        title="Create Option"
                        className="border-b border-gray-200"
                        titleTypographyProps={{ className: "text-xl font-semibold" }}
                    />
                    <CardContent>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            {/* Name input */}
                            <TextField
                                fullWidth
                                {...register("name")}
                                error={!!errors?.name?.message}
                                helperText={errors?.name?.message}
                                label="Name"
                                variant="outlined"
                                size="small"
                            />

                            {/* Description textarea */}
                            <TextField
                                fullWidth
                                {...register("description")}
                                error={!!errors?.description?.message}
                                helperText={errors?.description?.message}
                                label="Description"
                                variant="outlined"
                                size="medium"
                                multiline
                                minRows={3}
                            />

                            <div className="flex justify-end pt-2">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Saving..." : "Save Option"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default CreateOption
