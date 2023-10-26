import React from "react";
import QRCode from "react-qr-code";
const PanelBanner = () => {
    return (
        <div className="bg-[url('assets/volvo_panel.jpg')] top-0 bg-cover w-full h-[721px] absolute z-[2]">
            <div className="absolute right-[20px] bottom-[20px] z-[3] flex items-center gap-[10px] w-[314px] h-[110px]">
                <div className="text-right text-white font-medium text-[16px] leading-[18.75px]">
                    СКАНИРУЙТЕ QR-КОД ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ
                </div>
                <div className="w-[110px] h-[110px]">
                    <QRCode size={110} value="https://www.volvocars.com/ru" />
                </div>
            </div>
        </div>
    );
};

export default PanelBanner;
