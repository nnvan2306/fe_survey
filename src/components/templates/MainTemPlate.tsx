import React from "react";
import Header from "../organisms/header/Header";

type Props = { children: React.ReactNode };
const MainTemPlate = ({ children }: Props) => {
    return (
        <div>
            <div className="">
                <Header />
                <div>{children}</div>
            </div>
        </div>
    );
};

export default MainTemPlate;
