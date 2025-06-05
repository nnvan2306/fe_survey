import { useState } from "react";
import type { PageProps, SurveyType } from "../../../types/survey";
import "./styles.scss";

const SharePage = ({ formData, setFormData }: PageProps) => {
    const [isResizableIframeEnabled, setIsResizableIframeEnabled] = useState(formData.configJsonString.isResizableIframeEnabled || false);

    const handleToggleResizableIframe = (checked: boolean) => {
        setIsResizableIframeEnabled(checked);
        setFormData((prev) => ({
            ...prev,
            configJsonString: {
                ...prev.configJsonString,
                isResizableIframeEnabled: checked,
            },
        }));
    };

    const getBackgroundMode = (data: SurveyType) => {
        if (data.background === 'custom' && data.customBackgroundImageUrl) {
            return 'image';
        } else if (data.background.startsWith('/assets/start')) {
            return 'image';
        } else if (data.background.startsWith('#') || data.background === 'color_gradient') {
            return 'color';
        }
        return 'image'; // Default to image mode
    };

    const backgroundMode = getBackgroundMode(formData);

    return (
        <div className="startpage-root flex" style={{ height: '100vh', overflow: 'hidden' }}>
            <div
                className="relative flex-1 flex items-center justify-center"
                style={{
                    ...(backgroundMode === 'image' && {
                        backgroundImage: `url(${formData.customBackgroundImageUrl || formData.background})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        filter: `brightness(${formData.configJsonString.brightness / 100})`,
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
                <div className="flex justify-center">
                    <div className="bg-white p-5 rounded-lg w-[1200px]">
                        <h3
                            className="text-2xl font-semibold mb-4 text-center"
                            style={{ color: formData.configJsonString.titleColor || '#ffffff' }}
                        >
                            CHIA SẺ KHẢO SÁT CỦA BẠN
                        </h3>
                        <p className="text-center">Sao chép đường dẫn sau và gửi cho bạn bè của bạn hoặc đáp viên</p>
                        <hr className="my-4 border-gray-300" />
                        <div className="text-center">
                            <p>Bạn phải hoàn tất khảo sát để nhận đường dẫn chia sẻ</p>
                            <hr className="my-4 border-gray-300" />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Hoàn tất
                            </button>
                            <hr className="my-4 border-gray-300" />
                        </div>
                    </div>
                </div>

            </div>
            <div
                className="startpage-options w-[420px] bg-white h-full overflow-y-auto shadow-lg p-8"
                style={{ overflowY: 'auto' }}
            >
                <div className="config-section">
                    <h3 className="config-title">TẠO ĐƯỜNG LINK RÚT GỌN</h3>
                    <div>
                        <div className="flex items-center justify-between">
                            <button style={{
                                backgroundImage: 'linear-gradient(-30deg, rgb(23, 234, 217), rgb(96, 120, 234))',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                            }} >Truy cập trang Quản lí link</button>
                        </div>
                    </div>
                </div>
                <div className="config-section">
                    <h3 className="config-title">RESIZABLE IFRAME</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">kích hoạt</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={isResizableIframeEnabled}
                                onChange={(e) => handleToggleResizableIframe(e.target.checked)}
                                aria-label="Bỏ qua trang bắt đầu"
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SharePage;
