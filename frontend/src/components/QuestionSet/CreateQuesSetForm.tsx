import { Button, TextField } from "@mui/material";
import axios from "axios";
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form"

interface QuestionSetForm {
    title: string,
    questions: {
        questionText: string,
        choices: { text: string, label: string, correctAnswer: boolean, }[],
    }[];
}

function CreateQuesSetForm() {
    const defaultValues: QuestionSetForm = {
        title: "",
        questions: [],
    };
    const methods = useForm({
        defaultValues
    });

    const { watch, register, handleSubmit } = methods
    console.log('Form value', watch());

    const accessToken = localStorage.getItem("token")

    const onSubmit = ((data: QuestionSetForm) => {
        axios.post("http://localhost:3000/api/admin/questionset/create", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);

            })
    })


    return (
        <div className="h-full w-full p-2">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField {...register('title')} variant="outlined" label="Title" />
                    {/* <TextField variant="outlined" label=""/> */}
                    <CreateQuestion />
                    <Button type="submit">Create</Button>
                </form>
            </FormProvider>
        </div>
    )
}

function CreateQuestion() {

    const { register, control } = useFormContext<QuestionSetForm>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    })

    const AddQuestionController = () => {
        append({
            questionText: '',
            choices: [],
        });
    };



    return (
        <div>
            <h1>Create Question</h1>
            {fields.map((field, index) => {
                const RemoveQuestionController = () => {
                    remove(index)
                }
                return <div key={index}>
                    <div>

                        <TextField {...register(`questions.${index}.questionText`)} placeholder="Enter Question" />
                        <Button type="button" onClick={RemoveQuestionController}>remove</Button>
                    </div>


                    <CreateChoices questionIndex={index} />
                </div>
            })}

            <Button variant="outlined" type="button" onClick={AddQuestionController}>Add Question</Button>
        </div>
    )
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
    const { register, control } = useFormContext<QuestionSetForm>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: `questions.${questionIndex}.choices`
    })

    const AddChoicesHandler = () => {
        append({
            label: fields?.length.toString(),
            text: '',
            correctAnswer: false
        })
    };

    return (
        <div>
            {fields.map((field, index) => {
                const RemoveChoiceController = () => {
                    remove(index)
                }
                return <div key={index}>
                    <div>
                        <TextField {...register(`questions.${questionIndex}.choices.${index}.text`)} placeholder="Enter Choice" />

                        <TextField type="checkbox" {...register(`questions.${questionIndex}.choices.${index}.correctAnswer`)} />
                        <Button type="button" onClick={RemoveChoiceController}>remove</Button>
                    </div>
                </div>
            })}
            <Button type="button" onClick={AddChoicesHandler}>Add Choice</Button>
        </div>
    )
}

export default CreateQuesSetForm