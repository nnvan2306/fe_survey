import type { SurveyType } from "../../../types/survey";
import "./styles.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WarningIcon from "@mui/icons-material/Warning";

type Props = {
    formData: SurveyType;
};

const getErrors = (formData: SurveyType): string[] => {
    const errors: string[] = [];
    if (formData?.questions) {
        formData.questions.forEach((question) => {
            if (!question.content) {
                errors.push(`Câu hỏi ${question.order} chưa điền tiêu đề`);
            }

            if (!question.questionTypeId) {
                errors.push(`Câu hỏi ${question.order} chưa chọn loại câu hỏi`);
            }

            if (
                question.questionTypeId === 1 ||
                question.questionTypeId === 2 ||
                question.questionTypeId === 7
            ) {
                if (question.options && question.options.length > 0) {
                    question.options.forEach((option, optionIndex) => {
                        if (!option.content) {
                            errors.push(
                                `Câu hỏi ${question.order}, Tùy chọn ${
                                    optionIndex + 1
                                } chưa điền nội dung`
                            );
                        }
                    });
                } else {
                    errors.push(
                        `Câu hỏi ${question.order} (${
                            question.questionTypeId === 1
                                ? "Trắc nghiệm 1 lựa chọn"
                                : question.questionTypeId === 2
                                ? "Trắc nghiệm nhiều lựa chọn"
                                : "Xếp hạng"
                        }) cần có ít nhất một tùy chọn`
                    );
                }
            }
        });
    }
    return errors;
};

const CompletePage = ({ formData }: Props) => {
    const errors = getErrors(formData);

    return (
        <div
            className="complete-page flex-1 flex flex-col items-center justify-center min-h-[100%]"
            style={{
                ...(formData.background.startsWith("/") && {
                    backgroundImage: `url(${formData.background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: `brightness(${
                        formData.configJsonString.brightness / 100
                    })`,
                    backgroundColor: "transparent",
                }),
                ...(formData.background === "color_gradient" && {
                    background: `linear-gradient(to right, ${formData.configJsonString.backgroundGradient1Color}, ${formData.configJsonString.backgroundGradient2Color})`,
                    filter: `brightness(${
                        formData.configJsonString.brightness / 100
                    })`,
                }),
                ...(formData.background.startsWith("#") && {
                    backgroundColor: formData.background,
                    filter: `brightness(${
                        formData.configJsonString.brightness / 100
                    })`,
                }),
            }}
        >
            <Box className="flex flex-col items-center space-y-4 w-[100%]">
                {errors.length > 0 ? (
                    <Box className="flex flex-col space-y-2 p-4">
                        {errors.map((error, index) => (
                            <ErrorItem key={index} title={error} />
                        ))}
                    </Box>
                ) : (
                    <Box className="p-4">
                        <Typography variant="h4">Survey Completed!</Typography>
                        {formData.title && (
                            <Typography variant="body1">
                                Survey Title: {formData.title}
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default CompletePage;

const ErrorItem = ({ title }: { title: string }) => {
    return (
        <Box className="bg-red-500 text-white p-3 flex items-center space-x-2 rounded w-[100%]">
            <WarningIcon fontSize="small" />
            <Typography variant="body2">{title}</Typography>
        </Box>
    );
};
