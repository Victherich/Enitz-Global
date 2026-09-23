"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  CheckCircle, 
  Star, 
  Smile, 
  TrendingUp, 
  Award,
  Layers,
  Tag,
  Truck,
  Users
} from "lucide-react";

/* ================= THEME STYLES (ENITZ) ================= */
const ThemeGradient = "linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)";
const LightBg = "#ffffff";
const CardBg = "#f8fafc";
const TextPrimary = "#0f172a";
const TextMuted = "#475569";
const BorderColor = "rgba(226, 232, 240, 0.9)";
const CyanPrimary = "#00aeef";

const floatSlow = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

/* ================= SECTION 2: OUR STORY ================= */
const StorySectionContainer = styled.section`
  padding: 6rem 1.5rem;
  background-color: ${LightBg};
  max-width: 1200px;
  margin: 0 auto;

  .story-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3.5rem;
    align-items: center;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1.1fr;
    }
  }

  .story-visual {
    position: relative;
    
    .card-accent {
      background: ${CardBg};
      border: 1px solid ${BorderColor};
      border-radius: 2rem;
      padding: 3rem 2.5rem;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.04);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 6px;
        height: 100%;
        background: ${ThemeGradient};
      }

      .floating-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 1rem;
        background: rgba(0, 174, 239, 0.1);
        color: ${CyanPrimary};
        border-radius: 9999px;
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 1.5rem;
      }

      h3 {
        font-size: 1.75rem;
        font-weight: 800;
        color: ${TextPrimary};
        line-height: 1.3;
        margin-bottom: 1rem;

        span {
          background: ${ThemeGradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      p {
        color: ${TextMuted};
        font-size: 1rem;
        line-height: 1.7;
      }
    }
  }

  .story-content {
    h2 {
      font-size: 2.5rem;
      font-weight: 900;
      color: ${TextPrimary};
      margin-bottom: 2rem;
      letter-spacing: -0.02em;
      position: relative;
      display: inline-block;

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 60px;
        height: 4px;
        background: ${ThemeGradient};
        border-radius: 2px;
      }
    }

    .story-paragraphs {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      p {
        color: ${TextMuted};
        font-size: 1.1rem;
        line-height: 1.8;
        position: relative;
        padding-left: 1.5rem;
        border-left: 3px solid rgba(0, 174, 239, 0.2);
        transition: all 0.3s ease;

        &:hover {
          border-left-color: ${CyanPrimary};
          color: ${TextPrimary};
          transform: translateX(4px);
        }
      }
    }
  }
`;

/* ================= SECTION 3: WHAT WE BELIEVE ================= */
const BelieveSectionContainer = styled.section`
  padding: 6rem 1.5rem;
  background-color: ${CardBg};
  border-top: 1px solid ${BorderColor};
  border-bottom: 1px solid ${BorderColor};

  .believe-wrapper {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;

    h2 {
      font-size: 2.5rem;
      font-weight: 900;
      color: ${TextPrimary};
      margin-bottom: 3rem;
      letter-spacing: -0.02em;

      span {
        background: ${ThemeGradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .believe-card {
      background: ${LightBg};
      border: 1px solid ${BorderColor};
      border-radius: 2rem;
      padding: 3.5rem 3rem;
      box-shadow: 0 15px 35px rgba(15, 23, 42, 0.03);
      position: relative;
      animation: ${floatSlow} 6s ease-in-out infinite;

      .icon-cluster {
        width: 70px;
        height: 70px;
        background: rgba(0, 174, 239, 0.1);
        border-radius: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 2rem auto;
        color: ${CyanPrimary};
      }

      .believe-paragraphs {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        p {
          color: ${TextMuted};
          font-size: 1.15rem;
          line-height: 1.8;

          &:first-child {
            font-size: 1.35rem;
            font-weight: 700;
            color: ${TextPrimary};
          }
        }
      }
    }
  }
`;

