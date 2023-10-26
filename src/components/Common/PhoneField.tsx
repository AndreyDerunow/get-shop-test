import React, { ChangeEvent } from "react";
import formatePhone from "../../utils/formatePhone";
import { Iinput } from "../../interfaces";

const PhoneField = ({
    name,
    value,
    onChange,
    reference,
    isValid
}: Iinput<string>) => {
    const handleChange = ({
        target
    }: React.ChangeEvent<HTMLInputElement> | ClipboardEvent) => {
        const currentVal =
            "+7" +
            (target as HTMLInputElement).value
                .replaceAll(/\D/gm, "")
                .slice(1, 11);

        onChange({
            target: { value: currentVal }
        } as ChangeEvent<HTMLInputElement>);
    };

    return (
        <>
            <input
                ref={reference}
                className={
                    (isValid === "panding" ? "text-black" : "text-errorColor") +
                    " w-[267px] caret-transparent font-[Roboto] bg-mainColor h-[67px] font-bold text-[32px] leading-[37.5px] outline-none text-center"
                }
                type="text"
                id="phone"
                name={name}
                onChange={handleChange}
                value={formatePhone(value)}
            />
        </>
    );
};

export default PhoneField;
