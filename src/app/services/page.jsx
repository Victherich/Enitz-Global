"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { 
  Sparkles, 
  Palette, 
  ShoppingBag, 
  Wrench, 
  Scissors, 
  Globe2, 
  ShieldCheck, 
  ArrowRight,
  Quote
} from "lucide-react";
import { useRouter } from "next/navigation";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components (Light Mode, Unsplash Integration, Generous Spacing)
const ServicesPageWrapper = styled.div`
  min-height: 100vh;
  background-color: #fafaf9;
  color: #1c1917;
  padding: 40px 20px 80px 20px;
  position: relative;
  overflow: hidden;
  font-family: system-ui, -apple-system, sans-serif;

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
    background: radial-gradient(circle at 15% 10%, rgba(217, 119, 6, 0.04) 0%, transparent 40%),
                radial-gradient(circle at 85% 90%, rgba(190, 24, 93, 0.04) 0%, transparent 40%);
    pointer-events: none;
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 80px;
  position: relative;
  z-index: 2;
`;

// Header Section
const HeaderSection = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  background: #fdf2f8;
  border: 1px solid rgba(219, 39, 119, 0.2);
  color: #db2777;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 auto;
`;

const MainTitle = styled.h1`
  font-size: 2.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #1c1917;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const HighlightSpan = styled.span`
  background: linear-gradient(135deg, #d97706 0%, #be185d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #57534e;
  line-height: 1.6;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

// Core Services Grid (3 Columns)
const SectionHeading = styled.div`
  text-align: center;
  margin-bottom: 24px;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1c1917;
    margin-bottom: 12px;
  }

  p {
    font-size: 1rem;
    color: #78716c;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled.div`
  background: #ffffff;
  border: 1px solid #e7e5e4;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-6px);
    border-color: #d97706;
    box-shadow: 0 20px 40px -15px rgba(217, 119, 6, 0.15);
  }
`;

const ServiceImageWrapper = styled.div`
  height: 220px;
  width: 100%;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  ${ServiceCard}:hover & img {
    transform: scale(1.06);
  }
`;

const ServiceContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;

const ServiceIconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #fffbeb;
  color: #d97706;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -56px;
  position: relative;
  z-index: 2;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  color: #1c1917;
  margin: 0;
`;

const ServiceDescription = styled.p`
  font-size: 0.95rem;
  color: #57534e;
  line-height: 1.6;
  margin: 0;
`;

// Features Split Showcase
const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e7e5e4;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.04);

  @media (min-width: 1024px) {
    grid-template-columns: 1.1fr 1fr;
    padding: 60px;
  }
`;

const FeaturesInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  h2 {
    font-size: 2.25rem;
    font-weight: 800;
    color: #1c1917;
    line-height: 1.25;
    margin: 0;
  }

  p {
    font-size: 1.05rem;
    color: #57534e;
    line-height: 1.6;
    margin: 0;
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 8px;
`;

const FeatureItem = styled.div`
  display: flex;
  gap: 18px;
  align-items: flex-start;
`;

const FeatureIconCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fdf2f8;
  color: #be185d;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(190, 24, 93, 0.2);

  svg {
    width: 20px;
    height: 20px;
  }
`;

const FeatureTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h4 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1c1917;
    margin: 0;
  }

  p {
    font-size: 0.95rem;
    color: #57534e;
    margin: 0;
    line-height: 1.5;
  }
`;

const FeaturesImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

    &:first-child {
      height: 280px;
      transform: translateY(-20px);
    }

    &:last-child {
      height: 280px;
      transform: translateY(20px);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    img {
      transform: none !important;
      height: 220px !important;
    }
  }
