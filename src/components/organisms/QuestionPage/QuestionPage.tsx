/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SurveyQuestionType } from "../../../constants/question";
import type {
    OptionType,
    QuestionType,
    SurveyType,
} from "../../../types/survey";
import FormSelectType from "../../molecules/form-select-type/FormSelectType";
import MultipleChoice from "../MultipleChoice/MultipleChoice";
import type { RangeSliderConfigJsonStringType } from "../RangeSlider/RangeSlider";
import RangeSlider from "../RangeSlider/RangeSlider";
import Ranking from "../Ranking/Ranking";
import Rating from "../Rating/Rating";
import SingleChoice from "../SingleChoice/SingleChoice";
import SingleInput from "../SingleInput/SingleInput";
import SingleSlider from "../SingleSlider/SingleSlider";
import Overlay from "../overlay/Overlay";
import Sidebar from "../sidebar/Sidebar";
import SwitchCustomize from "./components/SwitchCustomize";
import RatingIcon from "./components/rating-icon/RatingIcon";
import "./styles.scss";

const questionDefault = {
    questionTypeId: 0,
    content: "",
    description: "",
    timeLimit: 0,
    isVoice: false,
    order: 0,
    configJsonString: {},
    options: [],
};

type Props = {
    formData: SurveyType;
    setFormData: React.Dispatch<React.SetStateAction<SurveyType>>;
};

