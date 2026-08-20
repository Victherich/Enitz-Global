// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import styled, { keyframes } from "styled-components";
// import { Sparkles, ArrowRight, ShoppingBag, ShieldCheck, Heart, Star, Compass, Award } from "lucide-react";

// /* ================= ANIMATIONS ================= */
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const shimmer = keyframes`
//   0% { background-position: -200% 0; }
//   100% { background-position: 200% 0; }
// `;

// /* ================= THEME STYLES (LIGHT MODE) ================= */
// const ThemeGradient = "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)";
// const LightBg = "#f8fafc";
// const CardBg = "#ffffff";
// const TextPrimary = "#0f172a";
// const TextMuted = "#64748b";
// const BorderColor = "#e2e8f0";

// /* ================= COMPONENTS ================= */

// const PageWrapper = styled.div`
//   background-color: ${LightBg};
//   color: ${TextPrimary};
//   font-family: inherit;
//   overflow-x: hidden;
//   padding-top: 73px; /* Offset for fixed header */
// `;

// const PrimaryButton = styled(Link)`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.75rem;
//   padding: 1rem 2.2rem;
//   border-radius: 9999px;
//   background: ${ThemeGradient};
//   color: #ffffff;
//   font-weight: 600;
//   font-size: 1rem;
//   box-shadow: 0 10px 25px -5px rgba(236, 72, 153, 0.3);
//   transition: all 0.3s ease;
//   text-decoration: none;

//   &:hover {
//     transform: translateY(-2px);
//     opacity: 0.95;
//     box-shadow: 0 15px 30px -5px rgba(236, 72, 153, 0.5);
//   }
// `;

// const SecondaryButton = styled(Link)`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.75rem;
//   padding: 1rem 2.2rem;
//   border-radius: 9999px;
//   background: #ffffff;
//   border: 1px solid ${BorderColor};
//   color: ${TextPrimary};
//   font-weight: 600;
//   font-size: 1rem;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
//   transition: all 0.3s ease;
//   text-decoration: none;

//   &:hover {
//     background: #f1f5f9;
//     border-color: #cbd5e1;
//     transform: translateY(-2px);
//   }
// `;

// /* --- FEATURES / VALUES SECTION --- */
// const FeaturesSection = styled.section`
//   padding: 6rem 1.5rem;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const SectionHeader = styled.div`
//   text-align: center;
//   max-width: 48rem;
//   margin: 0 auto 4rem auto;

//   h2 {
//     font-size: 2rem;
//     font-weight: 700;
//     margin-bottom: 1rem;
//     color: ${TextPrimary};
//     @media (min-width: 768px) { font-size: 2.75rem; }
//   }

//   p {
//     color: ${TextMuted};
//     font-size: 1.05rem;
//     line-height: 1.6;
//   }
// `;

// const FeaturesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   gap: 2rem;

//   @media (min-width: 768px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `;

// const FeatureCard = styled.div`
//   background: ${CardBg};
//   border: 1px solid ${BorderColor};
//   border-radius: 1.25rem;
//   padding: 2.5rem 2rem;
//   transition: all 0.4s ease;
//   position: relative;
//   overflow: hidden;
//   box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);

//   &:hover {
//     transform: translateY(-6px);
//     border-color: rgba(236, 72, 153, 0.4);
//     box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08);
//   }

//   .icon-box {
//     width: 60px;
//     height: 60px;
//     border-radius: 1rem;
//     background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(6, 182, 212, 0.1));
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-bottom: 1.5rem;
//     color: #db2777;
//   }

//   h3 {
//     font-size: 1.25rem;
//     font-weight: 700;
//     margin-bottom: 0.75rem;
//     color: ${TextPrimary};
//   }

//   p {
//     color: ${TextMuted};
//     font-size: 0.95rem;
//     line-height: 1.6;
//   }
// `;

// /* --- FEATURED PRODUCT SHOWCASE --- */
// const ProductShowcaseSection = styled.section`
//   padding: 5rem 1.5rem;
//   background: #f1f5f9;
// `;

// const ProductContainer = styled.div`
//   max-width: 1100px;
//   margin: 0 auto;
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 3rem;
//   align-items: center;

