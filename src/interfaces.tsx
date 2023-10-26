import {
    MouseEventHandler,
    ChangeEventHandler,
    ReactNode,
    RefObject
} from "react";

export interface IpanelButton {
    selected: string;
    id?: string;
    text?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode | ReactNode[];
    reference?: RefObject<HTMLButtonElement>;
    disabled?: boolean;
}

export interface Iinput<T> {
    name: string;
    value: T;
    isValid?: boolean | "panding";
    onChange: ChangeEventHandler<HTMLInputElement>;
    reference?: RefObject<HTMLInputElement>;
    selected?: string;
}

export interface IphonePannel {
    selected: string;
    confirmButtonRef: RefObject<HTMLButtonElement>;
    buttons: string[][];
    onClick: MouseEventHandler<HTMLButtonElement>;
    infoAgree: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    isAllPassed: boolean;
    onConfirm: MouseEventHandler<HTMLButtonElement>;
    phone: string;
    phoneInputRef: RefObject<HTMLInputElement>;
    isPhoneValid: boolean | "panding";
}

export interface IbuttonProps extends React.ComponentProps<"button"> {
    closeButtonRef: RefObject<HTMLButtonElement>;
    bannerButtonRef: RefObject<HTMLButtonElement>;
    onClose: MouseEventHandler<HTMLButtonElement>;
}

export interface IkeyEvent extends Event {
    keyCode: number;
}

export interface Icoords {
    x: number | "none";
    y: number | "none";
}
