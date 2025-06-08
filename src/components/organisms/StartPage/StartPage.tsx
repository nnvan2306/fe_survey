/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckIcon from "@mui/icons-material/Check";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from "@mui/icons-material/Settings";
import { FormControl, MenuItem, Select, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
    SurveySecurityMode,
    SurveySpecificTopic,
    SurveyTopic,
} from "../../../data/surveyData";
import { handleSelectBackground } from "../../../helpers/handleSelectBackground";
import type { PageProps, SurveyType } from "../../../types/survey";
import ColorPickerModal from "./Components/ColorPickerModal";
import SecurityModal from "./Components/SecurityModal";
import "./styles.scss";

const backgrounds = Array.from(
    { length: 11 },
    (_, index) => `start${index + 1}`
);

const mockSurveyData: SurveyType = {
    id: 1,
    requesterId: 1,
    surveyTypeId: 1,
    surveyTopicId: 0,
    surveySpecificTopicId: 0,
    surveyStatusId: 1,
    securityModeId: 1,
    background: "start1",
    customBackgroundImageUrl: null,
    configJsonString: {
        backgroundGradient1Color: "#FCE38A",
        backgroundGradient2Color: "#F38181",
        titleColor: "#FFFFFF",
        contentColor: "#CCCCCC",
        buttonBackgroundColor: "#007bff",
        buttonContentColor: "#ffffff",
        password: "",
        brightness: 100,
    },
    description: "Mô tả khảo sát mặc định",
    title: "Tiêu đề khảo sát mặc định",
    questions: [],
    skipStartPage: false,
};

const fetchSurveyData = (): Promise<SurveyType> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockSurveyData);
        }, 500);
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const saveSurveyData = (data: SurveyType): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
};

