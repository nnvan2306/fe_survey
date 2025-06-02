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
    Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import type { SurveyType } from "../../../types/survey";
import FormSelectType from "../../molecules/form-select-type/FormSelectType";
import "./styles.scss";

const questionDefault = {
    questionTypeId: 1,
    content: "",
    description: "",
    timeLimit: 30,
    isVoiced: false,
    order: 1,
    configJsonString: {},
    options: [],
};

type Props = {
    formData: SurveyType;
    setFormData: React.Dispatch<React.SetStateAction<SurveyType>>;
};

const QuestionPage = ({ formData, setFormData }: Props) => {
    const [questionType, setQuestionType] = useState("");
    const [isRequired, setIsRequired] = useState(true);
    const [showLabel, setShowLabel] = useState(false);
    const [showMedia, setShowMedia] = useState(false);
    const [carryForwardChoices, setCarryForwardChoices] = useState(false);

    const handleQuestionTypeChange = (event: SelectChangeEvent) => {
        setQuestionType(event.target.value);
    };

    const handleAddQuestion = () => {
        setFormData((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    ...questionDefault,
                    questionTypeId:
                        prev.questions[prev.questions.length - 1]
                            .questionTypeId + 1,
                },
            ],
        }));
    };

    useEffect(() => {
        if (!formData?.questions?.length) {
            setFormData((prev) => ({ ...prev, questions: [questionDefault] }));
        }
    }, []);

    console.log("formData:", formData);

    return (
        <div className="question-page flex flex-col h-full">
            <div className="question-content flex flex-1 overflow-hidden">
                <div
                    className="question-main flex-1 flex flex-col overflow-y-auto relative"
                    style={{
                        backgroundImage: `url(${formData.background})`,
                    }}
                >
                    <div className="question-input-container relative z-10 flex flex-col items-center">
                        <input
                            type="text"
                            placeholder="Nhập câu hỏi tại đây"
                            className="question-title-input"
                        />
                        <textarea
                            placeholder="Nhập mô tả tại đây"
                            rows={2}
                            className="question-description-input"
                        ></textarea>
                    </div>
                    <FormSelectType />
                </div>

                <div className="question-sidebar flex flex-col overflow-y-auto">
                    <h4 className="sidebar-title">Cài đặt câu hỏi</h4>

                    <div className="sidebar-section flex flex-col">
                        <FormControl fullWidth size="small">
                            <InputLabel>LOẠI CÂU HỎI</InputLabel>
                            <Select
                                value={questionType}
                                label="LOẠI CÂU HỎI"
                                onChange={handleQuestionTypeChange}
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
                            key={item.questionTypeId}
                            index={item.questionTypeId}
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

const QuestionItem = ({ index }: { index: number }) => {
    return (
        <div className="question-item flex flex-col items-center justify-center">
            <CheckCircleIcon fontSize="small" className="item-icon" />
            <span className="item-text">{index}.</span>
        </div>
    );
};
