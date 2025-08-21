import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AttemptQuizForm from "../../../components/QuestionSet/AttemptQuizForm";

export interface IAttempQuestionForm {
    _id: string;
    title: string;
    questions: IQuestion[];
    createdBy: string;
    __v: number;
}

export interface IQuestion {
    questionText: string;
    choices: IChoice[];
    _id: string;
}

export interface IChoice {
    label: string;
    text: string;
    _id: string;
    selected?: boolean;
}

function AttemptQuizPage() {
    const { id } = useParams();

    const [questionSets, setQuestionSet] = useState<IAttempQuestionForm | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        if (!accessToken || !id) {
            setIsLoading(false);
            return;
        }

        async function fetchData() {
            axios
                .get(`http://localhost:3000/api/questions/set/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    setQuestionSet(response?.data);
                    console.log(response);

                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                });
        }

        fetchData();
    }, [id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {questionSets ? <AttemptQuizForm questionSet={questionSets} /> : null}
        </div>
    );
}

export default AttemptQuizPage;