const StartPage = ({ formData, setFormData, handleTabClick }: PageProps) => {
    const handleInputChange = (
        field: keyof SurveyType,
        value: string | boolean
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleToggleSkipStartPage = (checked: boolean) => {
        setSkipStartPage(checked);
        handleInputChange("skipStartPage", checked);
    };

    const handleStartSurvey = () => {
        saveSurveyData(formData)
            .then(() => {
                handleTabClick(1);
            })
            .catch((error) => {
                console.error("Error saving survey data (simulated):", error);
            });
    };

    const [skipStartPage, setSkipStartPage] = useState(false);
    const [brightness, setBrightness] = useState<number>(
        formData?.configJsonString?.brightness || 100
    );
    const [backgroundMode, setBackgroundMode] = useState<"image" | "color">(
        "image"
    );
    const [titleColor, setTitleColor] = useState<string>(
        formData?.configJsonString?.titleColor || "#FFFFFF"
    );
    const [contentColor, setContentColor] = useState<string>(
        formData?.configJsonString?.contentColor || "#CCCCCC"
    );
    const [buttonBgColor, setButtonBgColor] = useState<string>(
        formData?.configJsonString?.buttonBackgroundColor || "#007bff"
    );
    const [buttonTextColor, setButtonTextColor] = useState<string>(
        formData?.configJsonString?.buttonContentColor || "#ffffff"
    );
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showColorModal, setShowColorModal] = useState(false);
    const [activeColorSetter, setActiveColorSetter] = useState<React.Dispatch<
        React.SetStateAction<string>
    > | null>(null);
    const [pickerForBackground, setPickerForBackground] = useState(false);
    const [selectedSurveyTopic, setSelectedSurveyTopic] = useState<number>(
        formData?.surveyTopicId
    );
    const [selectedSurveySpecificTopic, setSelectedSurveySpecificTopic] =
        useState<number>(formData?.surveySpecificTopicId);
    const [surveyStatusChecked, setSurveyStatusChecked] = useState<boolean>(
        formData?.surveyStatusId === 1
    );
    const [selectedSecurityMode, setSelectedSecurityMode] = useState<number>(
        formData?.securityModeId
    );

    useEffect(() => {
        localStorage.setItem("surveyFormData", JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        const loadInitialData = async () => {
            let initialData: SurveyType;
            const savedFormData = localStorage.getItem("surveyFormData");

            if (savedFormData) {
                initialData = JSON.parse(savedFormData);
                if (!initialData.configJsonString) {
                    initialData.configJsonString = {
                        backgroundGradient1Color: "#FCE38A",
                        backgroundGradient2Color: "#F38181",
                        titleColor: "#FFFFFF",
                        contentColor: "#CCCCCC",
                        buttonBackgroundColor: "#007bff",
                        buttonContentColor: "#ffffff",
                        password: "",
                        brightness: 100,
                    };
                }
                if (initialData.customBackgroundImageUrl === undefined) {
                    initialData.customBackgroundImageUrl = null;
                }
                if (initialData.configJsonString?.brightness === undefined) {
                    initialData.configJsonString.brightness = 100; // Default brightness
                }
                if (initialData.skipStartPage === undefined) {
                    initialData.skipStartPage = false;
                }
                if (initialData.surveyStatusId === undefined) {
                    initialData.surveyStatusId = 1; // Default to active
                }
                if (initialData.securityModeId === undefined) {
                    initialData.securityModeId = 1; // Default to no password protection
                }
            } else {
                initialData = await fetchSurveyData();
            }
            setFormData(initialData);
            setSkipStartPage(initialData.skipStartPage || false);
            setSurveyStatusChecked(initialData.surveyStatusId === 1);
            setSelectedSecurityMode(initialData.securityModeId);
        };

        loadInitialData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setSelectedSurveyTopic(formData?.surveyTopicId);
        setSelectedSurveySpecificTopic(formData?.surveySpecificTopicId);
        setBrightness(formData?.configJsonString?.brightness);
        setSurveyStatusChecked(formData?.surveyStatusId === 1);
        setSelectedSecurityMode(formData?.securityModeId);

        if (
            formData?.background === "custom" &&
            formData?.customBackgroundImageUrl
        ) {
            setBackgroundMode("image");
        } else if (backgrounds.includes(formData?.background)) {
            setBackgroundMode("image");
        } else if (
            formData?.background?.startsWith("#") ||
            formData?.background === "color_gradient"
        ) {
            setBackgroundMode("color");
        }

        setTitleColor(formData?.configJsonString?.titleColor);
        setContentColor(formData?.configJsonString?.contentColor);
        setButtonBgColor(formData?.configJsonString?.buttonBackgroundColor);
        setButtonTextColor(formData?.configJsonString?.buttonContentColor);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, backgrounds]);

    const handleBrightnessChange = (
        _event: Event,
        newValue: number | number[]
    ) => {
        const newBrightness = newValue as number;
        setBrightness(newBrightness);
        setFormData((prev) => ({
            ...prev,
            configJsonString: {
                ...prev.configJsonString,
                brightness: newBrightness,
            },
        }));
    };

    const handleBackgroundUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setFormData((prev) => ({
                    ...prev,
                    background: "custom",
                    customBackgroundImageUrl: imageUrl,
                }));
                setBackgroundMode("image");
                const defaultConfig = handleSelectBackground("default_color");
                setTitleColor(defaultConfig.colors.titleColor);
                setContentColor(defaultConfig.colors.contentColor);
                setButtonBgColor(defaultConfig.colors.buttonBackgroundColor);
                setButtonTextColor(defaultConfig.colors.buttonContentColor);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectColorBackground = () => {
        setBackgroundMode("color");
        setFormData((prev) => ({
            ...prev,
            customBackgroundImageUrl: null,
            background: "color_gradient",
        })); // Set background to a color type
        setPickerForBackground(true);
        setShowColorModal(true);
    };

    const handleCustomizePassword = () => {
        setShowPasswordModal(true);
    };

    return (
        <div
            className="startpage-root flex"
            style={{ height: "100vh", overflow: "hidden" }}
        >
            <div
                className="relative flex-1 flex items-center justify-center"
                style={{
                    ...(backgroundMode === "color" && {
                        ...(formData?.background?.startsWith("#")
                            ? {
                                backgroundColor: formData?.background,
                                overflowY: "auto",
                            }
                            : {
                                background: `linear-gradient(to right, ${formData?.configJsonString.backgroundGradient1Color}, ${formData?.configJsonString.backgroundGradient2Color})`,
                                overflowY: "auto",
                            }),
                    }),
                }}
            >
                {backgroundMode === "image" && (
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${formData?.background})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            filter: `brightness(${(brightness ? brightness : 100) / 100})`,
                            backgroundColor: "transparent",
                        }}
                    ></div>
                )}
                <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-8">
                    <div className="startpage-content w-full text-center">
                        <input
                            type="text"
                            value={formData?.title}
                            onChange={(e) =>
                                handleInputChange("title", e.target.value)
                            }
                            className="startpage-title-input"
                            placeholder="Nhập tiêu đề"
                            style={{ color: titleColor }}
                        />
                        <input
                            value={formData?.description}
                            onChange={(e) =>
                                handleInputChange("description", e.target.value)
                            }
                            className="startpage-desc-input"
                            placeholder="Nhập mô tả tại đây"
                            style={{ color: contentColor }}
                        />
                        <button
                            onClick={handleStartSurvey}
                            className="startpage-btn group"
                            style={{
                                background:
                                    buttonBgColor?.startsWith(
                                        "linear-gradient"
                                    ) ||
                                        buttonBgColor?.startsWith("radial-gradient")
                                        ? buttonBgColor
                                        : "",
                                backgroundColor: !(
                                    buttonBgColor?.startsWith(
                                        "linear-gradient"
                                    ) ||
                                    buttonBgColor?.startsWith("radial-gradient")
                                )
                                    ? buttonBgColor
                                    : "",
                                color: buttonTextColor,
                            }}
                        >
                            <span>Bắt đầu</span>
                            <span className="startpage-icon-wrapper">
                                <ChevronRightIcon />
                            </span>
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
                                    checked={skipStartPage}
                                    onChange={(e) =>
                                        handleToggleSkipStartPage(
                                            e.target.checked
                                        )
                                    }
                                    aria-label="Bỏ qua trang bắt đầu"
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    <ToppicSurvey
                        selectedSurveyTopic={selectedSurveyTopic}
                        setSelectedSurveyTopic={setSelectedSurveyTopic}
                        selectedSurveySpecificTopic={
                            selectedSurveySpecificTopic
                        }
                        setSelectedSurveySpecificTopic={
                            setSelectedSurveySpecificTopic
                        }
                        setFormData={setFormData}
                    />
                    <SurveyStatus
                        surveyStatusChecked={surveyStatusChecked}
                        setSurveyStatusChecked={setSurveyStatusChecked}
                        setFormData={setFormData}
                    />
                    <div className="config-section">
                        <h3 className="config-title">
                            KHẢO SÁT TRÊN NỀN AUDIO
                        </h3>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-600">Bật</span>
                            <button className="buy-now-button">
                                Mua đi nè
                            </button>
                        </div>
                    </div>
                    <CustomizePassword
                        selectedSecurityMode={selectedSecurityMode}
                        setSelectedSecurityMode={setSelectedSecurityMode}
                        handleCustomizePassword={handleCustomizePassword}
                        setFormData={setFormData}
                    />
                    <SecurityMode
                        selectedSecurityMode={selectedSecurityMode}
                        setSelectedSecurityMode={setSelectedSecurityMode}
                        setFormData={setFormData}
                    />
                    <BackgroundMode
                        backgroundMode={backgroundMode}
                        setBackgroundMode={setBackgroundMode}
                        formData={formData}
                        handleBrightnessChange={handleBrightnessChange}
                        handleBackgroundUpload={handleBackgroundUpload}
                        handleSelectColorBackground={
                            handleSelectColorBackground
                        }
                        brightness={brightness}
                    />
                    <div className="w-full max-w-md mx-auto bg-white">
                        <SurveyContentTextColor
                            titleColor={titleColor}
                            contentColor={contentColor}
                            setTitleColor={setTitleColor}
                            setContentColor={setContentColor}
                            setShowColorModal={setShowColorModal}
                            setActiveColorSetter={setActiveColorSetter}
                        />
                        <ButtonColor
                            buttonBgColor={buttonBgColor}
                            setButtonBgColor={setButtonBgColor}
                            buttonTextColor={buttonTextColor}
                            setButtonTextColor={setButtonTextColor}
                            setShowColorModal={setShowColorModal}
                            setActiveColorSetter={setActiveColorSetter}
                        />
                        <DesignSuggestions
                            formData={formData}
                            backgrounds={backgrounds}
                            setFormData={setFormData}
                            setBackgroundMode={setBackgroundMode}
                            backgroundMode={backgroundMode}
                        />
                    </div>
                </div>
            </div>
            {showPasswordModal && (
                <SecurityModal
                    open={showPasswordModal}
                    onClose={() => setShowPasswordModal(false)}
                    onSavePassword={(newPassword) => {
                        setFormData((prev) => ({
                            ...prev,
                            securityModeId: newPassword ? 2 : 1,
                            configJsonString: {
                                ...prev.configJsonString,
                                password: newPassword,
                            },
                        }));
                    }}
                    initialPassword={formData?.configJsonString.password || ""}
                />
            )}
            {showColorModal && (
                <ColorPickerModal
                    open={showColorModal}
                    onClose={() => {
                        setShowColorModal(false);
                        setActiveColorSetter(null);
                        setPickerForBackground(false);
                    }}
                    onSelectColors={({ color1, color2 }) => {
                        if (pickerForBackground) {
                            setFormData((prev) => ({
                                ...prev,
                                configJsonString: {
                                    ...prev.configJsonString,
                                    backgroundGradient1Color: color1,
                                    backgroundGradient2Color: color2,
                                },
                                background:
                                    color1 !== color2
                                        ? "color_gradient"
                                        : color1,
                                customBackgroundImageUrl: null,
                            }));
                        } else if (activeColorSetter) {
                            if (activeColorSetter === setButtonBgColor) {
                                if (color1 !== color2) {
                                    activeColorSetter(
                                        `linear-gradient(to right, ${color1}, ${color2})`
                                    );
                                } else {
                                    activeColorSetter(color1);
                                }
                                setFormData((prev) => ({
                                    ...prev,
                                    configJsonString: {
                                        ...prev.configJsonString,
                                        buttonBackgroundColor:
                                            color1 !== color2
                                                ? `linear-gradient(to right, ${color1}, ${color2})`
                                                : color1,
                                    },
                                }));
                            } else {
                                activeColorSetter(color1);
                                setFormData((prev) => {
                                    const newConfig = {
                                        ...prev.configJsonString,
                                    };
                                    if (activeColorSetter === setTitleColor) {
                                        newConfig.titleColor = color1;
                                    } else if (
                                        activeColorSetter === setContentColor
                                    ) {
                                        newConfig.contentColor = color1;
                                    } else if (
                                        activeColorSetter === setButtonTextColor
                                    ) {
                                        newConfig.buttonContentColor = color1;
                                    }
                                    return {
                                        ...prev,
                                        configJsonString: newConfig,
                                    };
                                });
                            }
                        }
                        setShowColorModal(false);
                        setActiveColorSetter(null);
                        setPickerForBackground(false);
                    }}
                    initialColors={(() => {
                        let initialColor1 = "#FCE38A";
                        let initialColor2 = "#F38181";

                        if (pickerForBackground) {
                            initialColor1 =
                                formData?.configJsonString
                                    ?.backgroundGradient1Color || "#FCE38A";
                            initialColor2 =
                                formData?.configJsonString
                                    ?.backgroundGradient2Color || "#F38181";
                        } else if (activeColorSetter === setTitleColor) {
                            initialColor1 = titleColor;
                            initialColor2 = titleColor;
                        } else if (activeColorSetter === setContentColor) {
                            initialColor1 = contentColor;
                            initialColor2 = contentColor;
                        } else if (activeColorSetter === setButtonTextColor) {
                            initialColor1 = buttonTextColor;
                            initialColor2 = buttonTextColor;
                        } else if (activeColorSetter === setButtonBgColor) {
                            if (buttonBgColor?.startsWith("linear-gradient")) {
                                const colors = buttonBgColor.match(
                                    /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/g
                                );
                                if (colors && colors.length >= 2) {
                                    initialColor1 = colors[0];
                                    initialColor2 = colors[1];
                                } else {
                                    initialColor1 = "#FCE38A";
                                    initialColor2 = "#F38181";
                                }
                            } else if (buttonBgColor?.startsWith("#")) {
                                initialColor1 = buttonBgColor;
                                initialColor2 = buttonBgColor;
                            } else {
                                initialColor1 = "#FCE38A";
                                initialColor2 = "#F38181";
                            }
                        }
                        return [initialColor1, initialColor2];
                    })()}
                />
            )}
        </div>
    );
};

