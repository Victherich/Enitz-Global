"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function GoogleAdsPixel() {
  const [googleAdsId, setGoogleAdsId] = useState("");

  useEffect(() => {
    const fetchPixel = async () => {
      try {
        const trackingRef = doc(db, "settings", "tracking");
        const trackingSnap = await getDoc(trackingRef);

        if (trackingSnap.exists()) {
          const data = trackingSnap.data();

          if (data.googleAds) {
            setGoogleAdsId(data.googleAds);
          }
        }
      } catch (error) {
        console.error("Failed to fetch Google Ads ID:", error);
      }
    };

    fetchPixel();
  }, []);

  if (!googleAdsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        strategy="afterInteractive"
      />

      <Script
        id="google-ads-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${googleAdsId}');
          `,
        }}
      />
    </>
  );
}