//   @media (min-width: 900px) {
//     grid-template-columns: 1fr 1fr;
//   }
// `;

// const ImageWrapper = styled.div`
//   position: relative;
//   border-radius: 1.5rem;
//   overflow: hidden;
//   box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.12);
//   border: 1px solid ${BorderColor};

//   img {
//     width: 100%;
//     height: 450px;
//     object-fit: cover;
//     transition: transform 0.6s ease;
//   }

//   &:hover img {
//     transform: scale(1.05);
//   }

//   .badge-tag {
//     position: absolute;
//     top: 1.25rem;
//     left: 1.25rem;
//     background: rgba(255, 255, 255, 0.9);
//     backdrop-filter: blur(8px);
//     padding: 0.5rem 1rem;
//     border-radius: 9999px;
//     font-size: 0.8rem;
//     font-weight: 600;
//     color: #0284c7;
//     border: 1px solid rgba(2, 132, 199, 0.2);
//   }
// `;

// const ProductDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;

//   .category {
//     color: #db2777;
//     font-weight: 600;
//     font-size: 0.9rem;
//     text-transform: uppercase;
//     letter-spacing: 0.1em;
//   }

//   h3 {
//     font-size: 2.2rem;
//     font-weight: 700;
//     color: ${TextPrimary};
//   }

//   .price {
//     font-size: 1.75rem;
//     font-weight: 800;
//     background: ${ThemeGradient};
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }

//   p {
//     color: ${TextMuted};
//     line-height: 1.7;
//   }
// `;

// /* --- GALLERY GRID SECTION --- */
// const GallerySection = styled.section`
//   padding: 6rem 1.5rem;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const GalleryGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   gap: 1.5rem;

//   @media (min-width: 640px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (min-width: 1024px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `;

// const GalleryCard = styled.div`
//   position: relative;
//   border-radius: 1rem;
//   overflow: hidden;
//   height: 350px;
//   box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.5s ease;
//   }

//   .overlay {
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.1) 60%);
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//     padding: 1.5rem;
//     transition: background 0.3s ease;
//   }

//   h4 {
//     color: #ffffff;
//     font-size: 1.2rem;
//     font-weight: 700;
//     margin-bottom: 0.25rem;
//   }

//   p {
//     color: #e2e8f0;
//     font-size: 0.85rem;
//   }

//   &:hover img {
//     transform: scale(1.08);
//   }
// `;

// /* --- BRAND HERITAGE BANNER --- */
// const HeritageBanner = styled.section`
//   padding: 6rem 1.5rem;
//   background: linear-gradient(135deg, #fdf2f8 0%, #eff6ff 100%);
//   position: relative;
//   overflow: hidden;
//   border-top: 1px solid ${BorderColor};
//   border-bottom: 1px solid ${BorderColor};

//   .banner-content {
//     max-width: 700px;
//     margin: 0 auto;
//     text-align: center;
//     position: relative;
//     z-index: 2;
//   }

//   h2 {
//     font-size: 2.25rem;
//     font-weight: 700;
//     margin-bottom: 1.5rem;
//     color: ${TextPrimary};
//     @media (min-width: 768px) { font-size: 3rem; }
//   }

//   p {
//     color: ${TextMuted};
//     font-size: 1.1rem;
//     line-height: 1.7;
//     margin-bottom: 2rem;
//   }
// `;

// export default function LandingPage() {
//   return (
//     <PageWrapper>
//       {/* 1. HERO SECTION */}
   

//       {/* 2. WELCOME & INTRO SECTION */}
//       <FeaturesSection>
//         <SectionHeader>
//           <h2>Welcome to Kingsword Bag Craft</h2>
//           <p>
//             Where tradition meets modern elegance in every handcrafted bag. Browse our curated collections and enjoy exclusive offers designed to elevate your style.
//           </p>
//         </SectionHeader>

//         <FeaturesGrid>
//           <FeatureCard>
//             <div className="icon-box">
//               <Award className="w-7 h-7" />
//             </div>
//             <h3>Artisan Craftsmanship</h3>
//             <p>Each bag is meticulously handmade, showcasing exceptional skill and attention to detail.</p>
//           </FeatureCard>

