// 'use client';

// import React, { useState, useEffect, use } from 'react';
// import styled from 'styled-components';
// import { useRouter } from 'next/navigation';
// import { auth, db } from "@/firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
// import { collection, doc, getDoc, setDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
// import Swal from 'sweetalert2';
// import { useCart } from '@/components/CartContext';




// // --- THEME & STYLES ---
// const primaryGold = '#D4AF37';
// const primaryBlue = '#1E3A8A';
// const blueGradient = 'linear-gradient(135deg, #3B82F6 0%, #1E3A8A 50%, #0F172A 100%)';

// const Dark = "#0f172a";
// const Border = "#e5eaf2";
// const White = "#ffffff";
// const LightBg = "#f8fafc";
// const TextMuted = "#64748b";
// const SuccessGreen = "#10b981";

// const PageContainer = styled.div`
//   font-family: inherit;
//   color: ${Dark};
//   background: ${White};
//   min-height: 100vh;
//   padding: 15px 8px 50px 8px;
//   box-sizing: border-box;
//   width: 100%;
//   max-width: 100vw;
//   overflow-x: hidden;
// `;

// const ContentWrapper = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const BackButton = styled.button`
//   background: transparent;
//   border: 1px solid ${Border};
//   color: ${Dark};
//   padding: 8px 16px;
//   border-radius: 6px;
//   font-weight: 600;
//   font-size: 0.9rem;
//   cursor: pointer;
//   display: inline-flex;
//   align-items: center;
//   gap: 6px;
//   width: fit-content;
//   transition: all 0.2s ease;

//   &:hover {
//     background: ${LightBg};
//     border-color: ${primaryBlue};
//   }
// `;

// const ProductGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 40px;
//   align-items: start;
//   width: 100%;
//   box-sizing: border-box;

//   @media (max-width: 968px) {
//     grid-template-columns: 1fr;
//     gap: 20px;
//   }
// `;

// /* --- Image Gallery --- */
// const GalleryContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   position: static;
//   width: 100%;
//   box-sizing: border-box;

//   @media (min-width: 969px) {
//     position: sticky;
//     top: 20px;
//   }
// `;

// const MainImageView = styled.div`
//   width: 100%;
//   height: 450px;
//   border-radius: 12px;
//   overflow: hidden;
//   border: 1px solid ${Border};
//   background: ${LightBg};
//   box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
//   box-sizing: border-box;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.3s ease;

//     &:hover {
//       transform: scale(1.03);
//     }
//   }

//   @media (max-width: 576px) {
//     height: 280px;
//   }
// `;

// const ThumbnailsRow = styled.div`
//   display: flex;
//   gap: 10px;
//   overflow-x: auto;
//   padding-bottom: 5px;
//   max-width: 100%;
//   box-sizing: border-box;
//   -webkit-overflow-scrolling: touch;
// `;

// const Thumbnail = styled.div`
//   width: 65px;
//   height: 65px;
//   border-radius: 8px;
//   overflow: hidden;
//   border: 2px solid ${(props) => (props.$active ? primaryGold : Border)};
//   cursor: pointer;
//   flex-shrink: 0;
//   transition: all 0.2s ease;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   &:hover {
//     border-color: ${primaryGold};
//   }

//   @media (max-width: 350px) {
//     width: 55px;
//     height: 55px;
//   }
// `;

// /* --- Product Info Column --- */
// const InfoContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   background: ${LightBg};
//   border: 1px solid ${Border};
//   border-radius: 12px;
//   padding: 30px;
//   box-shadow: 0 4px 20px rgba(15, 23, 42, 0.02);
//   width: 100%;
//   box-sizing: border-box;
//   overflow: hidden;

//   @media (max-width: 576px) {
//     padding: 12px;
//   }
// `;

// const CategoryBadge = styled.span`
//   font-size: 11px;
//   font-weight: 700;
//   color: ${primaryGold};
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   background: rgba(212, 175, 55, 0.1);
//   padding: 4px 10px;
//   border-radius: 4px;
//   width: fit-content;
// `;

// const ProductTitle = styled.h1`
//   font-size: clamp(1.2rem, 2.5vw, 2.2rem);
//   font-weight: 800;
//   color: ${primaryBlue};
//   margin: 0;
//   line-height: 1.25;
//   word-break: break-word;
// `;

