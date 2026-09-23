"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { ShieldCheck, Truck, Headphones, Award, ArrowRight, CheckCircle2, Globe, HeartHandshake } from "lucide-react";
import EnitzAboutSections from "@/components/EnitzAboutSections";
import EnitzCategoriesSection from "@/components/EnitzCategoriesSection";

/* ================= THEME STYLES (ENITZ) ================= */
const ThemeGradient = "linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)";
const LightBg = "#ffffff";
const CardBg = "#f8fafc";
const TextPrimary = "#0f172a";
const TextMuted = "#475569";
const BorderColor = "rgba(226, 232, 240, 0.9)";
const CyanPrimary = "#00aeef";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

/* ================= LAYOUT COMPONENTS ================= */

const PageWrapper = styled.main`
  background-color: ${LightBg};
  color: ${TextPrimary};
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  padding: 6rem 1.5rem 5rem 1.5rem;
  background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);
  text-align: center;
  border-bottom: 1px solid ${BorderColor};

  .container {
    max-width: 900px;
    margin: 0 auto;
    animation: ${fadeIn} 0.8s ease-out;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    background: rgba(0, 174, 239, 0.1);
    border: 1px solid rgba(0, 174, 239, 0.25);
    border-radius: 9999px;
    color: ${CyanPrimary};
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 900;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: ${TextPrimary};
    letter-spacing: -0.03em;

    @media (min-width: 768px) {
      font-size: 4rem;
    }

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
    max-width: 700px;
    margin: 0 auto 2.5rem auto;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  background: ${ThemeGradient};
  color: #ffffff;
  font-weight: 700;
  font-size: 1.05rem;
  box-shadow: 0 10px 25px -5px rgba(0, 174, 239, 0.4);
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px -5px rgba(0, 174, 239, 0.6);
  }
`;

const StorySection = styled.section`
  padding: 6rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3.5rem;
    align-items: center;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .content {
    h2 {
      font-size: 2.25rem;
      font-weight: 800;
      color: ${TextPrimary};
      margin-bottom: 1.25rem;
      letter-spacing: -0.02em;
    }

    p {
      color: ${TextMuted};
      font-size: 1.05rem;
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }

    .check-list {
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
      margin-top: 1.5rem;

      li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 600;
        color: ${TextPrimary};

        svg {
          color: ${CyanPrimary};
          flex-shrink: 0;
        }
      }
    }
  }

  .image-wrapper {
    position: relative;
    
    img {
      width: 100%;
      height: 440px;
      object-fit: cover;
      border-radius: 2rem;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
      animation: ${float} 6s ease-in-out infinite;
    }
  }
`;

