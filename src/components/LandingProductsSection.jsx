


// 'use client';

// import React, { useState, useEffect } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { Zoom } from 'react-awesome-reveal';
// import { useRouter } from 'next/navigation';
// import { auth, db } from "@/firebaseConfig";
// import { collection, getDocs, doc, setDoc, deleteDoc, query, where, orderBy, limit } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import Swal from "sweetalert2";

// // --- KINGSWORD CRAFT THEME & STYLES ---
// const primaryPink = '#ec4899';
// const primaryAmber = '#f59e0b';
// const brandGradient = 'linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)';
// const softBg = '#f8fafc';
// const cardBg = '#ffffff';
// const borderColor = '#e2e8f0';
// const textMain = '#0f172a';
// const textMuted = '#475569';

// const floatAnimation = keyframes`
//   0% { transform: translateY(0px) rotate(0deg); }
//   50% { transform: translateY(-4px) rotate(1deg); }
//   100% { transform: translateY(0px) rotate(0deg); }
// `;

// const ProductsSection = styled.section`
//   background: ${cardBg};
//   padding: 32px 20px;
//   border-radius: 24px;
//   display: flex;
//   flex-direction: column;
//   gap: 24px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
//   border: 1px solid ${borderColor};
//   position: relative;
//   overflow: hidden;

//   @media (min-width: 768px) {
//     padding: 48px;
//   }
// `;

// const SectionHeader = styled.div`
//   text-align: center;
//   margin-bottom: 8px;
//   padding: 0 10px;
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
// `;

// const SectionBadge = styled.div`
//   display: inline-flex;
//   align-items: center;
//   gap: 8px;
//   padding: 6px 16px;
//   border-radius: 9999px;
//   background: #fdf2f8;
//   border: 1px solid rgba(236, 72, 153, 0.3);
//   color: #db2777;
//   font-size: 0.8rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.08em;
//   margin: 0 auto;
//   animation: ${floatAnimation} 4s ease-in-out infinite;
// `;

// const SectionTitle = styled.h2`
//   font-size: 1.75rem;
//   font-weight: 800;
//   color: ${textMain};
//   letter-spacing: -0.02em;
//   margin: 0;

//   @media (min-width: 640px) {
//     font-size: 2.25rem;
//   }
// `;

// const HighlightSpan = styled.span`
//   background: ${brandGradient};
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// `;

// const SectionSubtitle = styled.p`
//   font-size: 1rem;
//   color: ${textMuted};
//   margin: 0 auto;
//   max-width: 36rem;
//   line-height: 1.5;
// `;

// const ProductsGrid = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 16px;
//   justify-content: center;
//   width: 100%;
//   box-sizing: border-box;

//   @media (max-width: 768px) {
//     gap: 12px;
//   }
// `;

// const ProductCard = styled.div`
//   background: ${cardBg};
//   border-radius: 16px;
//   padding: 14px;
//   border: 1px solid ${borderColor};
//   box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
//   cursor: pointer;
//   transition: all 0.3s ease;
  
//   width: 100%;
//   max-width: 260px;
//   box-sizing: border-box;

//   &:hover {
//     transform: translateY(-4px);
//     border-color: ${primaryPink};
//     box-shadow: 0 12px 28px rgba(236, 72, 153, 0.1);
//   }

//   @media (max-width: 768px) {
//     padding: 10px;
//     gap: 8px;
//     max-width: calc(50% - 6px); 
//   }
// `;

// const CardImageWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   height: 160px;
//   border-radius: 12px;
//   overflow: hidden;
//   background: ${softBg};

//   @media (max-width: 768px) {
//     height: 130px;
//   }
// `;

// const CardLoveIcon = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(4px);
//   border: 1px solid ${borderColor};
//   border-radius: 50%;
//   width: 34px;
//   height: 34px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   z-index: 5;
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
//   transition: transform 0.2s ease, background 0.2s ease;

//   &:hover {
//     transform: scale(1.1);
//     background: ${cardBg};
//   }
// `;

// const CardImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   transition: transform 0.5s ease;

//   ${ProductCard}:hover & {
//     transform: scale(1.05);
//   }
// `;