//           <FeatureCard>
//             <div className="icon-box">
//               <Compass className="w-7 h-7" />
//             </div>
//             <h3>Timeless Designs</h3>
//             <p>Our collections fuse traditional motifs with modern aesthetics for enduring style.</p>
//           </FeatureCard>

//           <FeatureCard>
//             <div className="icon-box">
//               <ShieldCheck className="w-7 h-7" />
//             </div>
//             <h3>Premium Materials</h3>
//             <p>We use only high-quality fabrics and leathers to ensure durability and luxury.</p>
//           </FeatureCard>
//         </FeaturesGrid>
//       </FeaturesSection>

//       {/* 3. FEATURED PRODUCT SHOWCASE */}
//       <ProductShowcaseSection>
//         <ProductContainer>
//           <ImageWrapper>
//             <div className="badge-tag">New Arrivals</div>
//             <img 
//               src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80" 
//               alt="Premium lunch bag" 
//             />
//           </ImageWrapper>

//           <ProductDetails>
//             <span className="category">Featured Masterpiece</span>
//             <h3>Premium Lunch Bag & Daily Tote</h3>
//             <div className="price">₦10,000.00</div>
//             <p>
//               Experience sophisticated modern silhouettes and vibrant textured patterns carefully curated to reflect your distinct personal standard of fashion and utility.
//             </p>
//             <div>
//               <PrimaryButton href="/store">
//                 <ShoppingBag className="w-5 h-5" />
//             Explore more
//               </PrimaryButton>
//             </div>
//           </ProductDetails>
//         </ProductContainer>
//       </ProductShowcaseSection>

//       {/* 4. SIGNATURE COLLECTIONS GALLERY */}
//       <GallerySection>
//         <SectionHeader>
//           <h2>Discover Our Signature Collections</h2>
//           <p>Explore our expertly crafted bags that blend heritage and modern elegance, inviting you to experience the artistry behind every piece.</p>
//         </SectionHeader>

//         <GalleryGrid>
//           <GalleryCard>
//             <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80" alt="Artisan Tote" />
//             <div className="overlay">
//               <h4>Artisan Totes</h4>
//               <p>Bold patterns & unmatched capacity</p>
//             </div>
//           </GalleryCard>

//           <GalleryCard>
//             <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80" alt="Heritage Crossbody" />
//             <div className="overlay">
//               <h4>Heritage Crossbody</h4>
//               <p>Culture meets sleek modern design</p>
//             </div>
//           </GalleryCard>

//           <GalleryCard>
//             <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80" alt="Luxury Handbag" />
//             <div className="overlay">
//               <h4>Royal Statement Bags</h4>
//               <p>Exquisite detailing for elite occasions</p>
//             </div>
//           </GalleryCard>
//         </GalleryGrid>
//       </GallerySection>

//       {/* 5. HERITAGE BANNER SECTION */}
//       <HeritageBanner>
//         <div className="banner-content">
//           <h2>Experience Timeless Craftsmanship with Every Bag</h2>
//           <p>
//             At Kingsword Bag Craft, we celebrate African heritage through exquisite bags that fuse traditional artistry with modern design, empowering you with style that tells a story.
//           </p>
//           <PrimaryButton href="/store">
//             Browse All Designs
//             <ArrowRight className="w-5 h-5" />
//           </PrimaryButton>
//         </div>
//       </HeritageBanner>
//     </PageWrapper>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { Sparkles, ArrowRight, ShoppingBag, ShieldCheck, Heart, Star, Compass, Award, Zap, CheckCircle2 } from "lucide-react";

/* ================= ANIMATIONS ================= */
const floatSlow = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.4); }
  70% { box-shadow: 0 0 0 22px rgba(236, 72, 153, 0); }
  100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