`;

// Call to Action Banner
const ActionBanner = styled.div`
  background: linear-gradient(135deg, #1c1917 0%, #292524 100%);
  border-radius: 24px;
  padding: 50px 30px;
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    opacity: 0.12;
    z-index: 1;
  }

  * {
    position: relative;
    z-index: 2;
  }

  h2 {
    font-size: 2.25rem;
    font-weight: 800;
    margin: 0;
  }

  p {
    font-size: 1.1rem;
    color: #d6d3d1;
    max-width: 600px;
    margin: 0;
  }
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #d97706 0%, #be185d 100%);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(217, 119, 6, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 25px rgba(190, 24, 93, 0.4);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

// Testimonials Section
const TestimonialsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TestimonialCard = styled.div`
  background: #ffffff;
  border: 1px solid #e7e5e4;
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.04);
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: #d97706;
  }
`;

const QuoteIconWrapper = styled.div`
  color: #d97706;
  opacity: 0.2;
  position: absolute;
  top: 24px;
  right: 24px;

  svg {
    width: 36px;
    height: 36px;
  }
`;

const TestimonialText = styled.p`
  font-size: 1.05rem;
  font-style: italic;
  color: #44403c;
  line-height: 1.6;
  margin: 0;
  z-index: 1;
`;

const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid #f5f5f4;
  padding-top: 16px;

  h4 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #1c1917;
    margin: 0;
  }

  span {
    font-size: 0.85rem;
    color: #78716c;
    font-weight: 500;
  }
