import "./styles.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import CircleIcon from "@mui/icons-material/Circle";
import CheckIcon from "@mui/icons-material/Check";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import type { OptionType, QuestionType } from "../../../types/survey";
import { useCallback, useEffect, useMemo } from "react";

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

    const handleRenderIcons = useCallback(() => {
        const type = question?.configJsonString?.ratingIcon || "";
        switch (type) {
            case "FavoriteIcon":
                return (
                    <FavoriteIcon
                        fontSize="large"
                        className="cursor-pointer text-gray-700"
                    />
                );
            case "ThumbUpIcon":
                return (
                    <ThumbUpIcon
                        fontSize="large"
                        className="cursor-pointer text-gray-700"
                    />
                );
            case "FreeBreakfastIcon":
                return (
                    <FreeBreakfastIcon
                        fontSize="large"
                        className="cursor-pointer text-gray-700"
                    />
                );
            case "CircleIcon":
                return (
                    <CircleIcon
                        fontSize="large"
                        className="cursor-pointer text-gray-700"
                    />
                );
            case "CheckIcon":
                return (
                    <CheckIcon
                        fontSize="large"
                        className="cursor-pointer text-gray-700"
                    />
                );
            case "RocketLaunchIcon":
                return (
                    <RocketLaunchIcon
                        fontSize="large"
                        className="cursor-pointer text-gray-700"
                    />
                );
            case "RadioButtonCheckedIcon":
                return (
                    <RadioButtonCheckedIcon
                        fontSize="large"
                        className="cursor-pointer text-gray-700"
                    />
                );
            default:
                return (
                    <StarBorderIcon
                        fontSize="large"
                        className="cursor-pointer text-gray-700"
                    />
                );
        }
    }, [question]);

    useEffect(() => {
        if (!question?.configJsonString?.ratingLength) {
            handleUpdateQuestion("configJsonString", {
                ratingIcon:
                    question?.configJsonString?.ratingIcon ?? "StarBorderIcon",
                ratingLength: 5,
            });
        }
    }, [handleUpdateQuestion, question]);

    return (
        <Box className="rating flex flex-col items-center justify-center p-4 bg-gray-100">
            <Box className="flex space-x-4">
                {Array.from({ length: count }).map((_, index) => (
                    <Box key={index} className="flex flex-col items-center">
                        {handleRenderIcons()}
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
