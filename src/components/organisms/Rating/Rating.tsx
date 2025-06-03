import "./styles.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import type { OptionType, QuestionType } from "../../../types/survey";
import { useEffect, useMemo } from "react";

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

const Rating = ({ question, handleUpdateQuestion }: Props) => {
    const count = useMemo(
        () => Number(question?.configJsonString?.ratingLength) || 5,
        [question?.configJsonString?.ratingLength]
    );

    useEffect(() => {
        if (!question?.configJsonString?.ratingLength) {
            handleUpdateQuestion("configJsonString", {
                ratingIcon: question?.configJsonString?.ratingIcon ?? "star",
                ratingLength: 5,
            });
        }
    }, [handleUpdateQuestion, question]);

    return (
        <Box className="rating flex flex-col items-center justify-center p-4 bg-gray-100">
            <Box className="flex space-x-4">
                {Array.from({ length: count }).map((_, index) => (
                    <Box key={index} className="flex flex-col items-center">
                        <StarBorderIcon
                            fontSize="large"
                            className="cursor-pointer text-gray-700"
                        />
                        <Typography
                            variant="body2"
                            className="text-gray-700 mt-1"
                        >
                            {index + 1}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Rating;
