import type { IAttempQuestionForm } from "../../Pages/Admin/QuestionSet/AttemptQuizPage";
import {
    FormProvider,
    useFieldArray,
    useForm,
    useFormContext,
} from "react-hook-form";
import axios from "axios";

export interface IAttemptQuizFinalData {
    questionSet: string;
    responses: {
        questionId: string;
        selectedChoicesIds: string[];
    }[];
}

function AttemptQuizForm({
    questionSet,
}: {
    questionSet: IAttempQuestionForm;
}) {
    const defaultValues: IAttempQuestionForm = {
        ...questionSet,
    };
    const methods = useForm({ defaultValues });
    const { register, handleSubmit } = methods;

    const onSubmitHandler = (data: IAttempQuestionForm) => {
        const accessToken = localStorage.getItem("token");

        const finalData: IAttemptQuizFinalData = {
            questionSet: data?._id,
            responses: data?.questions?.map((question) => {
                return {
                    questionId: question?._id,
                    selectedChoicesIds: question?.choices
                        ?.filter((choice) => choice?.selected)
                        ?.map((ch) => ch?._id),
                };
            }),
        };

        axios
            .post("http://localhost:3000/api/questions/answer/attempt", finalData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                console.log(res);
                alert("Answer Set Updated Successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                            Quiz Title
                        </label>
                        <input
                            {...register("title")}
                            disabled
                            className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-600"
                        />
                    </div>

                    <CreateQuestions />

                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                    >
                        Submit Answers
                    </button>
                </form>
            </FormProvider>
        </div>
    );
}

function CreateQuestions() {
    const { control } = useFormContext<IAttempQuestionForm>();
    const { fields } = useFieldArray({
        control,
        name: "questions",
    });

    return (
        <div className="space-y-6">
            {fields?.map((field, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-800 mb-2">
                        {index + 1}. {field?.questionText}
                    </p>
                    <CreateChoices questionIndex={index} />
                </div>
            ))}
        </div>
    );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
    const { register, control } = useFormContext<IAttempQuestionForm>();
    const { fields } = useFieldArray({
        control,
        name: `questions.${questionIndex}.choices`,
    });

    return (
        <div className="space-y-2">
            {fields?.map((field, index) => (
                <label
                    key={index}
                    className="flex items-center gap-3 cursor-pointer"
                >
                    <input
                        type="checkbox"
                        {...register(
                            `questions.${questionIndex}.choices.${index}.selected`
                        )}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">{field?.text}</span>
                </label>
            ))}
        </div>
    );
}

export default AttemptQuizForm