// const PriceRow = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: space-between;
//   gap: 10px;
//   border-bottom: 1px solid ${Border};
//   padding-bottom: 12px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const PriceText = styled.span`
//   font-size: clamp(1.4rem, 2vw, 1.8rem);
//   font-weight: 800;
//   color: ${Dark};
//   word-break: break-word;
// `;

// const StockBadge = styled.span`
//   font-size: 0.75rem;
//   font-weight: 600;
//   color: ${(props) => (props.$inStock ? SuccessGreen : '#ef4444')};
//   background: ${(props) => (props.$inStock ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)')};
//   padding: 4px 8px;
//   border-radius: 6px;
//   white-space: nowrap;
// `;

// const DescriptionSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
//   width: 100%;
//   box-sizing: border-box;

//   h3 {
//     font-size: 0.95rem;
//     font-weight: 700;
//     color: ${Dark};
//     margin: 0;
//   }

//   p {
//     font-size: 0.9rem;
//     color: ${TextMuted};
//     line-height: 1.5;
//     margin: 0;
//     word-break: break-word;
//   }
// `;

// const MetaGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 10px;
//   border-top: 1px solid ${Border};
//   border-bottom: 1px solid ${Border};
//   padding: 12px 0;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const MetaItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 2px;
//   overflow: hidden;

//   span:first-child {
//     font-size: 0.7rem;
//     color: ${TextMuted};
//     text-transform: uppercase;
//     font-weight: 600;
//   }

//   span:last-child {
//     font-size: 0.85rem;
//     color: ${Dark};
//     font-weight: 700;
//     word-break: break-word;
//   }
// `;

// /* --- Action Buttons --- */
// const ActionsRow = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 5px;
//   width: 100%;
//   box-sizing: border-box;

//   @media (max-width: 576px) {
//     flex-direction: column;
//   }
// `;

// const AddToCartButton = styled.button`
//   flex: 2;
//   background: ${blueGradient};
//   color: ${White};
//   border: none;
//   padding: 12px 16px;
//   border-radius: 8px;
//   font-weight: 700;
//   font-size: 0.95rem;
//   cursor: pointer;
//   box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 6px;
//   box-sizing: border-box;
//   transition: transform 0.2s ease, opacity 0.2s ease;

//   &:hover {
//     opacity: 0.95;
//     transform: translateY(-2px);
//   }
// `;

// const WishlistButton = styled.button`
//   flex: 1;
//   background: ${(props) => (props.$wishlisted ? 'rgba(212, 175, 55, 0.15)' : `${White}`)};
//   color: ${(props) => (props.$wishlisted ? '#AA7C11' : `${Dark}`)};
//   border: 1px solid ${(props) => (props.$wishlisted ? primaryGold : Border)};
//   padding: 12px 16px;
//   border-radius: 8px;
//   font-weight: 700;
//   font-size: 0.95rem;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 6px;
//   box-sizing: border-box;
//   transition: all 0.2s ease;

//   &:hover {
//     border-color: ${primaryGold};
//     background: rgba(212, 175, 55, 0.05);
//   }
// `;

// const StatusMessage = styled.div`
//   font-size: 0.85rem;
//   font-weight: 600;
//   color: ${SuccessGreen};
//   text-align: center;
//   word-break: break-word;
// `;

// const StateContainer = styled.div`
//   text-align: center;
//   padding: 60px 10px;
//   font-size: 1rem;
//   color: ${TextMuted};
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   align-items: center;
//   box-sizing: border-box;
//   width: 100%;
// `;

// const ImageWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   height: 450px;
//   border-radius: 12px;
//   overflow: hidden;
//   border: 1px solid ${Border};
//   background: ${LightBg};
//   box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
//   box-sizing: border-box;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.3s ease;

//     &:hover {
//       transform: scale(1.03);
//     }
//   }

//   @media (max-width: 576px) {
//     height: 280px;
//   }
// `;

// const FloatingWishlistIcon = styled.button`
//   position: absolute;
//   top: 12px;
//   right: 12px;
//   background: rgba(255, 255, 255, 0.85);
//   border: 1px solid ${Border};
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   z-index: 10;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//   transition: all 0.2s ease;

//   &:hover {
//     transform: scale(1.1);
//     background: ${White};
//   }
// `;

// // --- COMPONENT ---
// export default function ProductDetailPage({ params }) {
//   const resolvedParams = use(params);
//   const productId = resolvedParams.id;

