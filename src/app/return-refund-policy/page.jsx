"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { RefreshCw, ShieldAlert, PackageCheck, Mail, Phone, MapPin, ArrowLeft, CheckCircle2 } from "lucide-react";

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

const PolicyHeader = styled.div`
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

const PolicyBody = styled.div`
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

export default function ReturnPolicyPage() {
  return (
    <PageWrapper>
      <ContentContainer>
        <BackLink href="/">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </BackLink>

        <PolicyHeader>
          <div className="icon-badge">
            <RefreshCw className="w-8 h-8" />
          </div>
          <h1>
            Return & <span>Refund Policy</span>
          </h1>
          <p>
            We want you to be completely satisfied with your purchase. Read our return and exchange guidelines below.
          </p>
          <div className="effective-date">Effective Date: September 2026</div>
        </PolicyHeader>

        <PolicyBody>
          <section>
            <h2>1. Overview</h2>
            <p>
              At Enitz Global Limited ("we," "our," or "us"), registered under RC 9059086 and located at 116 Mushin Road, Isolo, Lagos, Nigeria, we take pride in the quality of our personal, household, and lifestyle products. If you experience any issues with your store order, our return policy is structured to provide clear guidance on how we handle product replacements and refunds.
            </p>
          </section>

          <section>
            <h2>2. Eligibility for Returns</h2>
            <p>To qualify for a product return or exchange, your request must meet the following conditions:</p>
            <ul>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Timeframe:</strong> You must notify our support team within 48 hours of receiving your order.</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Condition:</strong> Items must be unused, unwashed, and returned in their original packaging with all tags and protective seals intact.</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Valid Reasons:</strong> Returns are accepted if you receive a damaged, defective, or incorrect product compared to what you ordered.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Non-Returnable Items</h2>
            <p>
              Due to hygiene, safety, and product nature standards, certain personal and household items cannot be returned or refunded once opened, used, or removed from their original protective packaging unless they arrived damaged or defective.
            </p>
          </section>

          <section>
            <h2>4. Return and Exchange Process</h2>
            <p>If you need to return an item, please follow these steps:</p>
            <ul>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span>Contact our customer support immediately via phone or WhatsApp at 09047103037 / 08160801538 or email enitzglobal@gmail.com with your order details and photos of the issue.</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span>Once your return request is reviewed and approved, our team will coordinate the pickup or drop-off of the item at our Isolo office location.</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5"/>
                Customers should not send items to our office before receiving return instructions and approval from our support team.
              </li>
            </ul>
          </section>

          <section>
            <h2>5. Refunds and Processing</h2>
            <p>
              Once your returned item is received, inspected, and verified by our team, we will process your replacement or refund. Approved monetary refunds will be issued directly to your designated bank account within 3 to 5 business days.
            </p>
          </section>

          <section>
            <h2>6. Contact Support</h2>
            <p>
              If you have any questions or require assistance regarding returns or refunds, please reach out to our team:
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
        </PolicyBody>
      </ContentContainer>
    </PageWrapper>
  );
}