import "./styles.scss";
import { useState } from "react";
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
import type { SelectChangeEvent } from "@mui/material/Select";
import type { SurveyType } from "../../../types/survey";
import { handleSelectBackground } from "../../../helpers/handleSelectBackground";
import FormSelectType from "../../molecules/form-select-type/FormSelectType";

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

    return (
        <div className="question-page flex flex-col h-full">
            <div
                className="flex flex-1 overflow-hidden"
                style={{ height: "80%", overflow: "hidden" }}
            >
                <div
                    className="flex-1 flex flex-col overflow-y-auto p-6 relative"
                    style={{
                        backgroundImage: `url(${handleSelectBackground(
                            formData.background
                        )})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="relative z-10 bg-white bg-opacity-70 p-6 rounded-lg shadow-md max-w-2xl mx-auto w-full mb-8">
                        <input
                            type="text"
                            placeholder="Nhập câu hỏi tại đây"
                            className="w-full text-2xl font-semibold mb-4 bg-transparent border-b border-gray-400 outline-none"
                        />
                        <textarea
                            placeholder="Nhập mô tả tại đây"
                            rows={2}
                            className="w-full text-md bg-transparent outline-none resize-none"
                        ></textarea>
                    </div>
                    <FormSelectType />
                </div>

                <div className="question-sidebar w-80 bg-white p-6 shadow-lg overflow-y-auto">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">
                        Cài đặt câu hỏi
                    </h4>

                    <div className="mb-6 pb-4 border-b border-gray-200">
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

                    <div className="mb-6 pb-4 border-b border-gray-200 flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                BẮT BUỘC TRẢ LỜI
                            </label>
                            <Typography variant="body2" color="textSecondary">
                                Bắt buộc
                            </Typography>
                        </div>
                        <div className="flex items-center">
                            <FlashOnIcon
                                fontSize="small"
                                className="text-gray-500 mr-1"
                            />{" "}
                            <Switch
                                checked={isRequired}
                                onChange={(e) =>
                                    setIsRequired(e.target.checked)
                                }
                                color="primary"
                            />
                        </div>
                    </div>

                    <div className="mb-6 pb-4 border-b border-gray-200 flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                GÁN NHÃN Ở ĐẦU CÂU HỎI
                            </label>
                            <Typography variant="body2" color="textSecondary">
                                {showLabel ? "Bật" : "Tắt"}
                            </Typography>
                        </div>
                        <div className="flex items-center">
                            <FlashOnIcon
                                fontSize="small"
                                className="text-gray-500 mr-1"
                            />{" "}
                            <Switch
                                checked={showLabel}
                                onChange={(e) => setShowLabel(e.target.checked)}
                                color="primary"
                            />
                        </div>
                    </div>

                    <div className="mb-6 pb-4 border-b border-gray-200 flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                HÌNH ẢNH/VIDEO Ở ĐẦU CÂU HỎI
                            </label>
                            <Typography variant="body2" color="textSecondary">
                                {showMedia ? "Bật" : "Tắt"}
                            </Typography>
                        </div>
                        <div className="flex items-center">
                            <FlashOnIcon
                                fontSize="small"
                                className="text-gray-500 mr-1"
                            />{" "}
                            <Switch
                                checked={showMedia}
                                onChange={(e) => setShowMedia(e.target.checked)}
                                color="primary"
                            />
                        </div>
                    </div>

                    <div className="mb-6 pb-4 border-b border-gray-200 flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                CARRY FORWARD CHOICES - LẤY KẾT QUẢ ĐƯỢC CHỌN Ở
                                CÂU TRƯỚC{" "}
                                <HelpOutlineIcon
                                    fontSize="small"
                                    className="text-gray-400 ml-1 cursor-help"
                                />
                            </label>
                            <Typography variant="body2" color="textSecondary">
                                {carryForwardChoices ? "Bật" : "Tắt"}
                            </Typography>
                        </div>
                        <div className="flex items-center">
                            <FlashOnIcon
                                fontSize="small"
                                className="text-gray-500 mr-1"
                            />{" "}
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

            <div className="question-footer flex items-center p-4 bg-white shadow-inner h-[20%]">
                <div className="flex space-x-4">
                    {(formData?.questions || [])?.map((item) => {
                        return (
                            <QuestionItem
                                key={item.questionTypeId}
                                index={item.questionTypeId}
                            />
                        );
                    })}
                    <div className="flex-shrink-0 w-20 h-24 border border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 cursor-pointer p-2">
                        <AddCircleIcon fontSize="small" className="mb-1" />
                        <span className="text-sm">Thêm Câu Hỏi</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;

const QuestionItem = ({ index }: { index: number }) => {
    return (
        <div className="flex-shrink-0 w-20 h-24 border border-green-500 rounded-md flex flex-col items-center justify-center text-green-600 cursor-pointer p-2">
            <CheckCircleIcon fontSize="small" className="mb-1" />
            <span className="text-sm">{index}.</span>
        </div>
    );
};