const ValuesSection = styled.section`
  padding: 6rem 1.5rem;
  background-color: ${CardBg};
  border-top: 1px solid ${BorderColor};
  border-bottom: 1px solid ${BorderColor};

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 4rem auto;

    h2 {
      font-size: 2.5rem;
      font-weight: 800;
      color: ${TextPrimary};
      margin-bottom: 1rem;
    }

    p {
      color: ${TextMuted};
      font-size: 1.1rem;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

const ValueCard = styled.div`
  background: ${LightBg};
  border: 1px solid ${BorderColor};
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.02);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 174, 239, 0.4);
    box-shadow: 0 20px 40px -10px rgba(0, 174, 239, 0.1);
  }

  .icon-box {
    width: 60px;
    height: 60px;
    border-radius: 1rem;
    background: rgba(0, 174, 239, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${CyanPrimary};
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${TextPrimary};
    margin-bottom: 0.75rem;
  }

  p {
    color: ${TextMuted};
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const ShowcaseSection = styled.section`
  padding: 6rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;

    @media (min-width: 992px) {
      grid-template-columns: 1.2fr 1fr;
    }
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      border-radius: 1.25rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

      &:nth-child(2) {
        transform: translateY(20px);
      }
    }
  }

  .content {
    h2 {
      font-size: 2.25rem;
      font-weight: 800;
      color: ${TextPrimary};
      margin-bottom: 1.25rem;
    }

    p {
      color: ${TextMuted};
      font-size: 1.05rem;
      line-height: 1.8;
      margin-bottom: 2rem;
    }
  }
`;

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* --- HERO SECTION --- */}
      <HeroSection>
        <div className="container">
          <div className="badge">
            <Globe className="w-4 h-4" /> About Enitz
          </div>
          <h1>
            QUALITY WITHIN REACH <span>Making quality everyday products easier to access.</span>
          </h1>
          <p>
           At ENITZ, we believe customers should be able to access quality products at reasonable prices without compromising on convenience, trust or customer care.   </p>
          <PrimaryButton href="/store">
            Explore Our Store
            <ArrowRight className="w-5 h-5" />
          </PrimaryButton>
        </div>
      </HeroSection>

      <EnitzAboutSections/>
      <EnitzCategoriesSection/>

      {/* --- OUR STORY SECTION --- */}
      {/* <StorySection>
        <div className="grid">
          <div className="content">
            <h2>Built on a Passion for Quality and Customer Satisfaction</h2>
            <p>
              Enitz was founded with a clear vision: to simplify access to premium everyday goods and lifestyle items without compromising on value or customer care. 
            </p>
            <p>
              We pride ourselves on our meticulous selection of merchandise, transparent pricing, and robust fulfillment channels designed to meet the demands of today's fast-paced digital shoppers.
            </p>
            <ul className="check-list">
              <li>
                <CheckCircle2 className="w-5 h-5" /> Verified High-Quality Products
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" /> Transparent Pricing & Secure Checkout
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" /> Prompt Customer-Centric Support & Delivery
              </li>
            </ul>
          </div>
          <div className="image-wrapper">
      
            <img 
              src="./h5.png" 
              alt="Enitz retail merchandise experience" 
            />
          </div>
        </div>
      </StorySection> */}

      {/* --- CORE VALUES SECTION --- */}
      {/* <ValuesSection>
        <div className="container">
          <div className="section-header">
            <h2>Our Core Pillars</h2>
            <p>The principles that guide our day-to-day operations and commitment to every shopper.</p>
          </div>
          <div className="grid">
            <ValueCard>
              <div className="icon-box">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3>Uncompromised Quality</h3>
              <p>Every product in our catalog undergoes strict curation to ensure durability, utility, and absolute customer delight.</p>
            </ValueCard>

            <ValueCard>
              <div className="icon-box">
                <Truck className="w-7 h-7" />
              </div>
              <h3>Fast & Reliable Delivery</h3>
              <p>We work efficiently to process and ship your orders securely so they arrive right when you need them.</p>
            </ValueCard>

            <ValueCard>
              <div className="icon-box">
                <Headphones className="w-7 h-7" />
              </div>
              <h3>Dedicated Support</h3>
              <p>Our friendly support team is always ready to assist you with inquiries, orders, and post-purchase care.</p>
            </ValueCard>

            <ValueCard>
              <div className="icon-box">
                <Award className="w-7 h-7" />
              </div>
              <h3>Customer Trust</h3>
              <p>Building long-term relationships through honesty, transparent transactions, and dependable service quality.</p>
            </ValueCard>
          </div>
        </div>
      </ValuesSection> */}

      {/* --- VISUAL SHOWCASE SECTION --- */}
      <ShowcaseSection>
        <div className="grid">
          <div className="image-grid">
            {/* Unsplash image set: lifestyle and shopping */}
            <img 
              src="./h6.png" 
              alt="Modern shopping merchandise" 
            />
            <img 
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80" 
              alt="Satisfied retail customer experience" 
            />
          </div>
          <div className="content">
            <h2>Quality Within Reach. Every Day.</h2>
            <p>
            “Whether you're shopping for your home, family, personal needs or lifestyle, ENITZ is here to make quality products easier to find, order and enjoy.

We are building a brand founded on quality, value and trust — one customer at a time.” </p>
            <PrimaryButton href="/store">
              Shop ENITZ
              <ArrowRight className="w-5 h-5" />
            </PrimaryButton>
          </div>
        </div>
      </ShowcaseSection>
    </PageWrapper>
  );
}