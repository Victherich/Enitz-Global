// "use client";

// import React from "react";
// import styled from "styled-components";
// import { useRouter } from "next/navigation";

// const brandGradient = 'linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)';
// const borderColor = '#e2e8f0';
// const textMain = '#0f172a';
// const softBg = '#f8fafc';
// const brandCyan = '#00aeef';
// const dangerRed = '#ef4444';

// export default function ProductCard({ product, isWishlisted, onToggleWishlist, getCategoryName }) {
//   const router = useRouter();

//   // Safety check: if product is undefined/null, don't crash
//   if (!product) return null;

//   const displayImg = product.images?.[0] || product.image || "https://placehold.co/400x300?text=No+Image";
//   const productPrice = Number(product.amount || 0);
//   const itemCats = product.categoryIds || (product.categoryId ? [product.categoryId] : []);

//   return (
//     <CardContainer onClick={() => router.push(`/productdetail/${product.id}`)}>
//       <CardImageWrapper>
//         <CardLoveIcon 
//           onClick={(e) => onToggleWishlist(e, product.id)}
//           title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
//         >
//           {isWishlisted ? (
//             <span style={{ color: dangerRed, fontSize: "14px" }}>❤️</span>
//           ) : (
//             <span style={{ color: textMain, fontSize: "14px" }}>🤍</span>
//           )}
//         </CardLoveIcon>
//         <CardImage src={displayImg} alt={product.name || "Product"} />
//       </CardImageWrapper>

//       <ProductTitle>
//         {product.name ? product.name.charAt(0).toUpperCase() + product.name.slice(1) : "Untitled"}
//       </ProductTitle>

//       {/* <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "4px" }}>
//         {itemCats.length === 0 ? (
//           <ProductcategoryBadge>Uncategorized</ProductcategoryBadge>
//         ) : (
//           itemCats.map((catId, idx) => {
//             const name = getCategoryName ? getCategoryName(catId) : "";
//             return name ? (
//               <ProductcategoryBadge key={idx}>
//                 {name.charAt(0).toUpperCase() + name.slice(1)}
//               </ProductcategoryBadge>
//             ) : null;
//           })
//         )}
//       </div> */}
      
//       <ProductPriceRow>
//         <PriceText>
//           ₦{productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//         </PriceText>
//         <AddButton onClick={(e) => {
//           e.stopPropagation();
//           router.push(`/productdetail/${product.id}`);
//         }}>
//           Buy Now
//         </AddButton>
//       </ProductPriceRow>
//     </CardContainer>
//   );
// }

// /* ================= STYLED COMPONENTS ================= */

// const CardContainer = styled.div`
//   background: #ffffff;
//   border-radius: 16px;
//   padding: 14px;
//   border: 1px solid ${borderColor};
//   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   cursor: pointer;
//   transition: all 0.25s ease;
//   width: 100%;
//   box-sizing: border-box;

//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
//     border-color: #cbd5e1;
//   }

//   @media (max-width: 768px) {
//     padding: 10px;
//     gap: 8px;
//   }
// `;

// const CardImageWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   height: 180px;

//   @media (max-width: 768px) {
//     height: 140px;
//   }
// `;

// const CardLoveIcon = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: rgba(255, 255, 255, 0.9);
//   border: 1px solid ${borderColor};
//   border-radius: 50%;
//   width: 36px;
//   height: 36px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   z-index: 5;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
//   transition: transform 0.2s ease;

//   &:hover {
//     transform: scale(1.1);
//     background: #ffffff;
//   }
// `;

// const CardImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   border-radius: 12px;
//   border: 1px solid ${borderColor};
// `;

// const ProductTitle = styled.h4`
//   font-size: 0.95rem;
//   font-weight: 700;
//   color: ${textMain};
//   margin: 0;
//   display: -webkit-box;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
//   line-height: 1.4;
// `;

// const ProductcategoryBadge = styled.span`
//   font-size: 0.7rem;
//   font-weight: 700;
//   padding: 3px 8px;
//   background: ${softBg};
//   color: ${brandCyan};
//   border: 1px solid ${borderColor};
//   border-radius: 6px;
//   display: inline-block;
// `;

// const ProductPriceRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: auto;
//   gap: 8px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: stretch;
//     gap: 8px;
//   }
// `;

// const PriceText = styled.span`
//   font-size: 1rem;
//   font-weight: 800;
//   background: ${brandGradient};
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// `;

// const AddButton = styled.button`
//   background: ${brandGradient};
//   color: #ffffff;
//   border: none;
//   padding: 8px 14px;
//   border-radius: 8px;
//   font-size: 0.85rem;
//   font-weight: 700;
//   cursor: pointer;
//   box-shadow: 0 4px 12px rgba(0, 174, 239, 0.25);
//   transition: all 0.2s ease;

