import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import LandingProductsSection from '@/components/LandingProductsSection';
import Link from 'next/link';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import HeroSection2 from '@/components/Hero';
import LandingPageComponent from '@/components/LandingPageComponent';
import ArtisanStoryComponent from '@/components/ArtisaStoryComponent';



// --- THEME & ANIMATIONS ---
const primaryGold = '#D4AF37';
const primaryBlue = '#1E3A8A';
const goldGradient = 'linear-gradient(135deg, #FFDF73 0%, #D4AF37 50%, #AA7C11 100%)';
const blueGradient = 'linear-gradient(135deg, #3B82F6 0%, #1E3A8A 50%, #0F172A 100%)';
const accentGradient = 'linear-gradient(135deg, #3B82F6 0%, #D4AF37 100%)';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// --- DATA CONTEXT (Generic Component Structure, Unique Business Content) ---
const landingData = {
  hero: {
    badge: "Where Vision Meets Timeless Elegance",
    title: "Transforming Ordinary Spaces Into Timeless Masterpieces",
    description: "At Bees Interior, we specialize in transforming ordinary spaces into elegant, functional, and timeless environments through bespoke design and premium luxury accessories.",
    primaryCta: "Explore Collections",
    secondaryCta: "Book Consultation",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
  },
  stats: [
    { label: "Completed Projects", value: "250+" },
    { label: "Curated Accessories", value: "1,200+" },
    { label: "Satisfied Clients", value: "500+" },
    { label: "Design Experts", value: "15+" }
  ],
  services: [
    {
      title: "Residential Interior Design",
      desc: "Bespoke design solutions crafted uniquely for your home, ensuring comfort, style, and luxury.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Commercial & Corporate Spaces",
      desc: "Elevate your workspace environment with functional, modern, and inspiring interior layouts.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Curated Luxury Retail",
      desc: "Explore high-end furniture, lighting, wall finishes, and decorative accents for every corner.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80"
    }
  ],

  process: [
    { step: "01", title: "Concept & Vision", desc: "We listen to your ideas and study your space layout." },
    { step: "02", title: "Design & Planning", desc: "We create 3D renders, mood boards, and product lists." },
    { step: "03", title: "Execution & Styling", desc: "Our craftsmen bring the vision to life with precision." },
    { step: "04", title: "Final Reveal", desc: "Step into your newly transformed luxury environment." }
  ],
  testimonials: [
    {
      quote: "Bees Interior completely transformed our home into a masterpiece. Their attention to detail is unmatched.",
      author: "Sarah Jenkins",
      role: "Homeowner"
    },
    {
      quote: "The curated accessories we bought added instant elegance to our corporate office. Highly professional team!",
      author: "Michael Sterling",
      role: "CEO, Sterling Ventures"
    }
  ],
  ctaBanner: {
    title: "Ready to Transform Your Space?",
    subtitle: "Let’s combine creativity, craftsmanship, and attention to detail to deliver your dream interior.",
    buttonText: "Schedule Consultation Today"
  }
};

// --- STYLED COMPONENTS WITH SUBTLE SHADES & DEPTH ---
const LandingContainer = styled.div`
  background: linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%);
  color: #0F172A;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  max-width: 1440px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const HeroSection = styled.section`
  background: #FFFFFF;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(30, 58, 138, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.8);
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: center;

  @media(max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Badge = styled.span`
  background: ${accentGradient};
  color: #FFFFFF;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 10px;
  box-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
`;

const Title = styled.h1`
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  background: ${blueGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  margin: 0;
  padding: 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #334155;
  line-height: 1.6;
  margin: 0;
  padding: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;




`;

const PrimaryButton = styled.a`
  background: ${goldGradient};
  color: #0F172A;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
  }
`;
  
const SecondaryButton = styled.a`
  background: #FFFFFF;
  color: ${primaryBlue};
  border: 2px solid ${primaryBlue};
  padding: 8px 10px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${primaryBlue};
    color: #FFFFFF;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.15);
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  background: #FFFFFF;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(226, 232, 240, 0.8);

  @media(max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);
  padding: 10px;
  border-radius: 6px;
  text-align: center;
  border: 1px solid rgba(212, 175, 55, 0.2);
  box-shadow: 0 2px 10px rgba(30, 58, 138, 0.04);
`;

const StatValue = styled.h3`
  font-size: 24px;
  font-weight: 800;
  background: ${goldGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const StatLabel = styled.p`
  font-size: 12px;
  color: #64748B;
  margin: 4px 0 0 0;
  font-weight: 500;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 10px;
  padding: 0 10px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  background: ${blueGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const SectionSubtitle = styled.p`
  font-size: 13px;
  color: #64748B;
  margin: 4px 0 0 0;
`;

const ServicesSection = styled.section`
  background: #FFFFFF;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(226, 232, 240, 0.8);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media(max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: #F8FAFC;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(30, 58, 138, 0.08);
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.04);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  transition: transform 0.2s ease, background 0.2s ease;
  height: 100%;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-4px);
    background: #FFFFFF;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${primaryBlue};
  margin: 0;
`;

const CardDesc = styled.p`
  font-size: 12px;
  color: #475569;
  margin: 0;
  line-height: 1.5;
`;

const ProcessSection = styled.section`
  background: #FFFFFF;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(226, 232, 240, 0.8);
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media(max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessCard = styled.div`
  background: #F8FAFC;
  border: 1px solid rgba(30, 58, 138, 0.08);
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  height: 100%;
  box-sizing: border-box;
`;

const StepNumber = styled.div`
  font-size: 18px;
  font-weight: 900;
  background: ${goldGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TestimonialSection = styled.section`
  background: #FFFFFF;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(226, 232, 240, 0.8);
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media(max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  background: #F8FAFC;
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.05);
  height: 100%;
  box-sizing: border-box;
`;

const Quote = styled.p`
  font-size: 13px;
  font-style: italic;
  color: #334155;
  margin: 0;
  line-height: 1.5;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: auto;
`;

const AuthorName = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${primaryBlue};
`;

const AuthorRole = styled.span`
  font-size: 10px;
  color: ${primaryGold};
  font-weight: 600;
`;

const CtaBannerSection = styled.section`
  background: ${blueGradient};
  color: #FFFFFF;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  box-shadow: 0 8px 30px rgba(30, 58, 138, 0.3);
`;

const CtaTitle = styled.h2`
  font-size: 22px;
  font-weight: 800;
  margin: 0;
  background: ${goldGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CtaSubtitle = styled.p`
  font-size: 13px;
  color: #E2E8F0;
  max-width: 600px;
  margin: 0;
`;

const CtaButton = styled.button`
  background: ${goldGradient};
  color: #0F172A;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.5);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;


const ViewMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  /* Style the Link component directly */
  & > a {
    background: ${goldGradient};
    color: #0F172A;
    border: none;
    padding: 10px 24px;
    border-radius: 6px;
    font-weight: 800;
    font-size: 13px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
    }
  }
`;



export default function CompleteLandingPage() {
 



  
  return (
    <>
    <HeroSection2/>
    <LandingPageComponent/>
    <LandingProductsSection/>
    <ArtisanStoryComponent/>
    </>

  );
}