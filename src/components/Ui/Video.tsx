import React, { useRef, useState } from "react";
import VideoBanner from "./VideoBanner";
import YouTube, { YouTubeProps } from "react-youtube";
import Panel from "./Panel";

const Video = () => {
    const [showBanner, setShowBanner] = useState<boolean>(false);
    const [panelShowed, setPanelShowed] = useState<boolean>(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const bannerButtonRef = useRef<HTMLButtonElement>(null);
    const onPlayerReady: YouTubeProps["onReady"] = ({ target }) => {
        target.mute();
        target.playVideo();
        setTimeout(() => {
            setShowBanner(() => true);
            bannerButtonRef.current &&
                bannerButtonRef.current.addEventListener("click", () => {
                    target.pauseVideo();
                    setTimeout(() => {
                        closeButtonRef.current &&
                            closeButtonRef.current.addEventListener(
                                "click",
                                () => {
                                    target.playVideo();
                                },
                                { once: true }
                            );
                    }, 0);
                });
        }, 5000);
    };
    const onPlayerEnd: YouTubeProps["onEnd"] = ({ target }) => {
        target.playVideo();
    };

    const opts: YouTubeProps["opts"] = {
        height: "100%",
        width: "100%",
        playerVars: {
            autoplay: 1,
            rel: 0,
            controls: 0,
            modestbranding: 1
        }
    };
    return (
        <div className="w-[1280px] h-[720px] relative">
            <div className="flex justify-center items-center opacity-0 bg-[url('assets/van_damme_volvo.jpg')] bg-[3px] bg-cover w-[1280px] h-[720px] absolute"></div>
            <YouTube
                className="w-full h-full"
                videoId="M7FIvfx5J10"
                opts={opts}
                onReady={onPlayerReady}
                onEnd={onPlayerEnd}
            />
            {panelShowed && (
                <Panel
                    closeButtonRef={closeButtonRef}
                    onClose={() => {
                        setPanelShowed(() => false);
                    }}
                />
            )}
            {showBanner && (
                <VideoBanner
                    onClick={() => setPanelShowed(() => true)}
                    reference={bannerButtonRef}
                />
            )}
        </div>
    );
};

export default Video;
