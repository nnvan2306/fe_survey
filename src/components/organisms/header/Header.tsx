import React from "react";
import "./styles.scss";
import logo from "../../../assets/svg/logo.svg";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";

const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
        <header className="header-root flex items-center justify-between px-8 py-3 bg-white shadow-sm">
            <div className="flex items-center gap-8">
                <img
                    src={logo}
                    alt="Logo"
                    className="header-logo"
                    onClick={() => navigate(routesMap.Home)}
                />
                <nav className="flex items-center gap-6">
                    <a
                        href="#"
                        className="header-link font-semibold"
                        onClick={() => navigate(routesMap.SurveyNew)}
                    >
                        TẠO KHẢO SÁT
                    </a>
                    <a
                        href="#"
                        className="header-link font-semibold"
                        onClick={() => navigate(routesMap.MySurvey)}
                    >
                        KHẢO SÁT CỦA TÔI
                    </a>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <span className="header-username">van23062003</span>
                <div className="header-avatar flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-400 text-white font-bold rounded-full w-10 h-10">
                    VA
                </div>
            </div>
        </header>
    );
};

export default Header;
