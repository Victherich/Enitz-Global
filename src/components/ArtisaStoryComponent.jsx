"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Sparkles, CheckCircle2, Scissors, Sparkle, HeartHandshake, Quote } from "lucide-react";

/* ================= ANIMATIONS ================= */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* ================= THEME STYLES (LIGHT MODE) ================= */
const ThemeGradient = "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)";
const LightBg = "#ffffff";
const AltBg = "#f8fafc";
const TextPrimary = "#0f172a";
const TextMuted = "#64748b";
const BorderColor = "#e2e8f0";

/* ================= COMPONENTS ================= */

const StorySection = styled.section`
  padding: 7rem 1.5rem;
  background-color: ${LightBg};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

/* --- PART 1: HERITAGE SPLIT SHOWCASE --- */
const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 7rem;

  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageCollage = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  
  .main-img {
    grid-column: 1 / span 10;
    grid-row: 1;
    border-radius: 1.5rem;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
    border: 1px solid ${BorderColor};
    height: 400px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.03);
    }
  }

  .floating-img {
    grid-column: 6 / span 7;
    grid-row: 1;
    margin-top: 220px;
    z-index: 2;
    border-radius: 1.25rem;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(15, 23, 42, 0.15);
    border: 4px solid #ffffff;
    height: 250px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5s;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #db2777;
  }

  h2 {
    font-size: 2.25rem;
    font-weight: 800;
    color: ${TextPrimary};
    line-height: 1.2;

    @media (min-width: 768px) {
      font-size: 2.75rem;
    }
  }

  p {
    color: ${TextMuted};
    font-size: 1.05rem;
    line-height: 1.7;
  }
`;

const Checklist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 600;
    color: ${TextPrimary};

    svg {
      color: #06b6d4;
      flex-shrink: 0;
    }
  }