//   const router = useRouter();
//   const [product, setProduct] = useState(null);
//   const [categoryName, setCategoryName] = useState("Loading category...");
//   const [loading, setLoading] = useState(true);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [feedback, setFeedback] = useState("");


//   const [currentUser, setCurrentUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const { addToCart } = useCart();

//   // 1. Listen to authenticated user
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setCurrentUser(user);
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const userSnap = await getDoc(userRef);
//           if (userSnap.exists()) {
//             setUserData(userSnap.data());
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       } else {
//         setCurrentUser(null);
//         setUserData(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);



// // 1. Check if item is in wishlist on load
// useEffect(() => {
//   async function checkWishlistStatus() {
//     if (!productId || !currentUser) return;
//     try {
//       // Create a unique doc ID combining user and product, or query the collection
//       const wishlistDocId = `${currentUser.uid}_${productId}`;
//       const wishlistRef = doc(db, "wishlists", wishlistDocId);
//       const snap = await getDoc(wishlistRef);
//       if (snap.exists()) {
//         setIsWishlisted(true);
//       }
//     } catch (err) {
//       console.error("Error checking wishlist:", err);
//     }
//   }
//   checkWishlistStatus();
// }, [productId, currentUser]);




// const handleToggleWishlist = async () => {
//   if (!currentUser) {
//     setFeedback("⚠️ Please log in to manage your wishlist.");
//     setTimeout(() => setFeedback(""), 3000);
//     return;
//   }

//   const newStatus = !isWishlisted;
//   setIsWishlisted(newStatus);

//   try {
//     const wishlistDocId = `${currentUser.uid}_${productId}`;
//     const wishlistRef = doc(db, "wishlists", wishlistDocId);

//     if (newStatus) {
//       // Save ONLY user ID, product ID, and timestamp
//       await setDoc(wishlistRef, {
//         userId: currentUser.uid,
//         productId: productId,
//         addedAt: new Date()
//       });
//       setFeedback("✓ Added to your wishlist!");
//       Swal.fire({text:"Saved to wishlist!", icon:"success", timer:2000, showConfirmButton:false});
//     } else {
//       await deleteDoc(wishlistRef);
//       setFeedback("Removed from your wishlist.");
//           Swal.fire({text:"Removed from wishlist!", icon:"info", timer:2000, showConfirmButton:false});
//     }
//   } catch (error) {
//     console.error("Error updating wishlist in Firestore:", error);
//     setIsWishlisted(!newStatus); // revert on failure
//     setFeedback("Failed to update wishlist.");
//   }

//   setTimeout(() => setFeedback(""), 3000);
// };


//   useEffect(() => {
//     async function fetchProductDetails() {
//       if (!productId) return;
//       try {
//         setLoading(true);
//         const docRef = doc(db, "products", productId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           const fetchedProduct = {
//             id: docSnap.id,
//             name: data.name || data.title || "Untitled Product",
//             categoryId: data.categoryId || "",
//             amount: Number(data.amount || data.price) || 0,
//             description: data.description || "No description provided for this luxury product.",
//             images: data.images?.length > 0 ? data.images : data.image ? [data.image] : [],
//             neverFinishes: data.neverFinishes ?? true,
//             quantity: Number(data.quantity || 0),
//             createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : "Recent",
//           };
//           setProduct(fetchedProduct);

//           if (fetchedProduct.categoryId) {
//             const catRef = doc(db, "categories", fetchedProduct.categoryId);
//             const catSnap = await getDoc(catRef);
//             if (catSnap.exists()) {
//               const catData = catSnap.data();
//               const rawTitle = catData.title || "Decor";
//               setCategoryName(rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1));
//             } else {
//               setCategoryName("Curated Decor");
//             }
//           } else {
//             setCategoryName("Curated Decor");
//           }
//         } else {
//           setProduct(null);
//         }
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProductDetails();
//   }, [productId]);



//   const handleAddToCart = () => {
//   if (!product) return;

//   addToCart({
//     id: product.id,
//     name: product.name,
//     price: product.amount,
//     image: product.images[0] || "",
//     selectedColor: "Default",
//     selectedSize: "Standard",
//     quantity: 1,
//   });

//   setFeedback("✓ Successfully added to your cart!");

//   Swal.fire({
//     title: "Added to cart!",
//     text: "What would you like to do next?",
//     icon: "success",
//     showCancelButton: true,
//     confirmButtonText: "Proceed to Cart",
//     cancelButtonText: "Continue Shopping",
//     confirmButtonColor: "#2563EB",
//     cancelButtonColor: "#64748B",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       router.push("/cart"); // Adjust to your actual cart route path
//     }
//   });

//   setTimeout(() => setFeedback(""), 3000);
// };
  

//   if (loading) {
//     return (
//       <PageContainer>
//         <StateContainer>Loading product specifications...</StateContainer>
//       </PageContainer>
//     );
//   }

//   if (!product) {
//     return (
//       <PageContainer>
//         <StateContainer>
//           <p>Product not found or has been removed.</p>
//           <BackButton onClick={() => router.push('/store')}>← Return to Store</BackButton>
//         </StateContainer>
//       </PageContainer>
//     );
//   }

//   const activeImage = product.images[selectedImageIndex] || "https://placehold.co/600x600?text=No+Image";
//   const isInStock = product.neverFinishes || product.quantity > 0;

//   return (
//     <PageContainer>
//       <ContentWrapper>
//         <BackButton onClick={() => router.back()}>
//           ← Back
//         </BackButton>

//         <ProductGrid>
//           {/* <GalleryContainer>
//             <MainImageView>
//               <img src={activeImage} alt={product.name} />
//             </MainImageView>
// <p style={{ fontSize: "12px", color: "#64748B" }}>Click thumbnail to show enlarged image</p>
//             {product.images.length > 1 && (
//               <ThumbnailsRow>
//                 {product.images.map((imgUrl, index) => (
//                   <Thumbnail
//                     key={index}
//                     $active={selectedImageIndex === index}
//                     onClick={() => setSelectedImageIndex(index)}
//                   >
//                     <img src={imgUrl} alt={`${product.name} thumbnail ${index + 1}`} />
//                   </Thumbnail>
//                 ))}
//               </ThumbnailsRow>
//             )}
//           </GalleryContainer> */}


// <GalleryContainer>
//             <ImageWrapper>
//               <FloatingWishlistIcon onClick={handleToggleWishlist} title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}>
//                 {isWishlisted ? (
//                   <span style={{ color: "#ef4444", fontSize: "1.2rem" }}>❤️</span>
//                 ) : (
//                   <span style={{ color: Dark, fontSize: "1.2rem" }}>🤍</span>
//                 )}
//               </FloatingWishlistIcon>
//               <img src={activeImage} alt={product.name} />
//             </ImageWrapper>
            
//             <p style={{ fontSize: "12px", color: "#64748B" }}>Click thumbnail to show enlarged image</p>

//             {product.images.length > 1 && (
//               <ThumbnailsRow>
//                 {product.images.map((imgUrl, index) => (
//                   <Thumbnail
//                     key={index}
//                     $active={selectedImageIndex === index}
//                     onClick={() => setSelectedImageIndex(index)}
//                   >
//                     <img src={imgUrl} alt={`${product.name} thumbnail ${index + 1}`} />
//                   </Thumbnail>
//                 ))}
//               </ThumbnailsRow>
//             )}
//           </GalleryContainer>


//           <InfoContainer>
//             <CategoryBadge>{categoryName}</CategoryBadge>

//             <ProductTitle>
//               {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
//             </ProductTitle>
//             <p style={{ fontSize: '0.6rem', color: '#64748B' }}>ID: {product.id}</p>

//             <PriceRow>
//               <PriceText>
//                 ₦{product.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//               </PriceText>
//               <StockBadge $inStock={isInStock}>
//                 {product.neverFinishes ? "In Stock" : product.quantity > 0 ? `${product.quantity} left` : "Out of Stock"}
//               </StockBadge>
//             </PriceRow>

//             <DescriptionSection>
//               <h3>Product Description</h3>
//               <p>{product.description}</p>
//             </DescriptionSection>

//             <MetaGrid>
//               <MetaItem>
//                 <span>Availability</span>
//                 <span>{isInStock ? "Ready" : "Unavailable"}</span>
//               </MetaItem>
//               <MetaItem>
//                 <span>Added On</span>
//                 <span>{product.createdAt}</span>
//               </MetaItem>
//             </MetaGrid>

//             {feedback && <StatusMessage>{feedback}</StatusMessage>}

//             <ActionsRow>
//               <AddToCartButton onClick={handleAddToCart}>
//                 🛒 Add to Cart
//               </AddToCartButton>
//            <WishlistButton $wishlisted={isWishlisted} onClick={handleToggleWishlist}>
//                 {isWishlisted ? "❤️ Saved in Wishlist" : "🤍 Wishlist"}
//               </WishlistButton>
//             </ActionsRow>
//           </InfoContainer>
//         </ProductGrid>
//       </ContentWrapper>
//     </PageContainer>
//   );
// }





'use client';

import React, { useState, useEffect, use } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/navigation';
import { auth, db } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, setDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useCart } from '@/components/CartContext';

