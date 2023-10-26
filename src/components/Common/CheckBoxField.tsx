import React from "react";
import { Iinput } from "../../interfaces";

const CheckboxField = ({
    name,
    onChange,
    value,
    selected
}: Iinput<boolean>) => {
    const getClasses = () => {
        return selected === "infoAgree"
            ? "border-white bg-black"
            : "border-black";
    };
    return (
        <div className="z-[1] relative h-[52px] w-[284px] flex justify-center items-center">
            <label
                className={
                    (selected === "infoAgree" && value
                        ? "text-black"
                        : "text-brownGray") +
                    " transition-all block text-[14px] leading-[16.41px] ml-[80px]"
                }
                htmlFor="infoAgree"
            >
                Согласие на обработку персональных данных
            </label>
            <input
                onChange={onChange}
                id="infoAgree"
                type="checkbox"
                checked={value}
                className="cursor-pointer opacity-0 absolute h-[40px] w-[40px] top-[5px] left-[20px] z-[1]"
                name={name}
            />
            <span
                className={
                    getClasses() +
                    " checkbox absolute h-[40px] left-6 border-[3px] w-[40px]"
                }
            ></span>
        </div>
    );
};

export default CheckboxField;
