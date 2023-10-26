import React, { useEffect, useCallback, useRef } from "react";
import { useState } from "react";
import { IbuttonProps, Icoords, IkeyEvent } from "../../interfaces";
import validatePhone from "../../utils/validatePhone";
import Info from "./Info";
import CloseButton from "./CloseButton";
import Loader from "../Common/Loader";
import PanelBanner from "./PanelBanner";
import getCoords from "../../utils/getCoords";
import PhonePanel from "./PhonePanel";

const Panel = ({ onClose, closeButtonRef }: Omit<IbuttonProps, "onOpen">) => {
    const defaultSelected: Icoords = {
        x: "none",
        y: "none"
    };
    const [isValidating, setValidating] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>("+7");
    const [isPhoneValid, setPhoneValid] = useState<boolean | "panding">(
        "panding"
    );
    const [infoAgree, setInfoAgree] = useState<boolean>(false);
    const [selected, setSelected] = useState<Icoords>(defaultSelected);
    const [isAllPassed, setIsAllPassed] = useState<boolean>(false);
    const selectedRef = useRef<Icoords | null>(null);
    const confirmButtonRef = useRef<HTMLButtonElement>(null);
    const phoneRef = useRef<string | null>(null);
    const isPhoneValidRef = useRef<boolean | "panding" | null>(null);
    const isAllPassedRef = useRef<boolean | null>(null);
    selectedRef.current = selected;
    isAllPassedRef.current = isAllPassed;
    isPhoneValidRef.current = isPhoneValid;
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const getButtons = (): string[][] => {
        const result = [];
        const infoAgree = ["infoAgree"];
        const confirm = ["confirm"];
        const close = ["close"];
        const phone = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["0", "СТЕРЕТЬ"]
        ];
        if (isPhoneValidRef.current != true) result.push(...phone);
        if (isPhoneValidRef.current == "panding") result.push(infoAgree);
        if (isAllPassedRef.current && !(isPhoneValid == true))
            result.push(confirm);
        result.push(close);
        return result;
    };
    const buttons = getButtons();
    const buttonsRef = useRef<string[][] | null>(null);
    buttonsRef.current = buttons;
    const phoneInputRef = useRef<HTMLInputElement>(null);
    phoneRef.current = phone;
    useEffect(() => {
        document.addEventListener("keydown", arrowController);
        return () => document.removeEventListener("keydown", arrowController);
    }, [selected]);
    useEffect(() => {
        phoneInputRef.current &&
            (phoneInputRef.current as HTMLInputElement).focus();

        ["click", "contextmenu", "mousemove", "keydown", "wheel"].forEach(
            (e) => {
                window.addEventListener(e, trackUserMoves);
            }
        );
        return () => {
            clearTimeout(timeoutRef.current!);
            ["click", "contextmenu", "mousemove", "keydown", "wheel"].forEach(
                (e) => {
                    window.removeEventListener(e, trackUserMoves);
                }
            );
        };
    });
    useEffect(() => {
        setIsAllPassed(() => phone.length === 12 && infoAgree);
    }, [phone.length, infoAgree]);
    const arrowController = useCallback((e: IkeyEvent): void => {
        if (selectedRef.current && phoneRef.current && buttonsRef.current) {
            const { x, y } = selectedRef.current;
            switch (e.keyCode) {
                case 8:
                    e.preventDefault();
                    trackUserMoves();
                    resumePanding();
                    if (phoneRef.current.length > 2) {
                        setPhone((prev) => prev.slice(0, prev.length - 1));
                    }
                    break;
                case 13:
                    e.preventDefault();
                    trackUserMoves();
                    if (x !== "none" && y !== "none") {
                        switch (buttonsRef.current[y][x]) {
                            case "СТЕРЕТЬ":
                                if (phoneRef.current.length > 2) {
                                    resumePanding();
                                    setPhone((prev) =>
                                        prev.slice(0, prev.length - 1)
                                    );
                                }
                                break;
                            case "confirm":
                                (
                                    confirmButtonRef.current as HTMLButtonElement
                                ).click();
                                break;
                            case "close":
                                (
                                    closeButtonRef.current as HTMLButtonElement
                                ).click();

                                break;
                            case "infoAgree":
                                setInfoAgree((prev) => !prev);
                                break;
                            default:
                                if (phoneRef.current.length < 12) {
                                    setPhone(
                                        (prev) =>
                                            prev + buttonsRef.current![y][x]
                                    );
                                }
                                break;
                        }
                    }
                    break;
                case 37:
                    e.preventDefault();
                    trackUserMoves();
                    if (x === "none") {
                        setSelected(() => getCoords("4", buttonsRef.current!));
                    } else if (buttonsRef.current.length === 1) {
                        setSelected(() => ({
                            x: 0,
                            y: 0
                        }));
                    } else {
                        const updatedY =
                            +y !== buttonsRef.current.length - 1 ? +y : 0;
                        const updatedX =
                            +x - 1 > -1
                                ? +x - 1
                                : +y !== buttonsRef.current.length - 1
                                ? +x
                                : buttonsRef.current[0].length - 1;
                        setSelected(() => ({
                            x: updatedX,
                            y: updatedY
                        }));
                    }
                    break;
                case 38:
                    e.preventDefault();
                    trackUserMoves();
                    if (x === "none") {
                        setSelected(() => getCoords("2", buttonsRef.current!));
                    } else if (buttonsRef.current.length === 1) {
                        setSelected(() => ({
                            x: 0,
                            y: 0
                        }));
                    } else {
                        const updatedY =
                            +y - 1 > -1
                                ? +y - 1
                                : buttonsRef.current.length - 1;
                        const updatedX =
                            y === buttonsRef.current.length - 1
                                ? 0
                                : buttonsRef.current[updatedY].length - 1 >= +x
                                ? x
                                : buttonsRef.current[updatedY].length - 1;
                        setSelected(() => ({
                            x: updatedX,
                            y: updatedY
                        }));
                    }
                    break;
                case 39:
                    e.preventDefault();
                    trackUserMoves();
                    if (x === "none") {
                        setSelected(() => getCoords("6", buttonsRef.current!));
                    } else if (buttonsRef.current.length === 1) {
                        setSelected(() => ({
                            x: 0,
                            y: 0
                        }));
                    } else {
                        const updatedY =
                            +x !== buttonsRef.current[+y].length - 1
                                ? +y
                                : buttonsRef.current.length - 1;
                        const updatedX =
                            +x + 1 <= buttonsRef.current[+y].length - 1
                                ? +x + 1
                                : 0;
                        setSelected(() => ({
                            x: updatedX,
                            y: updatedY
                        }));
                    }
                    break;
                case 40:
                    e.preventDefault();
                    trackUserMoves();
                    if (x === "none") {
                        setSelected(() => getCoords("8", buttonsRef.current!));
                    } else if (buttonsRef.current.length === 1) {
                        setSelected(() => ({
                            x: 0,
                            y: 0
                        }));
                    } else {
                        const updatedY =
                            +y + 1 <= buttonsRef.current.length - 1
                                ? +y + 1
                                : 0;
                        const updatedX =
                            +y === buttonsRef.current.length - 1
                                ? 0
                                : buttonsRef.current[updatedY].length - 1 >= +x
                                ? x
                                : buttonsRef.current[updatedY].length - 1;
                        setSelected(() => ({
                            x: updatedX,
                            y: updatedY
                        }));
                    }
                    break;
                default:
                    break;
            }
        }
    }, []);
    const trackUserMoves = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            ["click", "contextmenu", "mousemove", "keydown", "wheel"].forEach(
                (e) => {
                    window.removeEventListener(e, trackUserMoves);
                }
            );
            closeButtonRef &&
                closeButtonRef.current &&
                closeButtonRef.current.click();
        }, 10000);
    }, []);
    const handleClick = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
        setSelected(() =>
            getCoords(
                (target as HTMLButtonElement).id.toString(),
                buttonsRef.current!
            )
        );
        if ((target as HTMLButtonElement).id.toString() === "СТЕРЕТЬ") {
            if (phoneRef.current && phoneRef.current.length > 2) {
                resumePanding();
                setPhone((prev) => prev.slice(0, prev.length - 1));
            }
        } else {
            if (phoneRef.current && phoneRef.current.length < 12) {
                setPhone(
                    (prev) => prev + (target as HTMLButtonElement).id.toString()
                );
            }
        }
    };
    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        if ((target as HTMLInputElement).name === "infoAgree") {
            setInfoAgree((prev) => !prev);
            return;
        }
        resumePanding();
        setPhone(() => (target as HTMLInputElement).value);
    };
    const resumePanding = () => {
        if (isPhoneValidRef.current !== "panding") {
            setPhoneValid(() => "panding");
        }
    };
    const validate = () => {
        setValidating(() => true);
        setTimeout(async () => {
            const isPhoneValid = await validatePhone(phone);
            setValidating(() => false);
            setPhoneValid(() => isPhoneValid);
        }, 1000);
    };
    const handleConfirm = () => {
        setSelected(() => defaultSelected);
        validate();
    };
    return (
        <div className="absolute top-0 left-0 w-[1280px] h-[720px]">
            <div className="w-[380px] bg-[#86D3F4] p-[40px_24px] h-[721px] flex flex-col items-center gap-[13px] absolute z-[3]">
                {isPhoneValid != true && (
                    <PhonePanel
                        selected={
                            typeof selected.y === "number" &&
                            typeof selected.x === "number"
                                ? buttonsRef.current![selected.y][selected.x]
                                : "none"
                        }
                        isPhoneValid={isPhoneValid}
                        confirmButtonRef={confirmButtonRef}
                        buttons={buttonsRef.current}
                        onClick={handleClick}
                        infoAgree={infoAgree}
                        onChange={handleChange}
                        isAllPassed={isAllPassed}
                        onConfirm={handleConfirm}
                        phone={phone}
                        phoneInputRef={phoneInputRef}
                    />
                )}
                {isValidating && <Loader />}
                {isPhoneValid == true && <Info />}
            </div>
            <CloseButton
                reference={closeButtonRef}
                onClick={onClose}
                selected={
                    typeof selected.y === "number" &&
                    typeof selected.x === "number"
                        ? buttonsRef.current![selected.y][selected.x]
                        : "none"
                }
            />
            <PanelBanner />
        </div>
    );
};

export default Panel;
