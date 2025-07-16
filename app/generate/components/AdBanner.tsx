'use client'

import { useEffect } from "react";

type AdBannerProps = {
    dataAdSlot: string;
    dataAdFormat: string;
    dataFullWidthResponsive: boolean;
};

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

const AdBanner = ({ dataAdFormat, dataAdSlot, dataFullWidthResponsive }: AdBannerProps) => {
    useEffect(() => {
        try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error("Error loading AdSense script:", error);
        }
    }, []);
    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-7834926758816724"
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive= {dataFullWidthResponsive.toString()}
        >

        </ins>
    )
}

export default AdBanner;