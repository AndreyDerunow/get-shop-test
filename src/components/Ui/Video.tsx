import React, { useCallback, useEffect, useRef, useState } from "react";
import VideoBanner from "./VideoBanner";
import YouTube, { YouTubeProps } from "react-youtube";
import Panel from "./Panel";
import { IkeyEvent } from "../../interfaces";

const Video = () => {
    const [showBanner, setShowBanner] = useState<boolean>(false);
    const [panelShowed, setPanelShowed] = useState<boolean>(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const bannerButtonRef = useRef<HTMLButtonElement>(null);
    const [alreadyOpened, setAlreadyOpened] = useState<boolean>(false);
    useEffect(() => {
        if (!panelShowed) {
            setTimeout(
                () => {
                    window.addEventListener("keydown", handleopenPanel);
                    if (!alreadyOpened) {
                        setAlreadyOpened(() => true);
                    }
                },
                alreadyOpened ? 0 : 5000
            );
        }
    }, [panelShowed]);
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
    const handleopenPanel = useCallback((e: IkeyEvent): void => {
        if (e.keyCode === 13 && !panelShowed) {
            e.preventDefault();
            bannerButtonRef.current && bannerButtonRef.current.click();
            window.removeEventListener("keydown", handleopenPanel);
        }
    }, []);
    return (
        <div className="w-[1280px] h-[720px] relative">
            <YouTube
                className="w-full h-full"
                videoId="M7FIvfx5J10"
                opts={opts}
                onReady={onPlayerReady}
                onEnd={onPlayerEnd}
            />
            {panelShowed && (
                <Panel
                    bannerButtonRef={bannerButtonRef}
                    closeButtonRef={closeButtonRef}
                    onClose={() => setPanelShowed(() => false)}
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
