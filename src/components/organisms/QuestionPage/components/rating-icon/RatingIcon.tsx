import type { OptionType, QuestionType } from "../../../../../types/survey";
import "./styles.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import CircleIcon from "@mui/icons-material/Circle";
import CheckIcon from "@mui/icons-material/Check";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
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
            | Record<string, string | number | number[]>
    ) => void;
};

const RatingIcon = ({ question, handleUpdateQuestion }: Props) => {
    const config = useMemo(
        () =>
            (question?.configJsonString as Record<string, string | number>) ||
            {},
        [question?.configJsonString]
    );

    const ratingLength = useMemo(
        () => Number(config?.ratingLength) || 5,
        [config?.ratingLength]
    );

    const ratingIcon = useMemo(
        () => config?.ratingIcon || "StarBorderIcon",
        [config?.ratingIcon]
    );

    const availableIcons = useMemo(
        () => [
            "StarBorderIcon",
            "FavoriteIcon",
            "ThumbUpIcon",
            "FreeBreakfastIcon",
            "CircleIcon",
            "CheckIcon",
            "RocketLaunchIcon",
            "RadioButtonCheckedIcon",
        ],
        []
    );

    const handleRatingLengthChange = useCallback(
        (_event: Event, newValue: number | number[]) => {
            handleUpdateQuestion("configJsonString", {
                ...config,
                ratingLength: newValue as number,
            });
        },
        [config, handleUpdateQuestion]
    );

    const handleRatingIconChange = useCallback(
        (iconType: string) => {
            if (handleUpdateQuestion) {
                handleUpdateQuestion("configJsonString", {
                    ...config,
                    ratingIcon: iconType,
                });
            }
        },
        [config, handleUpdateQuestion]
    );

    useEffect(() => {
        if (!config?.ratingLength || !config?.ratingIcon) {
            handleUpdateQuestion("configJsonString", {
                ratingIcon: config?.ratingIcon ?? "StarBorderIcon",
                ratingLength: config?.ratingLength ?? 5,
            });
        }
    }, [config, handleUpdateQuestion]);

    const renderIcon = (iconType: string) => {
        switch (iconType) {
            case "FavoriteIcon":
                return <FavoriteIcon className="text-4xl" />;
            case "ThumbUpIcon":
                return <ThumbUpIcon className="text-4xl" />;
            case "FreeBreakfastIcon":
                return <FreeBreakfastIcon className="text-4xl" />;
            case "CircleIcon":
                return <CircleIcon className="text-4xl" />;
            case "CheckIcon":
                return <CheckIcon className="text-4xl" />;
            case "RocketLaunchIcon":
                return <RocketLaunchIcon className="text-4xl" />;
            case "RadioButtonCheckedIcon":
                return <RadioButtonCheckedIcon className="text-4xl" />;
            case "StarBorderIcon":
            default:
                return <StarBorderIcon className="text-4xl" />;
        }
    };

    return (
        <Box className="rating-config flex flex-col p-4 space-y-6">
            <Box>
                <Box className="flex items-center space-x-2 mb-2">
                    <Typography variant="body1">ĐỘ DÀI RATING</Typography>
                    <Typography variant="body2" color="textSecondary">
                        ?
                    </Typography>
                    <Box className="flex-grow"></Box>
                    <Typography variant="body2" color="textSecondary">
                        ⚡
                    </Typography>
                </Box>
                <Slider
                    value={ratingLength}
                    min={1}
                    max={10}
                    step={1}
                    onChange={handleRatingLengthChange}
                    valueLabelDisplay="auto"
                />
            </Box>

            <Box>
                <Box className="flex items-center space-x-2 mb-4">
                    <Typography variant="body1">BIỂU TƯỢNG RATING</Typography>
                    <Box className="flex-grow"></Box>
                    <Typography variant="body2" color="textSecondary">
                        ⚡
                    </Typography>
                </Box>
                <Box className="grid grid-cols-6 gap-4">
                    {availableIcons.map((iconType) => (
                        <Box
                            key={iconType}
                            className={`flex flex-col items-center cursor-pointer ${
                                iconType === ratingIcon
                                    ? "text-blue-500"
                                    : "text-gray-400"
                            }`}
                            onClick={() => handleRatingIconChange(iconType)}
                        >
                            {renderIcon(iconType)}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default RatingIcon;