// --- KINGSWORD CRAFT THEME & STYLES ---
const primaryPink = '#ec4899';
const primaryAmber = '#f59e0b';
const brandGradient = 'linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)';
const cardBg = '#ffffff';
const borderColor = '#e2e8f0';
const textMain = '#0f172a';
const textMuted = '#475569';
const softBg = '#f8fafc';
const successGreen = '#10b981';

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const PageContainer = styled.div`
  font-family: inherit;
  color: ${textMain};
  background: ${cardBg};
  min-height: 100vh;
  padding: 24px 16px 60px 16px;
  box-sizing: border-box;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  background: transparent;
  border: 1px solid ${borderColor};
  color: ${textMain};
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  transition: all 0.2s ease;

  &:hover {
    background: ${softBg};
    border-color: ${primaryPink};
    color: ${primaryPink};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

/* --- Image Gallery --- */
const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: static;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 969px) {
    position: sticky;
    top: 24px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${borderColor};
  background: ${softBg};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.04);
    }
  }

  @media (max-width: 576px) {
    height: 320px;
  }
`;

const FloatingWishlistIcon = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border: 1px solid ${borderColor};
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background: ${cardBg};
  }
`;

const ThumbnailsRow = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 6px;
  max-width: 100%;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
`;

const Thumbnail = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid ${(props) => (props.$active ? primaryPink : borderColor)};
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: ${primaryPink};
  }

  @media (max-width: 350px) {
    width: 60px;
    height: 60px;
  }
