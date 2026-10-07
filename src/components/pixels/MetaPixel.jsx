"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";

export default function MetaPixel() {
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

          if (data.meta) {
            setPixelId(data.meta);
            console.log("Meta Pixel ID fetched:", data.meta);
          }
        }
      } catch (error) {
        console.error("Failed to fetch Meta Pixel ID:", error);
      }
    };

    fetchPixel();
  }, []);

  useEffect(() => {
    if (!pixelId || loaded) return;

    if (window.fbq) {
      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
      setLoaded(true);
      return;
    }

    window.fbq = function () {
      window.fbq.callMethod
        ? window.fbq.callMethod.apply(window.fbq, arguments)
        : window.fbq.queue.push(arguments);
    };

    if (!window._fbq) {
      window._fbq = window.fbq;
    }

    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = "2.0";
    window.fbq.queue = [];

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";

    script.onload = () => {
      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
      setLoaded(true);
    };

    document.head.appendChild(script);
  }, [pixelId, loaded]);

  useEffect(() => {
    if (!loaded || !window.fbq) return;

    window.fbq("track", "PageView");
  }, [pathname, loaded]);

  return null;
}