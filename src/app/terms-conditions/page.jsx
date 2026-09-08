"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { FileText, ShieldCheck, Truck, RefreshCw, Mail, Phone, MapPin, ArrowLeft, CheckCircle2 } from "lucide-react";

/* ================= THEME STYLES ================= */
const ThemeGradient = "linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)";
const LightBg = "#f8fafc";
const CardBg = "#ffffff";
const TextPrimary = "#0f172a";
const TextMuted = "#475569";
const BorderColor = "rgba(226, 232, 240, 0.9)";

/* ================= STYLED COMPONENTS ================= */

const PageWrapper = styled.div`
  background-color: ${LightBg};
  color: ${TextPrimary};
  font-family: inherit;
  min-height: 100vh;
  padding: 1rem 1.5rem 6rem 1.5rem;
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #00aeef;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(-4px);
  }
`;

const TermsHeader = styled.div`
  background: ${CardBg};
  border: 1px solid ${BorderColor};
  border-radius: 2rem;
  padding: 3rem 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.04);
  text-align: center;

  .icon-badge {
    width: 64px;
    height: 64px;
    border-radius: 1.25rem;
    background: linear-gradient(135deg, rgba(0, 174, 239, 0.1), rgba(11, 27, 72, 0.1));
    color: #00aeef;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem auto;
    border: 1px solid rgba(0, 174, 239, 0.2);
  }

  h1 {
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 900;
    color: ${TextPrimary};
    margin-bottom: 1rem;
    letter-spacing: -0.02em;

    span {
      background: ${ThemeGradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    color: ${TextMuted};
    font-size: 1.05rem;
    line-height: 1.6;
    max-width: 38rem;
    margin: 0 auto;
  }

  .effective-date {
    margin-top: 1.25rem;
    display: inline-block;
    padding: 0.4rem 1rem;
    background: #f1f5f9;
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 600;
    color: ${TextMuted};
  }
`;

const TermsBody = styled.div`
  background: ${CardBg};
  border: 1px solid ${BorderColor};
  border-radius: 2rem;
  padding: 3rem 2.5rem;
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      font-size: 1.35rem;
      font-weight: 800;
      color: ${TextPrimary};
      letter-spacing: -0.01em;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 0.75rem;
    }

    p {
      color: ${TextMuted};
      font-size: 1.02rem;
      line-height: 1.75;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      li {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        color: ${TextMuted};
        font-size: 1.02rem;
        line-height: 1.6;

        svg {
          flex-shrink: 0;
          margin-top: 0.2rem;
          color: #00aeef;
        }
      }
    }
  }
`;

const ContactBox = styled.div`
  background: linear-gradient(135deg, rgba(0, 174, 239, 0.05), rgba(11, 27, 72, 0.05));
  border: 1px solid rgba(0, 174, 239, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  h3 {
    font-size: 1.15rem;
    font-weight: 800;
    color: ${TextPrimary};
    margin: 0;
  }

  .contact-detail {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    color: ${TextMuted};
    font-size: 0.98rem;

    svg {
      color: #00aeef;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    span {
      font-weight: 600;
      color: ${TextPrimary};
    }
  }
`;

/* ================= COMPONENT ================= */

export default function TermsAndConditionsPage() {
  return (
    <PageWrapper>
      <ContentContainer>
        <BackLink href="/">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </BackLink>

        <TermsHeader>
          <div className="icon-badge">
            <FileText className="w-8 h-8" />
          </div>
          <h1>
            Terms & <span>Conditions</span>
          </h1>
          <p>
            Please review these terms carefully before exploring or making purchases through the Enitz Global Limited e-commerce platform.
          </p>
          <div className="effective-date">Effective Date: September 2026</div>
        </TermsHeader>

        <TermsBody>
          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              Welcome to Enitz Global Limited ("we," "our," or "us"), registered under RC 9059086, located at 116 Mushin Road, Isolo, Lagos, Nigeria. By accessing our website, browsing our catalog, or placing orders for personal, household, and lifestyle products through our digital store or WhatsApp integration links, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, please refrain from using our e-commerce store.
            </p>
          </section>

          <section>
            <h2>2. Products, Pricing, and Availability</h2>
            <p>We strive to provide accurate depictions, descriptions, and pricing of all products listed on our store:</p>
            <ul>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Pricing:</strong> All product prices are listed in Naira (NGN) unless otherwise stated, and are subject to change without prior notice.</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Product Availability:</strong> Items featured on our store are subject to stock availability. We reserve the right to limit quantities or discontinue any product at any time.</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Descriptions:</strong> While we endeavor to ensure item descriptions and images are precise, minor variations may occur.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Orders and Purchasing</h2>
            <p>
              When you submit an order through our website checkout or via our direct WhatsApp order links, you are making an offer to purchase products subject to these terms. Orders are confirmed upon verification of payment or order details by our customer support team. We reserve the right to decline or cancel any order due to stock unavailability, pricing errors, or suspected fraudulent activity.
            </p>
          </section>

          <section>
            <h2>4. Delivery and Fulfillment</h2>
            <p>
              We coordinate product shipments to addresses provided by our customers through verified logistics partners and dispatch riders. Delivery timelines may vary depending on your destination location in Lagos or across Nigeria. Enitz Global Limited is not liable for delivery delays caused by incorrect address information provided at checkout, unforeseen logistics bottlenecks, or force majeure events.
            </p>
          </section>

          <section>
            <h2>5. Returns and Issue Resolution</h2>
            <p>
              Customer satisfaction is a priority for us. If you receive a damaged, defective, or incorrect product, please notify our customer support team immediately via phone or email within 48 hours of delivery. Eligibility for exchanges or returns is evaluated on a case-by-case basis for items returned in their original packaging and unused condition.
            </p>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <p>
              All content displayed on the Enitz Global Limited website—including logos, product photos, graphics, text layouts, and custom code architecture—is the property of Enitz Global Limited. Unauthorized duplication, distribution, or commercial exploitation of any site content without prior written permission is strictly prohibited.
            </p>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>
              Enitz Global Limited shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our website, purchased products, or temporary service interruptions, to the maximum extent permitted under applicable Nigerian law.
            </p>
          </section>

          <section>
            <h2>8. Contact Information</h2>
            <p>
              If you have any questions or require clarification regarding these Terms and Conditions, please reach out to our team:
            </p>
            
            <ContactBox>
              <h3>Enitz Global Limited (RC 9059086)</h3>
              <div className="contact-detail">
                <MapPin />
                <span>116 Mushin Road, Isolo, Lagos, Nigeria</span>
              </div>
              <div className="contact-detail">
                <Phone />
                <span>09047103037 / 08160801538</span>
              </div>
              <div className="contact-detail">
                <Mail />
                <span>enitzglobal@gmail.com</span>
              </div>
            </ContactBox>
          </section>
        </TermsBody>
      </ContentContainer>
    </PageWrapper>
  );
}