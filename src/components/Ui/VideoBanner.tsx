import React from "react";
import QRCode from "react-qr-code";
import { IpanelButton } from "../../interfaces";
const VideoBanner = ({ onClick, reference }: Partial<IpanelButton>) => {
    return (
        <div className="w-[251px] h-[357px] bg-[#86D3F4] p-[30px_10px] flex flex-col gap-[20px] text-black items-center text-center absolute right-0 bottom-8">
            <div className="w-[231px] h-[57px] font-medium text-[16px] leading-[18.75px]">
                ИСПОЛНИТЕ МЕЧТУ ВАШЕГО <br />
                МАЛЫША! <br />
                ПОДАРИТЕ ЕМУ VOLVO!
            </div>
            <div className="bg-white h-[126px] w-[126px]">
                <QRCode
                    size={126}
                    value="https://hh.ru/resume/fd31b63bff0bfd3acd0039ed1f32314f4a506c"
                />
            </div>
            <div className="w-[231px] h-[57px] font-normal text-[14px] leading-[16.41px]">
                Сканируйте QR-код
                <br />
                или нажмите ОК
            </div>
            <button
                ref={reference}
                onClick={onClick}
                className="w-[156px] h-[52px] p-[16px] font-medium text-[16px] bg-black text-[#86D3F4] leading-[18.75px]"
            >
                ОК
            </button>
        </div>
    );
};

export default VideoBanner;