`;

/* ================= THEME STYLES (VIBRANT ULTRA-MODERN) ================= */
const ThemeGradient = "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)";
const SoftGradientBg = "linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)";
const LightBg = "#f8fafc";
const CardBg = "#ffffff";
const TextPrimary = "#0f172a";
const TextMuted = "#475569";
const BorderColor = "rgba(226, 232, 240, 0.9)";

/* ================= COMPONENTS ================= */

const PageWrapper = styled.div`
  background-color: ${LightBg};
  color: ${TextPrimary};
  font-family: inherit;
  overflow-x: hidden;
  padding-top: 73px;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.15rem 2.6rem;
  border-radius: 9999px;
  background: ${ThemeGradient};
  color: #ffffff;
  font-weight: 700;
  font-size: 1.05rem;
  box-shadow: 0 14px 30px -5px rgba(236, 72, 153, 0.45);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  animation: ${pulseGlow} 3s infinite;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 20px 40px -5px rgba(236, 72, 153, 0.65);
    animation: none;
  }
`;

/* --- STUNNING HERO SECTION --- */
const HeroSection = styled.section`
  position: relative;
  padding: 8rem 1.5rem 6rem 1.5rem;
  background: radial-gradient(circle at top right, rgba(236, 72, 153, 0.08), transparent 40%),
              radial-gradient(circle at bottom left, rgba(6, 182, 212, 0.08), transparent 40%),
              ${LightBg};
  overflow: hidden;
  border-bottom: 1px solid ${BorderColor};
`;

const HeroGrid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;

  @media (min-width: 968px) {
    grid-template-columns: 1.1fr 0.9fr;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(6, 182, 212, 0.1));
    border: 1px solid rgba(236, 72, 153, 0.25);
    border-radius: 9999px;
    color: #db2777;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    width: fit-content;
    box-shadow: 0 4px 15px rgba(236, 72, 153, 0.1);
  }

  h1 {
    font-size: clamp(2.75rem, 5vw, 4.2rem);
    font-weight: 900;
    line-height: 1.1;
    color: ${TextPrimary};
    letter-spacing: -0.03em;

    span {
      background: ${ThemeGradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    font-size: 1.15rem;
    color: ${TextMuted};
    line-height: 1.8;
    max-width: 36rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
`;

const HeroVisual = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  .main-hero-img {
    width: 100%;
    max-width: 520px;
    height: 520px;
    object-fit: cover;
    border-radius: 2.5rem;
    box-shadow: 0 35px 70px -15px rgba(15, 23, 42, 0.25);
    border: 4px solid #ffffff;
    animation: ${floatSlow} 6s ease-in-out infinite;
  }

  .floating-badge {
    position: absolute;
    bottom: 2rem;
    left: -1rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    padding: 1rem 1.5rem;
    border-radius: 1.25rem;
    border: 1px solid ${BorderColor};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;

    .icon-wrap {
      width: 44px;
      height: 44px;
      border-radius: 1rem;
      background: ${ThemeGradient};
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h4 {
      font-size: 0.95rem;
      font-weight: 800;
      color: ${TextPrimary};
      margin: 0;
    }

    p {
      font-size: 0.8rem;
      color: ${TextMuted};
      margin: 0;
    }

    @media (max-width: 640px) {
      left: 1rem;
    }
  }
`;

/* --- FEATURES / VALUES SECTION (BENTO GRID STYLE) --- */
const FeaturesSection = styled.section`
  padding: 7rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 52rem;
  margin: 0 auto 5rem auto;

  .badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(6, 182, 212, 0.1));
    border: 1px solid rgba(236, 72, 153, 0.2);
    border-radius: 9999px;
    color: #db2777;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1.25rem;
  }

  h2 {
    font-size: 2.25rem;
    font-weight: 800;
    margin-bottom: 1.25rem;
    color: ${TextPrimary};
    letter-spacing: -0.02em;
    @media (min-width: 768px) { font-size: 3.25rem; }
  }

  p {
    color: ${TextMuted};
    font-size: 1.15rem;
    line-height: 1.7;
  }
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BentoCard = styled.div`
  background: ${CardBg};
  border: 1px solid ${BorderColor};
  border-radius: 2rem;
  padding: 3rem 2.25rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(236, 72, 153, 0.4);
    box-shadow: 0 30px 60px -15px rgba(236, 72, 153, 0.15);

    .icon-box {
      transform: scale(1.1) rotate(6deg);
      background: ${ThemeGradient};
      color: #ffffff;
    }
  }

  .icon-box {
    width: 72px;
    height: 72px;
    border-radius: 1.25rem;
    background: ${SoftGradientBg};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    color: #db2777;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid rgba(236, 72, 153, 0.15);
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 0.85rem;
    color: ${TextPrimary};
  }

  p {
    color: ${TextMuted};
    font-size: 1.05rem;
    line-height: 1.7;
  }
`;

