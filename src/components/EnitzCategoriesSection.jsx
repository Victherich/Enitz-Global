"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Adjust your firebase import path if necessary

/* ================= THEME STYLES (ENITZ) ================= */
const ThemeGradient = "linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)";
const LightBg = "#ffffff";
const CardBg = "#f8fafc";
const TextPrimary = "#0f172a";
const TextMuted = "#475569";
const BorderColor = "rgba(226, 232, 240, 0.9)";
const CyanPrimary = "#00aeef";

/* Fallback categories if Firestore is empty or fails */
const fallbackCategories = [
  { id: "home-kitchen", name: "Home & Kitchen", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80", slug: "home-kitchen" },
  { id: "kids-school", name: "Kids & School", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80", slug: "kids-school" },
  { id: "electronics-gadgets", name: "Electronics & Gadgets", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", slug: "electronics-gadgets" },
  { id: "fashion-accessories", name: "Fashion & Accessories", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80", slug: "fashion-accessories" },
  { id: "beauty-personal-care", name: "Beauty & Personal Care", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80", slug: "beauty-personal-care" },
  { id: "lifestyle-travel", name: "Lifestyle & Travel", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80", slug: "lifestyle-travel" },
  { id: "gifts-souvenirs", name: "Gifts & Souvenirs", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80", slug: "gifts-souvenirs" },
];

const SectionContainer = styled.section`
  padding: 6rem 1rem;
  background-color: ${CardBg};
  border-top: 1px solid ${BorderColor};

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 4rem auto;

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 1rem;
      background: rgba(0, 174, 239, 0.1);
      color: ${CyanPrimary};
      border-radius: 9999px;
      font-weight: 700;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 2.5rem;
      font-weight: 900;
      color: ${TextPrimary};
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }

    p {
      color: ${TextMuted};
      font-size: 1.1rem;
    }
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 1rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1280px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

const CategoryCard = styled(Link)`
  position: relative;
  height: 200px;
  border-radius: 1.5rem;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
  border: 1px solid ${BorderColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items:center;
  padding: 1rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1;
  }

  /* Gradient overlay to make the text pop clearly over any background image */
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg, 
      rgba(11, 27, 72, 0.1) 20%, 
      rgba(11, 27, 72, 0.85) 90%
    );
    z-index: 2;
    transition: background 0.3s ease;
  }

  .card-content {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transform: translateY(4px);
    transition: transform 0.3s ease;

    h3 {
      font-size: 1rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.3;
    }

    .explore-link {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: ${CyanPrimary};
      font-weight: 700;
      font-size: 0.9rem;
      opacity: 0.9;
      transition: opacity 0.2s ease;

      svg {
        transition: transform 0.2s ease;
      }
    }
  }

  &:hover {
    transform: translateY(-6px);
    border-color: ${CyanPrimary};
    box-shadow: 0 20px 40px -10px rgba(0, 174, 239, 0.25);

    img {
      transform: scale(1.08);
    }

    .card-content {
      transform: translateY(0);

      .explore-link svg {
        transform: translateX(4px);
      }
    }
  }
`;

export default function EnitzCategoriesSection() {
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (fetchedData.length > 0) {
          setCategories(fetchedData);
        } else {
          setCategories(fallbackCategories);
        }
      } catch (error) {
        console.error("Error fetching categories from Firestore:", error);
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <SectionContainer>
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Sparkles className="w-4 h-4" /> Explore Collections
          </div>
          <h2>What You Can Find at ENITZ</h2>
          <p>Discover our wide selection of quality items tailored to elevate your everyday living.</p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => {
            // Determine the category link path (uses slug or id)
            const categoryPath = `/categories/${cat.slug || cat.id || cat.name?.toLowerCase().replace(/\s+/g, '-')}`;

            return (
              <CategoryCard key={cat.id} href={categoryPath}>
                <img 
                  src={cat.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"} 
                  alt={cat.name} 
                />
                <div className="overlay" />
                <div className="card-content">
                  <h3>{cat.title}</h3>
                  <span className="explore-link">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </CategoryCard>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}