`;

export default function ServicesPage() {
    const router = useRouter();
  return (
    <ServicesPageWrapper>
      <Container>
        {/* Header Section */}
        <HeaderSection>
          <Badge>
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span>Kingsword Couture Services</span>
          </Badge>
          <MainTitle>
            Explore Our <HighlightSpan>Exclusive Craftsmanship</HighlightSpan>
          </MainTitle>
          <Subtitle>
            Discover our bespoke bag-making services that blend tradition with modern elegance, ensuring unparalleled quality and customer delight.
          </Subtitle>
        </HeaderSection>

        {/* Core Services Section */}
        <div>
          <SectionHeading>
            <h2>Bespoke Offerings</h2>
            <p>Tailored services designed to bring your unique style and heritage to life</p>
          </SectionHeading>
          
          <ServicesGrid>
            {/* Service 1 */}
            <ServiceCard>
              <ServiceImageWrapper>
                <img 
                  src="./bag5.png" 
                  alt="Custom Bag Design Workshop" 
                />
              </ServiceImageWrapper>
              <ServiceContent>
                <ServiceIconBox>
                  <Palette />
                </ServiceIconBox>
                <ServiceTitle>Custom Bag Design</ServiceTitle>
                <ServiceDescription>
                  Collaborate with our artisans to create personalized bags that reflect your unique style and cultural heritage.
                </ServiceDescription>
              </ServiceContent>
            </ServiceCard>

            {/* Service 2 */}
            <ServiceCard>
              <ServiceImageWrapper>
                <img 
                  src="./bag7.jpeg" 
                  alt="Handcrafted Luxury Collections" 
                />
              </ServiceImageWrapper>
              <ServiceContent>
                <ServiceIconBox>
                  <ShoppingBag />
                </ServiceIconBox>
                <ServiceTitle>Handcrafted Collections</ServiceTitle>
                <ServiceDescription>
                  Browse our expertly crafted collections that marry African artistry with contemporary fashion trends.
                </ServiceDescription>
              </ServiceContent>
            </ServiceCard>

            {/* Service 3 */}
            <ServiceCard>
              <ServiceImageWrapper>
                <img 
                  src="./bag8.jpeg" 
                  alt="Restoration & Care Studio" 
                />
              </ServiceImageWrapper>
              <ServiceContent>
                <ServiceIconBox>
                  <Wrench />
                </ServiceIconBox>
                <ServiceTitle>Restoration & Care</ServiceTitle>
                <ServiceDescription>
                  Experience meticulous restoration services that preserve the beauty and durability of your cherished bags.
                </ServiceDescription>
              </ServiceContent>
            </ServiceCard>
          </ServicesGrid>
        </div>

        {/* Features Split Showcase */}
        <FeaturesSection>
          <FeaturesInfo>
            <div>
              <Badge style={{ margin: "0 0 16px 0" }}>
                <span>The Kingsword Experience</span>
              </Badge>
              <h2>Experience Timeless Elegance and Craftsmanship</h2>
            </div>
            <p>
              Discover how our handcrafted bags blend tradition with modern design to elevate your style and confidence.
            </p>

            <FeatureList>
              <FeatureItem>
                <FeatureIconCircle>
                  <Scissors />
                </FeatureIconCircle>
                <FeatureTextContent>
                  <h4>Artisanal Craftsmanship</h4>
                  <p>Each bag is meticulously handmade, ensuring exceptional quality and a unique piece that celebrates cultural heritage.</p>
                </FeatureTextContent>
              </FeatureItem>

              <FeatureItem>
                <FeatureIconCircle>
                  <Globe2 />
                </FeatureIconCircle>
                <FeatureTextContent>
                  <h4>Cultural Fusion Design</h4>
                  <p>Our collections combine African artistry with contemporary trends, creating bags that stand out in any setting.</p>
                </FeatureTextContent>
              </FeatureItem>

              <FeatureItem>
                <FeatureIconCircle>
                  <ShieldCheck />
                </FeatureIconCircle>
                <FeatureTextContent>
                  <h4>Seamless Shopping Experience</h4>
                  <p>Enjoy an intuitive online platform that makes exploring and purchasing our luxury bags effortless and enjoyable.</p>
                </FeatureTextContent>
              </FeatureItem>
            </FeatureList>
          </FeaturesInfo>

          <FeaturesImageGrid>
            <img 
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop" 
              alt="Artisanal leather stitching workspace" 
            />
            <img 
              src="./bag11.jpeg" 
              alt="Model with luxury handmade designer bag" 
            />
          </FeaturesImageGrid>
        </FeaturesSection>

        {/* Call to Action Banner */}
        <ActionBanner>
          <h2>Discover Our Collections</h2>
          <p>Ready to elevate your wardrobe with timeless pieces that honor heritage and embrace modern elegance?</p>
          <PrimaryButton onClick={()=>router.push('/store')}>
            <span>Explore Boutique</span>
            <ArrowRight />
          </PrimaryButton>
        </ActionBanner>

        {/* Testimonials Section */}
        <TestimonialsWrapper>
          <SectionHeading>
            <h2>What Our Clients Say</h2>
            <p>Discover heartfelt testimonials from our valued customers, sharing their unique journeys and delight with Kingsword Couture’s artistry.</p>
          </SectionHeading>

          <TestimonialsGrid>
            <TestimonialCard>
              <QuoteIconWrapper>
                <Quote />
              </QuoteIconWrapper>
              <TestimonialText>
                "Kingsword Couture transformed my vision into a stunning reality, blending tradition with modern elegance flawlessly."
              </TestimonialText>
              <ClientInfo>
                <h4>Amina J.</h4>
                <span>Fashion Editor</span>
              </ClientInfo>
            </TestimonialCard>

            <TestimonialCard>
              <QuoteIconWrapper>
                <Quote />
              </QuoteIconWrapper>
              <TestimonialText>
                "The craftsmanship and attention to detail at Kingsword Couture surpassed all expectations with unmatched professionalism."
              </TestimonialText>
              <ClientInfo>
                <h4>David M.</h4>
                <span>Creative Director</span>
              </ClientInfo>
            </TestimonialCard>

            <TestimonialCard>
              <QuoteIconWrapper>
                <Quote />
              </QuoteIconWrapper>
              <TestimonialText>
                "I was thoroughly impressed by the seamless shopping experience and the exquisite quality of every piece."
              </TestimonialText>
              <ClientInfo>
                <h4>Nia L.</h4>
                <span>Brand Consultant</span>
              </ClientInfo>
            </TestimonialCard>
          </TestimonialsGrid>
        </TestimonialsWrapper>
      </Container>
    </ServicesPageWrapper>
  );
}