import { useMemo } from "react";
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

    const handleUpdateTypeQuestion = (id: number) => {
        handleUpdateQuestion("configJsonString", {
            ...question.configJsonString,
            fieldInputTypeId: id,
        });
    };
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
        </Box>
    );
};

export default SingleInput;
