import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, { useEffect, useState } from 'react';
import styles from './ColorPickerModal.module.scss'; // Using its own styles
// import CloseIcon from '@mui/icons-material/Close'; // No longer needed for individual color removal

interface ColorPickerModalProps {
    open: boolean;
    onClose: () => void;
    onSelectColors: (colors: { color1: string; color2: string }) => void; // Changed to accept an object with two colors
    initialColors: string[]; // Still accepts an array, but we'll use first two elements
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({ open, onClose, onSelectColors, initialColors }) => {
    // Assuming initialColors will always have at least two elements, or we default them
    const [color1, setColor1] = useState(initialColors[0] || '#FCE38A'); // Default to a color from the image
    const [color2, setColor2] = useState(initialColors[1] || '#F38181'); // Default to a color from the image
    const [isGradientMode, setIsGradientMode] = useState(false);

    useEffect(() => {
        if (initialColors.length >= 2) {
            setColor1(initialColors[0]);
            setColor2(initialColors[1]);
        } else if (initialColors.length === 1) {
            setColor1(initialColors[0]);
            setColor2('#F38181'); // Default second color if only one is provided
        } else {
            setColor1('#FCE38A'); // Default both if none are provided
            setColor2('#F38181');
        }
    }, [initialColors]);

    const handleSubmit = () => {
        if (!isGradientMode) {
            onSelectColors({ color1, color2: color1 });
        } else {
            onSelectColors({ color1, color2 });
        }
        onClose();
    };

    return (
        <div className={`${styles['modal-background']} fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 ease-out' : 'opacity-0 ease-in pointer-events-none'}`}>
            <div
                className={`${styles['modal-container']} w-full max-w-lg`}
                style={{
                    background: isGradientMode ? `linear-gradient(to right, ${color1}, ${color2})` : color1,
                }}
            > {/* Increased max-width for two columns */}
                {/* Header */}
                <div className={`flex items-center justify-between px-6 py-4 ${styles['modal-header']}`}>
                    <h2 className={`${styles['modal-title']}`}>
                        CHỌN MÀU NỀN
                    </h2>
                </div>

                {/* Content */}
                <div className="px-6 py-8">
                    <div className="flex flex-col items-center">
                        <span className="text-gray-600 mb-4">Nhấn vào mã màu để đổi</span>
                        <div className="flex space-x-4 w-full">

                            {/* Color Input 1 */}
                            <div className={`flex transition-all duration-300 ${isGradientMode ? 'flex-1' : 'w-[80%]'}`}>
                                <label
                                    className={`relative flex items-center justify-between py-2 shadow-md cursor-pointer ${isGradientMode ? 'rounded-l-none rounded-r-full pr-4' : 'rounded-full px-4'}`}
                                    style={{ backgroundColor: color1 }}
                                >
                                    <input
                                        type="text"
                                        value={color1.replace('#', '').toUpperCase()}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^[0-9A-Fa-f]{0,6}$/.test(value)) {
                                                setColor1('#' + value);
                                            }
                                        }}
                                        className="py-1 text-center text-lg font-mono bg-transparent outline-none uppercase border-none focus:ring-0 flex-grow text-black pl-2"
                                    />
                                    {isGradientMode ? (
                                        <ChevronLeftIcon
                                            className="h-6 w-6 text-gray-700 cursor-pointer relative z-10 shadow-md"
                                            onClick={() => setIsGradientMode(!isGradientMode)}
                                        />
                                    ) : (
                                        <ChevronRightIcon
                                            className="h-6 w-6 text-gray-700 cursor-pointer relative z-10 shadow-md"
                                            onClick={() => setIsGradientMode(!isGradientMode)}
                                        />
                                    )}
                                    <input
                                        type="color"
                                        value={color1}
                                        onChange={(e) => setColor1(e.target.value)}
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </label>
                            </div>

                            {/* Color Input 2 */}
                            <div className={`flex transition-all duration-300 ${isGradientMode ? 'flex-1 flex' : 'w-0 hidden'}`}>
                                <label
                                    className={`relative flex items-center justify-between py-2 shadow-md cursor-pointer ${isGradientMode ? 'rounded-l-full rounded-r-none pl-4' : 'rounded-full px-4'}`}
                                    style={{ backgroundColor: color2 }}
                                >
                                    <input
                                        type="text"
                                        value={color2.replace('#', '').toUpperCase()}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^[0-9A-Fa-f]{0,6}$/.test(value)) {
                                                setColor2('#' + value);
                                            }
                                        }}
                                        className="py-1 text-center text-lg font-mono bg-transparent outline-none uppercase border-none focus:ring-0 flex-grow text-black pr-2"
                                    />
                                    <input
                                        type="color"
                                        value={color2}
                                        onChange={(e) => setColor2(e.target.value)}
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={`flex justify-end px-6 py-4 ${styles['modal-footer']}`}>
                    <button
                        onClick={handleSubmit}
                        className={`${styles['submit-button']} px-6 py-2 transition-colors`}
                    >
                        XÁC NHẬN
                    </button>
                    <button
                        onClick={onClose}
                        className="ml-4 px-6 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                        HUỶ BỎ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ColorPickerModal; 