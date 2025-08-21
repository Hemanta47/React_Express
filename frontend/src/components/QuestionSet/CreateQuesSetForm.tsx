import {
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Card,
    CardContent,
    CardHeader,
    Divider,
} from "@mui/material";
import axios from "axios";
import { DeleteIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import {
    FormProvider,
    useFieldArray,
    useForm,
    useFormContext,
} from "react-hook-form";

interface QuestionSetForm {
    optionId: string;
    title: string;
    questions: {
        questionText: string;
        choices: { text: string; label: string; correctAnswer: boolean }[];
    }[];
}

interface Option {
    _id: string;
    name: string;
    description: string
}

function CreateQuesSetForm() {
    const defaultValues: QuestionSetForm = { optionId: "", title: "", questions: [] };
    const [options, setOptions] = useState<Option[]>([])
    const methods = useForm({ defaultValues });
    const { handleSubmit, watch } = methods;
    console.log(watch());
    const accessToken = localStorage.getItem("token");


    useEffect(() => {
        async function fetch() {
            const response = await axios.get("http://localhost:3000/api/options/", {
                headers: { Authorization: `Bearer ${accessToken}` }
            })

            setOptions(response.data.data)
        }

        fetch()
    }, [])

    const onSubmit = (data: QuestionSetForm) => {
        axios
            .post("http://localhost:3000/api/admin/questionset/create", data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <Card sx={{
            overflow: "scroll"
        }} className="shadow-md rounded-xl border border-gray-200 ">
            <CardHeader
                title="Create Question Set"
                titleTypographyProps={{ className: "text-xl font-semibold" }}
                className="border-b border-gray-100"
            />
            <CardContent>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        {/* Option Select */}
                        <FormControl fullWidth>
                            <InputLabel id="option-label">Option</InputLabel>
                            <Select
                                fullWidth
                                labelId="option-label"
                                label="Option"
                                {...methods.register("optionId")}
                                defaultValue=""
                            >
                                {options.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Title */}
                        <TextField
                            {...methods.register("title")}
                            fullWidth
                            variant="outlined"
                            label="Title"
                            placeholder="e.g., Basic JavaScript"
                            size="small"
                        />

                        {/* Questions */}
                        <CreateQuestion />

                        <Divider />

                        <div className="flex justify-end">
                            <Button type="submit" variant="contained" color="primary">
                                Create Question Set
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}

function CreateQuestion() {
    const { control, register } = useFormContext<QuestionSetForm>();
    const { fields, append, remove } = useFieldArray({ control, name: "questions" });

    return (
        <div className="space-y-4">
            <h2 className="text-base font-medium">Questions</h2>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="p-4 border border-gray-200 rounded-lg relative"
                >
                    <div className="flex items-center gap-3">
                        <TextField
                            {...register(`questions.${index}.questionText`)}
                            fullWidth
                            placeholder="Enter Question"
                            size="small"
                        />
                        <Button
                            type="button"
                            variant="text"
                            color="error"
                            onClick={() => remove(index)}
                        >
                            <Trash size={18} />
                        </Button>
                    </div>
                    <CreateChoices questionIndex={index} />
                </div>
            ))}
            <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => append({ questionText: "", choices: [] })}
            >
                Add Question
            </Button>
        </div>
    );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
    const { control, register } = useFormContext<QuestionSetForm>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `questions.${questionIndex}.choices`,
    });

    return (
        <div className="space-y-2 mt-3 pl-2 border-l-2 border-gray-200">
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                    <TextField
                        {...register(`questions.${questionIndex}.choices.${index}.text`)}
                        placeholder="Enter Choice"
                        fullWidth
                        size="small"
                    />
                    <label className="flex items-center gap-1 text-sm">
                        <input
                            type="checkbox"
                            {...register(
                                `questions.${questionIndex}.choices.${index}.correctAnswer`
                            )}
                        />
                        Correct
                    </label>
                    <Button
                        type="button"
                        variant="text"
                        color="error"
                        onClick={() => remove(index)}
                    >
                        <DeleteIcon size={16} />
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                variant="outlined"
                size="small"
                color="primary"
                onClick={() =>
                    append({
                        text: "",
                        label: fields.length.toString(),
                        correctAnswer: false,
                    })
                }
            >
                Add Choice
            </Button>
        </div>
    );
}

export default CreateQuesSetForm;
