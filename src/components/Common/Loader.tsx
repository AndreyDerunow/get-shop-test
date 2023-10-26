import React from "react";
const Loader = () => {
    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-white"></div>
            <div className="animate-spin bg-[url('assets/loading.png')] bg-cover w-28 h-28 z-20 bg-center absolute top-[50%]"></div>
        </>
    );
};

export default Loader;
