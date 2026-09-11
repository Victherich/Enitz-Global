"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Truck, PackageCheck, MapPin, Clock, AlertCircle, Mail, Phone, ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";
import { FaArrowCircleRight } from "react-icons/fa";

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

const DeliveryHeader = styled.div`
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

const DeliveryBody = styled.div`
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

      a {
        color: #00aeef;
        font-weight: 600;
        text-decoration: underline;

        &:hover {
          color: #0b1b48;
        }
      }
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

    a {
      color: ${TextPrimary};
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: #00aeef;
        text-decoration: underline;
      }
    }
  }
`;

/* ================= COMPONENT ================= */

export default function DeliveryPolicyPage() {
  const whatsappMessage = encodeURIComponent("Hello. I would like to give feedback or complaint about your product or service.");
  const whatsappNumber = "2347069373886"; // International format for 07069373886

  return (
    <PageWrapper>
      <ContentContainer>
        <BackLink href="/">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </BackLink>

        <DeliveryHeader>
          <div className="icon-badge">
            <Truck className="w-8 h-8" />
          </div>
          <h1>
            Delivery <span>Policy</span>
          </h1>
          <p>
            Learn about our waybill and delivery options, dispatch procedures, and delivery timeframes for orders placed with Enitz Global Limited.
          </p>
          <div className="effective-date">Effective Date: September 2026</div>
        </DeliveryHeader>

        <DeliveryBody>
          <section>
            <h2>1. Overview</h2>
            <p>
              At Enitz Global Limited ("we," "our," or "us"), registered under RC 9059086 and located at 116 Mushin Road, Isolo, Lagos, Nigeria, we are committed to ensuring your personal, household, and lifestyle products are delivered safely and promptly. This Delivery Policy explains how we process, dispatch, and ship orders placed through our e-commerce store or via our official WhatsApp ordering channel.
            </p>
          </section>

          <section>
            <h2>2. Processing and Dispatch Timeframes</h2>
            <p>We work efficiently to ensure your items are prepared and handed over to our logistics partners as quickly as possible:</p>
            <ul>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Order Processing:</strong> Orders are verified and processed within 24 hours of confirmation (excluding Sundays and public holidays).</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Dispatch Notification:</strong> Once your package is packed and handed over to our dispatch riders or courier partners, you will receive confirmation updates via phone or WhatsApp.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Delivery Timelines and Zones</h2>
            <p>Delivery windows depend on your designated drop-off address and geographic location:</p>
            <ul>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Lagos Orders (Orders within Lagos):</strong> Deliveries within Lagos typically arrive within 1 to 2 business days following order confirmation.</span>
              </li>
              <li>
                <CheckCircle2 className="w-5 h-5" />
                <span><strong>Interstate Waybill / deliveries:</strong> For deliveries to other states across Nigeria, waybill and delivery timelines generally range from 3 to 5 working days depending on transit routes.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Delivery Rates and Fees</h2>
            <p>
              Delivery costs are calculated based on the destination address, package weight, and order volume. Delivery fees are clearly outlined during the final checkout procedure or communicated directly by our sales team when completing your purchase via WhatsApp.
            </p>
          </section>

          <section>
            <h2>5. Delivery Updates and Receipt</h2>
            <p>
              To ensure a smooth delivery experience, please ensure your active phone number and exact delivery address are accurately provided. Our dispatch personnel or courier partners will contact you prior to arrival to coordinate handover. Please inspect your package upon receipt to ensure all ordered items are intact and complete. If you receive a damaged, wrong, or incomplete item, please refer to our <Link href="/refund-policy">Return/Refund Policy</Link> for guidance on how to report it.
            </p>
          </section>

          <section>
            <h2>6. Contact Our Support Team</h2>
            <p>
              If you have any questions regarding your delivery status, delivery estimates, or require urgent assistance with an order, please reach out to us:
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
              <div className="contact-detail">
                <MessageCircle />
                <span>
                  Feedback / Complaints WhatsApp:{" "}
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click <FaArrowCircleRight/> 07069373886
                  </a>
                </span>
              </div>
            </ContactBox>
          </section>
        </DeliveryBody>
      </ContentContainer>
    </PageWrapper>
  );
}