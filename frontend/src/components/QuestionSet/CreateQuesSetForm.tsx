import { Button, TextField } from "@mui/material";
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form"

interface QuestionSetForm {
    title: string,
    questions: {
        questionText: string,
        choices: { text: string, label: string }[],
        correctAnswer: string,
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

    const { watch, register } = methods
    console.log('Form value', watch());


    return (
        <div className="h-full w-full p-2">
            <FormProvider {...methods}>
                <form>
                    <TextField {...register('title')} variant="outlined" label="Title" />
                    {/* <TextField variant="outlined" label=""/> */}
                    <CreateQuestion />
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
            correctAnswer: ''
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
            label: '',
            text: ''
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
                        <TextField {...register(`questions.${questionIndex}.choices.${index}`)} placeholder="Enter Choice" />
                        <Button type="button" onClick={RemoveChoiceController}>remove</Button>
                    </div>
                </div>
            })}
            <Button type="button" onClick={AddChoicesHandler}>Add Choice</Button>
        </div>
    )
}

export default CreateQuesSetForm