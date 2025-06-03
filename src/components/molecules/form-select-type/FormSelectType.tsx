import "./styles.scss";
import { Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import StarIcon from "@mui/icons-material/Star";
import TuneIcon from "@mui/icons-material/Tune";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useGetSurveyQuestionType } from "../../../services/survey-question-type/get-survey-question-type.service";
import { useMemo, type ReactNode } from "react";
import { SurveyQuestionType } from "../../../constants/question";
import type { QuestionType } from "../../../types/survey";

type Props = {
    handleUpdateQuestion: (
        key: keyof QuestionType,
        value: string | number | boolean | Record<string, string | number>
    ) => void;
};
const FormSelectType = ({ handleUpdateQuestion }: Props) => {
    const handleInsertIcon = (type: string) => {
        switch (type) {
            case "Single Choice":
                return <CheckCircleOutlineIcon />;
            case "Multiple Choice":
                return <CheckCircleOutlineIcon />;
            case "Single Slider":
                return <TuneIcon />;
            case "Range Slider":
                return <TuneIcon />;
            case "Single input by types":
                return <TextFieldsIcon />;
            case "Rating":
                return <StarIcon />;
            case "Ranking":
                return <BarChartIcon />;
            default:
                return undefined;
        }
    };
    const { data } = useGetSurveyQuestionType({});
    const questionTypes = useMemo(
        () =>
            (data?.data || SurveyQuestionType)?.map(
                (item: SurveyQuestionType) => ({
                    id: item?.id,
                    label: item?.name || "",
                    icon: handleInsertIcon(item?.name || ""),
                })
            ),
        [data?.data]
    );

    return (
        <div className="w-full flex justify-center">
            <div className="form-select-type-grid grid grid-cols-2 gap-6">
                {questionTypes.map(
                    (type: { id: number; label: string; icon: ReactNode }) => (
                        <div
                            key={type.id}
                            className="form-select-type-card flex flex-col items-center justify-center p-4 cursor-pointer"
                            onClick={() =>
                                handleUpdateQuestion("questionTypeId", type.id)
                            }
                        >
                            <div className="form-select-type-icon mb-2">
                                {type.icon}
                            </div>
                            <Typography
                                variant="body1"
                                className="form-select-type-label text-center"
                            >
                                {type.label}
                            </Typography>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default FormSelectType;