/* --- FEATURED PRODUCT SHOWCASE (SPLIT BANNER) --- */
const ProductShowcaseSection = styled.section`
  padding: 6rem 1.5rem;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
`;

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${CardBg};
  border: 1px solid ${BorderColor};
  border-radius: 2.5rem;
  padding: 3rem;
  box-shadow: 0 30px 60px -20px rgba(15, 23, 42, 0.08);
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.5rem;
  align-items: center;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    padding: 4rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -15px rgba(15, 23, 42, 0.18);
  border: 2px solid #ffffff;

  img {
    width: 100%;
    height: 480px;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img {
    transform: scale(1.05);
  }

  .badge-tag {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    padding: 0.6rem 1.25rem;
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 700;
    color: #0284c7;
    border: 1px solid rgba(2, 132, 199, 0.2);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  .category {
    background: ${ThemeGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  h3 {
    font-size: 2.5rem;
    font-weight: 800;
    color: ${TextPrimary};
    line-height: 1.2;
    letter-spacing: -0.02em;
    @media (min-width: 768px) { font-size: 2.85rem; }
  }

  .price {
    font-size: 2.2rem;
    font-weight: 900;
    background: ${ThemeGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: ${TextMuted};
    line-height: 1.8;
    font-size: 1.1rem;
  }
`;

/* --- GALLERY GRID SECTION (ASYMMETRIC MODERN) --- */
const GallerySection = styled.section`
  padding: 7rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GalleryCard = styled.div`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  height: 450px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
  border: 1px solid ${BorderColor};
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.15) 60%, transparent 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2.5rem;
    transition: background 0.4s ease;
  }

  h4 {
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
  }

  p {
    color: #cbd5e1;
    font-size: 1rem;
    font-weight: 500;
  }

  &:hover {
    img {
      transform: scale(1.12);
    }
    .overlay {
      background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(236, 72, 153, 0.35) 100%);
    }
  }
`;

/* --- HERITAGE BANNER SECTION (IMMERSIVE GRADIENT) --- */
const HeritageBanner = styled.section`
  padding: 8rem 1.5rem;
  background: linear-gradient(135deg, #fdf2f8 0%, #eff6ff 50%, #f0fdf4 100%);
  position: relative;
  overflow: hidden;
  border-top: 1px solid ${BorderColor};
  border-bottom: 1px solid ${BorderColor};

  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%);
    top: -300px;
    left: -300px;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
    bottom: -300px;
    right: -300px;
    border-radius: 50%;
  }

  .banner-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  h2 {
    font-size: 2.75rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    color: ${TextPrimary};
    letter-spacing: -0.03em;
    @media (min-width: 768px) { font-size: 3.75rem; }
  }

  p {
    color: ${TextMuted};
    font-size: 1.25rem;
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }
`;

export default function LandingPage() {
  return (
    <PageWrapper>
      {/* 1. STUNNING HERO SECTION */}
      <HeroSection>
        <HeroGrid>
          <HeroContent>
            <div className="badge-pill">
              <Sparkles className="w-4 h-4 text-pink-500" /> New Luxury Collection
            </div>
            <h1>
              Elevate Your Style with <span>Handcrafted Elegance</span>
            </h1>
            <p>
              Discover exquisite bags crafted with meticulous attention to detail, blending rich traditional heritage with sleek modern utility.
            </p>
            <HeroActions>
              <PrimaryButton href="/store">
                <ShoppingBag className="w-5 h-5" />
                Explore Collections
              </PrimaryButton>
            </HeroActions>
          </HeroContent>

          <HeroVisual>
            <img 
              className="main-hero-img"
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80" 
              alt="Luxury Bag Craftsmanship" 
            />
            <div className="floating-badge">
              <div className="icon-wrap">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4>100% Verified</h4>
                <p>Authentic Artisan Made</p>
              </div>
            </div>
          </HeroVisual>
        </HeroGrid>
      </HeroSection>

      {/* 2. WELCOME & INTRO SECTION (BENTO GRID) */}
      <FeaturesSection>
        <SectionHeader>
          <div className="badge-pill">
            <Sparkles className="w-4 h-4" /> Exceptional Quality
          </div>
          <h2>Welcome to Kingsword Bag Craft</h2>
          <p>
            Where tradition meets modern elegance in every handcrafted bag. Browse our curated collections and enjoy exclusive offers designed to elevate your style.
          </p>
        </SectionHeader>

        <BentoGrid>
          <BentoCard>
            <div className="icon-box">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3>Artisan Craftsmanship</h3>
              <p>Each bag is meticulously handmade, showcasing exceptional skill and attention to detail.</p>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="icon-box">
              <Compass className="w-8 h-8" />
            </div>
            <div>
              <h3>Timeless Designs</h3>
              <p>Our collections fuse traditional motifs with modern aesthetics for enduring style.</p>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="icon-box">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3>Premium Materials</h3>
              <p>We use only high-quality fabrics and leathers to ensure durability and luxury.</p>
            </div>
          </BentoCard>
        </BentoGrid>
      </FeaturesSection>

      {/* 3. FEATURED PRODUCT SHOWCASE */}
      <ProductShowcaseSection>
        <ProductContainer>
          <ImageWrapper>
            <div className="badge-tag">
              <Sparkles className="w-4 h-4 text-sky-500" /> New Arrivals
            </div>
            <img 
              src="./bag2.png" 
              alt="Premium lunch bag" 
            />
          </ImageWrapper>

          <ProductDetails>
            <span className="category">Featured Masterpiece</span>
            <h3>Premium Lunch Bag & Daily Tote</h3>
            <div className="price">₦10,000.00</div>
            <p>
              Experience sophisticated modern silhouettes and vibrant textured patterns carefully curated to reflect your distinct personal standard of fashion and utility.
            </p>
            <div>
              <PrimaryButton href="/store">
                <ShoppingBag className="w-5 h-5" />
                Explore more
              </PrimaryButton>
            </div>
          </ProductDetails>
        </ProductContainer>
      </ProductShowcaseSection>

      {/* 4. SIGNATURE COLLECTIONS GALLERY */}
      <GallerySection>
        <SectionHeader>
          <div className="badge-pill">
            <Star className="w-4 h-4 text-pink-500" /> Curated Catalog
          </div>
          <h2>Discover Our Signature Collections</h2>
          <p>Explore our expertly crafted bags that blend heritage and modern elegance, inviting you to experience the artistry behind every piece.</p>
        </SectionHeader>

        <GalleryGrid>
          <GalleryCard>
            <img src="./bag4.png" />
            <div className="overlay">
              <h4>Artisan Totes</h4>
              <p>Bold patterns & unmatched capacity</p>
            </div>
          </GalleryCard>

          <GalleryCard>
            <img src="./bag3.png" />
            <div className="overlay">
              <h4>Heritage Crossbody</h4>
              <p>Culture meets sleek modern design</p>
            </div>
          </GalleryCard>

          <GalleryCard>
            <img src="./bag12.png" />
            <div className="overlay">
              <h4>Royal Statement Bags</h4>
              <p>Exquisite detailing for elite occasions</p>
            </div>
          </GalleryCard>
        </GalleryGrid>
      </GallerySection>

      {/* 5. HERITAGE BANNER SECTION */}
      <HeritageBanner>
        <div className="banner-content">
          <div className="badge-pill" style={{ margin: '0 auto 1.5rem auto', display: 'inline-flex' }}>
            <Heart className="w-4 h-4 text-pink-500" /> Built With Passion
          </div>
          <h2>Experience Timeless Craftsmanship with Every Bag</h2>
          <p>
            At Kingsword Bag Craft, we celebrate African heritage through exquisite bags that fuse traditional artistry with modern design, empowering you with style that tells a story.
          </p>
          <PrimaryButton href="/store">
            Browse All Designs
            <ArrowRight className="w-5 h-5" />
          </PrimaryButton>
        </div>
      </HeritageBanner>
    </PageWrapper>
  );
}