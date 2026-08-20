"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { 
  Sparkles, 
  Award, 
  HeartHandshake, 
  Compass, 
  CheckCircle 
} from "lucide-react";

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

// Styled Components (Light Mode, Unsplash Integration, Generous Spacing)
const AboutPageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  color: #0f172a;
  padding: 40px 20px 80px 20px;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 60px 40px 100px 40px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 10% 10%, rgba(236, 72, 153, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 90% 90%, rgba(245, 158, 11, 0.05) 0%, transparent 40%);
    pointer-events: none;
    z-index: 1;
  }
`;

const HeaderContainer = styled.div`
  max-width: 50rem;
  margin: 0 auto 40px auto;
  text-align: center;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  background: #fdf2f8;
  border: 1px solid rgba(236, 72, 153, 0.3);
  color: #db2777;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 auto;
  animation: ${floatAnimation} 4s ease-in-out infinite;
`;

const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  line-height: 1.15;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 3.5rem;
  }
`;

const HighlightSpan = styled.span`
  background: linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.6;
  margin: 0 auto;
  max-width: 45rem;
`;

const ContentGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
  z-index: 2;
`;

const HeroImageCard = styled.div`
  position: relative;
  height: 320px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.08);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%);
  }

  @media (min-width: 768px) {
    height: 420px;
  }
`;

const HeroOverlayContent = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  right: 30px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;

  span:first-child {
    font-size: 0.85rem;
    color: #f472b6;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;

    @media (min-width: 768px) {
      font-size: 2.25rem;
    }
  }

  p {
    font-size: 1rem;
    color: #cbd5e1;
    margin: 0;
    max-width: 45rem;
    line-height: 1.5;
  }
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PillarCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ec4899;
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(236, 72, 153, 0.08);
  }
`;

const PillarImageWrapper = styled.div`
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PillarTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;

  svg {
    color: #ec4899;
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const PillarText = styled.p`
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
`;

const FounderSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.05);

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1.25fr;
    align-items: center;
    padding: 48px;
    gap: 48px;
  }
`;

const FounderImageContainer = styled.div`
  position: relative;
  height: 350px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 1024px) {
    height: 450px;
  }
`;

const FounderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FounderRoleBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  background: #fdf2f8;
  color: #db2777;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  width: fit-content;
`;

const FounderName = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const FounderBio = styled.p`
  font-size: 1rem;
  color: #475569;
  line-height: 1.7;
  margin: 0;
`;

const SocialLinksGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
`;

const SocialLinkButton = styled.a`
  padding: 8px 18px;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #ec4899;
    color: #ffffff;
    border-color: #ec4899;
    transform: translateY(-2px);
  }
`;

const TestimonialCard = styled.div`
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: 24px;
  padding: 40px 30px;
  color: #ffffff;
  overflow: hidden;
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.15);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    z-index: 1;
  }
`;

const TestimonialContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
  max-width: 50rem;
  margin: 0 auto;

  p {
    font-size: 1.2rem;
    font-style: italic;
    font-weight: 500;
    color: #f1f5f9;
    line-height: 1.6;
    margin: 0;

    @media (min-width: 768px) {
      font-size: 1.4rem;
    }
  }

  span {
    font-size: 0.9rem;
    color: #f472b6;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
`;

export default function AboutUsPage() {
  return (
    <AboutPageWrapper>
      <HeaderContainer>
        <Badge>
          <Sparkles className="w-4 h-4 text-pink-600" />
          <span>Our Heritage & Vision</span>
        </Badge>
        <MainTitle>
          Explore the Essence of <HighlightSpan>Kingsword Couture</HighlightSpan>
        </MainTitle>
        <Subtitle>
          Explore the journey and aspirations that drive our passion for exquisite craftsmanship and timeless style.
        </Subtitle>
      </HeaderContainer>

      <ContentGrid>
        <HeroImageCard>
          <img 
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop" 
            alt="Kingsword Couture luxury bag workshop craftsmanship" 
          />
          <HeroOverlayContent>
            <span>Heritage Meets Modernity</span>
            <h2>Crafting Excellence Without Compromise</h2>
            <p>At Kingsword Couture, we blend African heritage with modern elegance, crafting exquisite bags that empower and inspire worldwide.</p>
          </HeroOverlayContent>
        </HeroImageCard>

        <PillarsGrid>
          <PillarCard>
            <PillarImageWrapper>
              <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop" alt="Timeless African Heritage" />
            </PillarImageWrapper>
            <PillarTitle>
              <Compass className="w-5 h-5" />
              African Heritage
            </PillarTitle>
            <PillarText>
              Honoring traditional roots and deep cultural craftsmanship while embracing innovative global standards.
            </PillarText>
          </PillarCard>

          <PillarCard>
            <PillarImageWrapper>
              <img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop" alt="Exquisite Quality Control" />
            </PillarImageWrapper>
            <PillarTitle>
              <Award className="w-5 h-5" />
              Uncompromising Quality
            </PillarTitle>
            <PillarText>
              Delivering timeless style and exceptional durability to discerning customers across the globe.
            </PillarText>
          </PillarCard>

          <PillarCard>
            <PillarImageWrapper>
              <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop" alt="Empowering Artisans" />
            </PillarImageWrapper>
            <PillarTitle>
              <HeartHandshake className="w-5 h-5" />
              Empowering & Inspiring
            </PillarTitle>
            <PillarText>
              Supporting local talents and skilled professionals to bring every unique, handmade bag to life.
            </PillarText>
          </PillarCard>
        </PillarsGrid>

        <FounderSection>
          <FounderImageContainer>
            <img 
              src="./founder.png" 
              alt="Obawa Oluwabukola - Founder and Creative Director" 
            />
          </FounderImageContainer>

          <FounderDetails>
            <FounderRoleBadge>Meet Our Expert Artisans</FounderRoleBadge>
            <FounderName>Obawa Oluwabukola</FounderName>
            <p style={{ fontSize: "1rem", color: "#db2777", fontWeight: "700", margin: "0" }}>Founder & Creative Director</p>
            <FounderBio>
              Obawa is the founder and creative director behind the handmade bags brand. She started it with one idea: make beautiful, well-crafted bags by hand, without cutting corners.
            </FounderBio>
            <FounderBio>
              Day to day, you’ll find her in the workshop, selecting leathers, fine-tuning designs, and working with her team of artisans to bring every bag to life. Her vibe is all about quality, sustainability, and keeping things real — supporting local talents while creating crafts with global standards. Every stitch has her touch on it.
            </FounderBio>

            <SocialLinksGrid>
              <SocialLinkButton href="https://dribbble.com" target="_blank" rel="noopener noreferrer">Dribbble</SocialLinkButton>
              <SocialLinkButton href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</SocialLinkButton>
              <SocialLinkButton href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</SocialLinkButton>
              <SocialLinkButton href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</SocialLinkButton>
            </SocialLinksGrid>
          </FounderDetails>
        </FounderSection>

        <TestimonialCard>
          <TestimonialContent>
            <span>Global Standard of Elegance</span>
            <p>
              "Kingsword Couture consistently delivers exquisite craftsmanship and unparalleled elegance in every bag, exceeding all expectations."
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "0.85rem", color: "#cbd5e1" }}>
              <CheckCircle className="w-4 h-4 text-pink-400" />
              <span>Verified Customer Review & Appreciation</span>
            </div>
          </TestimonialContent>
        </TestimonialCard>
      </ContentGrid>
    </AboutPageWrapper>
  );
}