`;

/* --- PART 2: CRAFTING PROCESS STEPS --- */
const ProcessWrapper = styled.div`
  background: ${AltBg};
  border-radius: 2rem;
  padding: 4rem 2rem;
  border: 1px solid ${BorderColor};
  margin-bottom: 7rem;

  .header-center {
    text-align: center;
    max-width: 42rem;
    margin: 0 auto 3.5rem auto;

    h3 {
      font-size: 2rem;
      font-weight: 800;
      color: ${TextPrimary};
      margin-bottom: 0.75rem;
    }

    p {
      color: ${TextMuted};
      font-size: 1rem;
      line-height: 1.6;
    }
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StepCard = styled.div`
  background: ${LightBg};
  padding: 2.5rem 2rem;
  border-radius: 1.25rem;
  border: 1px solid ${BorderColor};
  position: relative;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.02);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(236, 72, 153, 0.3);
  }

  .step-number {
    position: absolute;
    top: -1.25rem;
    left: 2rem;
    background: ${ThemeGradient};
    color: #ffffff;
    font-weight: 800;
    font-size: 0.9rem;
    padding: 0.4rem 1rem;
    border-radius: 9999px;
    box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
  }

  h4 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${TextPrimary};
    margin-bottom: 0.75rem;
    margin-top: 0.5rem;
  }

  p {
    color: ${TextMuted};
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

/* --- PART 3: TESTIMONIALS / CLIENT LOVE --- */
const TestimonialsHeader = styled.div`
  text-align: center;
  max-width: 40rem;
  margin: 0 auto 3rem auto;

  h3 {
    font-size: 2rem;
    font-weight: 800;
    color: ${TextPrimary};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${TextMuted};
  }
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TestimonialCard = styled.div`
  background: ${AltBg};
  border: 1px solid ${BorderColor};
  border-radius: 1.5rem;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  position: relative;

  .quote-icon {
    position: absolute;
    top: 2rem;
    right: 2rem;
    color: rgba(236, 72, 153, 0.15);
  }

  p {
    color: ${TextPrimary};
    font-size: 1.05rem;
    font-style: italic;
    line-height: 1.7;
    z-index: 1;
  }

  .client-info {
    display: flex;
    align-items: center;
    gap: 1rem;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #db2777;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    h5 {
      font-size: 1rem;
      font-weight: 700;
      color: ${TextPrimary};
    }

    span {
      font-size: 0.85rem;
      color: ${TextMuted};
    }
  }
`;

export default function ArtisanStoryComponent() {
  return (
    <StorySection>
      <Container>
        
        {/* PART 1: HERITAGE SPLIT SHOWCASE */}
        <SplitGrid>
          <ImageCollage>
            <div className="main-img">
              <img 
                src="./bag9.jpeg" 
                alt="Artisan crafting bags" 
              />
            </div>
            <div className="floating-img">
              <img 
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80" 
                alt="Patterned bag close up" 
              />
            </div>
          </ImageCollage>

          <ContentColumn>
            <div className="tag">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span>Rooted in Culture & Artistry</span>
            </div>
            <h2>Crafted with Passion, Designed for the Global Stage</h2>
            <p>
              Every bag tells a unique story of heritage, identity, and meticulous dedication. By combining rich traditional African fabric weaves with cutting-edge fashion trends, we create statement accessories that turn heads anywhere in the world.
            </p>
            <Checklist>
              <div>
                <CheckCircle2 className="w-5 h-5" />
                <span>100% Handcrafted by Skilled African Artisans</span>
              </div>
              <div>
                <CheckCircle2 className="w-5 h-5" />
                <span>Exclusive, Limited-Edition Pattern Runs</span>
              </div>
              <div>
                <CheckCircle2 className="w-5 h-5" />
                <span>Reinforced Stitching & Premium Hardware Finish</span>
              </div>
            </Checklist>
          </ContentColumn>
        </SplitGrid>

        {/* PART 2: THE CREATION PROCESS */}
        <ProcessWrapper>
          <div className="header-center">
            <h3>The Journey of Your Masterpiece</h3>
            <p>From a spark of cultural inspiration to the finished luxury bag on your shoulder, discover the 3-step creation process behind every Kingsword piece.</p>
          </div>

          <StepsGrid>
            <StepCard>
              <div className="step-number">01</div>
              <h4>Thoughtful Curation</h4>
              <p>We source authentic, high-grade fabrics and durable leathers celebrating vibrant colors, traditional heritage, and unmatched quality.</p>
            </StepCard>

            <StepCard>
              <div className="step-number">02</div>
              <h4>Master Stitching</h4>
              <p>Our veteran artisans cut, assemble, and stitch each panel by hand with uncompromising precision to ensure structural perfection.</p>
            </StepCard>

            <StepCard>
              <div className="step-number">03</div>
              <h4>Quality Inspection</h4>
              <p>Every single bag undergoes rigorous testing for finish, zipper longevity, and symmetry before packaging and shipping to your doorstep.</p>
            </StepCard>
          </StepsGrid>
        </ProcessWrapper>

        {/* PART 3: CLIENT LOVE & TESTIMONIALS */}
        <TestimonialsHeader>
          <h3>Loved by Trendsetters</h3>
          <p>Read what our wonderful clients have to say about carrying confidence and heritage with Kingsword.</p>
        </TestimonialsHeader>

        <TestimonialGrid>
          <TestimonialCard>
            <Quote className="quote-icon w-12 h-12" />
            <p>
              &ldquo;The quality of my patterned tote is out of this world! I get stopped everywhere I go with people asking where I got it. It holds everything securely while looking breathtaking.&rdquo;
            </p>
            <div className="client-info">
              <div className="avatar">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Client" />
              </div>
              <div>
                <h5>Amina Bello</h5>
                <span>Verified Fashion Enthusiast</span>
              </div>
            </div>
          </TestimonialCard>

          <TestimonialCard>
            <Quote className="quote-icon w-12 h-12" />
            <p>
              &ldquo;Ordering a custom lunch and daily tote set was the best decision. The vibrant colors match the pictures perfectly, and the craftsmanship feels truly elite and durable.&rdquo;
            </p>
            <div className="client-info">
              <div className="avatar">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="Client" />
              </div>
              <div>
                <h5>Tunde Adebayo</h5>
                <span>Creative Director</span>
              </div>
            </div>
          </TestimonialCard>
        </TestimonialGrid>

      </Container>
    </StorySection>
  );
}