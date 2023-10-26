import React from "react";
import PhoneField from "../Common/PhoneField";
import Button from "../Common/Button";
import { nanoid } from "nanoid";
import CheckboxField from "../Common/CheckBoxField";
import { IphonePannel } from "../../interfaces";
const PhonePanel = ({
    selected,
    confirmButtonRef,
    buttons,
    onClick,
    infoAgree,
    onChange,
    isAllPassed,
    onConfirm,
    phone,
    phoneInputRef,
    isPhoneValid
}: IphonePannel) => {
    return (
        <>
            <div className=" text-center text-[26px] leading-[30.47px]">
                Введите ваш номер мобильного телефона
            </div>
            <PhoneField
                isValid={isPhoneValid}
                reference={phoneInputRef}
                name="phone"
                value={phone}
                onChange={onChange}
            />
            <div className=" text-center w-[309px] text-[14px] leading-[16.41px]">
                и с Вами свяжется наш менеждер для <br /> дальнейшей
                консультации
            </div>
            <div className="flex gap-[10px] justify-center flex-wrap text-center">
                {buttons
                    .filter((arr) => arr.length > 1)
                    .flat()
                    .map((b) => (
                        <Button
                            selected={selected}
                            key={nanoid()}
                            id={b.toString()}
                            text={b.toString()}
                            onClick={onClick}
                        />
                    ))}
            </div>
            {isPhoneValid === "panding" ? (
                <CheckboxField
                    name="infoAgree"
                    value={infoAgree}
                    onChange={onChange}
                    selected={selected}
                />
            ) : (
                <div className="w-[284px] h-[52px] flex items-center justify-center font-medium text-[16px] leading-[18.75px] text-[#EA0000]">
                    НЕВЕРНО ВВЕДЕН НОМЕР
                </div>
            )}
            <Button
                disabled={!isAllPassed}
                reference={confirmButtonRef}
                text="ПОДТВЕРДИТЕ НОМЕР"
                id="confirm"
                selected={selected}
                onClick={onConfirm}
            />
        </>
    );
};

export default PhonePanel;
