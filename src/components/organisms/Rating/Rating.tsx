import "./styles.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import RatingIcon from "../QuestionPage/components/rating-icon/RatingIcon";
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
            | Record<string, string | number | number[]>
    ) => void;
};

const Rating = ({ question, handleUpdateQuestion }: Props) => {
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
            handleUpdateQuestion("configJsonString", {
                ...config,
                ratingIcon: iconType,
            });
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

    return (
        <Box className="rating-config flex flex-col p-4 space-y-6">
            <Box>
                <Box className="flex items-center space-x-2 mb-2">
                    <Typography variant="body1">ĐỘ DÀI RATING</Typography>
                    {/* Assuming the question mark icon is part of Typography or a separate icon */}
                    <Typography variant="body2" color="textSecondary">
                        ?
                    </Typography>
                    <Box className="flex-grow"></Box>
                    {/* Assuming the lightning bolt icon is part of Typography or a separate icon */}
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
                    {/* Assuming the lightning bolt icon is part of Typography or a separate icon */}
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
                            <RatingIcon
                                iconType={iconType}
                                className="text-4xl"
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Rating;