export default StartPage;

function ToppicSurvey({
    selectedSurveyTopic,
    setSelectedSurveyTopic,
    selectedSurveySpecificTopic,
    setSelectedSurveySpecificTopic,
    setFormData,
}: any) {
    return (
        <>
            <div className="config-section">
                <h3>CHỦ ĐỀ KHẢO SÁT</h3>
                <FormControl
                    fullWidth
                    sx={{
                        ".MuiOutlinedInput-root": {
                            height: "48px",
                            borderRadius: "8px",
                            border: "1px solid #D1D5DB",
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": { border: "none" },
                        },
                        ".MuiInputLabel-root": {
                            transform: "translate(14px, 14px) scale(1)",
                            "&.Mui-focused": {
                                transform: "translate(14px, -9px) scale(0.75)",
                            },
                            "&.MuiInputLabel-shrink": {
                                transform: "translate(14px, -9px) scale(0.75)",
                            },
                        },
                        ".MuiSelect-select": {
                            padding: "12px 14px",
                            display: "flex",
                            alignItems: "center",
                        },
                        ".MuiSelect-icon": {
                            right: "14px",
                            color: "#6B7280",
                        },
                    }}
                >
                    <Select
                        labelId="survey-topic-select-label"
                        id="survey-topic-select"
                        value={selectedSurveyTopic}
                        label="Chọn chủ đề"
                        onChange={(e) => {
                            const newTopicId = e.target.value as number;
                            setSelectedSurveyTopic(newTopicId);
                            setFormData((prev: any) => ({
                                ...prev,
                                surveyTopicId: newTopicId,
                                surveySpecificTopicId: 0,
                            }));
                            setSelectedSurveySpecificTopic(0);
                        }}
                    >
                        <MenuItem value={0}>Chọn chủ đề</MenuItem>
                        {SurveyTopic.map((topic) => (
                            <MenuItem key={topic.id} value={topic.id}>
                                {topic.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="config-section">
                <h3>CHỦ ĐỀ KHẢO SÁT CỤ THỂ</h3>
                <FormControl
                    fullWidth
                    sx={{
                        ".MuiOutlinedInput-root": {
                            height: "48px",
                            borderRadius: "8px",
                            border: "1px solid #D1D5DB",
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": { border: "none" },
                        },
                        ".MuiInputLabel-root": {
                            transform: "translate(14px, 14px) scale(1)",
                            "&.Mui-focused": {
                                transform: "translate(14px, -9px) scale(0.75)",
                            },
                            "&.MuiInputLabel-shrink": {
                                transform: "translate(14px, -9px) scale(0.75)",
                            },
                        },
                        ".MuiSelect-select": {
                            padding: "12px 14px",
                            display: "flex",
                            alignItems: "center",
                        },
                        ".MuiSelect-icon": {
                            right: "14px",
                            color: "#6B7280",
                        },
                    }}
                    disabled={!selectedSurveyTopic}
                >
                    <Select
                        labelId="survey-specific-topic-select-label"
                        id="survey-specific-topic-select"
                        value={selectedSurveySpecificTopic}
                        label="Chọn chủ đề cụ thể"
                        onChange={(e) => {
                            const newSpecificTopicId = e.target.value as number;
                            setSelectedSurveySpecificTopic(newSpecificTopicId);
                            setFormData((prev: any) => ({
                                ...prev,
                                surveySpecificTopicId: newSpecificTopicId,
                            }));
                        }}
                    >
                        <MenuItem value={0}>Chọn chủ đề cụ thể</MenuItem>
                        {SurveySpecificTopic.filter(
                            (topic) =>
                                topic.surveyTopicId === selectedSurveyTopic
                        ).map((topic) => (
                            <MenuItem key={topic.id} value={topic.id}>
                                {topic.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </>
    );
}

function SurveyStatus({
    surveyStatusChecked: surveyStatusChecked,
    setSurveyStatusChecked: setSurveyStatusChecked,
    setFormData: setFormData,
}: any) {
    return (
        <>
            <div className="config-section">
                <div className="flex items-center mb-3">
                    <h3 className="config-title">TRẠNG THÁI KHẢO SÁT</h3>
                </div>
                <div className="flex items-center justify-between">
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={surveyStatusChecked}
                            onChange={(e) => {
                                const newCheckedStatus = e.target.checked;
                                setSurveyStatusChecked(newCheckedStatus);
                                setFormData((prev: any) => ({
                                    ...prev,
                                    surveyStatusId: newCheckedStatus ? 1 : 2,
                                }));
                            }}
                            aria-label="Trạng thái khảo sát"
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>
        </>
    );
}

function CustomizePassword({
    selectedSecurityMode: selectedSecurityMode,
    setSelectedSecurityMode: setSelectedSecurityMode,
    handleCustomizePassword: handleCustomizePassword,
    setFormData: setFormData,
}: any) {
    return (
        <>
            <div className="config-section">
                <div className="flex items-center mb-3">
                    <h3 className="config-title">ĐẶT MẬT KHẨU CHO KHẢO SÁT</h3>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Bật</span>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={selectedSecurityMode === 2}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                setSelectedSecurityMode(isChecked ? 2 : 1);
                                setFormData((prev: any) => ({
                                    ...prev,
                                    securityModeId: isChecked ? 2 : 1,
                                    configJsonString: {
                                        ...prev.configJsonString,
                                        password: isChecked
                                            ? prev.configJsonString.password
                                            : "",
                                    },
                                }));
                            }}
                            aria-label="Đặt mật khẩu cho khảo sát"
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                {selectedSecurityMode === 2 && (
                    <button
                        className="customize-button"
                        onClick={handleCustomizePassword}
                    >
                        <SettingsIcon fontSize="small" />
                        <span>Tùy chỉnh</span>
                    </button>
                )}
            </div>
        </>
    );
}

function SecurityMode({
    selectedSecurityMode: selectedSecurityMode,
    setSelectedSecurityMode: setSelectedSecurityMode,
    setFormData: setFormData,
}: any) {
    return (
        <>
            <div>
                <h3>CHẾ ĐỘ BẢO MẬT</h3>
                <FormControl
                    fullWidth
                    sx={{
                        ".MuiOutlinedInput-root": {
                            height: "48px",
                            borderRadius: "8px",
                            border: "1px solid #D1D5DB",
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": { border: "none" },
                        },
                        ".MuiInputLabel-root": {
                            transform: "translate(14px, 14px) scale(1)",
                            "&.Mui-focused": {
                                transform: "translate(14px, -9px) scale(0.75)",
                            },
                            "&.MuiInputLabel-shrink": {
                                transform: "translate(14px, -9px) scale(0.75)",
                            },
                        },
                        ".MuiSelect-select": {
                            padding: "12px 14px",
                            display: "flex",
                            alignItems: "center",
                        },
                        ".MuiSelect-icon": {
                            right: "14px",
                            color: "#6B7280",
                        },
                    }}
                >
                    <Select
                        labelId="security-mode-select-label"
                        id="security-mode-select"
                        value={selectedSecurityMode}
                        label="Chọn chế độ bảo mật"
                        onChange={(e) => {
                            const newSecurityModeId = e.target.value as number;
                            setSelectedSecurityMode(newSecurityModeId);
                            setFormData((prev: any) => ({
                                ...prev,
                                securityModeId: newSecurityModeId,
                            }));
                        }}
                    >
                        {SurveySecurityMode.map((mode) => (
                            <MenuItem key={mode.id} value={mode.id}>
                                {mode.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </>
    );
}

function BackgroundMode({
    backgroundMode: backgroundMode,
    setBackgroundMode: setBackgroundMode,
    formData: formData,
    handleBrightnessChange: handleBrightnessChange,
    handleBackgroundUpload: handleBackgroundUpload,
    handleSelectColorBackground: handleSelectColorBackground,
    brightness: brightness,
}: any) {
    return (
        <>
            <div>
                <h3>SỬ DỤNG HÌNH NỀN</h3>
                <div
                    className={`background-main-preview ${backgroundMode === "image" ? "active" : ""
                        }`}
                    onClick={() => {
                        setBackgroundMode("image");
                        document.getElementById("backgroundInput")?.click();
                    }}
                    style={{
                        backgroundImage: `url(${formData?.background})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div
                        className="absolute bottom-4 left-4 z-10"
                        style={{
                            color: "white",
                            fontSize: "0.8rem",
                            opacity: 1,
                        }}
                    >
                        Click để đổi hình
                    </div>
                    <CheckIcon className="absolute main-check-icon" />
                    <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
                </div>
                <input
                    type="file"
                    id="backgroundInput"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBackgroundUpload}
                    aria-label="Tải lên hình nền"
                />
            </div>
            {backgroundMode === "image" && (
                <div>
                    <h3>ĐỘ SÁNG HÌNH NỀN</h3>
                    <Slider
                        value={brightness}
                        onChange={handleBrightnessChange}
                        aria-labelledby="brightness-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                        sx={{
                            color: "grey",
                            marginTop: "20px",
                            "& .MuiSlider-valueLabel": {
                                borderRadius: "50%",
                                backgroundColor: "grey",
                                color: "white",
                                fontSize: "0.5rem",
                            },
                        }}
                    />
                </div>
            )}
            <div>
                <h3>SỬ DỤNG MÀU NỀN</h3>
                <div
                    className={`background-main-preview ${backgroundMode === "color" ? "active" : ""
                        }`}
                    onClick={handleSelectColorBackground}
                    style={{
                        background:
                            formData?.background === "color_gradient"
                                ? `linear-gradient(to right, ${formData?.configJsonString.backgroundGradient1Color}, ${formData?.configJsonString.backgroundGradient2Color})`
                                : formData?.background?.startsWith("#")
                                    ? formData?.background
                                    : "#cccccc",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div
                        className="absolute bottom-4 left-4 z-10"
                        style={{
                            color: "white",
                            fontSize: "0.8rem",
                            opacity: 1,
                        }}
                    >
                        Click để đổi màu
                    </div>
                    <CheckIcon className="absolute main-check-icon" />
                    <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
                </div>
            </div>
        </>
    );
}

function SurveyContentTextColor({
    titleColor: titleColor,
    contentColor: contentColor,
    setTitleColor: setTitleColor,
    setContentColor: setContentColor,
    setShowColorModal: setShowColorModal,
    setActiveColorSetter: setActiveColorSetter,
}: any) {
    return (
        <>
            <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-6">
                    MÀU CHỮ CỦA NỘI DUNG KHẢO SÁT
                </h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 w-24">
                            Màu tiêu đề
                        </span>
                        <div className="flex-1 max-w-20">
                            <div
                                className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                                style={{ backgroundColor: titleColor }}
                                onClick={() => {
                                    setShowColorModal(true);
                                    setActiveColorSetter(() => setTitleColor);
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 w-24">
                            Màu nội dung
                        </span>
                        <div className="flex-1 max-w-20">
                            <div
                                className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                                style={{ backgroundColor: contentColor }}
                                onClick={() => {
                                    setShowColorModal(true);
                                    setActiveColorSetter(() => setContentColor);
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ButtonColor({
    buttonBgColor: buttonBgColor,
    setButtonBgColor: setButtonBgColor,
    buttonTextColor: buttonTextColor,
    setButtonTextColor: setButtonTextColor,
    setShowColorModal: setShowColorModal,
    setActiveColorSetter: setActiveColorSetter,
}: any) {
    return (
        <>
            <div>
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-6">
                    MÀU SẮC NÚT BẤM
                </h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 w-24">
                            Màu nền
                        </span>
                        <div className="flex-1 max-w-20">
                            <div
                                className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                                style={{
                                    background:
                                        buttonBgColor?.startsWith(
                                            "linear-gradient"
                                        ) ||
                                            buttonBgColor?.startsWith(
                                                "radial-gradient"
                                            )
                                            ? buttonBgColor
                                            : "",
                                    backgroundColor: !(
                                        buttonBgColor?.startsWith(
                                            "linear-gradient"
                                        ) ||
                                        buttonBgColor?.startsWith(
                                            "radial-gradient"
                                        )
                                    )
                                        ? buttonBgColor
                                        : "",
                                }}
                                onClick={() => {
                                    setShowColorModal(true);
                                    setActiveColorSetter(
                                        () => setButtonBgColor
                                    );
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 w-24">
                            Màu chữ
                        </span>
                        <div className="flex-1 max-w-20">
                            <div
                                className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                                style={{ backgroundColor: buttonTextColor }}
                                onClick={() => {
                                    setShowColorModal(true);
                                    setActiveColorSetter(
                                        () => setButtonTextColor
                                    );
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function DesignSuggestions({
    formData,
    backgrounds,
    setFormData,
    setBackgroundMode,
    backgroundMode,
}: {
    formData: any;
    backgrounds: any[];
    setFormData: any;
    setBackgroundMode: any;
    backgroundMode: "image" | "color";
}) {
    return (
        <>
            <div className="config-section">
                <h3 className="config-title">GỢI Ý THIẾT KẾ</h3>
                <div className="background-preview">
                    <div className="background-thumbnail">
                        <div className="grid grid-cols-5 gap-4">
                            {backgrounds.map((_item: any, index: number) => {
                                const selectedConfig = handleSelectBackground(
                                    `start${index + 1}`
                                );
                                return (
                                    <div
                                        key={index}
                                        className={`background-thumbnail-item ${formData?.background ===
                                            `/assets/start${index + 1
                                            }.webp` &&
                                            backgroundMode === "image"
                                            ? "active"
                                            : ""
                                            }`}
                                        onClick={() => {
                                            setFormData((prev: any) => ({
                                                ...prev,
                                                background: `/assets/start${index + 1
                                                    }.webp`,
                                                configJsonString: {
                                                    ...prev.configJsonString,
                                                    titleColor:
                                                        selectedConfig.colors
                                                            .titleColor,
                                                    contentColor:
                                                        selectedConfig.colors
                                                            .contentColor,
                                                    buttonBackgroundColor:
                                                        selectedConfig.colors
                                                            .buttonBackgroundColor,
                                                    buttonContentColor:
                                                        selectedConfig.colors
                                                            .buttonContentColor,
                                                },
                                            }));
                                            setBackgroundMode("image");
                                        }}
                                    >
                                        <img
                                            src={`/assets/start${index + 1
                                                }.webp`}
                                            alt="background"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
