


// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import styled, { keyframes } from "styled-components";
// import { ChevronLeft, ChevronRight, Loader2, Sparkles, Package, ShoppingBag, Tag, Layers, Gift } from "lucide-react";
// // Import your initialized firebase db instance here (adjust path to match your project setup)
// import { db } from "@/firebaseConfig"; 
// import { collection, getDocs } from "firebase/firestore";

// /* ================= THEME STYLES ================= */
// const TextPrimary = "#0f172a";
// const TextMuted = "#475569";
// const BorderColor = "rgba(226, 232, 240, 0.9)";
// const ThemeGradient = "linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)";

// /* ================= ANIMATIONS ================= */
// const scrollInfinite = keyframes`
//   0% { transform: translateX(0); }
//   100% { transform: translateX(-50%); }
// `;

// /* ================= STYLED COMPONENTS ================= */

// const SectionContainer = styled.section`
//   padding: 3rem 0;
//   max-width: 100%;
//   overflow: hidden;
//   background: #f8fafc;
// `;

// const SectionHeader = styled.div`
//   max-width: 1280px;
//   margin: 0 auto 2rem auto;
//   padding: 0 1.5rem;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;

//   .header-content {
//     h2 {
//       font-size: 2.25rem;
//       font-weight: 800;
//       color: ${TextPrimary};
//       letter-spacing: -0.02em;
//       @media (min-width: 768px) { font-size: 3rem; }
//     }
//   }
// `;

// const CarouselWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   display: flex;
//   align-items: center;
// `;

// const ControlButton = styled.button`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   width: 48px;
//   height: 48px;
//   border-radius: 50%;
//   background: #ffffff;
//   border: 1px solid ${BorderColor};
//   color: ${TextPrimary};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   box-shadow: 0 8px 25px rgba(15, 23, 42, 0.12);
//   transition: all 0.25s ease;
//   z-index: 10;

//   &:hover {
//     background: ${ThemeGradient};
//     color: #ffffff;
//     border-color: transparent;
//     transform: translateY(-50%) scale(1.08);
//     box-shadow: 0 12px 30px rgba(0, 174, 239, 0.4);
//   }

//   &.left-arrow {
//     left: 1.5rem;
//     @media (min-width: 768px) {
//       left: 2.5rem;
//     }
//   }

//   &.right-arrow {
//     right: 1.5rem;
//     @media (min-width: 768px) {
//       right: 2.5rem;
//     }
//   }
// `;

// const MarqueeWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   overflow-x: auto;
//   scroll-behavior: smooth;
//   scrollbar-width: none;
//   -ms-overflow-style: none;

//   &::-webkit-scrollbar {
//     display: none;
//   }

//   &:hover .track {
//     animation-play-state: paused;
//   }
// `;

// const MarqueeTrack = styled.div`
//   display: flex;
//   gap: 1.5rem;
//   width: max-content;
//   animation: ${scrollInfinite} 30s linear infinite;
//   padding: 1rem 3rem;
// `;

// const CategoryCard = styled.a`
//   flex: 0 0 200px;
//   width: 200px;
//   height: 200px;
//   background: #ffffff;
//   border-radius: 1.75rem;
//   border: 1px solid ${BorderColor};
//   box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 1.5rem;
//   cursor: pointer;
//   transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
//   text-decoration: none;
//   position: relative;
//   overflow: hidden;

//   @media (min-width: 768px) {
//     flex: 0 0 240px;
//     width: 240px;
//     height: 240px;
//   }

//   .icon-container {
//     width: 80px;
//     height: 80px;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-bottom: 1.25rem;
//     background: linear-gradient(135deg, rgba(0, 174, 239, 0.12), rgba(11, 27, 72, 0.08));
//     border: 1px solid rgba(0, 174, 239, 0.25);
//     box-shadow: 0 8px 20px rgba(0, 174, 239, 0.08);
//     color: #00aeef;
//     transition: all 0.4s ease;

//     @media (min-width: 768px) {
//       width: 95px;
//       height: 95px;
//     }

//     svg {
//       width: 36px;
//       height: 36px;
//       transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
//       @media (min-width: 768px) {
//         width: 42px;
//         height: 42px;
//       }
//     }
//   }

//   h4 {
//     color: ${TextPrimary};
//     font-size: 1.05rem;
//     font-weight: 700;
//     text-align: center;
//     margin: 0;
//     transition: color 0.3s ease;

//     @media (min-width: 768px) {
//       font-size: 1.15rem;
//     }
//   }

//   &:hover {
//     transform: translateY(-8px);
//     border-color: rgba(0, 174, 239, 0.4);
//     box-shadow: 0 20px 40px -10px rgba(0, 174, 239, 0.2);

//     .icon-container {
//       background: ${ThemeGradient};
//       color: #ffffff;
//       box-shadow: 0 10px 25px rgba(0, 174, 239, 0.35);
      
//       svg {
//         transform: scale(1.15) rotate(6deg);
//       }
//     }

//     h4 {
//       color: #00aeef;
//     }
//   }
// `;

