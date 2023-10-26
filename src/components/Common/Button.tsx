import React from "react";
import { IpanelButton } from "../../interfaces";

const Button = ({
    text,
    onClick,
    id,
    selected,
    children,
    reference,
    disabled
}: IpanelButton) => {
    const getClasses = () => {
        let classes;
        switch (id) {
            case "СТЕРЕТЬ":
                classes = "p-[16px_39px] cursor-pointer w-[186px] border-2";
                break;
            case "confirm":
                classes =
                    "text-[#4E4E4E] p-[16px_19px] w-[284px] border border-[#4E4E4E]" +
                    (disabled ? "" : "cursor-pointer animate-bounce-x1");
                break;
            case "close":
                classes =
                    "w-[88px] cursor-pointer flex items-center justify-center border-2 absolute top-[20px] left-[1172px] z-[3]";
                break;
            default:
                classes = "p-[12px_30px] cursor-pointer w-[88px] border-2";
                break;
        }
        classes +=
            selected === id
                ? " bg-black border-white text-white"
                : id === "close"
                ? " bg-white border-black"
                : " border-black";
        return classes;
    };
    return (
        <button
            disabled={disabled}
            ref={reference}
            id={id}
            onClick={onClick}
            className={
                getClasses() +
                " h-[52px] transition-all text-center font-medium text-[16px] leading-[18.75px] "
            }
        >
            {children ? children : text}
        </button>
    );
};

export default Button;