// const ProductTitle = styled.h4`
//   font-size: 0.95rem;
//   font-weight: 700;
//   color: ${textMain};
//   margin: 0;
//   display: -webkit-box;
//   -webkit-line-clamp: 1;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
// `;

// const ProductPriceRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: auto;
//   padding-top: 4px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 8px;
//   }
// `;

// const PriceText = styled.span`
//   font-size: 1rem;
//   font-weight: 800;
//   color: ${textMain};
// `;

// const AddButton = styled.button`
//   background: ${brandGradient};
//   color: #ffffff;
//   border: none;
//   padding: 6px 14px;
//   border-radius: 8px;
//   font-size: 0.8rem;
//   font-weight: 700;
//   cursor: pointer;
//   box-shadow: 0 4px 12px rgba(236, 72, 153, 0.25);
//   transition: all 0.2s ease;

//   &:hover {
//     opacity: 0.92;
//     transform: translateY(-1px);
//     box-shadow: 0 6px 16px rgba(236, 72, 153, 0.35);
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//     text-align: center;
//   }
// `;

// const ViewMoreContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 16px;
// `;

// const ViewMoreButton = styled.button`
//   background: ${brandGradient};
//   color: #ffffff;
//   border: none;
//   padding: 14px 28px;
//   border-radius: 12px;
//   font-weight: 700;
//   font-size: 0.95rem;
//   cursor: pointer;
//   box-shadow: 0 6px 20px rgba(236, 72, 153, 0.3);
//   transition: all 0.3s ease;

//   &:hover {
//     opacity: 0.92;
//     transform: translateY(-2px);
//     box-shadow: 0 8px 25px rgba(236, 72, 153, 0.45);
//   }
// `;

// const LoadingText = styled.div`
//   text-align: center;
//   font-size: 0.95rem;
//   color: ${textMuted};
//   padding: 32px;
//   font-weight: 500;
// `;

// // --- COMPONENT EXPORT ---
// export default function LandingProductsSection() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [wishlistIds, setWishlistIds] = useState([]);

//   // 1. Listen to authenticated user
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user || null);
//     });
//     return () => unsubscribe();
//   }, []);

//   // 2. Fetch user's wishlist IDs
//   useEffect(() => {
//     async function fetchUserWishlist() {
//       if (!currentUser) {
//         setWishlistIds([]);
//         return;
//       }
//       try {
//         const q = query(collection(db, "wishlists"), where("userId", "==", currentUser.uid));
//         const querySnapshot = await getDocs(q);
//         const ids = querySnapshot.docs.map(docSnap => docSnap.data().productId);
//         setWishlistIds(ids);
//       } catch (error) {
//         console.error("Error fetching wishlist IDs:", error);
//       }
//     }
//     fetchUserWishlist();
//   }, [currentUser]);

//   // 3. Toggle wishlist handler
//   const handleToggleWishlist = async (e, productId) => {
//     e.stopPropagation();

//     if (!currentUser) {
//       Swal.fire({ text: "Please log in to manage your wishlist.", icon: "warning", timer: 2500, showConfirmButton: false });
//       return;
//     }

//     const isCurrentlyWishlisted = wishlistIds.includes(productId);
//     const wishlistDocId = `${currentUser.uid}_${productId}`;
//     const wishlistRef = doc(db, "wishlists", wishlistDocId);

//     if (isCurrentlyWishlisted) {
//       setWishlistIds(wishlistIds.filter(id => id !== productId));
//     } else {
//       setWishlistIds([...wishlistIds, productId]);
//     }

//     try {
//       if (isCurrentlyWishlisted) {
//         await deleteDoc(wishlistRef);
//         Swal.fire({ text: "Removed from wishlist!", icon: "info", timer: 1500, showConfirmButton: false });
//       } else {
//         await setDoc(wishlistRef, {
//           userId: currentUser.uid,
//           productId: productId,
//           addedAt: new Date()
//         });
//         Swal.fire({ text: "Saved to wishlist!", icon: "success", timer: 1500, showConfirmButton: false });
//       }
//     } catch (error) {
//       console.error("Error updating wishlist:", error);
//       if (isCurrentlyWishlisted) {
//         setWishlistIds([...wishlistIds, productId]);
//       } else {
//         setWishlistIds(wishlistIds.filter(id => id !== productId));
//       }
//       Swal.fire({ text: "Failed to update wishlist.", icon: "error", timer: 2000, showConfirmButton: false });
//     }
//   };