// const LoadingState = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 4rem;
//   gap: 0.75rem;
//   color: ${TextMuted};
//   font-weight: 600;
// `;

// export default function ShopByCategory() {
//   const trackRef = useRef(null);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fallback sample categories if Firestore collection is empty or fails
//   const fallbackCategories = [
//     { id: "1", title: "Personal Care" },
//     { id: "2", title: "Household Goods" },
//     { id: "3", title: "Lifestyle & Decor" },
//     { id: "4", title: "Kitchen Essentials" },
//   ];

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const querySnapshot = await getDocs(collection(db, "categories"));
//         const fetchedData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         if (fetchedData.length > 0) {
//           setCategories(fetchedData);
//         } else {
//           setCategories(fallbackCategories);
//         }
//       } catch (error) {
//         console.error("Error fetching categories from Firestore:", error);
//         setCategories(fallbackCategories);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCategories();
//   }, []);

//   // Helper function to assign an icon based on category title/index
//   const getCategoryIcon = (title = "", index = 0) => {
//     const lower = title.toLowerCase();
//     if (lower.includes("gift") || lower.includes("special")) return <Gift />;
//     if (lower.includes("home") || lower.includes("house") || lower.includes("decor")) return <Package />;
//     if (lower.includes("shop") || lower.includes("store") || lower.includes("bag")) return <ShoppingBag />;
//     if (lower.includes("tag") || lower.includes("sale") || lower.includes("deal")) return <Tag />;
    
//     // Default pool of icons cycled through based on index
//     const iconList = [<Sparkles />, <Package />, <ShoppingBag />, <Tag />, <Layers />];
//     return iconList[index % iconList.length];
//   };

//   const scrollLeft = () => {
//     if (trackRef.current) {
//       trackRef.current.scrollBy({ left: -300, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (trackRef.current) {
//       trackRef.current.scrollBy({ left: 300, behavior: "smooth" });
//     }
//   };

//   // Duplicate list multiple times to achieve seamless infinite marquee loop effect
//   const displayList = categories.length > 0 ? [...categories, ...categories, ...categories] : [];

//   return (
//     <SectionContainer>
//       <SectionHeader>
//         <div className="header-content">
//           <h2>Shop by Category</h2>
//         </div>
//       </SectionHeader>

//       {loading ? (
//         <LoadingState>
//           <Loader2 className="w-6 h-6 animate-spin text-cyan-500" /> Loading categories...
//         </LoadingState>
//       ) : (
//         <CarouselWrapper>
//           <ControlButton className="left-arrow" onClick={scrollLeft} aria-label="Scroll Left">
//             <ChevronLeft className="w-6 h-6" />
//           </ControlButton>

//           <MarqueeWrapper ref={trackRef}>
//             <MarqueeTrack className="track">
//               {displayList.map((cat, index) => (
//                 <CategoryCard 
//                   key={`${cat.id}-${index}`} 
//                   href={`/categories/${cat.id}`}
//                 >
//                   <div className="icon-container">
//                     {getCategoryIcon(cat.title, index)}
//                   </div>
//                   <h4>{cat.title}</h4>
//                 </CategoryCard>
//               ))}
//             </MarqueeTrack>
//           </MarqueeWrapper>

//           <ControlButton className="right-arrow" onClick={scrollRight} aria-label="Scroll Right">
//             <ChevronRight className="w-6 h-6" />
//           </ControlButton>
//         </CarouselWrapper>
//       )}
//     </SectionContainer>
//   );
// }








"use client";

import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { 
  ChevronLeft, ChevronRight, Loader2, 
  Sparkles, Package, ShoppingBag, Tag, Layers, Gift, 
  Heart, Star, ShieldCheck, Zap, Smile, Coffee, BookOpen, 
  Home, Compass, Award, Bookmark, Flame 
} from "lucide-react";
// Import your initialized firebase db instance here (adjust path to match your project setup)
import { db } from "@/firebaseConfig"; 
import { collection, getDocs } from "firebase/firestore";

/* ================= THEME STYLES ================= */
const TextPrimary = "#0f172a";
const TextMuted = "#475569";
const BorderColor = "rgba(226, 232, 240, 0.9)";
const ThemeGradient = "linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)";

/* ================= ANIMATIONS ================= */
const scrollInfinite = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

/* ================= STYLED COMPONENTS ================= */

const SectionContainer = styled.section`
  padding: 3rem 0;
  max-width: 100%;
  overflow: hidden;
  background: #f8fafc;
`;

const SectionHeader = styled.div`
  max-width: 1280px;
  margin: 0 auto 2rem auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .header-content {
    h2 {
      font-size: 2rem;
      font-weight: 800;
      text-align:center;
      color: ${TextPrimary};
      letter-spacing: -0.02em;
      @media (min-width: 768px) { font-size: 3rem; }
    }
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ControlButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid ${BorderColor};
  color: ${TextPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(15, 23, 42, 0.12);
  transition: all 0.25s ease;
  z-index: 10;

  &:hover {
    background: ${ThemeGradient};
    color: #ffffff;
    border-color: transparent;
    transform: translateY(-50%) scale(1.08);
    box-shadow: 0 12px 30px rgba(0, 174, 239, 0.4);
  }

  &.left-arrow {
    left: 1.5rem;
    @media (min-width: 768px) {
      left: 2.5rem;
    }
  }

  &.right-arrow {
    right: 1.5rem;
    @media (min-width: 768px) {
      right: 2.5rem;
    }
  }
`;

const MarqueeWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover .track {
    animation-play-state: paused;
  }
`;

const MarqueeTrack = styled.div`
  display: flex;
  gap: 1.5rem;
  width: max-content;
  animation: ${scrollInfinite} 80s linear infinite;
  padding: 1rem 3rem;
`;

const CategoryCard = styled.a`
  flex: 0 0 200px;
  width: 200px;
  height: 200px;
  background: #ffffff;
  border-radius: 1.75rem;
  border: 1px solid ${BorderColor};
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    flex: 0 0 240px;
    width: 240px;
    height: 240px;
  }

  .icon-container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
    background: linear-gradient(135deg, rgba(0, 174, 239, 0.12), rgba(11, 27, 72, 0.08));
    border: 1px solid rgba(0, 174, 239, 0.25);
    box-shadow: 0 8px 20px rgba(0, 174, 239, 0.08);
    color: #00aeef;
    transition: all 0.4s ease;

    @media (min-width: 768px) {
      width: 95px;
      height: 95px;
    }

    svg {
      width: 36px;
      height: 36px;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      @media (min-width: 768px) {
        width: 42px;
        height: 42px;
      }
    }
  }

  h4 {
    color: ${TextPrimary};
    font-size: 1.05rem;
    font-weight: 700;
    text-align: center;
    margin: 0;
    transition: color 0.3s ease;

    @media (min-width: 768px) {
      font-size: 1.15rem;
    }
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(0, 174, 239, 0.4);
    box-shadow: 0 20px 40px -10px rgba(0, 174, 239, 0.2);

    .icon-container {
      background: ${ThemeGradient};
      color: #ffffff;
      box-shadow: 0 10px 25px rgba(0, 174, 239, 0.35);
      
      svg {
        transform: scale(1.15) rotate(6deg);
      }
    }

    h4 {
      color: #00aeef;
    }
  }
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  gap: 0.75rem;
  color: ${TextMuted};
  font-weight: 600;
`;

export default function ShopByCategory() {
  const trackRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback sample categories if Firestore collection is empty or fails
  const fallbackCategories = [
    { id: "1", title: "Personal Care" },
    { id: "2", title: "Household Goods" },
    { id: "3", title: "Lifestyle & Decor" },
    { id: "4", title: "Kitchen Essentials" },
  ];

  useEffect(() => {
    async function fetchCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (fetchedData.length > 0) {
          setCategories(fetchedData);
        } else {
          setCategories(fallbackCategories);
        }
      } catch (error) {
        console.error("Error fetching categories from Firestore:", error);
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Comprehensive pool of diverse category icons
  const ICON_POOL = [
    Sparkles, Package, ShoppingBag, Tag, Layers, Gift, 
    Heart, Star, ShieldCheck, Zap, Smile, Coffee, BookOpen, 
    Home, Compass, Award, Bookmark, Flame
  ];

  // String hash algorithm to consistently assign a unique icon per category ID/title
  const getHashIcon = (uniqueKey = "") => {
    let hash = 0;
    const str = String(uniqueKey);
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % ICON_POOL.length;
    const SelectedIcon = ICON_POOL[index];
    return <SelectedIcon />;
  };

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Duplicate list multiple times to achieve seamless infinite marquee loop effect
  const displayList = categories.length > 0 ? [...categories, ...categories, ...categories] : [];

  return (
    <SectionContainer>
      <SectionHeader>
        <div className="header-content">
          <h2>Shop by Category</h2>
        </div>
      </SectionHeader>

      {loading ? (
        <LoadingState>
          <Loader2 className="w-6 h-6 animate-spin text-cyan-500" /> Loading categories...
        </LoadingState>
      ) : (
        <CarouselWrapper>
          <ControlButton className="left-arrow" onClick={scrollLeft} aria-label="Scroll Left">
            <ChevronLeft className="w-6 h-6" />
          </ControlButton>

          <MarqueeWrapper ref={trackRef}>
            <MarqueeTrack className="track">
              {displayList.map((cat, index) => (
                <CategoryCard 
                  key={`${cat.id}-${index}`} 
                  href={`/categories/${cat.id}`}
                >
                  <div className="icon-container">
                    {getHashIcon(cat.id || cat.title)}
                  </div>
                  <h4>{cat.title}</h4>
                </CategoryCard>
              ))}
            </MarqueeTrack>
          </MarqueeWrapper>

          <ControlButton className="right-arrow" onClick={scrollRight} aria-label="Scroll Right">
            <ChevronRight className="w-6 h-6" />
          </ControlButton>
        </CarouselWrapper>
      )}
    </SectionContainer>
  );
}