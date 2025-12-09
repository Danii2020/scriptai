'use client'

import { useEffect, useState } from "react";

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
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error("Error loading AdSense script:", error);
        }
    }, [isMounted]);

    if (!isMounted) return null;

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-7834926758816724"
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive ? 'true' : 'false'}
        />
    )
}

export default AdBanner;