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
    const [isCopyLink, setIsCopyLink] = useState(false);

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
                <div className="flex flex-col items-center gap-8">
                    <div className="bg-white p-8 rounded-lg  w-[1200px] shadow-lg">
                        <h3 className="text-xl font-bold text-center text-gray-800 mb-4"
                            style={{ color: formData.configJsonString.titleColor || '#000000' }}
                        >
                            CHIA SẺ KHẢO SÁT CỦA BẠN
                        </h3>
                        <div className="border-b-2 border-teal-400 w-20 mx-auto mb-6"></div>
                        <p className="text-center text-gray-600 text-[15px] mb-8">
                            Sao chép đường dẫn sau và gửi cho bạn bè của bạn hoặc đáp viên
                        </p>

                        <div className="border border-gray-300 rounded-lg p-4">
                            <p className="text-gray-700 text-[14px] mb-4">
                                Bạn phải hoàn tất khảo sát để nhận đường dẫn chia sẻ
                            </p>
                            <hr className="my-4 border-gray-300" />
                            <div className="flex justify-end">
                                <button className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors duration-200">
                                    Hoàn tất
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg w-[1200px] shadow-lg">
                        <h3 className="text-xl font-bold text-center text-gray-800 mb-4">LÀM VIỆC NHÓM</h3>
                        <div className="border-b-2 border-teal-400 w-20 mx-auto mb-6"></div>
                        <p className="text-center text-gray-600 text-[15px] mb-8">
                            Người được mời có quyền chỉnh sửa nội dung khảo sát, thiết lập các cài đặt và xem được báo cáo.
                        </p>
                        <div className="relative flex items-center border border-gray-300 rounded-lg pr-2">
                            <input
                                type="email"
                                placeholder="Nhập email tại đây"
                                className="w-full px-4 py-3 bg-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                            />
                            <button type="button" className="bg-teal-400 hover:bg-teal-500 text-white p-3 rounded-md transition-colors" aria-label="Gửi email">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg w-[1200px] shadow-lg mt-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">SỬ DỤNG KHẢO SÁT NÀY CHO NHIỀU ĐỊA ĐIỂM/NHÂN VIÊN KHÁC NHAU</h3>
                        <p className="text-gray-600 text-[15px] mb-8">
                            Bạn không cần phải tốn công sức tạo nhiều khảo sát cùng một nội dung cho nhiều địa điểm/nhân viên. Tính năng này giúp bạn quản lý được các phản hồi đến từ từng địa điểm/nhân viên khác nhau. Hãy thiết lập mã số cho từng địa điểm/nhân viên theo mô tả bên dưới. <a href="#" className="text-blue-600 underline">Xem thêm hướng dẫn tại đây!</a>
                        </p>
                        <div className="flex items-center justify-end">
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    aria-label="Kích hoạt tính năng sử dụng khảo sát cho nhiều địa điểm/nhân viên"
                                />
                                <span className="toggle-slider"></span>
                            </label>
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
                            }} onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/survey/share/${formData.id}`);
                                setIsCopyLink(true);
                                setTimeout(() => {
                                    setIsCopyLink(false);
                                }, 2000);
                            }}>{isCopyLink ? 'Đã sao chép' : 'Sao chép'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharePage;