/* ================= SECTION 4: CORE PILLARS ================= */
const PillarsSectionContainer = styled.section`
  padding: 6rem 1.5rem;
  background-color: ${LightBg};
  max-width: 1200px;
  margin: 0 auto;

  .section-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 4rem auto;

    h2 {
      font-size: 2.5rem;
      font-weight: 900;
      color: ${TextPrimary};
      margin-bottom: 1rem;
    }

    p {
      color: ${TextMuted};
      font-size: 1.1rem;
    }
  }

  .pillars-grid {
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

  .pillar-card {
    background: ${CardBg};
    border: 1px solid ${BorderColor};
    border-radius: 1.5rem;
    padding: 2.5rem 2rem;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;

    &:hover {
      transform: translateY(-6px);
      background: ${LightBg};
      border-color: rgba(0, 174, 239, 0.4);
      box-shadow: 0 20px 40px -10px rgba(0, 174, 239, 0.1);

      .pillar-icon {
        background: ${ThemeGradient};
        color: #ffffff;
      }
    }

    .pillar-icon {
      width: 60px;
      height: 60px;
      border-radius: 1rem;
      background: rgba(0, 174, 239, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${CyanPrimary};
      margin-bottom: 1.5rem;
      transition: all 0.3s ease;
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 800;
      color: ${TextPrimary};
      margin-bottom: 0.75rem;
    }

    p {
      color: ${TextMuted};
      font-size: 0.95rem;
      line-height: 1.6;
    }
  }
`;

export default function EnitzAboutSections() {
  return (
    <>
      {/* 2. OUR STORY SECTION */}
      <StorySectionContainer>
        <div className="story-grid">
          <div className="story-visual">
            <div className="card-accent">
              <div className="floating-badge">
                <Sparkles className="w-4 h-4" /> Welcome to ENITZ
              </div>
              <h3>Bringing <span>Quality</span> Within Reach</h3>
              <p>Your dependable destination for curated personal, household, and everyday lifestyle essentials.</p>
            </div>
          </div>

          <div className="story-content">
            <h2>Our Story</h2>
            <div className="story-paragraphs">
              <p>ENITZ was founded with a simple vision: to make quality personal, household and lifestyle products more accessible to everyday consumers.</p>
              <p>We carefully select products based on quality, usefulness and value, while providing a convenient and dependable shopping experience.</p>
              <p>From everyday household needs to lifestyle products and new discoveries, our goal is simple — to bring quality within reach.</p>
            </div>
          </div>
        </div>
      </StorySectionContainer>

      {/* 3. WHAT WE BELIEVE SECTION */}
      <BelieveSectionContainer>
        <div className="believe-wrapper">
          <h2>What We <span>Believe</span></h2>
          <div className="believe-card">
            <div className="icon-cluster">
              <Heart className="w-8 h-8" />
            </div>
            <div className="believe-paragraphs">
              <p>We believe quality should not be out of reach.</p>
              <p>That is why we focus on carefully selected products, reasonable pricing, transparent transactions and dependable customer service.</p>
              <p>Every interaction with ENITZ is an opportunity to earn your trust and give you a reason to shop with us again.</p>
            </div>
          </div>
        </div>
      </BelieveSectionContainer>

      {/* 4. CORE PILLARS SECTION */}
      <PillarsSectionContainer>
        <div className="section-header">
          <h2>Core Pillars</h2>
          <p>The foundational principles driving our commitment to every customer.</p>
        </div>
        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3>Quality</h3>
            <p>Carefully selected products that offer usefulness, durability and value.</p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <Tag className="w-7 h-7" />
            </div>
            <h3>Fair Value</h3>
            <p>Quality products at reasonable and transparent prices.</p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <Truck className="w-7 h-7" />
            </div>
            <h3>Reliable Service</h3>
            <p>A smooth ordering, delivery and customer-support experience.</p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <Users className="w-7 h-7" />
            </div>
            <h3>Customer Trust</h3>
            <p>We value honesty, transparency and long-term relationships with our customers.</p>
          </div>
        </div>
      </PillarsSectionContainer>
    </>
  );
}