//   useEffect(() => {
//     let intervalId = null;

//     const fetchLastProducts = async () => {
//       try {
//         const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(8));
//         const querySnapshot = await getDocs(q);
//         const list = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         if (list.length > 0) {
//           setProducts(list);
//           setLoading(false);
//           if (intervalId) {
//             clearInterval(intervalId);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch landing products:", error);
//       }
//     };

//     setLoading(true);
//     fetchLastProducts();

//     intervalId = setInterval(() => {
//       fetchLastProducts();
//     }, 10000);

//     return () => {
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   if (loading) {
//     return (
//       <ProductsSection>
//         <SectionHeader>
//           <SectionBadge>Kingsword Craft</SectionBadge>
//           <SectionTitle>Explore Our <HighlightSpan>Signature Collection</HighlightSpan></SectionTitle>
//           <SectionSubtitle>Handcrafted premium bags embodying timeless tradition and modern flair.</SectionSubtitle>
//         </SectionHeader>
//         <LoadingText>Loading handcrafted pieces...</LoadingText>
//       </ProductsSection>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <ProductsSection>
//         <SectionHeader>
//           <SectionBadge>Kingsword Craft</SectionBadge>
//           <SectionTitle>Explore Our <HighlightSpan>Signature Collection</HighlightSpan></SectionTitle>
//           <SectionSubtitle>Handcrafted premium bags embodying timeless tradition and modern flair.</SectionSubtitle>
//         </SectionHeader>
//         <LoadingText>No products available yet.</LoadingText>
//       </ProductsSection>
//     );
//   }

//   return (
//     <ProductsSection>
//       <SectionHeader>
//         <SectionBadge>Kingsword Craft</SectionBadge>
//         <SectionTitle>Explore Our <HighlightSpan>Signature Collection</HighlightSpan></SectionTitle>
//         <SectionSubtitle>Handcrafted premium bags embodying timeless tradition and modern flair.</SectionSubtitle>
//       </SectionHeader>

//       <ProductsGrid $itemCount={products.length}>
//         {products.map((product, idx) => {
//           const displayImg = product.images?.[0] || product.image || "https://placehold.co/400x300?text=No+Image";
//           const productPrice = Number(product.amount || 0);
//           const isWishlisted = wishlistIds.includes(product.id);

//           return (
//             <Zoom delay={idx * 50} triggerOnce key={product.id} style={{ display: 'contents' }}>
//               <ProductCard onClick={() => router.push(`/productdetail/${product.id}`)}>
//                 <CardImageWrapper>
//                   <CardLoveIcon 
//                     onClick={(e) => handleToggleWishlist(e, product.id)}
//                     title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
//                   >
//                     {isWishlisted ? (
//                       <span style={{ color: "#ef4444", fontSize: "14px" }}>❤️</span>
//                     ) : (
//                       <span style={{ color: textMain, fontSize: "14px" }}>🤍</span>
//                     )}
//                   </CardLoveIcon>
//                   <CardImage src={displayImg} alt={product.name} />
//                 </CardImageWrapper>

//                 <ProductTitle>
//                   {product.name ? product.name.charAt(0).toUpperCase() + product.name.slice(1) : ""}
//                 </ProductTitle>
//                 <ProductPriceRow>
//                   <PriceText>
//                     ₦{productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                   </PriceText>
//                   <AddButton onClick={(e) => {
//                     e.stopPropagation();
//                     router.push(`/productdetail/${product.id}`);
//                   }}>View Piece</AddButton>
//                 </ProductPriceRow>
//               </ProductCard>
//             </Zoom>
//           );
//         })}
//       </ProductsGrid>

//       <ViewMoreContainer>
//         <ViewMoreButton onClick={() => router.push('/store')}>
//           Explore Full Collection →
//         </ViewMoreButton>
//       </ViewMoreContainer>
//     </ProductsSection>
//   );
// }





'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Zoom } from 'react-awesome-reveal';
import { useRouter } from 'next/navigation';
import { auth, db } from "@/firebaseConfig";
import { collection, getDocs, doc, setDoc, deleteDoc, query, where, orderBy, limit } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

// --- ENITZ GLOBAL RETAIL THEME & STYLES ---
const brandCyan = '#00aeef';
const brandDarkNavy = '#0b1b48';
const brandGradient = 'linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)';
const softBg = '#f8fafc';
const cardBg = '#ffffff';
const borderColor = '#e2e8f0';
const textMain = '#0f172a';
const textMuted = '#475569';

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const ProductsSection = styled.section`
  background: ${cardBg};
  padding: 32px 20px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  border: 1px solid ${borderColor};
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 48px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 8px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 9999px;
  background: rgba(0, 174, 239, 0.08);
  border: 1px solid rgba(0, 174, 239, 0.25);
  color: #00aeef;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 auto;
  animation: ${floatAnimation} 4s ease-in-out infinite;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${textMain};
  letter-spacing: -0.02em;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 2.25rem;
  }
`;

const HighlightSpan = styled.span`
  background: ${brandGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: ${textMuted};
  margin: 0 auto;
  max-width: 36rem;
  line-height: 1.5;
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const ProductCard = styled.div`
  background: ${cardBg};
  border-radius: 16px;
  padding: 14px;
  border: 1px solid ${borderColor};
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  width: 100%;
  max-width: 260px;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-4px);
    border-color: ${brandCyan};
    box-shadow: 0 12px 28px rgba(0, 174, 239, 0.15);
  }

  @media (max-width: 768px) {
    padding: 10px;
    gap: 8px;
    max-width: calc(50% - 6px); 
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  background: ${softBg};

  @media (max-width: 768px) {
    height: 130px;
  }
`;

const CardLoveIcon = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border: 1px solid ${borderColor};
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background: ${cardBg};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${textMain};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 4px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const PriceText = styled.span`
  font-size: 1rem;
  font-weight: 800;
  color: ${textMain};
`;

const AddButton = styled.button`
  background: ${brandGradient};
  color: #ffffff;
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 174, 239, 0.25);
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 174, 239, 0.35);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const ViewMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const ViewMoreButton = styled.button`
  background: ${brandGradient};
  color: #ffffff;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 174, 239, 0.3);
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 174, 239, 0.45);
  }
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 0.95rem;
  color: ${textMuted};
  padding: 32px;
  font-weight: 500;
`;