`;

/* --- Product Info Column --- */
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${softBg};
  border: 1px solid ${borderColor};
  border-radius: 20px;
  padding: 36px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 576px) {
    padding: 20px;
  }
`;

const CategoryBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #db2777;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: #fdf2f8;
  border: 1px solid rgba(236, 72, 153, 0.3);
  padding: 6px 14px;
  border-radius: 9999px;
  width: fit-content;
  animation: ${floatAnimation} 4s ease-in-out infinite;
`;

const ProductTitle = styled.h1`
  font-size: clamp(1.4rem, 2.5vw, 2.2rem);
  font-weight: 800;
  color: ${textMain};
  margin: 0;
  line-height: 1.25;
  word-break: break-word;
`;

const PriceRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid ${borderColor};
  padding-bottom: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const PriceText = styled.span`
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 800;
  background: ${brandGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  word-break: break-word;
`;

const StockBadge = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${(props) => (props.$inStock ? successGreen : '#ef4444')};
  background: ${(props) => (props.$inStock ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)')};
  padding: 6px 12px;
  border-radius: 8px;
  white-space: nowrap;
`;

const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: ${textMain};
    margin: 0;
  }

  p {
    font-size: 0.95rem;
    color: ${textMuted};
    line-height: 1.6;
    margin: 0;
    word-break: break-word;
  }
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  border-top: 1px solid ${borderColor};
  border-bottom: 1px solid ${borderColor};
  padding: 16px 0;
  width: 100%;
  box-sizing: border-box;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;

  span:first-child {
    font-size: 0.75rem;
    color: ${textMuted};
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  span:last-child {
    font-size: 0.9rem;
    color: ${textMain};
    font-weight: 700;
    word-break: break-word;
  }
`;

/* --- Action Buttons --- */
const ActionsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled.button`
  flex: 2;
  background: ${brandGradient};
  color: #ffffff;
  border: none;
  padding: 14px 20px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(236, 72, 153, 0.45);
  }
`;

const WishlistButton = styled.button`
  flex: 1;
  background: ${(props) => (props.$wishlisted ? '#fdf2f8' : cardBg)};
  color: ${(props) => (props.$wishlisted ? '#db2777' : textMain)};
  border: 1px solid ${(props) => (props.$wishlisted ? primaryPink : borderColor)};
  padding: 14px 20px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${primaryPink};
    background: #fdf2f8;
  }
