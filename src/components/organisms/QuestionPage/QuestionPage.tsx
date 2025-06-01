import "./styles.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Switch,
    Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import type {
    OptionType,
    QuestionType,
    SurveyType,
} from "../../../types/survey";
import { handleSelectBackground } from "../../../helpers/handleSelectBackground";
import FormSelectType from "../../molecules/form-select-type/FormSelectType";
import SingleChoice from "../SingleChoice/SingleChoice";
import MultipleChoice from "../MultipleChoice/MultipleChoice";
import SingleSlider from "../SingleSlider/SingleSlider";
import RangeSlider from "../RangeSlider/RangeSlider";
import SingleInput from "../SingleInput/SingleInput";
import Rating from "../Rating/Rating";
import Ranking from "../Ranking/Ranking";

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
        [questionedit?.order]
    );

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
                    return <RangeSlider />;
                case 5:
                    return <SingleInput />;
                case 6:
                    return questionedit ? (
                        <Rating
                            question={questionedit}
                            handleUpdateQuestion={handleUpdateQuestion}
                        />
                    ) : null;
                case 7:
                    return <Ranking />;
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

    const handleAddQuestion = () => {
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
        setOrderCurrent(orderCurrent + 1);
    };

    const handleChangeQuestion = (order: number) => {
        setOrderCurrent(order);
    };

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
            <div className="question-content flex flex-1 overflow-hidden">
                <div
                    className="question-main flex-1 flex flex-col overflow-y-auto relative"
                    style={{
                        backgroundImage: `url(${handleSelectBackground(
                            formData.background
                        )})`,
                    }}
                >
                    <div className="question-input-container relative z-10 flex flex-col items-center">
                        <input
                            type="text"
                            placeholder="Nhập câu hỏi tại đây"
                            className="question-title-input"
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
                    <h4 className="sidebar-title">Cài đặt câu hỏi</h4>

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
                    </div>
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
}: {
    order: number;
    orderCurrent: number;
    onChange: (order: number) => void;
}) => {
    return (
        <div
            className={`question-item flex flex-col items-center justify-center ${
                order === orderCurrent && "question-active"
            }`}
            onClick={() => onChange(order)}
        >
            <CheckCircleIcon fontSize="small" className="item-icon" />
            <span className="item-text">{order}.</span>
        </div>
    );
};