// --- COMPONENT EXPORT ---
export default function LandingProductsSection() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);

  // 1. Listen to authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch user's wishlist IDs
  useEffect(() => {
    async function fetchUserWishlist() {
      if (!currentUser) {
        setWishlistIds([]);
        return;
      }
      try {
        const q = query(collection(db, "wishlists"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const ids = querySnapshot.docs.map(docSnap => docSnap.data().productId);
        setWishlistIds(ids);
      } catch (error) {
        console.error("Error fetching wishlist IDs:", error);
      }
    }
    fetchUserWishlist();
  }, [currentUser]);

  // 3. Toggle wishlist handler
  const handleToggleWishlist = async (e, productId) => {
    e.stopPropagation();

    if (!currentUser) {
      Swal.fire({ text: "Please log in to manage your wishlist.", icon: "warning", timer: 2500, showConfirmButton: false });
      return;
    }

    const isCurrentlyWishlisted = wishlistIds.includes(productId);
    const wishlistDocId = `${currentUser.uid}_${productId}`;
    const wishlistRef = doc(db, "wishlists", wishlistDocId);

    if (isCurrentlyWishlisted) {
      setWishlistIds(wishlistIds.filter(id => id !== productId));
    } else {
      setWishlistIds([...wishlistIds, productId]);
    }

    try {
      if (isCurrentlyWishlisted) {
        await deleteDoc(wishlistRef);
        Swal.fire({ text: "Removed from wishlist!", icon: "info", timer: 1500, showConfirmButton: false });
      } else {
        await setDoc(wishlistRef, {
          userId: currentUser.uid,
          productId: productId,
          addedAt: new Date()
        });
        Swal.fire({ text: "Saved to wishlist!", icon: "success", timer: 1500, showConfirmButton: false });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      if (isCurrentlyWishlisted) {
        setWishlistIds([...wishlistIds, productId]);
      } else {
        setWishlistIds(wishlistIds.filter(id => id !== productId));
      }
      Swal.fire({ text: "Failed to update wishlist.", icon: "error", timer: 2000, showConfirmButton: false });
    }
  };

  useEffect(() => {
    let intervalId = null;

    const fetchLastProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(8));
        const querySnapshot = await getDocs(q);
        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (list.length > 0) {
          setProducts(list);
          setLoading(false);
          if (intervalId) {
            clearInterval(intervalId);
          }
        }
      } catch (error) {
        console.error("Failed to fetch landing products:", error);
      }
    };

    setLoading(true);
    fetchLastProducts();

    intervalId = setInterval(() => {
      fetchLastProducts();
    }, 10000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  if (loading) {
    return (
      <ProductsSection>
        <SectionHeader>
          <SectionBadge>Enitz Global Limited</SectionBadge>
          <SectionTitle>Explore Our <HighlightSpan>Featured Collection</HighlightSpan></SectionTitle>
          <SectionSubtitle>Discover premium everyday merchandise and essentials tailored for modern living.</SectionSubtitle>
        </SectionHeader>
        <LoadingText>Loading catalog pieces...</LoadingText>
      </ProductsSection>
    );
  }

  if (products.length === 0) {
    return (
      <ProductsSection>
        <SectionHeader>
          <SectionBadge>Enitz Global Limited</SectionBadge>
          <SectionTitle>Explore Our <HighlightSpan>Featured Collection</HighlightSpan></SectionTitle>
          <SectionSubtitle>Discover premium everyday merchandise and essentials tailored for modern living.</SectionSubtitle>
        </SectionHeader>
        <LoadingText>No products available yet.</LoadingText>
      </ProductsSection>
    );
  }

  return (
    <ProductsSection>
      <SectionHeader>
        <SectionBadge>Enitz Global Limited</SectionBadge>
        <SectionTitle>Explore Our <HighlightSpan>Featured Collection</HighlightSpan></SectionTitle>
        <SectionSubtitle>Discover premium everyday merchandise and essentials tailored for modern living.</SectionSubtitle>
      </SectionHeader>

      <ProductsGrid>
        {products.map((product, idx) => {
          const displayImg = product.images?.[0] || product.image || "https://placehold.co/400x300?text=No+Image";
          const productPrice = Number(product.amount || 0);
          const isWishlisted = wishlistIds.includes(product.id);

          return (
            <Zoom delay={idx * 50} triggerOnce key={product.id} style={{ display: 'contents' }}>
              <ProductCard onClick={() => router.push(`/productdetail/${product.id}`)}>
                <CardImageWrapper>
                  <CardLoveIcon 
                    onClick={(e) => handleToggleWishlist(e, product.id)}
                    title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    {isWishlisted ? (
                      <span style={{ color: "#ef4444", fontSize: "14px" }}>❤️</span>
                    ) : (
                      <span style={{ color: textMain, fontSize: "14px" }}>🤍</span>
                    )}
                  </CardLoveIcon>
                  <CardImage src={displayImg} alt={product.name} />
                </CardImageWrapper>

                <ProductTitle>
                  {product.name ? product.name.charAt(0).toUpperCase() + product.name.slice(1) : ""}
                </ProductTitle>
                <ProductPriceRow>
                  <PriceText>
                    ₦{productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </PriceText>
                  <AddButton onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/productdetail/${product.id}`);
                  }}>View Item</AddButton>
                </ProductPriceRow>
              </ProductCard>
            </Zoom>
          );
        })}
      </ProductsGrid>

      <ViewMoreContainer>
        <ViewMoreButton onClick={() => router.push('/store')}>
          Explore Full Store Catalog →
        </ViewMoreButton>
      </ViewMoreContainer>
    </ProductsSection>
  );
}