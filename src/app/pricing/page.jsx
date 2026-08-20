"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  ShoppingBag,
  Clock
} from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

// Styled Components (Modern Light Mode Pricing Layout matching Kingsword Couture theme)
const PricingPageWrapper = styled.div`
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
    background: radial-gradient(circle at 15% 15%, rgba(236, 72, 153, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 85% 85%, rgba(245, 158, 11, 0.05) 0%, transparent 40%);
    pointer-events: none;
    z-index: 1;
  }
`;

const HeaderContainer = styled.div`
  max-width: 52rem;
  margin: 0 auto 48px auto;
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
  max-width: 42rem;
`;

// Value Props Grid (Tradition, Style, Craftsmanship)
const ValuePropsSection = styled.div`
  max-width: 1200px;
  margin: 0 auto 60px auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  position: relative;
  z-index: 2;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ValueCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    border-color: #ec4899;
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(236, 72, 153, 0.08);
  }
`;

const ValueCardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: #ec4899;
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const ValueCardText = styled.p`
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.5;
  margin: 0;
`;

// Pricing Card Section (Signature Collection)
const PricingSectionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 80px auto;
  position: relative;
  z-index: 2;
`;

const FeaturedPricingCard = styled.div`
  background: #ffffff;
  border: 2px solid #ec4899;
  border-radius: 28px;
  padding: 40px;
  box-shadow: 0 20px 40px -10px rgba(236, 72, 153, 0.15);
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
    padding: 48px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const PlanDetailsCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PlanBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: #fdf2f8;
  color: #db2777;
  font-weight: 700;
  font-size: 0.8rem;
  border-radius: 8px;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PlanTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
`;

const PlanDescription = styled.p`
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 12px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #334155;
  font-weight: 500;

  svg {
    color: #10b981;
    width: 1.1rem;
    height: 1.1rem;
    flex-shrink: 0;
  }
`;

const PlanActionCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  gap: 20px;
`;

const PriceDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #64748b;
    font-weight: 700;
    letter-spacing: 0.05em;
  }
`;

const PriceValue = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ShopNowButton = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(236, 72, 153, 0.25);
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(236, 72, 153, 0.35);
  }
`;

// Advantages & Quality Section
const AdvantagesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto 60px auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
  z-index: 2;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 28px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);

  @media (min-width: 768px) {
    padding: 56px;
  }
