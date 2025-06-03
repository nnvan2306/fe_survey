// import start1 from "/assets/start1.webp";
// import start10 from "/assets/start10.webp";
// import start11 from "/assets/start11.webp";
// import start12 from "/assets/start12.webp";
// import start2 from "/assets/start2.webp";
// import start3 from "/assets/start3.webp";
// import start4 from "/assets/start4.webp";
// import start6 from "/assets/start6.webp";
// import start7 from "/assets/start7.webp";
// import start8 from "/assets/start8.webp";
// import start9 from "/assets/start9.webp";

interface BackgroundConfig {
    imagePath: string;
    colors: {
        titleColor: string;
        contentColor: string;
        buttonBackgroundColor: string;
        buttonContentColor: string;
    };
}

interface ConfigJsonString {
    backgroundGradient1Color: string;
    backgroundGradient2Color: string;
    titleColor: string;
    contentColor: string;
    buttonBackgroundColor: string;
    buttonContentColor: string;
    password: string;
}

const defaultColors = {
    titleColor: "#2f2f2f",
    contentColor: "#444444",
    buttonBackgroundColor: "#f75c83",
    buttonContentColor: "#ffffff",
};

const backgroundConfigs: Record<string, Omit<BackgroundConfig, 'imagePath'> & { imagePath?: string }> = {
    start1: { imagePath: "/assets/start1.webp", colors: { ...defaultColors, buttonBackgroundColor: "#FEC347" } },
    start2: { imagePath: "/assets/start2.webp", colors: { ...defaultColors, buttonBackgroundColor: "#FCBC72" } },
    start3: { imagePath: "/assets/start3.webp", colors: { ...defaultColors, buttonBackgroundColor: "#BC73BC" } },
    start4: { imagePath: "/assets/start4.webp", colors: { ...defaultColors, buttonBackgroundColor: "#4EA295" } },
    start6: { imagePath: "/assets/start6.webp", colors: { ...defaultColors, buttonBackgroundColor: "#BC6235" } },
    start7: { imagePath: "/assets/start7.webp", colors: { ...defaultColors, buttonBackgroundColor: "linear-gradient(to right, #F27186, #F83D6E)" } },
    start8: { imagePath: "/assets/start8.webp", colors: { ...defaultColors, buttonBackgroundColor: "linear-gradient(to right, #19A0BB, #1CB3D1)" } },
    start9: { imagePath: "/assets/start9.webp", colors: { ...defaultColors, buttonBackgroundColor: "#027186" } },
    start10: { imagePath: "/assets/start10.webp", colors: { ...defaultColors, buttonBackgroundColor: "#6EAF99" } },
    start11: { imagePath: "/assets/start11.webp", colors: { ...defaultColors, buttonBackgroundColor: "linear-gradient(to right, #F52828, #E84F4F)" } },
    start12: { imagePath: "/assets/start12.webp", colors: { ...defaultColors, buttonBackgroundColor: "#00BBC1" } },
    default_color: {
        imagePath: "",
        colors: {
            titleColor: "#2f2f2f",
            contentColor: "#444444",
            buttonBackgroundColor: "#f75c83",
            buttonContentColor: "#ffffff",
        },
    },
    custom: { colors: { ...defaultColors } }, // For custom uploaded images
};

export const handleSelectBackground = (background: string, configJsonString?: ConfigJsonString): BackgroundConfig => {
    if (background === 'color_gradient' && configJsonString) {
        return {
            imagePath: "",
            colors: {
                ...defaultColors,
                buttonBackgroundColor: defaultColors.buttonBackgroundColor,
                buttonContentColor: defaultColors.buttonContentColor,
            },
        };
    }
    console.log("check background: ", background)
    const config = backgroundConfigs[background] || backgroundConfigs.start1;

    return {
        imagePath: config.imagePath || "",
        colors: config.colors,
    };
};
