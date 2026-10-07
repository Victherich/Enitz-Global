"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";

export default function TikTokPixel() {
  const [pixelId, setPixelId] = useState("");
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchPixel = async () => {
      try {
        const trackingRef = doc(db, "settings", "tracking");
        const trackingSnap = await getDoc(trackingRef);

        if (trackingSnap.exists()) {
          const data = trackingSnap.data();

          if (data.tiktok) {
            setPixelId(data.tiktok);
          }
        }
      } catch (error) {
        console.error("Failed to fetch TikTok Pixel ID:", error);
      }
    };

    fetchPixel();
  }, []);

  useEffect(() => {
    if (!pixelId || loaded) return;

    if (window.ttq) {
      window.ttq.load(pixelId);
      window.ttq.page();
      setLoaded(true);
      return;
    }

    window.TiktokAnalyticsObject = "ttq";

    const ttq = (window.ttq = window.ttq || []);

    ttq.methods = [
      "page",
      "track",
      "identify",
      "instances",
      "debug",
      "on",
      "off",
      "once",
      "ready",
      "alias",
      "group",
      "enableCookie",
      "disableCookie",
      "holdConsent",
      "revokeConsent",
      "grantConsent"
    ];

    ttq.setAndDefer = function (target, method) {
      target[method] = function () {
        target.push(
          [method].concat(Array.prototype.slice.call(arguments, 0))
        );
      };
    };

    for (let i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(ttq, ttq.methods[i]);
    }

    ttq.instance = function (id) {
      const instance = ttq._i[id] || [];
      for (let i = 0; i < ttq.methods.length; i++) {
        ttq.setAndDefer(instance, ttq.methods[i]);
      }
      return instance;
    };

    ttq.load = function (id) {
      const url = "https://analytics.tiktok.com/i18n/pixel/events.js";

      ttq._i = ttq._i || {};
      ttq._i[id] = [];
      ttq._i[id]._u = url;
      ttq._t = ttq._t || {};
      ttq._t[id] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[id] = {};

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `${url}?sdkid=${id}&lib=ttq`;

      const firstScript = document.getElementsByTagName("script")[0];

      if (firstScript?.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    };

    ttq.load(pixelId);
    ttq.page();

    setLoaded(true);
  }, [pixelId, loaded]);

  useEffect(() => {
    if (!loaded || !window.ttq) return;

    window.ttq.page();
  }, [pathname, loaded]);

  return null;
}