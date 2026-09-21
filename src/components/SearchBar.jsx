"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const brandCyan = '#00aeef';
const brandGradient = 'linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)';
const borderColor = '#e2e8f0';
const textMain = '#0f172a';
const textMuted = '#475569';
const softBg = '#f8fafc';

export default function SearchBar({ 
  title = "Quality within Reach", 
  subtitle = "Search our entire catalog of premium products, games, and accessories instantly.",
  placeholder = "Search products by name..." 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <SearchSection>
      <SearchContentWrapper>
        <SearchHeader>
          {/* <SearchTitle>{title}</SearchTitle> */}
          {/* <SearchSubtitle>{subtitle}</SearchSubtitle> */}
        </SearchHeader>

        <SearchForm onSubmit={handleSearch}>
          <SearchInputWrapper>
            <SearchInput
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">
              Search
            </SearchButton>
          </SearchInputWrapper>
        </SearchForm>
      </SearchContentWrapper>
    </SearchSection>
  );
}

/* ================= STYLED COMPONENTS ================= */

const SearchSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5px 5px;
  box-sizing: border-box;
`;

const SearchContentWrapper = styled.div`
  background: ${softBg};
  border: 1px solid ${borderColor};
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const SearchHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 600px;
`;

const SearchTitle = styled.h2`
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 800;
  color: ${textMain};
  margin: 0;
  letter-spacing: -0.5px;
`;

const SearchSubtitle = styled.p`
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: ${textMuted};
  line-height: 1.5;
  margin: 0;
`;

const SearchForm = styled.form`
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid ${borderColor};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  transition: all 0.25s ease;

  &:focus-within {
    border-color: ${brandCyan};
    box-shadow: 0 10px 35px rgba(0, 174, 239, 0.15);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 14px 20px;
  border: none;
  background: transparent;
  color: ${textMain};
  font-size: 1rem;
  font-weight: 500;
  outline: none;

  &::placeholder {
    color: ${textMuted};
  }
`;

const SearchButton = styled.button`
  background: ${brandGradient};
  color: #ffffff;
  border: none;
  padding: 0 24px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
    font-size: 0.85rem;
  }
`;