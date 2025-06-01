import start1 from "../assets/start-page/start1.webp";
import start10 from "../assets/start-page/start10.webp";
import start11 from "../assets/start-page/start11.webp";
import start12 from "../assets/start-page/start12.webp";
import start2 from "../assets/start-page/start2.webp";
import start3 from "../assets/start-page/start3.webp";
import start4 from "../assets/start-page/start4.webp";
import start6 from "../assets/start-page/start6.webp";
import start7 from "../assets/start-page/start7.webp";
import start8 from "../assets/start-page/start8.webp";
import start9 from "../assets/start-page/start9.webp";

interface BackgroundConfig {
    imagePath: string;
    colors: {
        titleColor: string;
        contentColor: string;
        buttonBgColor: string;
        buttonTextColor: string;
    };
}

const defaultColors = {
    titleColor: "#2f2f2f",
    contentColor: "#444444",
    buttonBgColor: "#f75c83",
    buttonTextColor: "#ffffff",
};

const backgroundConfigs: Record<string, Omit<BackgroundConfig, 'imagePath'> & { imagePath?: string }> = {
    start1: { imagePath: start1, colors: { ...defaultColors, buttonBgColor: "#FEC347" } },
    start2: { imagePath: start2, colors: { ...defaultColors, buttonBgColor: "#FCBC72" } },
    start3: { imagePath: start3, colors: { ...defaultColors, buttonBgColor: "#BC73BC" } },
    start4: { imagePath: start4, colors: { ...defaultColors, buttonBgColor: "#4EA295" } },
    start11: { imagePath: start11, colors: { ...defaultColors, buttonBgColor: "linear-gradient(to right, #F52828, #E84F4F)" } },
    start6: { imagePath: start6, colors: { ...defaultColors, buttonBgColor: "#BC6235" } },
    start7: { imagePath: start7, colors: { ...defaultColors, buttonBgColor: "linear-gradient(to right, #F27186, #F83D6E)" } },
    start8: { imagePath: start8, colors: { ...defaultColors, buttonBgColor: "linear-gradient(to right, #19A0BB, #1CB3D1)" } },
    start9: { imagePath: start9, colors: { ...defaultColors, buttonBgColor: "#027186" } },
    start10: { imagePath: start10, colors: { ...defaultColors, buttonBgColor: "#6EAF99" } },
    start12: { imagePath: start12, colors: { ...defaultColors, buttonBgColor: "#00BBC1" } },
    default_color: { imagePath: "", colors: { ...defaultColors } },
    custom: { colors: { ...defaultColors } }, // For custom uploaded images
};

export const handleSelectBackground = (background: string): BackgroundConfig => {
    const config = backgroundConfigs[background] || backgroundConfigs.start1;

    return {
        imagePath: config.imagePath || "",
        colors: config.colors,
    };
};