const QuestionPage = ({ formData, setFormData }: Props) => {
    const [orderCurrent, setOrderCurrent] = useState(1);
    const [isOpenOverlay, setIsOpenOverlay] = useState(false);

    const questionedit = useMemo(() => {
        return (formData?.questions || []).find((item) => {
            return item?.order === orderCurrent;
        });
    }, [formData, orderCurrent]);

    const handleUpdateQuestion = useCallback(
        (
            key: keyof QuestionType,
            value:
                | string
                | number
                | boolean
                | OptionType[]
                | Record<string, string | number>
                | RangeSliderConfigJsonStringType
                | Record<string, unknown>
        ) => {
            setFormData((prev) => ({
                ...prev,
                questions: prev.questions.map((item) => {
                    if (
                        questionedit?.order &&
                        item.order === questionedit?.order
                    ) {
                        return {
                            ...item,
                            [key]: value,
                        };
                    }
                    return item;
                }),
            }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [questionedit?.order]
    );

    const rulesType = SurveyQuestionType.map((item) => {
        if (item.id === 1) {
            return {
                type: item.id,
                rules: [],
            };
        }

        if (item.id === 2) {
            return {
                type: item.id,
                rules: [
                    {
                        children: (
                            <SwitchCustomize
                                type="is_choose_muitiple"
                                question={questionedit}
                                // isMinMax
                                handleUpdateQuestion={handleUpdateQuestion}
                                label="Chọn nhiều trả lời"
                            />
                        ),
                    },
                    {
                        children: (
                            <SwitchCustomize
                                type="is_auto_view_show"
                                question={questionedit}
                                handleUpdateQuestion={handleUpdateQuestion}
                                label={
                                    <div
                                        style={{
                                            marginTop: 10,
                                        }}
                                    >
                                        <div>
                                            Tự động chọn các câu trả lời đang
                                            hiển thị và qua câu tiếp theo
                                        </div>
                                        <br />
                                        <div
                                            style={{
                                                color: "#666",
                                            }}
                                        >
                                            Bật tính năng này hệ thống sẽ tự
                                            động chọn hết các câu trả lời đang
                                            hiển thị và chuyển qua câu hỏi tiếp
                                            theo nếu số lượng câu trả lời đang
                                            hiển thị ít hơn hoặc bằng giá trịbạn
                                            yêu cầu
                                        </div>
                                    </div>
                                }
                            />
                        ),
                    },
                    {
                        children: (
                            <SwitchCustomize
                                type="is_result_other"
                                question={questionedit}
                                handleUpdateQuestion={handleUpdateQuestion}
                                label="Câu trả lời khác"
                            />
                        ),
                    },
                ],
            };
        }

        if (item.id === 3) {
            return {
                type: item.id,
                rules: [
                    {
                        children: (
                            <SwitchCustomize
                                type="is_auto_view_show"
                                question={questionedit}
                                handleUpdateQuestion={handleUpdateQuestion}
                                label={
                                    <div
                                        style={{
                                            marginTop: 10,
                                        }}
                                    >
                                        <div>
                                            Tự động chọn các câu trả lời đang
                                            hiển thị và qua câu tiếp theo
                                        </div>
                                        <br />
                                        <div
                                            style={{
                                                color: "#666",
                                            }}
                                        >
                                            Bật tính năng này hệ thống sẽ tự
                                            động chọn hết các câu trả lời đang
                                            hiển thị và chuyển qua câu hỏi tiếp
                                            theo nếu số lượng câu trả lời đang
                                            hiển thị ít hơn hoặc bằng giá trịbạn
                                            yêu cầu
                                        </div>
                                    </div>
                                }
                            />
                        ),
                    },
                ],
            };
        }

        if (item.id === 6) {
            return {
                type: item.id,
                rules: [
                    {
                        children: (
                            <SwitchCustomize
                                type="is_auto_view_show"
                                question={questionedit}
                                handleUpdateQuestion={handleUpdateQuestion}
                                label={
                                    <div
                                        style={{
                                            marginTop: 10,
                                        }}
                                    >
                                        <div>
                                            Tự động chọn các câu trả lời đang
                                            hiển thị và qua câu tiếp theo
                                        </div>
                                        <br />
                                        <div
                                            style={{
                                                color: "#666",
                                            }}
                                        >
                                            Bật tính năng này hệ thống sẽ tự
                                            động chọn hết các câu trả lời đang
                                            hiển thị và chuyển qua câu hỏi tiếp
                                            theo nếu số lượng câu trả lời đang
                                            hiển thị ít hơn hoặc bằng giá trịbạn
                                            yêu cầu
                                        </div>
                                    </div>
                                }
                            />
                        ),
                    },
                    {
                        type: "rating_page",
                        children:
                            questionedit && handleUpdateQuestion ? (
                                <RatingIcon
                                    question={questionedit}
                                    handleUpdateQuestion={handleUpdateQuestion}
                                />
                            ) : (
                                <></>
                            ),
                    },
                ],
            };
        }

        return {
            type: item.id,
            rules: [],
        };
    });

    const handleRenderView = useCallback(
        (id: number) => {
            switch (id) {
                case 1:
                    return questionedit ? (
                        <SingleChoice
                            formData={formData}
                            question={questionedit}
                            handleUpdateQuestion={handleUpdateQuestion}
                        />
                    ) : null;
                case 2:
                    return questionedit ? (
                        <MultipleChoice
                            question={questionedit}
                            handleUpdateQuestion={handleUpdateQuestion}
                        />
                    ) : null;
                case 3:
                    return questionedit ? (
                        <SingleSlider
                            question={questionedit}
                            handleUpdateQuestion={handleUpdateQuestion}
                        />
                    ) : null;
                case 4:
                    return questionedit ? (
                        <RangeSlider
                            question={questionedit}
                            handleUpdateQuestion={handleUpdateQuestion}
                        />
                    ) : null;
                case 5:
                    return questionedit ? (
                        <SingleInput
                            question={questionedit}
                            handleUpdateQuestion={handleUpdateQuestion}
                        />
                    ) : null;
                case 6:
                    return questionedit ? (
                        <Rating
                            question={questionedit}
                            handleUpdateQuestion={handleUpdateQuestion}
                        />
                    ) : null;
                case 7:
                    return questionedit ? (
                        <Ranking
                            question={questionedit}
                            handleUpdateQuestion={handleUpdateQuestion}
                        />
                    ) : null;

                default:
                    return (
                        <FormSelectType
                            handleUpdateQuestion={handleUpdateQuestion}
                        />
                    );
            }
        },
        [handleUpdateQuestion, questionedit, formData]
    );

    const handleAddQuestion = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    ...questionDefault,
                    order: prev.questions[prev.questions.length - 1].order + 1,
                },
            ],
        }));
        setOrderCurrent(formData?.questions?.length + 1);
    }, [formData?.questions?.length, setFormData]);

    const handleChangeQuestion = (order: number) => {
        setOrderCurrent(order);
    };

    const handleDeleteQuestion = () => {
        if (!orderCurrent) return;
        const newQuestions = formData?.questions
            .filter((item) => item.order !== orderCurrent)
            .map((item, index) => ({
                ...item,
                order: index + 1,
            }));
        setFormData((prev) => ({
            ...prev,
            questions: newQuestions,
        }));
    };

    const handleSwapQuestion = (target: number) => {
        const currentOrder = orderCurrent;
        const targetOrder = target;

        if (currentOrder === targetOrder || !currentOrder || !targetOrder) {
            return; // Cannot swap with itself or invalid targets
        }

        const questions = [...formData.questions];
        const currentIndex = questions.findIndex(
            (item) => item.order === currentOrder
        );
        const targetIndex = questions.findIndex(
            (item) => item.order === targetOrder
        );

        if (currentIndex === -1 || targetIndex === -1) {
            return; // Current or target question not found
        }

        // Swap the questions in the array copy
        const newQuestions = [...questions];
        [newQuestions[currentIndex], newQuestions[targetIndex]] = [
            newQuestions[targetIndex],
            newQuestions[currentIndex],
        ];

        // Update the order property for the swapped questions
        newQuestions[currentIndex] = {
            ...newQuestions[currentIndex],
            order: currentIndex + 1,
        };
        newQuestions[targetIndex] = {
            ...newQuestions[targetIndex],
            order: targetIndex + 1,
        };

        setFormData((prev) => ({
            ...prev,
            questions: newQuestions,
        }));

        // Update current order to the target question's new order
        setOrderCurrent(targetOrder);
    };

    useEffect(() => {
        if (!formData?.questions?.length) {
            setFormData((prev) => ({
                ...prev,
                questions: [{ ...questionDefault, order: 1 }],
            }));
        }
    }, [formData?.questions?.length, setFormData]);

    const handleUploadImageBase64 = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result;
                handleUpdateQuestion("image_header", base64String as string);
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
            };
            reader.readAsDataURL(file);
        }
    };

    const ref = useRef<null>(null);

    return (
        <div className="question-page flex flex-col h-full">
            <input
                type="file"
                hidden
                ref={ref}
                onChange={handleUploadImageBase64}
            />
            <div className="question-content flex flex-1 overflow-hidden relative">
                {isOpenOverlay ? (
                    <Overlay
                        onClose={() => setIsOpenOverlay(false)}
                        onDelete={handleDeleteQuestion}
                        onSwap={handleSwapQuestion}
                        formData={formData}
                        orderCurrent={orderCurrent}
                    />
                ) : null}
                <div
                    className="question-main flex-1 flex flex-col overflow-y-auto relative"
                    style={{
                        ...(formData?.background?.startsWith("/") && {
                            backgroundImage: `url(${formData?.background})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            filter: `brightness(${
                                formData?.configJsonString.brightness / 100
                            })`,
                            backgroundColor: "transparent",
                        }),
                        ...(formData?.background === "color_gradient" && {
                            background: `linear-gradient(to right, ${formData?.configJsonString.backgroundGradient1Color}, ${formData?.configJsonString.backgroundGradient2Color})`,
                            filter: `brightness(${
                                formData?.configJsonString.brightness / 100
                            })`,
                        }),
                        ...(formData?.background?.startsWith("#") && {
                            backgroundColor: formData?.background,
                            filter: `brightness(${
                                formData?.configJsonString.brightness / 100
                            })`,
                        }),
                    }}
                >
                    <div className="question-input-container relative z-10 flex flex-col items-center">
                        {questionedit?.image_header &&
                        questionedit.configJsonString?.image_end_question ? (
                            <img
                                src={questionedit?.image_header}
                                className="rounded-2xl "
                                alt=""
                            />
                        ) : (
                            ""
                        )}
                        <Button
                            onClick={() => {
                                if (ref.current) {
                                    (ref.current as any).click();
                                }
                            }}
                        >
                            Upload Image
                        </Button>
                        <input
                            type="text"
                            placeholder="Nhập câu hỏi tại đây"
                            className="question-title-input"
                            style={{
                                color: `${formData?.configJsonString?.titleColor}`,
                            }}
                            value={questionedit?.content || ""}
                            onChange={(e) =>
                                handleUpdateQuestion("content", e.target.value)
                            }
                        />
                        <textarea
                            placeholder="Nhập mô tả tại đây"
                            rows={2}
                            className="question-description-input"
                            value={questionedit?.description || ""}
                            style={{
                                color: `${formData?.configJsonString?.contentColor}`,
                            }}
                            onChange={(e) =>
                                handleUpdateQuestion(
                                    "description",
                                    e.target.value
                                )
                            }
                        ></textarea>
                    </div>
                    <div className="flex justify-center">
                        {handleRenderView(questionedit?.questionTypeId || 0)}
                    </div>
                </div>

                <div className="question-sidebar flex flex-col overflow-y-auto">
                    <Sidebar
                        formData={formData}
                        setFormData={setFormData}
                        handleUpdateQuestion={handleUpdateQuestion as any}
                        question={questionedit as QuestionType}
                        listComponent={
                            rulesType.find(
                                (item) =>
                                    item.type === questionedit?.questionTypeId
                            )?.rules as []
                        }
                    />
                </div>
            </div>

            <div className="question-footer flex items-center">
                <div className="footer-content flex">
                    {(formData?.questions || [])?.map((item) => (
                        <QuestionItem
                            key={item.order}
                            order={item.order}
                            orderCurrent={orderCurrent}
                            onChange={handleChangeQuestion}
                            onOpenOverlay={() => setIsOpenOverlay(true)}
                        />
                    ))}
                    <div
                        className="add-question-btn flex flex-col items-center justify-center"
                        onClick={handleAddQuestion}
                    >
                        <AddCircleIcon fontSize="small" className="add-icon" />
                        <span className="add-text">Thêm Câu Hỏi</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;

const QuestionItem = ({
    order,
    orderCurrent,
    onChange,
    onOpenOverlay,
}: {
    order: number;
    orderCurrent: number;
    onChange: (order: number) => void;
    onOpenOverlay: () => void;
}) => {
    return (
        <div
            className={`question-item flex flex-col items-center justify-center ${
                order === orderCurrent && "question-active"
            }`}
            onClick={() => onChange(order)}
        >
            <CheckCircleIcon
                fontSize="large"
                className="item-icon"
                onClick={onOpenOverlay}
            />
            <span className="item-text">{order}.</span>
        </div>
    );
};
