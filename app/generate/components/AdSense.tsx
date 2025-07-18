import Script from "next/script"

type AdsenseTypes = {
    pId: string
}

const Adsense = ({ pId }: AdsenseTypes) => {
    return (
        <Script
            async
            src={ `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}` }
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    )
}

export default Adsense
