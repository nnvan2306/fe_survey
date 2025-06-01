import start1 from "../assets/start-page/start1.webp";
import start2 from "../assets/start-page/start2.webp";
import start3 from "../assets/start-page/start3.webp";
import start4 from "../assets/start-page/start4.webp";
import start5 from "../assets/start-page/start5.webp";
import start6 from "../assets/start-page/start6.webp";
import start7 from "../assets/start-page/start7.webp";
import start8 from "../assets/start-page/start8.webp";

export const handleSelectBackground = (background: string) => {
    switch (background) {
        case "start1":
            return start1;
        case "start2":
            return start2;
        case "start3":
            return start3;
        case "start4":
            return start4;
        case "start5":
            return start5;
        case "start6":
            return start6;
        case "start7":
            return start7;
        case "start8":
            return start8;
        case "default_color":
            return "";
        default:
            return start1;
    }
};
