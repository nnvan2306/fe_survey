import { useCallback, useMemo } from "react";
import "./styles.scss";
import {
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from "@mui/material";
import type { OptionType, QuestionType } from "../../../types/survey";
import { useGetQuestionType } from "../../../services/question/get-question-type";
import { SurveyFieldInputType } from "../../../constants/question";
import Email from "../../molecules/email/Email";
import TextArea from "../../molecules/text-area/TextArea";
import ShortSentences from "../../molecules/short-sentences/ShortSentences";
import Date from "../../molecules/date/Date";
import DateMonth from "../../molecules/date-month/DateMonth";
import Year from "../../molecules/year/Year";
import Time from "../../molecules/time/Time";
import FullTime from "../../molecules/full-time/FullTime";
import NumberInput from "../../molecules/number/NumberInput";

type Props = {
    question: QuestionType;
    handleUpdateQuestion: (
        key: keyof QuestionType,
        value:
            | string
            | number
            | boolean
            | OptionType[]
            | Record<string, string | number>
    ) => void;
};

const SingleInput = ({ question, handleUpdateQuestion }: Props) => {
    const { data } = useGetQuestionType({});
    const questionTypes = useMemo(
        () => data?.data || SurveyFieldInputType,
        [data]
    );

    const handleUpdateTypeQuestion = useCallback(
        (id: number) => {
            handleUpdateQuestion("configJsonString", {
                ...question.configJsonString,
                fieldInputTypeId: id,
            });
            if (question?.options?.length) {
                handleUpdateQuestion("options", []);
            }
        },
        [
            handleUpdateQuestion,
            question.configJsonString,
            question?.options?.length,
        ]
    );

    const viewRender = useMemo(() => {
        const fieldInputTypeIdValue =
            question?.configJsonString?.fieldInputTypeId;
        const typeId = Number(fieldInputTypeIdValue) || 1;
        if (typeId === 1) {
            return (
                <ShortSentences
                    question={question}
                    handleUpdateQuestion={handleUpdateQuestion}
                />
            );
        }
        switch (typeId) {
            case 1:
                return (
                    <ShortSentences
                        question={question}
                        handleUpdateQuestion={handleUpdateQuestion}
                    />
                );
            case 2:
                return <TextArea />;
            case 3:
                return <Email />;
            case 4:
                return <NumberInput />;
            case 5:
                return <Date />;
            case 6:
                return <DateMonth />;
            case 7:
                return <Year />;
            case 8:
                return <Time />;
            case 9:
                return <FullTime />;
            default:
                return (
                    <ShortSentences
                        question={question}
                        handleUpdateQuestion={handleUpdateQuestion}
                    />
                );
        }
    }, [
        question?.configJsonString?.fieldInputTypeId,
        handleUpdateQuestion,
        question,
    ]);
    console.log(question);
    return (
        <Box className="single-input flex flex-col gap-4 p-4 bg-gray-100 rounded-lg">
            <Typography variant="body1" className="text-gray-700">
                Chọn kiểu câu trả lời
            </Typography>

            <FormControl fullWidth size="small">
                <InputLabel>Kiểu câu trả lời</InputLabel>
                <Select
                    value={
                        question?.configJsonString?.fieldInputTypeId ||
                        questionTypes[0].id ||
                        0
                    }
                    label="Kiểu câu trả lời"
                    onChange={(e) => handleUpdateTypeQuestion(e.target.value)}
                >
                    {questionTypes.map((item: { id: number; name: string }) => {
                        return (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            {viewRender}
        </Box>
    );
};

export default SingleInput;
