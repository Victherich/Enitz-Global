"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Shield, Lock, FileText, Mail, Phone, MapPin, ArrowLeft, CheckCircle2, ShoppingCart } from "lucide-react";

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

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <ContentContainer>
        <BackLink href="/">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </BackLink>

        <PolicyHeader>
          <div className="icon-badge">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h1>
            Privacy <span>Policy</span>
          </h1>
          <p>
            At Enitz Global Limited, we are dedicated to safeguarding your personal data and ensuring a secure, transparent online e-commerce shopping experience.
          </p>
          <div className="effective-date">Effective Date: September 2026</div>
        </PolicyHeader>

        <PolicyBody>
          <section>
            <h2>1. Introduction</h2>
            <p>
              Enitz Global Limited ("we," "our," or "us"), registered under RC 9059086, operates an online e-commerce store offering personal, household, and lifestyle products. This Privacy Policy details how we gather, utilize, store, and secure your information when you visit our store website, add items to your cart, execute orders, or communicate with our sales team via our website and WhatsApp channels.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>To process your store orders and provide customer service, we collect specific information provided directly by you:</p>
            <ul>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Customer Account & Contact Info:</strong> Customer information may include the customer’s name, phone number, email address and other details provided when creating an account, placing an order or contacting our support team.</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Waybill & Delivery Details:</strong> Physical delivery addresses, destination instructions, and recipient details necessary to dispatch your purchased goods.</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Shopping & Transaction History:</strong> Products browsed, items added to cart, completed orders, payment confirmations, and chat conversation records from our customer support or WhatsApp ordering links.</span>
              </li>
            </ul>
          </section>


  <section>
            <h2>3. Payment Provider</h2>
            <p>
            Payments may be processed through third-party payment providers. ENITZ does not ordinarily store customers’ complete card details. Payment information is handled according to the payment provider’s applicable privacy and security practices.
              </p>
          </section>

           <section>
            <h2>4. Cookies and website Analytics</h2>
            <p>
            We may use cookies and similar technologies to keep the website functioning, remember preferences, understand website usage and improve our marketing. Where required, customers will be given appropriate choices regarding non-essential cookies.
              </p>
          </section>

           <section>
            <h2>5. Information retainment</h2>
            <p>
           We retain personal information only for as long as reasonably necessary for order fulfilment, customer support, accounting, legal and business purposes.
              </p>
          </section>

            <section>
            <h2>6. Marketing Messages</h2>
            <p>
         Where permitted, we may send customers updates about orders, new products, promotions or special offers. Customers may request to stop receiving promotional messages at any time.
              </p>
          </section>

          <section>
            <h2>7. How We Use Your E-Commerce Data</h2>
            <p>Your information is used strictly to operate and enhance our e-commerce store functions, including:</p>
            <ul>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span>Processing, verifying, and dispatching your product orders securely from our store inventory.</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span>Communicating order updates, delivery statuses, and providing responsive customer service.</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span>Fulfilling deliveries to your stated address through our trusted fulfillment and logistics couriers.</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span>Improving our product catalog presentation, website navigation, and checking out user experience.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2>8. Sharing Information with Logistics Partners</h2>
            <p>
              We respect your privacy. Enitz Global Limited does not sell or lease your personal information to outside marketers. We only share essential delivery data (such as your name, delivery phone number, and drop-off address) with verified shipping partners and dispatch riders exclusively to complete your product deliveries.
            </p>
          </section>

          <section>
            <h2>9. Data Security</h2>
            <p>
              We implement industry-standard administrative, electronic, and physical security controls to keep your e-commerce profile and transaction records safe from unauthorized entry, modification, or exposure. While we utilize encrypted protocols and secure checkout environments, please note that no internet framework can guarantee absolute invulnerability.
            </p>
          </section>

          <section>
            <h2>10. Your Access & Control Rights</h2>
            <p>
              As a valued customer, you have the right to inspect the personal information we possess about you, request updates to your shipping details, or have incorrect information corrected by getting in touch with our team.
            </p>
          </section>


          <section>
            <h2>11. Contact Our Store Support</h2>
            <p>
              If you have any questions or requests concerning this Privacy Policy or your shopping data, please connect with us through our official channels:
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