import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import { Slider } from '@mui/material';
import React, { useEffect, useState } from "react";
import { HexColorPicker } from 'react-colorful';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { handleSelectBackground } from "../../../helpers/handleSelectBackground";
import type { SurveyType } from "../../../types/survey";
import "./styles.scss";

const backgrounds = Array.from(
    { length: 12 },
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

    const [skipStartPage, setSkipStartPage] = useState(false);
    const [audioSurvey, setAudioSurvey] = useState(false);
    const [passwordProtection, setPasswordProtection] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [brightness, setBrightness] = useState<number>(100);
    const [customBackgroundImageUrl, setCustomBackgroundImageUrl] = useState<string | null>(null);
    const [backgroundMode, setBackgroundMode] = useState<'image' | 'color'>('image');
    const [selectedColor, setSelectedColor] = useState<string>('#cccccc');
    const [titleColor, setTitleColor] = useState<string>('');
    const [contentColor, setContentColor] = useState<string>('');
    const [buttonBgColor, setButtonBgColor] = useState<string>('');
    const [buttonTextColor, setButtonTextColor] = useState<string>('');
    const currentBackground = customBackgroundImageUrl || handleSelectBackground(formData.background).imagePath;

    useEffect(() => {
        const initialConfig = handleSelectBackground(formData.background);
        setTitleColor(initialConfig.colors.titleColor);
        setContentColor(initialConfig.colors.contentColor);
        setButtonBgColor(initialConfig.colors.buttonBgColor);
        setButtonTextColor(initialConfig.colors.buttonTextColor);
    }, [formData.background]);

    const handleBrightnessChange = (event: Event, newValue: number | number[]) => {
        setBrightness(newValue as number);
    };

    const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCustomBackgroundImageUrl(reader.result as string);
                setFormData((prev) => ({ ...prev, background: 'custom' })); // Mark as custom if needed
                setBackgroundMode('image'); // Set background mode to image when an image is uploaded
                const customConfig = handleSelectBackground('custom');
                setTitleColor(customConfig.colors.titleColor);
                setContentColor(customConfig.colors.contentColor);
                setButtonBgColor(customConfig.colors.buttonBgColor);
                setButtonTextColor(customConfig.colors.buttonTextColor);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectColorBackground = () => {
        setBackgroundMode('color');
        setCustomBackgroundImageUrl(null); // Clear custom image URL when switching to color
        setFormData((prev) => ({ ...prev, background: selectedColor })); // Use selectedColor for background
    };

    return (
        <div className="startpage-root flex h-screen">
            <div
                className="relative flex-1 flex items-center justify-center"
                style={{
                    backgroundImage: backgroundMode === 'image' ? `url(${currentBackground})` : 'none',
                    backgroundColor: backgroundMode === 'color' ? (formData.background === 'default_color' ? '#cccccc' : formData.background) : 'transparent',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: backgroundMode === 'image' ? `brightness(${brightness / 100})` : 'none',
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
                                    onChange={(e) => setSkipStartPage(e.target.checked)}
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
                                    checked={audioSurvey}
                                    onChange={(e) => setAudioSurvey(e.target.checked)}
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
                                    checked={passwordProtection}
                                    onChange={(e) => setPasswordProtection(e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        {passwordProtection && (
                            <button className="customize-button">
                                <SettingsIcon fontSize="small" />
                                <span>Tùy chỉnh</span>
                            </button>
                        )}
                    </div>
                    <div className="config-section">
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
                    </div>
                    <div>
                        <h3>SỬ DỤNG HÌNH NỀN</h3>
                        <div
                            className={`background-main-preview ${backgroundMode === 'image' ? 'active' : ''}`}
                            onClick={() => {
                                setBackgroundMode('image');
                                document.getElementById('backgroundInput')?.click();
                            }}
                            style={{
                                backgroundImage: `url(${currentBackground})`,
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
                                backgroundColor: selectedColor,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute bottom-4 left-4 z-10" style={{ color: 'white', fontSize: '0.8rem', opacity: 1 }}>Click để đổi màu</div>
                            <CheckIcon className="absolute main-check-icon" />
                            <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
                        </div>
                        {backgroundMode === 'color' && (
                            <div className="color-picker-container" style={{ marginTop: '15px' }}>
                                <HexColorPicker color={selectedColor} onChange={(color) => {
                                    setSelectedColor(color);
                                    setFormData((prev) => ({ ...prev, background: color }));
                                }} />
                            </div>
                        )}
                    </div>
                    <div className="w-full max-w-md mx-auto bg-white">
                        {/* MÀU CHỮ CỦA NỘI DUNG KHẢO SÁT */}
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-6">
                                MÀU CHỮ CỦA NỘI DUNG KHẢO SÁT
                            </h3>

                            <div className="space-y-4">
                                {/* Màu tiêu đề */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 w-24">Màu tiêu đề</span>
                                    <div className="flex-1 max-w-20">
                                        <input
                                            type="color"
                                            value={titleColor}
                                            onChange={(e) => setTitleColor(e.target.value)}
                                            className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                                            style={{ backgroundColor: titleColor }}
                                        />
                                    </div>
                                </div>

                                {/* Màu nội dung */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 w-24">Màu nội dung</span>
                                    <div className="flex-1 max-w-20">
                                        <input
                                            type="color"
                                            value={contentColor}
                                            onChange={(e) => setContentColor(e.target.value)}
                                            className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                                            style={{ backgroundColor: contentColor }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MÀU SẮC NÚT BẤM */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-6">
                                MÀU SẮC NÚT BẤM
                            </h3>

                            <div className="space-y-4">
                                {/* Màu nền */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 w-24">Màu nền</span>
                                    <div className="flex-1 max-w-20">
                                        <input
                                            type="color"
                                            value={buttonBgColor}
                                            onChange={(e) => setButtonBgColor(e.target.value)}
                                            className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                                            style={{ backgroundColor: buttonBgColor }}
                                        />
                                    </div>
                                </div>

                                {/* Màu chữ */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 w-24">Màu chữ</span>
                                    <div className="flex-1 max-w-20">
                                        <input
                                            type="color"
                                            value={buttonTextColor}
                                            onChange={(e) => setButtonTextColor(e.target.value)}
                                            className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                                            style={{ backgroundColor: buttonTextColor }}
                                        />
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
                                            const isSelected = formData.background === item && !customBackgroundImageUrl;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`background-thumbnail-item ${isSelected && backgroundMode === 'image' ? 'active' : ''}`}
                                                    onClick={() => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            background: item,
                                                        }));
                                                        setBackgroundMode('image'); // Set background mode to image
                                                        setCustomBackgroundImageUrl(null); // Clear custom image URL
                                                        const selectedConfig = handleSelectBackground(item);
                                                        setTitleColor(selectedConfig.colors.titleColor);
                                                        setContentColor(selectedConfig.colors.contentColor);
                                                        setButtonBgColor(selectedConfig.colors.buttonBgColor);
                                                        setButtonTextColor(selectedConfig.colors.buttonTextColor);
                                                    }}
                                                >
                                                    <img
                                                        src={handleSelectBackground(item).imagePath}
                                                        alt="background"
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
        </div>
    );
};

export default StartPage;
