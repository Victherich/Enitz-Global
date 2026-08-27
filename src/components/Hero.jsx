




"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { Sparkles, ArrowRight, ShoppingBag } from "lucide-react";

// Static main title and badges, with rotating backgrounds and subtitles tailored for Enitz Global Limited
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80",
    badge: "Quality Products. Great Prices.",
    subtitle: "At Enitz Global Limited, we bring you carefully selected personal and household products designed to make everyday living easy, affordable, and convenient."
  },
  {
    image: "./h1.png",
    badge: "Everyday Essentials & Retail",
    subtitle: "Explore our wide range of useful, high-quality merchandise suited for your modern lifestyle, all backed by convenient ordering and reliable delivery."
  },
  {
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1920&q=80",
    badge: "Smart Shopping Experience",
    subtitle: "Discover incredible value on household goods and personal items with seamless purchasing and top-tier customer service right at your fingertips."
  },
  {
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1920&q=80",
    badge: "Shop With Confidence",
    subtitle: "Browse our latest catalog today and enjoy unmatched pricing on everyday essentials designed to elevate your home and personal spaces."
  }
];

// Fluid & Smooth Keyframe Animations
const smoothFadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const smoothZoom = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1.03);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Styled Components (Updated with Enitz Global Theme: Dark Navy Blue & Bright Cyan)
const HeroSectionWrapper = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #0b1b48;
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.$isActive ? 1 : 0)};
  transition: opacity 1.6s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${props => (props.$isActive ? smoothZoom : "none")} 7s ease-in-out infinite alternate;
  will-change: opacity, transform;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(11, 27, 72, 0.96), rgba(11, 27, 72, 0.6), rgba(11, 27, 72, 0.4));
  z-index: 1;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 1.5rem;
  padding: 0 1.5rem;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  color: #ffffff;
  line-height: 1.15;

  @media (min-width: 640px) {
    font-size: 3.75rem;
  }
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const HighlightSpan = styled.span`
  background: linear-gradient(135deg, #00aeef 0%, #ffffff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 5s linear infinite;
`;

const Subtitle = styled.p`
  max-width: 42rem;
  font-size: 1rem;
  color: #cbd5e1;
  font-weight: 400;
  line-height: 1.625;
  animation: ${smoothFadeInUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: opacity, transform, filter;

  @media (min-width: 768px) {
    font-size: 1.15rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding-top: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    width: auto;
  }
`;

const PrimaryButton = styled(Link)`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #00aeef 0%, #0b1b48 100%);
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 174, 239, 0.4);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;

  &:hover {
    opacity: 0.95;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 30px -5px rgba(0, 174, 239, 0.6);
  }

  @media (min-width: 640px) {
    width: auto;
  }
`;

const SecondaryButton = styled(Link)`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-3px) scale(1.02);
  }

  @media (min-width: 640px) {
    width: auto;
  }
`;

const IndicatorsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-top: 1.5rem;
`;

const IndicatorDot = styled.button`
  height: 0.5rem;
  border-radius: 9999px;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border: none;
  cursor: pointer;
  width: ${props => (props.$isActive ? "2.5rem" : "0.5rem")};
  background-color: ${props => (props.$isActive ? "#00aeef" : "rgba(255, 255, 255, 0.35)")};
  box-shadow: ${props => (props.$isActive ? "0 0 12px rgba(0, 174, 239, 0.6)" : "none")};

  &:hover {
    background-color: ${props => (props.$isActive ? "#00aeef" : "rgba(255, 255, 255, 0.6)")};
  }
`;

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically switch backgrounds and subtitles smoothly every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[currentIndex];

  return (
    <HeroSectionWrapper>
      {/* Background Images with Fluid Crossfade & Subtle Zoom */}
      {heroSlides.map((slide, index) => (
        <BackgroundImage
          key={slide.image}
          $bgImage={slide.image}
          $isActive={index === currentIndex}
        />
      ))}

      <GradientOverlay />

      <ContentContainer>
        
        {/* Retail Badge */}
        <Badge>
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>{currentSlide.badge}</span>
        </Badge>

        {/* Static Main Headline */}
        <Title>
          ENITZ <HighlightSpan>GLOBAL</HighlightSpan>
        </Title>

        {/* Dynamic Animated Subtitle Description */}
        <Subtitle key={currentIndex}>
          {currentSlide.subtitle}
        </Subtitle>

        {/* Dual Call-To-Action Buttons */}
        <ButtonGroup>
          <PrimaryButton href="/store">
            Explore Store
            <ArrowRight className="w-5 h-5 transition-transform duration-300 hover:translate-x-1" />
          </PrimaryButton>

          <SecondaryButton href="/contact">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            Contact Us
          </SecondaryButton>
        </ButtonGroup>

        {/* Interactive Carousel Indicators */}
        <IndicatorsContainer>
          {heroSlides.map((_, idx) => (
            <IndicatorDot
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              $isActive={idx === currentIndex}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </IndicatorsContainer>

      </ContentContainer>
    </HeroSectionWrapper>
  );
}