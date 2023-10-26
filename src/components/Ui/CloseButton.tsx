import React from "react";
import Button from "../Common/Button";
import { IpanelButton } from "../../interfaces";

const CloseButton = ({ selected, onClick, reference }: IpanelButton) => {
    const getCloseButtonSpanClasses = (selected: string) => {
        return selected === "close" ? "border-white" : "border-black";
    };
    return (
        <Button
            reference={reference}
            onClick={onClick}
            id="close"
            selected={selected}
        >
            <span
                className={
                    getCloseButtonSpanClasses(selected) +
                    " w-[28.68px] border-[3px] absolute border-black t-[36.28px] l-[34.72px] rotate-45"
                }
            ></span>
            <span
                className={
                    getCloseButtonSpanClasses(selected) +
                    " w-[28.68px] border-[3px] absolute border-black t-[16px] l-[33.28px] rotate-[-45deg]"
                }
            ></span>
        </Button>
    );
};

export default CloseButton;
