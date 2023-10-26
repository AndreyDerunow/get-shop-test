import React from "react";

const Info = () => {
    return (
        <div className="w-[284px] h-[123px] absolute top-[264px] left-[48px] flex flex-col gap-[15px]">
            <div className="w-[284px] h-[76px] text-center text-[32px] leading-[37.5px] font-bold">
                ЗАЯВКА ПРИНЯТА
            </div>
            <div className="w-[284px] h-[76px] text-center text-[14px] leading-[16.41px] font-normal">
                Держите телефон под рукой.
                <br />
                Скоро с Вами свяжется наш менеджер.
            </div>
        </div>
    );
};

export default Info;