`;

const StatusMessage = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${successGreen};
  text-align: center;
  word-break: break-word;
`;

const StateContainer = styled.div`
  text-align: center;
  padding: 80px 16px;
  font-size: 1.05rem;
  color: ${textMuted};
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  font-weight: 500;
`;

// --- COMPONENT ---
export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState("Loading category...");
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const { addToCart } = useCart();

  // 1. Listen to authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Check if item is in wishlist on load
  useEffect(() => {
    async function checkWishlistStatus() {
      if (!productId || !currentUser) return;
      try {
        const wishlistDocId = `${currentUser.uid}_${productId}`;
        const wishlistRef = doc(db, "wishlists", wishlistDocId);
        const snap = await getDoc(wishlistRef);
        if (snap.exists()) {
          setIsWishlisted(true);
        }
      } catch (err) {
        console.error("Error checking wishlist:", err);
      }
    }
    checkWishlistStatus();
  }, [productId, currentUser]);

  const handleToggleWishlist = async () => {
    if (!currentUser) {
      setFeedback("⚠️ Please log in to manage your wishlist.");
      setTimeout(() => setFeedback(""), 3000);
      return;
    }

    const newStatus = !isWishlisted;
    setIsWishlisted(newStatus);

    try {
      const wishlistDocId = `${currentUser.uid}_${productId}`;
      const wishlistRef = doc(db, "wishlists", wishlistDocId);

      if (newStatus) {
        await setDoc(wishlistRef, {
          userId: currentUser.uid,
          productId: productId,
          addedAt: new Date()
        });
        setFeedback("✓ Added to your wishlist!");
        Swal.fire({ text: "Saved to wishlist!", icon: "success", timer: 2000, showConfirmButton: false });
      } else {
        await deleteDoc(wishlistRef);
        setFeedback("Removed from your wishlist.");
        Swal.fire({ text: "Removed from wishlist!", icon: "info", timer: 2000, showConfirmButton: false });
      }
    } catch (error) {
      console.error("Error updating wishlist in Firestore:", error);
      setIsWishlisted(!newStatus);
      setFeedback("Failed to update wishlist.");
    }

    setTimeout(() => setFeedback(""), 3000);
  };

  useEffect(() => {
    async function fetchProductDetails() {
      if (!productId) return;
      try {
        setLoading(true);
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
        const fetchedProduct = {
            id: docSnap.id,
            name: data.name || data.title || "Untitled Piece",
            categoryId: data.categoryId || "",
            amount: Number(data.amount || data.price) || 0,
            description: data.description || "No description provided for this artisan piece.",
            images: data.images?.length > 0 ? data.images : data.image ? [data.image] : [],
            neverFinishes: data.neverFinishes ?? true,
            quantity: Number(data.quantity || 0),
            createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : "Recent",
            reviews: data.reviews || [],
            averageRating: data.rating || 0,
            reviewCount: data.reviewCount || (data.reviews ? data.reviews.length : 0),
          };
          setProduct(fetchedProduct);

          if (fetchedProduct.categoryId) {
            const catRef = doc(db, "categories", fetchedProduct.categoryId);
            const catSnap = await getDoc(catRef);
            if (catSnap.exists()) {
              const catData = catSnap.data();
              const rawTitle = catData.title || "Collection";
              setCategoryName(rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1));
            } else {
              setCategoryName("Signature Collection");
            }
          } else {
            setCategoryName("Signature Collection");
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.amount,
      image: product.images[0] || "",
      selectedColor: "Default",
      selectedSize: "Standard",
      quantity: 1,
    });

    setFeedback("✓ Successfully added to your cart!");

    Swal.fire({
      title: "Added to cart!",
      text: "What would you like to do next?",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Proceed to Cart",
      cancelButtonText: "Continue Shopping",
      confirmButtonColor: "#ec4899",
      cancelButtonColor: "#475569",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/cart");
      }
    });

    setTimeout(() => setFeedback(""), 3000);
  };

  if (loading) {
    return (
      <PageContainer>
        <StateContainer>Loading piece specifications...</StateContainer>
      </PageContainer>
    );
  }

  if (!product) {
    return (
      <PageContainer>
        <StateContainer>
          <p>Piece not found or has been removed.</p>
          <BackButton onClick={() => router.push('/store')}>← Return to Collection</BackButton>
        </StateContainer>
      </PageContainer>
    );
  }

  const activeImage = product.images[selectedImageIndex] || "https://placehold.co/600x600?text=No+Image";
  const isInStock = product.neverFinishes || product.quantity > 0;

  return (
    <PageContainer>
      <ContentWrapper>
        <BackButton onClick={() => router.back()}>
          ← Back
        </BackButton>

        <ProductGrid>
          <GalleryContainer>
            <ImageWrapper>
              <FloatingWishlistIcon onClick={handleToggleWishlist} title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}>
                {isWishlisted ? (
                  <span style={{ color: "#ef4444", fontSize: "1.2rem" }}>❤️</span>
                ) : (
                  <span style={{ color: textMain, fontSize: "1.2rem" }}>🤍</span>
                )}
              </FloatingWishlistIcon>
              <img src={activeImage} alt={product.name} />
            </ImageWrapper>
            
            <p style={{ fontSize: "12px", color: textMuted }}>Click thumbnail to view alternate angle</p>

            {product.images.length > 1 && (
              <ThumbnailsRow>
                {product.images.map((imgUrl, index) => (
                  <Thumbnail
                    key={index}
                    $active={selectedImageIndex === index}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img src={imgUrl} alt={`${product.name} thumbnail ${index + 1}`} />
                  </Thumbnail>
                ))}
              </ThumbnailsRow>
            )}
          </GalleryContainer>

          <InfoContainer>
            <CategoryBadge>{categoryName}</CategoryBadge>

            <ProductTitle>
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </ProductTitle>
            <p style={{ fontSize: '0.75rem', color: textMuted, marginTop: '-10px' }}>ID: {product.id}</p>

            <PriceRow>
              <PriceText>
                ₦{product.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </PriceText>
              <StockBadge $inStock={isInStock}>
                {product.neverFinishes ? "In Stock" : product.quantity > 0 ? `${product.quantity} left` : "Out of Stock"}
              </StockBadge>
            </PriceRow>

            <DescriptionSection>
              <h3>Product Description</h3>
              <p>{product.description}</p>
            </DescriptionSection>

            <MetaGrid>
              <MetaItem>
                <span>Availability</span>
                <span>{isInStock ? "Ready to Ship" : "Unavailable"}</span>
              </MetaItem>
              <MetaItem>
                <span>Crafted On</span>
                <span>{product.createdAt}</span>
              </MetaItem>
            </MetaGrid>

            {feedback && <StatusMessage>{feedback}</StatusMessage>}

            <ActionsRow>
              <AddToCartButton onClick={handleAddToCart}>
                🛒 Add to Cart
              </AddToCartButton>
              <WishlistButton $wishlisted={isWishlisted} onClick={handleToggleWishlist}>
                {isWishlisted ? "❤️ Saved" : "🤍 Wishlist"}
              </WishlistButton>
            </ActionsRow>



            {/* ⭐ Product Reviews Section */}
            <div style={{ marginTop: "16px", borderTop: `1px solid ${borderColor}`, paddingTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: "700", color: textMain, margin: 0 }}>
                  Customer Reviews ({product.reviewCount})
                </h3>
                <span style={{ fontSize: "0.9rem", fontWeight: "700", color: primaryAmber }}>
                  ⭐ {product.averageRating > 0 ? product.averageRating : "No ratings yet"} / 5.0
                </span>
              </div>

              {product.reviews?.length === 0 ? (
                <p style={{ fontSize: "0.85rem", color: textMuted, margin: 0 }}>
                  Be the first to review this piece after your purchase!
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "250px", overflowY: "auto", paddingRight: "4px" }}>
                  {product.reviews.map((rev, idx) => (
                    <div key={idx} style={{ background: cardBg, border: `1px solid ${borderColor}`, padding: "12px", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: "700", color: textMain }}>
                          {rev.userName || "Customer"}
                        </span>
                        <span style={{ fontSize: "0.8rem", color: primaryAmber }}>
                          {"⭐".repeat(Number(rev.rating) || 5)}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: textMuted, margin: 0, wordBreak: "break-word" }}>
                        {rev.comment}
                      </p>
                      {rev.createdAt && (
                        <span style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: "2px" }}>
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </InfoContainer>
        </ProductGrid>
      </ContentWrapper>
    </PageContainer>
  );
}