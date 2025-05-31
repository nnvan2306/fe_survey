import React from "react";
import "./styles.scss";
import { handleSelectBackground } from "../../../helpers/handleSelectBackground";
import type { SurveyType } from "../../../types/survey";

const backgrounds = Array.from(
    { length: 7 },
    (_, index) => `start${index + 1}`
);

type Props = {
    formData: SurveyType;
    setFormData: React.Dispatch<React.SetStateAction<SurveyType>>;
};

const StartPage = ({ formData, setFormData }: Props) => {
    const handleInputChange = (
        field: keyof SurveyType,
        value: string | boolean
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleStartSurvey = () => {
        console.log("Starting survey with data:", formData);
    };

    return (
        <div className="startpage-root flex h-screen">
            <div
                className="relative flex-1 flex items-center justify-center"
                style={{
                    backgroundImage: `url(${handleSelectBackground(
                        formData.background
                    )})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-8">
                    <div className="startpage-content w-full text-center">
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                handleInputChange("title", e.target.value)
                            }
                            className="startpage-title-input"
                            placeholder="Nhập tiêu đề"
                        />
                        <input
                            value={formData.description}
                            onChange={(e) =>
                                handleInputChange("description", e.target.value)
                            }
                            className="startpage-desc-input"
                            placeholder="Nhập mô tả tại đây"
                        />
                        <button
                            onClick={handleStartSurvey}
                            className="startpage-btn group"
                        >
                            <span>Bắt đầu</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="startpage-options w-[420px] bg-white h-full overflow-y-auto shadow-lg p-8">
                <div className="space-y-6">
                    <div className="config-section">
                        <h3 className="config-title">BỎ QUA TRANG BẮT ĐẦU</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Bỏ qua</span>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={false}
                                    onChange={() => {}}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    <div className="config-section">
                        <h3 className="config-title">
                            KHẢO SÁT TRÊN NỀN AUDIO
                        </h3>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-600">Bật</span>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={false}
                                    onChange={() => {}}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <button className="buy-now-button">Mua đi nè</button>
                    </div>
                    <div className="config-section">
                        <div className="flex items-center mb-3">
                            <h3 className="config-title">
                                ĐẶT MẬT KHẨU CHO KHẢO SÁT
                            </h3>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Bật</span>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={false}
                                    onChange={() => {}}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    <div className="config-section">
                        <h3 className="config-title">NGÀY BẮT ĐẦU</h3>
                        <button className="date-picker-button">
                            Chọn ngày
                        </button>
                    </div>
                    <div className="config-section">
                        <h3 className="config-title">NGÀY KẾT THÚC</h3>
                        <button className="date-picker-button">
                            Chọn ngày
                        </button>
                    </div>
                    <div className="config-section">
                        <h3 className="config-title">SỬ DỤNG HÌNH NỀN</h3>
                        <div className="background-preview">
                            <div className="background-thumbnail">
                                <div className="grid grid-cols-5 gap-4">
                                    {backgrounds.map((item, index) => {
                                        return (
                                            <img
                                                src={handleSelectBackground(
                                                    item
                                                )}
                                                alt="background"
                                                key={index}
                                                onClick={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        background: item,
                                                    }))
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <span className="text-sm text-gray-600 mt-2">
                                Click để đổi hình
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
