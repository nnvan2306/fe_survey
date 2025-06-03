import CheckIcon from '@mui/icons-material/Check';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import { FormControl, InputLabel, MenuItem, Select, Slider } from '@mui/material';
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { SurveySpecificTopic, SurveyTopic } from "../../../data/surveyData";
import { handleSelectBackground } from "../../../helpers/handleSelectBackground";
import type { PageProps, SurveyType } from "../../../types/survey";
import ColorPickerModal from './Components/ColorPickerModal';
import SecurityModal from './Components/SecurityModal';
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

const saveSurveyData = (data: SurveyType): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Simulating API call to save data:", data);
            resolve();
        }, 500);
    });
};

const StartPage = ({ formData, setFormData }: PageProps) => {
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
        console.log("Starting survey with data:", formData);
        saveSurveyData(formData)
            .then(() => {
                console.log("Survey data saved successfully (simulated).");
            })
            .catch((error) => {
                console.error("Error saving survey data (simulated):", error);
            });
    };

    const [skipStartPage, setSkipStartPage] = useState(false);
    const [audioSurvey, setAudioSurvey] = useState(false);
    const [passwordProtection, setPasswordProtection] = useState(formData.securityModeId === 2);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [brightness, setBrightness] = useState<number>(formData.configJsonString.brightness || 100);
    const [backgroundMode, setBackgroundMode] = useState<'image' | 'color'>('image');
    const [titleColor, setTitleColor] = useState<string>(formData.configJsonString.titleColor || '#FFFFFF');
    const [contentColor, setContentColor] = useState<string>(formData.configJsonString.contentColor || '#CCCCCC');
    const [buttonBgColor, setButtonBgColor] = useState<string>(formData.configJsonString.buttonBackgroundColor || '#007bff');
    const [buttonTextColor, setButtonTextColor] = useState<string>(formData.configJsonString.buttonContentColor || '#ffffff');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showColorModal, setShowColorModal] = useState(false);
    const [activeColorSetter, setActiveColorSetter] = useState<React.Dispatch<React.SetStateAction<string>> | null>(null);
    const [pickerForBackground, setPickerForBackground] = useState(false);
    const [selectedSurveyTopic, setSelectedSurveyTopic] = useState<number>(formData.surveyTopicId);
    const [selectedSurveySpecificTopic, setSelectedSurveySpecificTopic] = useState<number>(formData.surveySpecificTopicId);
    const [surveyStatusChecked, setSurveyStatusChecked] = useState<boolean>(formData.surveyStatusId === 1);

    useEffect(() => {
        localStorage.setItem('surveyFormData', JSON.stringify(formData));
        console.log("formData updated in localStorage:", formData.securityModeId, formData.configJsonString.password);
    }, [formData]);

    useEffect(() => {
        const loadInitialData = async () => {
            let initialData: SurveyType;
            const savedFormData = localStorage.getItem('surveyFormData');

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
                if (initialData.configJsonString.brightness === undefined) {
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
            setPasswordProtection(initialData.securityModeId === 2);
            console.log("Initial formData loaded:", initialData.securityModeId, initialData.configJsonString.password);
        };

        loadInitialData();
    }, []);

    console.log("buttonBgColor:", buttonBgColor);


    useEffect(() => {
        console.log("formData prop changed, synchronizing local states:", formData);

        setSelectedSurveyTopic(formData.surveyTopicId);
        setSelectedSurveySpecificTopic(formData.surveySpecificTopicId);
        setBrightness(formData.configJsonString.brightness);
        setSurveyStatusChecked(formData.surveyStatusId === 1);
        setPasswordProtection(formData.securityModeId === 2);
        console.log("Synchronized states with formData:", formData.securityModeId, formData.configJsonString.password);

        if (formData.background === 'custom' && formData.customBackgroundImageUrl) {
            setBackgroundMode('image');
        } else if (backgrounds.includes(formData.background)) {
            setBackgroundMode('image');
        } else if (formData.background.startsWith('#') || formData.background === 'color_gradient') {
            setBackgroundMode('color');
        }

        setTitleColor(formData.configJsonString.titleColor);
        setContentColor(formData.configJsonString.contentColor);
        setButtonBgColor(formData.configJsonString.buttonBackgroundColor);
        setButtonTextColor(formData.configJsonString.buttonContentColor);

    }, [formData, backgrounds]);

    const handleBrightnessChange = (event: Event, newValue: number | number[]) => {
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

    const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setFormData((prev) => ({
                    ...prev,
                    background: 'custom',
                    customBackgroundImageUrl: imageUrl,
                }));
                setBackgroundMode('image');
                const defaultConfig = handleSelectBackground('default_color');
                setTitleColor(defaultConfig.colors.titleColor);
                setContentColor(defaultConfig.colors.contentColor);
                setButtonBgColor(defaultConfig.colors.buttonBackgroundColor);
                setButtonTextColor(defaultConfig.colors.buttonContentColor);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectColorBackground = () => {
        setBackgroundMode('color');
        setFormData((prev) => ({ ...prev, customBackgroundImageUrl: null, background: 'color_gradient' })); // Set background to a color type
        setPickerForBackground(true);
        setShowColorModal(true);
    };

    const handleCustomizePassword = () => {
        setShowPasswordModal(true);
    };

    return (
        <div className="startpage-root flex h-screen">
            <div
                className="relative flex-1 flex items-center justify-center"
                style={{
                    ...(backgroundMode === 'image' && {
                        backgroundImage: `url(${formData.background})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        filter: `brightness(${brightness / 100})`,
                        backgroundColor: 'transparent',
                    }),
                    ...(backgroundMode === 'color' && {
                        ...(formData.background.startsWith('#') ? {
                            backgroundColor: formData.background,
                        } : {
                            background: `linear-gradient(to right, ${formData.configJsonString.backgroundGradient1Color}, ${formData.configJsonString.backgroundGradient2Color})`,
                        }),
                    }),
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
                            style={{ color: titleColor }}
                        />
                        <input
                            value={formData.description}
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
                                background: buttonBgColor.startsWith('linear-gradient') || buttonBgColor.startsWith('radial-gradient') ? buttonBgColor : '',
                                backgroundColor: !(buttonBgColor.startsWith('linear-gradient') || buttonBgColor.startsWith('radial-gradient')) ? buttonBgColor : '',
                                color: buttonTextColor
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
                                    onChange={(e) => handleToggleSkipStartPage(e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    <div className="config-section">
                        <h3>CHỦ ĐỀ KHẢO SÁT</h3>
                        <FormControl fullWidth sx={{
                            '.MuiOutlinedInput-root': {
                                height: '48px',
                                borderRadius: '8px',
                                border: '1px solid #D1D5DB',
                                '& fieldset': { border: 'none' },
                                '&:hover fieldset': { border: 'none' },
                                '&.Mui-focused fieldset': { border: 'none' },
                            },
                            '.MuiInputLabel-root': {
                                transform: 'translate(14px, 14px) scale(1)',
                                '&.Mui-focused': {
                                    transform: 'translate(14px, -9px) scale(0.75)',
                                },
                                '&.MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -9px) scale(0.75)',
                                },
                            },
                            '.MuiSelect-select': {
                                padding: '12px 14px',
                                display: 'flex',
                                alignItems: 'center',
                            },
                            '.MuiSelect-icon': {
                                right: '14px',
                                color: '#6B7280',
                            },
                        }}>
                            <InputLabel id="survey-topic-select-label">Chọn chủ đề</InputLabel>
                            <Select
                                labelId="survey-topic-select-label"
                                id="survey-topic-select"
                                value={selectedSurveyTopic}
                                label="Chọn chủ đề"
                                onChange={(e) => {
                                    const newTopicId = e.target.value as number;
                                    setSelectedSurveyTopic(newTopicId);
                                    setFormData((prev) => ({ ...prev, surveyTopicId: newTopicId, surveySpecificTopicId: 0 }));
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
                        <FormControl fullWidth sx={{
                            '.MuiOutlinedInput-root': {
                                height: '48px',
                                borderRadius: '8px',
                                border: '1px solid #D1D5DB',
                                '& fieldset': { border: 'none' },
                                '&:hover fieldset': { border: 'none' },
                                '&.Mui-focused fieldset': { border: 'none' },
                            },
                            '.MuiInputLabel-root': {
                                transform: 'translate(14px, 14px) scale(1)',
                                '&.Mui-focused': {
                                    transform: 'translate(14px, -9px) scale(0.75)',
                                },
                                '&.MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -9px) scale(0.75)',
                                },
                            },
                            '.MuiSelect-select': {
                                padding: '12px 14px',
                                display: 'flex',
                                alignItems: 'center',
                            },
                            '.MuiSelect-icon': {
                                right: '14px',
                                color: '#6B7280',
                            },
                        }} disabled={!selectedSurveyTopic}>
                            <InputLabel id="survey-specific-topic-select-label">Chọn chủ đề cụ thể</InputLabel>
                            <Select
                                labelId="survey-specific-topic-select-label"
                                id="survey-specific-topic-select"
                                value={selectedSurveySpecificTopic}
                                label="Chọn chủ đề cụ thể"
                                onChange={(e) => {
                                    const newSpecificTopicId = e.target.value as number;
                                    setSelectedSurveySpecificTopic(newSpecificTopicId);
                                    setFormData((prev) => ({ ...prev, surveySpecificTopicId: newSpecificTopicId }));
                                }}
                            >
                                <MenuItem value={0}>Chọn chủ đề cụ thể</MenuItem>
                                {SurveySpecificTopic.filter(
                                    (topic) => topic.surveyTopicId === selectedSurveyTopic
                                ).map((topic) => (
                                    <MenuItem key={topic.id} value={topic.id}>
                                        {topic.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="config-section">
                        <div className="flex items-center mb-3">
                            <h3 className="config-title">
                                TRẠNG THÁI KHẢO SÁT
                            </h3>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={surveyStatusChecked}
                                    onChange={(e) => {
                                        const newCheckedStatus = e.target.checked;
                                        setSurveyStatusChecked(newCheckedStatus);
                                        setFormData((prev) => ({
                                            ...prev,
                                            surveyStatusId: newCheckedStatus ? 1 : 2, // 1 for active, 2 for inactive
                                        }));
                                    }}
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
                            <button className="buy-now-button">Mua đi nè</button>
                        </div>

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
                                    checked={passwordProtection}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setPasswordProtection(isChecked);
                                        setFormData((prev) => ({
                                            ...prev,
                                            securityModeId: isChecked ? 2 : 1,
                                            configJsonString: {
                                                ...prev.configJsonString,
                                                password: isChecked ? prev.configJsonString.password : "",
                                            },
                                        }));
                                    }}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        {passwordProtection && (
                            <button className="customize-button"
                                onClick={handleCustomizePassword}>
                                <SettingsIcon fontSize="small" />
                                <span>Tùy chỉnh</span>
                            </button>
                        )}
                    </div>
                    {/* <div className="config-section">
                        <h3 className="config-title">NGÀY BẮT ĐẦU</h3>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date | null) => setStartDate(date)}
                            showTimeSelect
                            dateFormat="dd/MM/yyyy HH:mm"
                            customInput={
                                <button className={`date-picker-button ${startDate ? 'date-selected' : ''}`}>
                                    <AccessTimeIcon fontSize="small" />
                                    {startDate ? startDate.toLocaleDateString('vi-VN') + ' ' + startDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'Chọn ngày'}
                                    {startDate && <CloseIcon fontSize="small" className="clear-icon" onClick={(e) => { e.stopPropagation(); setStartDate(null); }} />}
                                </button>
                            }
                        />
                    </div>
                    <div className="config-section">
                        <h3 className="config-title">NGÀY KẾT THÚC</h3>
                        <DatePicker
                            selected={endDate}
                            onChange={(date: Date | null) => setEndDate(date)}
                            showTimeSelect
                            dateFormat="dd/MM/yyyy HH:mm"
                            customInput={
                                <button className={`date-picker-button ${endDate ? 'date-selected' : ''}`}>
                                    <AccessTimeIcon fontSize="small" />
                                    {endDate ? endDate.toLocaleDateString('vi-VN') + ' ' + endDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'Chọn ngày'}
                                    {endDate && <CloseIcon fontSize="small" className="clear-icon" onClick={(e) => { e.stopPropagation(); setEndDate(null); }} />}
                                </button>
                            }
                        />
                    </div> */}
                    <div>
                        <h3>SỬ DỤNG HÌNH NỀN</h3>
                        <div
                            className={`background-main-preview ${backgroundMode === 'image' ? 'active' : ''}`}
                            onClick={() => {
                                setBackgroundMode('image');
                                document.getElementById('backgroundInput')?.click();
                            }}
                            style={{
                                backgroundImage: `url(${formData.background})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute bottom-4 left-4 z-10" style={{ color: 'white', fontSize: '0.8rem', opacity: 1 }}>Click để đổi hình</div>
                            <CheckIcon className="absolute main-check-icon" />
                            <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
                        </div>
                        <input
                            type="file"
                            id="backgroundInput"
                            accept="image/*"
                            className="hidden"
                            onChange={handleBackgroundUpload}
                        />
                    </div>
                    {backgroundMode === 'image' && (
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
                                    color: 'grey',
                                    marginTop: '20px',
                                    '& .MuiSlider-valueLabel': {
                                        borderRadius: '50%',
                                        backgroundColor: 'grey',
                                        color: 'white',
                                        fontSize: '0.5rem',
                                    },
                                }}
                            />
                        </div>
                    )}
                    <div>
                        <h3>SỬ DỤNG MÀU NỀN</h3>
                        <div
                            className={`background-main-preview ${backgroundMode === 'color' ? 'active' : ''}`}
                            onClick={handleSelectColorBackground}
                            style={{
                                background: formData.background === 'color_gradient'
                                    ? `linear-gradient(to right, ${formData.configJsonString.backgroundGradient1Color}, ${formData.configJsonString.backgroundGradient2Color})`
                                    : (formData.background.startsWith('#') ? formData.background : '#cccccc'),
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute bottom-4 left-4 z-10" style={{ color: 'white', fontSize: '0.8rem', opacity: 1 }}>Click để đổi màu</div>
                            <CheckIcon className="absolute main-check-icon" />
                            <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
                        </div>
                    </div>
                    <div className="w-full max-w-md mx-auto bg-white">
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-6">
                                MÀU CHỮ CỦA NỘI DUNG KHẢO SÁT
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 w-24">Màu tiêu đề</span>
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
                                    <span className="text-sm text-gray-500 w-24">Màu nội dung</span>
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

                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-6">
                                MÀU SẮC NÚT BẤM
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 w-24">Màu nền</span>
                                    <div className="flex-1 max-w-20">
                                        <div
                                            className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                                            style={{
                                                background: buttonBgColor.startsWith('linear-gradient') || buttonBgColor.startsWith('radial-gradient') ? buttonBgColor : '',
                                                backgroundColor: !(buttonBgColor.startsWith('linear-gradient') || buttonBgColor.startsWith('radial-gradient')) ? buttonBgColor : '',
                                            }}
                                            onClick={() => {
                                                setShowColorModal(true);
                                                setActiveColorSetter(() => setButtonBgColor);
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 w-24">Màu chữ</span>
                                    <div className="flex-1 max-w-20">
                                        <div
                                            className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                                            style={{ backgroundColor: buttonTextColor }}
                                            onClick={() => {
                                                setShowColorModal(true);
                                                setActiveColorSetter(() => setButtonTextColor);
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="config-section">
                            <h3 className="config-title">GỢI Ý THIẾT KẾ</h3>
                            <div className="background-preview">
                                <div className="background-thumbnail">
                                    <div className="grid grid-cols-5 gap-4">
                                        {backgrounds.map((item, index) => {
                                            const selectedConfig = handleSelectBackground(`start${index + 1}`);
                                            return (
                                                <div
                                                    key={index}
                                                    className={`background-thumbnail-item ${formData.background === `/assets/start${index + 1}.webp` && backgroundMode === 'image' ? 'active' : ''}`}
                                                    onClick={() => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            background: `/assets/start${index + 1}.webp`,
                                                            configJsonString: {
                                                                ...prev.configJsonString,
                                                                titleColor: selectedConfig.colors.titleColor,
                                                                contentColor: selectedConfig.colors.contentColor,
                                                                buttonBackgroundColor: selectedConfig.colors.buttonBackgroundColor,
                                                                buttonContentColor: selectedConfig.colors.buttonContentColor,
                                                            },
                                                        }));
                                                        setBackgroundMode('image');
                                                    }}
                                                >
                                                    <img
                                                        src={`/assets/start${index + 1}.webp`}
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

                    </div>
                </div>
            </div >
            {showPasswordModal && (
                <SecurityModal
                    open={showPasswordModal}
                    onClose={() => setShowPasswordModal(false)}
                    onSavePassword={(newPassword) => {
                        setFormData((prev) => ({
                            ...prev,
                            securityModeId: newPassword ? 2 : 1, // Set to 2 if password is provided, 1 otherwise
                            configJsonString: {
                                ...prev.configJsonString,
                                password: newPassword,
                            },
                        }));
                    }}
                    initialPassword={formData.configJsonString.password || ''}
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
                                background: (color1 !== color2) ? 'color_gradient' : color1,
                                customBackgroundImageUrl: null,
                            }));
                        } else if (activeColorSetter) {
                            if (activeColorSetter === setButtonBgColor) {
                                if (color1 !== color2) {
                                    activeColorSetter(`linear-gradient(to right, ${color1}, ${color2})`);
                                } else {
                                    activeColorSetter(color1);
                                }
                                setFormData((prev) => ({
                                    ...prev,
                                    configJsonString: {
                                        ...prev.configJsonString,
                                        buttonBackgroundColor: (color1 !== color2) ? `linear-gradient(to right, ${color1}, ${color2})` : color1,
                                    },
                                }));
                            } else {
                                activeColorSetter(color1);
                                setFormData((prev) => {
                                    const newConfig = { ...prev.configJsonString };
                                    if (activeColorSetter === setTitleColor) {
                                        newConfig.titleColor = color1;
                                    } else if (activeColorSetter === setContentColor) {
                                        newConfig.contentColor = color1;
                                    } else if (activeColorSetter === setButtonTextColor) {
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
                        let initialColor1 = '#FCE38A';
                        let initialColor2 = '#F38181';

                        if (pickerForBackground) {
                            initialColor1 = formData.configJsonString.backgroundGradient1Color || '#FCE38A';
                            initialColor2 = formData.configJsonString.backgroundGradient2Color || '#F38181';
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
                            if (buttonBgColor.startsWith('linear-gradient')) {
                                const colors = buttonBgColor.match(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/g);
                                if (colors && colors.length >= 2) {
                                    initialColor1 = colors[0];
                                    initialColor2 = colors[1];
                                } else {
                                    initialColor1 = '#FCE38A';
                                    initialColor2 = '#F38181';
                                }
                            } else if (buttonBgColor.startsWith('#')) {
                                initialColor1 = buttonBgColor;
                                initialColor2 = buttonBgColor;
                            } else {
                                initialColor1 = '#FCE38A';
                                initialColor2 = '#F38181';
                            }
                        }
                        return [initialColor1, initialColor2];
                    })()}
                />
            )}
        </div >
    );
};

export default StartPage;