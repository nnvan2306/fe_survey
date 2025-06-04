/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    Typography
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import LogicComponent from "./components/ModalLogic";
import LogicComponentDisplay from "./components/ModalLogicDisplay";
import SwitchCustomize from "./components/SwitchCustomize";
import "./styles.scss";

const questionDefault = {
    questionTypeId: 0,
    content: "",
    description: "",
    timeLimit: 30,
    isVoiced: false,
    order: 0,
    configJsonString: {},
    options: [],
};

type Props = {
    formData: SurveyType;
    setFormData: React.Dispatch<React.SetStateAction<SurveyType>>;
};

const QuestionPage = ({ formData, setFormData }: Props) => {
    const [isRequired, setIsRequired] = useState(true);
    const [showLabel, setShowLabel] = useState(false);
    const [showMedia, setShowMedia] = useState(false);
    const [carryForwardChoices, setCarryForwardChoices] = useState(false);
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

    const rulesType = SurveyQuestionType.map(item => {
        return {
            type: item.id,
            rules: [
                {
                    type: "required_answer",
                    children: <SwitchCustomize question={questionedit} handleUpdateQuestion={handleUpdateQuestion} label="Bắt buộc câu trả lời" />
                },
                {
                    type: "badge",
                    children: <SwitchCustomize question={questionedit} handleUpdateQuestion={handleUpdateQuestion} label="Gắn nhãn ở đầu câu hỏi" />
                },
                {
                    type: "image_end_question",
                    children: <SwitchCustomize question={questionedit} handleUpdateQuestion={handleUpdateQuestion} label="Hình ảnh/Video ở đầu câu hỏi" />
                },
                {
                    type: "is_choose_muitiple",
                    children: <SwitchCustomize question={questionedit} isMinMax handleUpdateQuestion={handleUpdateQuestion} label="Chọn nhiều trả lời" />
                },
                {
                    type: "is_auto_view_show",
                    children: <SwitchCustomize question={questionedit} handleUpdateQuestion={handleUpdateQuestion} label={
                        <div style={{
                            marginTop: 10
                        }}>
                            <div>Tự động chọn các câu trả lời đang hiển thị và qua câu tiếp theo</div>
                            <br />
                            <div style={{
                                color: "#666"
                            }}>Bật tính năng này hệ thống sẽ tự động chọn hết các câu trả lời đang hiển thị và chuyển qua câu hỏi tiếp theo nếu số lượng câu trả lời đang hiển thị ít hơn hoặc bằng giá trịbạn yêu cầu</div>
                        </div>
                    } />
                },
                {
                    type: "is_result_other",
                    children: <SwitchCustomize question={questionedit} handleUpdateQuestion={handleUpdateQuestion} label="Câu trả lời khác" />
                },
                {
                    type: "jump_logic",
                    children: <LogicComponent />
                },
                {
                    type: "jump_logic",
                    children: <LogicComponentDisplay />
                }
            ]
        }
    })


    const handleRenderView = useCallback(
        (id: number) => {
            switch (id) {
                case 1:
                    return questionedit ? (
                        <SingleChoice
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
        [handleUpdateQuestion, questionedit]
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
        const newQuestions = formData.questions
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

        // Swap questions
        const [targetQuestion] = questions.splice(targetIndex, 1);
        questions.splice(currentIndex, 0, targetQuestion);

        // Reassign orders based on new positions
        const newQuestions = questions.map((item, index) => ({
            ...item,
            order: index + 1,
        }));

        setFormData((prev) => ({
            ...prev,
            questions: newQuestions,
        }));

        // Update current order to the target question's new order
        setOrderCurrent(targetOrder);
    };

    function SideBarTest() {
        return <><h4 className="sidebar-title">Cài đặt câu hỏi</h4>

            <div className="sidebar-section flex flex-col">
                <FormControl fullWidth size="small">
                    <InputLabel>LOẠI CÂU HỎI</InputLabel>
                    <Select
                        // value={questionType}
                        label="LOẠI CÂU HỎI"
                    // onChange={handleQuestionTypeChange}
                    >
                        <MenuItem value="">Loại câu hỏi</MenuItem>
                        <MenuItem value="multiple-choice">
                            Multiple Choice
                        </MenuItem>
                        <MenuItem value="picture-choice">
                            Picture Choice
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="sidebar-section flex items-center justify-between">
                <div className="flex flex-col">
                    <label className="section-label">
                        BẮT BUỘC TRẢ LỜI
                    </label>
                    <Typography variant="body2" color="textSecondary">
                        Bắt buộc
                    </Typography>
                </div>
                <div className="section-control flex items-center">
                    <FlashOnIcon
                        fontSize="small"
                        className="control-icon"
                    />
                    <Switch
                        checked={isRequired}
                        onChange={(e) =>
                            setIsRequired(e.target.checked)
                        }
                        color="primary"
                    />
                </div>
            </div>

            <div className="sidebar-section flex items-center justify-between">
                <div className="flex flex-col">
                    <label className="section-label">
                        GÁN NHÃN Ở ĐẦU CÂU HỎI
                    </label>
                    <Typography variant="body2" color="textSecondary">
                        {showLabel ? "Bật" : "Tắt"}
                    </Typography>
                </div>
                <div className="section-control flex items-center">
                    <FlashOnIcon
                        fontSize="small"
                        className="control-icon"
                    />
                    <Switch
                        checked={showLabel}
                        onChange={(e) => setShowLabel(e.target.checked)}
                        color="primary"
                    />
                </div>
            </div>

            <div className="sidebar-section flex items-center justify-between">
                <div className="flex flex-col">
                    <label className="section-label">
                        HÌNH ẢNH/VIDEO Ở ĐẦU CÂU HỎI
                    </label>
                    <Typography variant="body2" color="textSecondary">
                        {showMedia ? "Bật" : "Tắt"}
                    </Typography>
                </div>
                <div className="section-control flex items-center">
                    <FlashOnIcon
                        fontSize="small"
                        className="control-icon"
                    />
                    <Switch
                        checked={showMedia}
                        onChange={(e) => setShowMedia(e.target.checked)}
                        color="primary"
                    />
                </div>
            </div>

            <div className="sidebar-section flex items-center justify-between">
                <div className="flex flex-col">
                    <label className="section-label">
                        CARRY FORWARD CHOICES - LẤY KẾT QUẢ ĐƯỢC CHỌN Ở
                        CÂU TRƯỚC{" "}
                        <HelpOutlineIcon
                            fontSize="small"
                            className="help-icon"
                        />
                    </label>
                    <Typography variant="body2" color="textSecondary">
                        {carryForwardChoices ? "Bật" : "Tắt"}
                    </Typography>
                </div>
                <div className="section-control flex items-center">
                    <FlashOnIcon
                        fontSize="small"
                        className="control-icon"
                    />
                    <Switch
                        checked={carryForwardChoices}
                        onChange={(e) =>
                            setCarryForwardChoices(e.target.checked)
                        }
                        color="primary"
                    />
                </div>
            </div></>
    }

    const data = [
        {
            questionType: 1,
            listComponents: [
                SideBarTest
            ]
        }
    ]

    useEffect(() => {
        if (!formData?.questions?.length) {
            setFormData((prev) => ({
                ...prev,
                questions: [{ ...questionDefault, order: 1 }],
            }));
        }
    }, [formData?.questions?.length, setFormData]);

    return (
        <div className="question-page flex flex-col h-full">
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
                        ...(formData.background.startsWith('/') && {
                            backgroundImage: `url(${formData.background})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            filter: `brightness(${formData.configJsonString.brightness / 100})`,
                            backgroundColor: 'transparent',
                        }),
                        ...(formData.background === 'color_gradient' && {
                            background: `linear-gradient(to right, ${formData.configJsonString.backgroundGradient1Color}, ${formData.configJsonString.backgroundGradient2Color})`,
                            filter: `brightness(${formData.configJsonString.brightness / 100})`,
                        }),
                        ...(formData.background.startsWith('#') && {
                            backgroundColor: formData.background,
                            filter: `brightness(${formData.configJsonString.brightness / 100})`,
                        }),
                    }}
                >
                    <div className="question-input-container relative z-10 flex flex-col items-center">
                        <input
                            type="text"
                            placeholder="Nhập câu hỏi tại đây"
                            className="question-title-input"
                            style={{
                                color: `${formData.configJsonString.titleColor}`,
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
                                color: `${formData.configJsonString.contentColor}`,
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
                    <Sidebar handleUpdateQuestion={handleUpdateQuestion as any} question={questionedit as QuestionType} listComponent={rulesType.find(item => item.type === 1)?.rules as []} />
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
            className={`question-item flex flex-col items-center justify-center ${order === orderCurrent && "question-active"
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