//   &:hover {
//     opacity: 0.92;
//     transform: translateY(-1px);
//   }
// `;






"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const brandGradient = 'linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)';
const borderColor = '#e2e8f0';
const textMain = '#0f172a';
const softBg = '#f8fafc';
const brandCyan = '#00aeef';
const dangerRed = '#ef4444';



// --- HELPER FUNCTION ---
const createSlug = (name, id) => {
  const cleanName = (name || "product")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${cleanName}-${id}`;
};


export default function ProductCard({ product, isWishlisted, onToggleWishlist, getCategoryName }) {
  const router = useRouter();

  console.log(product)

  // Safety check: if product is undefined/null, don't crash
  if (!product) return null;

  const displayImg = product.images?.[0] || product.image || "https://placehold.co/400x300?text=No+Image";
  const productPrice = Number(product.amount || 0);
  // const detailUrl = `/productdetail/${product.id}`;
  // 🌟 Generate slugged URL using name + ID
  const productSlug = createSlug(product.name, product.id);
  const detailUrl = `/productdetail/${productSlug}`;

  // 🌟 Check if product belongs to the Bestseller category
  const itemCats = product.categoryIds || (product.categoryId ? [product.categoryId] : []);
  const isBestseller = itemCats.includes("HXEy3XhgQJgtJ1fJUgxP");

  const strikePrice = Number(product.strikeAmount || 0);
  const hasDiscount = strikePrice > productPrice;
  const discountPercent = hasDiscount 
    ? Math.round(((strikePrice - productPrice) / strikePrice) * 100) 
    : 0;
  
  
  const handleCardClick = (e) => {
    // If middle-clicked, or modifier keys are pressed, let the native link behavior handle it
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      router.push(detailUrl);
    }
  };

  return (
    <CardContainer href={detailUrl} onClick={handleCardClick}>
      <CardImageWrapper>
        {isBestseller && (
          <BestsellerBadge>
          Bestseller
          </BestsellerBadge>
        )}
        <CardLoveIcon 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWishlist(e, product.id);
          }}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isWishlisted ? (
            <span style={{ color: dangerRed, fontSize: "14px" }}>❤️</span>
          ) : (
            <span style={{ color: textMain, fontSize: "14px" }}>🤍</span>
          )}
        </CardLoveIcon>
        {/* Using a native <img> inside the anchor ensures long-press triggers both image save options and link preview */}
        <CardImage src={displayImg} alt={product.name || "Product"} />
      </CardImageWrapper>

      <ProductTitle>
        {product.name ? product.name.charAt(0).toUpperCase() + product.name.slice(1) : "Untitled"}
      </ProductTitle>
      
      {/* <ProductPriceRow>
        <PriceText>
          ₦{productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </PriceText>
        <AddButton onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push(detailUrl);
        }}>
          Buy Now
        </AddButton>
      </ProductPriceRow> */}

      <ProductPriceRow>
        <PriceInfoContainer>
          <PriceText>
            ₦{productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </PriceText>
          
          {hasDiscount && (
            <DiscountRow>
              <StrikePriceText>
                ₦{strikePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </StrikePriceText>
              <DiscountBadge>
                -{discountPercent}%
              </DiscountBadge>
            </DiscountRow>
          )}
        </PriceInfoContainer>

        <AddButton onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push(detailUrl);
        }}>
          Buy Now
        </AddButton>
      </ProductPriceRow>
    </CardContainer>
  );
}

/* ================= STYLED COMPONENTS ================= */

const CardContainer = styled.a`
  background: #ffffff;
  border-radius: 16px;
  padding: 14px;
  border: 1px solid ${borderColor};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  width: 100%;
  box-sizing: border-box;
  text-decoration: none;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
    border-color: #cbd5e1;
  }

  @media (max-width: 768px) {
    padding: 10px;
    gap: 8px;
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;

  @media (max-width: 768px) {
    height: 140px;
  }
`;

const CardLoveIcon = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid ${borderColor};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background: #ffffff;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid ${borderColor};
`;

const ProductTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${textMain};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`;

const ProductPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

const PriceText = styled.span`
  font-size: 1rem;
  font-weight: 800;
  background: ${brandGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AddButton = styled.button`
  background: ${brandGradient};
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 174, 239, 0.25);
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

const BestsellerBadge = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  // background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  background:${brandGradient};
  color: #ffffff;
  font-size: 0.7rem;
  // font-weight: 800;
  padding: 3px 5px;
  border-radius: 20px;
  z-index: 5;
  box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;


const PriceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const DiscountRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const StrikePriceText = styled.span`
  font-size: 0.8rem;
  color: #94a3b8;
  text-decoration: line-through;
  font-weight: 600;
`;

const DiscountBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 800;
  color: #16a34a;
  background: #dcfce7;
  padding: 1px 5px;
  border-radius: 4px;
`;