


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
  0% { box-shadow: 0 0 0 0 rgba(0, 174, 239, 0.4); }
  70% { box-shadow: 0 0 0 22px rgba(0, 174, 239, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 174, 239, 0); }
`;

/* ================= THEME STYLES (ENITZ RETAIL) ================= */
const ThemeGradient = "linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)";
const SoftGradientBg = "linear-gradient(135deg, rgba(0, 174, 239, 0.05) 0%, rgba(11, 27, 72, 0.05) 100%)";
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
  box-shadow: 0 14px 30px -5px rgba(0, 174, 239, 0.45);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  animation: ${pulseGlow} 3s infinite;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 20px 40px -5px rgba(0, 174, 239, 0.65);
    animation: none;
  }
`;

/* --- STUNNING HERO SECTION --- */
const HeroSection = styled.section`
  position: relative;
  padding: 8rem 1.5rem 6rem 1.5rem;
  background: radial-gradient(circle at top right, rgba(0, 174, 239, 0.08), transparent 40%),
              radial-gradient(circle at bottom left, rgba(11, 27, 72, 0.08), transparent 40%),
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
    background: linear-gradient(135deg, rgba(0, 174, 239, 0.1), rgba(11, 27, 72, 0.1));
    border: 1px solid rgba(0, 174, 239, 0.25);
    border-radius: 9999px;
    color: #00aeef;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    width: fit-content;
    box-shadow: 0 4px 15px rgba(0, 174, 239, 0.1);
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
    background: linear-gradient(135deg, rgba(0, 174, 239, 0.1), rgba(11, 27, 72, 0.1));
    border: 1px solid rgba(0, 174, 239, 0.2);
    border-radius: 9999px;
    color: #00aeef;
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
    border-color: rgba(0, 174, 239, 0.4);
    box-shadow: 0 30px 60px -15px rgba(0, 174, 239, 0.15);

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
    color: #00aeef;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid rgba(0, 174, 239, 0.15);
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
  // padding: 6rem 1.5rem;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
`;

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${CardBg};
  border: 1px solid ${BorderColor};
  border-radius: 2.5rem;
  padding: 1rem;
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
    color: #0b1b48;
    border: 1px solid rgba(11, 27, 72, 0.2);
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
      background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(0, 174, 239, 0.35) 100%);
    }
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
              <Sparkles className="w-4 h-4 text-cyan-500" /> Premium Retail Catalog
            </div>
            <h1>
              Elevate Your Living with <span>Quality Everyday Essentials</span>
            </h1>
            <p>
              Discover carefully selected personal and household products designed to make modern living easy, affordable, and convenient.
            </p>
            <HeroActions>
              <PrimaryButton href="/store">
                <ShoppingBag className="w-5 h-5" />
                Explore Store
              </PrimaryButton>
            </HeroActions>
          </HeroContent>

          <HeroVisual>
            <img 
              className="main-hero-img"
              // src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80" 
              src='./shop5.jpg'
              alt="Quality Retail Shopping Experience" 
            />
            <div className="floating-badge">
              <div className="icon-wrap">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4>Top Quality</h4>
                <p>Guaranteed Value & Pricing</p>
              </div>
            </div>
          </HeroVisual>
        </HeroGrid>
      </HeroSection>

      {/* 2. WELCOME & INTRO SECTION (BENTO GRID) */}
      <FeaturesSection>
        <SectionHeader>
          <div className="badge-pill">
            <Sparkles className="w-4 h-4" /> Exceptional Value
          </div>
          <h2>Welcome to Enitz</h2>
          <p>
            Your trusted destination for reliable personal merchandise and household products built for absolute convenience and reliability.
          </p>
        </SectionHeader>

        <BentoGrid>
          <BentoCard>
            <div className="icon-box">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3>Verified Quality</h3>
              <p>Every product in our inventory is carefully inspected to meet high standards of durability and performance.</p>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="icon-box">
              <Compass className="w-8 h-8" />
            </div>
            <div>
              <h3>Smart Selection</h3>
              <p>We source modern lifestyle essentials that seamlessly integrate into your daily home routines.</p>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="icon-box">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3>Reliable Service</h3>
              <p>Enjoy secure ordering, transparent pricing, and swift customer support on every purchase.</p>
            </div>
          </BentoCard>
        </BentoGrid>
      </FeaturesSection>

      {/* 3. FEATURED PRODUCT SHOWCASE */}
      <ProductShowcaseSection>
        <ProductContainer>
          <ImageWrapper>
            <div className="badge-tag">
              <Sparkles className="w-4 h-4 text-cyan-600" /> Best Seller
            </div>
            <img 
              // src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80" 
              src='./shop4.jpg'
              alt="Featured Retail Product" 
            />
          </ImageWrapper>

          <ProductDetails>
            <span className="category">Featured Spotlight</span>
            <h3>Modern Lifestyle & Household Package</h3>
            <div className="price">Explore Catalog</div>
            <p>
              Upgrade your living space with our top-rated selection of everyday tools and personal accessories designed to deliver maximum comfort and utility.
            </p>
            <div>
              <PrimaryButton href="/store">
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </PrimaryButton>
            </div>
          </ProductDetails>
        </ProductContainer>
      </ProductShowcaseSection>

      {/* 4. SIGNATURE COLLECTIONS GALLERY */}
      <GallerySection>
        <SectionHeader>
          <div className="badge-pill">
            <Star className="w-4 h-4 text-cyan-500" /> Curated Catalog
          </div>
          <h2>Popular Categories</h2>
          <p>Explore our diverse range of everyday essentials and lifestyle items handpicked for modern households.</p>
        </SectionHeader>

        <GalleryGrid>
          <GalleryCard>
            <img src="./h3.png" alt="Personal Essentials" />
            <div className="overlay">
              <h4>Personal Essentials</h4>
              <p>Items built for your daily routine</p>
            </div>
          </GalleryCard>

          <GalleryCard>
            <img src="./h4.png" alt="Home & Living" />
            <div className="overlay">
              <h4>Home & Living</h4>
              <p>Practical goods to elevate your space</p>
            </div>
          </GalleryCard>

          <GalleryCard>
            <img src="./h2.png" alt="Smart Merchandise" />
            <div className="overlay">
              <h4>Smart Merchandise</h4>
              <p>Innovative solutions for modern needs</p>
            </div>
          </GalleryCard>
        </GalleryGrid>
      </GallerySection>

    </PageWrapper>
  );
}