"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ShieldCheck, Eye, X, MessageSquareQuote, Sparkles, ZoomIn } from "lucide-react";


/* ================= THEME STYLES ================= */
const ThemeGradient = "linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)";
const LightBg = "#ffffff";
const CardBg = "#f8fafc";
const TextPrimary = "#0f172a";
const TextMuted = "#475569";
const BorderColor = "rgba(226, 232, 240, 0.9)";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* ================= COMPONENTS ================= */

const SectionWrapper = styled.section`
  padding: 7rem 1.5rem;
  background-color: ${LightBg};
  border-top: 1px solid ${BorderColor};
  border-bottom: 1px solid ${BorderColor};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 52rem;
  margin: 0 auto 4rem auto;

  .badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    background: linear-gradient(135deg, rgba(0, 174, 239, 0.1), rgba(11, 27, 72, 0.1));
    border: 1px solid rgba(0, 174, 239, 0.2);
    border-radius: 9999px;
    color: #00aeef;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1.25rem;
  }

  h2 {
    font-size: 2.25rem;
    font-weight: 800;
    margin-bottom: 1.25rem;
    color: ${TextPrimary};
    letter-spacing: -0.02em;
    @media (min-width: 768px) { font-size: 3.25rem; }
  }

  p {
    color: ${TextMuted};
    font-size: 1.15rem;
    line-height: 1.7;
  }
`;

const ProofGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const ProofCard = styled.div`
  background: ${CardBg};
  border: 1px solid ${BorderColor};
  border-radius: 1.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.03);
  animation: ${fadeIn} 0.6s ease-in-out;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(0, 174, 239, 0.4);
    box-shadow: 0 20px 40px -10px rgba(0, 174, 239, 0.15);

    .image-container img {
      transform: scale(1.04);
    }

    .overlay {
      opacity: 1;
    }
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    background: #e2e8f0;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(11, 27, 72, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      opacity: 0;
      transition: opacity 0.3s ease;
      color: #ffffff;
      font-weight: 700;
      font-size: 0.95rem;

      span {
        background: rgba(0, 174, 239, 0.9);
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }
    }
  }

  .proof-details {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .client-name {
      font-size: 1.1rem;
      font-weight: 800;
      color: ${TextPrimary};
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .proof-tag {
      font-size: 0.85rem;
      color: ${TextMuted};
      background: #e2e8f0;
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      display: inline-block;
      width: fit-content;
      font-weight: 600;
    }
  }
`;

/* Modal Styles for Full-Screen Viewing */
const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(11, 27, 72, 0.85);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: ${fadeIn} 0.3s ease-out;

  .modal-content {
    position: relative;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    background: #ffffff;
    border-radius: 1.5rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);

    .modal-header {
      padding: 1.25rem 1.5rem;
      background: ${CardBg};
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid ${BorderColor};

      h3 {
        font-size: 1.1rem;
        font-weight: 700;
        color: ${TextPrimary};
        margin: 0;
      }

      button {
        background: #e2e8f0;
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: ${TextPrimary};
        transition: background 0.2s;

        &:hover {
          background: #cbd5e1;
        }
      }
    }

    .modal-body {
      padding: 1rem;
      background: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      max-height: 75vh;

      img {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
      }
    }
  }
`;

/* ================= DATA ================= */
// Replace these placeholder paths with your actual image file paths or Cloudinary links
const proofItems = [
  {
    id: 1,
    clientName: "Mrs. Zainab",
    tag: "WhatsApp Wholesaler Review",
    image: "/t1.jpeg", // Update path to your uploaded screenshot
    description: "Re-ordering 30pcs after testing sample."
  },
  {
    id: 2,
    clientName: "Mrs. Umu Alli Epe",
    tag: "Customer Testimonial Chat",
    image: "/t2.jpeg", // Update path to your uploaded screenshot
    description: "Kids wear feedback and recurring support."
  },
  {
    id: 3,
    clientName: "Mrs. Alebiosu",
    tag: "Facebook Feedback",
    image: "/t3.jpeg", // Update path to your uploaded screenshot
    description: "Charcoal stove product review."
  },
  {
    id: 4,
    clientName: "Mrs. Zainab",
    tag: "WhatsApp Wholesaler Review",
    image: "/t4.jpeg", // Update path to your uploaded screenshot
    description: "Re-ordering 30pcs after testing sample."
  },
  {
    id: 5,
    clientName: "Mrs. Umu Alli Epe",
    tag: "Customer Testimonial Chat",
    image: "/t5.jpeg", // Update path to your uploaded screenshot
    description: "Kids wear feedback and recurring support."
  },
  {
    id: 6,
    clientName: "Mrs. Alebiosu",
    tag: "Facebook Feedback",
    image: "/t6.jpeg", // Update path to your uploaded screenshot
    description: "Charcoal stove product review."
  },
  {
    id: 7,
    clientName: "Mrs. Alebiosu",
    tag: "Facebook Feedback",
    image: "/t7.jpeg", // Update path to your uploaded screenshot
    description: "Charcoal stove product review."
  }
  // Add additional proofs here as needed
];

export default function ProofAndTestimonials() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <SectionWrapper>
      <Container>
        <SectionHeader>
          <div className="badge-pill">
            <Sparkles className="w-4 h-4 text-cyan-500" /> Verified Evidence
          </div>
          <h2>Real Customer Proof & Chat Logs</h2>
          <p>
            Don't just take our word for it. Browse authentic screenshots from our chats and customer feedback channels.
          </p>
        </SectionHeader>

        <ProofGrid>
          {proofItems.map((item) => (
            <ProofCard key={item.id}>
              <div 
                className="image-container"
                onClick={() => setActiveImage(item)}
              >
                <img src={item.image} alt={item.clientName} />
                <div className="overlay">
                  <span>
                    <ZoomIn className="w-4 h-4" /> Click to Expand
                  </span>
                </div>
              </div>
              {/* <div className="proof-details"> */}
                {/* <span className="proof-tag">{item.tag}</span> */}
                {/* <div className="client-name">
                  {item.clientName}
                  <ShieldCheck className="w-5 h-5 text-cyan-500" title="Verified Proof" />
                </div> */}
                {/* <p style={{ color: TextMuted, fontSize: "0.9rem", margin: 0 }}>
                  {item.description}
                </p> */}
              {/* </div> */}
            </ProofCard>
          ))}
        </ProofGrid>

        {/* Lightbox Modal */}
        {activeImage && (
          <ModalBackdrop onClick={() => setActiveImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                {/* <h3>{activeImage.clientName} — {activeImage.tag}</h3> */}
                <h3></h3>
                <button onClick={() => setActiveImage(null)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="modal-body">
                <img src={activeImage.image} alt={activeImage.clientName} />
              </div>
            </div>
          </ModalBackdrop>
        )}
      </Container>
    </SectionWrapper>
  );
}