`;

const AdvantagesHeader = styled.div`
  text-align: center;
  max-width: 44rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  h2 {
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;

    @media (min-width: 640px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: #475569;
    line-height: 1.6;
    margin: 0;
  }
`;

const AdvantagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const AdvantageItemCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ec4899;
    transform: translateY(-4px);
    background: #ffffff;
    box-shadow: 0 12px 25px rgba(236, 72, 153, 0.06);
  }
`;

const AdvantageIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  background: #fdf2f8;
  color: #db2777;
  border: 1px solid rgba(236, 72, 153, 0.2);

  svg {
    width: 1.35rem;
    height: 1.35rem;
  }
`;

const AdvantageItemTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

const AdvantageItemText = styled.p`
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.5;
  margin: 0;
`;

// Bottom Call to Action Banner
const CallToActionBanner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #0f172a 1-%, #1e293b 100%);
  border-radius: 28px;
  padding: 48px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 2;

  @media (min-width: 768px) {
    padding: 64px 40px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color:#0f172a;
  margin: 0;
  max-width: 44rem;
  letter-spacing: -0.02em;

  @media (min-width: 640px) {
    font-size: 2.75rem;
  }
`;

const CTASubtitle = styled.p`
  font-size: 1.05rem;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0;
  max-width: 38rem;
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 14px;
  background: linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 1.05rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.3);
  transition: all 0.3s ease;
  margin-top: 8px;

  &:hover {
    opacity: 0.92;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(236, 72, 153, 0.45);
  }
`;

export default function PricingPage() {
    const router = useRouter();



  return (
    <PricingPageWrapper>
      {/* Header */}
      <HeaderContainer>
        <Badge>
          <Sparkles className="w-4 h-4 text-pink-600" />
          <span>Exclusive Pricing Tailored for You</span>
        </Badge>
        <MainTitle>
          Explore Our Pricing <HighlightSpan>Plans</HighlightSpan>
        </MainTitle>
        <Subtitle>
          Explore our pricing plans crafted to blend luxury with value, ensuring every bag reflects a perfect balance of tradition and style.
        </Subtitle>
      </HeaderContainer>

      {/* Value Proposition Cards */}
      <ValuePropsSection>
        <ValueCard>
          <ValueCardTitle>
            <Star className="w-5 h-5 text-pink-600" />
            Artisanal Craftsmanship
          </ValueCardTitle>
          <ValueCardText>
            Experience the dedication behind each handcrafted bag, showcasing exquisite detail and cultural inspiration.
          </ValueCardText>
        </ValueCard>

        <ValueCard>
          <ValueCardTitle>
            <ShieldCheck className="w-5 h-5 text-pink-600" />
            Modern Elegance
          </ValueCardTitle>
          <ValueCardText>
            Discover designs that marry contemporary aesthetics with rich African heritage for standout sophistication.
          </ValueCardText>
        </ValueCard>

        <ValueCard>
          <ValueCardTitle>
            <ShoppingBag className="w-5 h-5 text-pink-600" />
            Seamless Shopping Experience
          </ValueCardTitle>
          <ValueCardText>
            Enjoy an intuitive and mobile-friendly platform that makes exploring and purchasing effortless.
          </ValueCardText>
        </ValueCard>
      </ValuePropsSection>

      {/* Signature Collection Featured Pricing Card */}
      <PricingSectionContainer>
        <FeaturedPricingCard>
          <PlanDetailsCol>
            <PlanBadge>
              <Sparkles className="w-3.5 h-3.5" />
              Featured Tier
            </PlanBadge>
            <PlanTitle>Signature Collection</PlanTitle>
            <PlanDescription>
              Handcrafted premium bags embodying timeless tradition and modern flair.
            </PlanDescription>
            <FeatureList>
              <FeatureItem>
                <CheckCircle2 />
                Meticulously handcrafted by master artisans
              </FeatureItem>
              <FeatureItem>
                <CheckCircle2 />
                Finest leathers and fabrics for lasting durability
              </FeatureItem>
              <FeatureItem>
                <CheckCircle2 />
                Mobile-first secure ordering & fast delivery
              </FeatureItem>
            </FeatureList>
          </PlanDetailsCol>

          <PlanActionCol>
            <PriceDisplay>
              <span>Investment</span>
              <PriceValue>$89.99</PriceValue>
            </PriceDisplay>
            <ShopNowButton onClick={()=>router.push('/contact')}>
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </ShopNowButton>
          </PlanActionCol>
        </FeaturedPricingCard>
      </PricingSectionContainer>

      {/* Advantages and Quality Section */}
      <AdvantagesContainer>
        <AdvantagesHeader>
          <h2>Experience Exclusive Craftsmanship and Lasting Elegance</h2>
          <p>Discover the distinct advantages and timeless quality that set our handcrafted bags apart.</p>
        </AdvantagesHeader>

        <AdvantagesGrid>
          <AdvantageItemCard>
            <AdvantageIconWrapper>
              <Star />
            </AdvantageIconWrapper>
            <AdvantageItemTitle>Artisanal Craftsmanship</AdvantageItemTitle>
            <AdvantageItemText>
              Each piece is meticulously handcrafted, reflecting African cultural heritage with modern sophistication for unmatched beauty.
            </AdvantageItemText>
          </AdvantageItemCard>

          <AdvantageItemCard>
            <AdvantageIconWrapper>
              <ShieldCheck />
            </AdvantageIconWrapper>
            <AdvantageItemTitle>Premium Materials</AdvantageItemTitle>
            <AdvantageItemText>
              We select only the finest leathers and fabrics, ensuring durability and luxury in every bag we create.
            </AdvantageItemText>
          </AdvantageItemCard>

          <AdvantageItemCard>
            <AdvantageIconWrapper>
              <ShoppingBag />
            </AdvantageIconWrapper>
            <AdvantageItemTitle>Seamless Shopping Experience</AdvantageItemTitle>
            <AdvantageItemText>
              Enjoy effortless browsing and secure purchasing through our mobile-first, user-friendly e-commerce platform.
            </AdvantageItemText>
          </AdvantageItemCard>
        </AdvantagesGrid>
      </AdvantagesContainer>

      {/* Bottom CTA Banner */}
      <CallToActionBanner>
        <CTATitle>Discover Your Signature Style with Kingsword Couture</CTATitle>
        <CTASubtitle>
          Embark on a journey of elegance by exploring our exclusive collections and experience the seamless blend of tradition and modernity in every handcrafted piece.
        </CTASubtitle>
        <CTAButton onClick={()=>router.push('/contact')}>
          Shop Now
          <ArrowRight className="w-4 h-4" />
        </CTAButton>
      </CallToActionBanner>
    </PricingPageWrapper>
  );
}