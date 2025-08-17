import { Button, TextField } from "@mui/material";
import axios from "axios";
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";

interface QuestionSetForm {
    title: string;
    questions: {
        questionText: string;
        choices: { text: string; label: string; correctAnswer: boolean }[];
    }[];
}

function CreateQuesSetForm() {
    const defaultValues: QuestionSetForm = { title: "", questions: [] };
    const methods = useForm({ defaultValues });
    const { handleSubmit, watch } = methods;
    console.log(watch());
    const accessToken = localStorage.getItem("token");

    const onSubmit = (data: QuestionSetForm) => {
        axios
            .post("http://localhost:3000/api/admin/questionset/create", data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md shadow-black/60 max-h-[80vh] overflow-y-auto">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <TextField
                        {...methods.register("title")}
                        fullWidth
                        variant="outlined"
                        label="Title"
                        placeholder="e.g., Basic JavaScript"
                    />
                    <CreateQuestion />
                    <Button type="submit" variant="contained" color="primary">
                        Create Question Set
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
}

function CreateQuestion() {
    const { control, register } = useFormContext<QuestionSetForm>();
    const { fields, append, remove } = useFieldArray({ control, name: "questions" });

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold my-3">Questions</h2>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="p-4 border rounded-lg bg-white shadow-sm space-y-3"
                >
                    <div className="flex items-center justify-between gap-4">
                        <TextField
                            {...register(`questions.${index}.questionText`)}
                            fullWidth
                            placeholder="Enter Question"
                        />
                        <Button
                            type="button"
                            variant="outlined"
                            color="error"
                            onClick={() => remove(index)}
                        >
                            Remove
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
        <div className="space-y-2 mt-2">
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded border"
                >
                    <TextField
                        {...register(`questions.${questionIndex}.choices.${index}.text`)}
                        placeholder="Enter Choice"
                        fullWidth
                    />
                    <label className="flex items-center gap-1">
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
                        variant="outlined"
                        color="error"
                        onClick={() => remove(index)}
                    >
                        Remove
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={() =>
                    append({ text: "", label: fields.length.toString(), correctAnswer: false })
                }
            >
                Add Choice
            </Button>
        </div>
    );
}

export default CreateQuesSetForm;
