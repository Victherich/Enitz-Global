



// "use client";

// import { useState, useEffect } from "react";
// import styled, { keyframes } from "styled-components";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { db, auth } from "@/firebaseConfig";
// import { collection, getDocs, doc, setDoc, deleteDoc, query, where } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import Swal from "sweetalert2";

// /* ================= THEME & COLORS ================= */

// const primaryPink = '#ec4899';
// const primaryAmber = '#f59e0b';
// const brandGradient = 'linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)';
// const cardBg = '#ffffff';
// const borderColor = '#e2e8f0';
// const textMain = '#0f172a';
// const textMuted = '#475569';
// const softBg = '#f8fafc';
// const successGreen = '#10b981';
// const dangerRed = '#ef4444';

// const floatAnimation = keyframes`
//   0% { transform: translateY(0px) rotate(0deg); }
//   50% { transform: translateY(-4px) rotate(1deg); }
//   100% { transform: translateY(0px) rotate(0deg); }
// `;

// /* ================= STYLED COMPONENTS ================= */

// const PageContainer = styled.div`
//   font-family: inherit;
//   color: ${textMain};
//   background: ${cardBg};
//   overflow-x: hidden;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   min-height: 100vh;
//   padding-bottom: 60px;
// `;

// /* --- Store Hero Banner --- */
// const StoreHero = styled.section`
//   position: relative;
//   height: 45vh;
//   min-height: 380px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   background: ${textMain};
//   overflow: hidden;

//   &::after {
//     content: "";
//     position: absolute;
//     inset: 0;
//     background: rgba(15, 23, 42, 0.65);
//     z-index: 1;
//   }
// `;

// const HeroImage = styled.img`
//   position: absolute;
//   inset: 0;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   z-index: 0;
// `;

// const HeroContent = styled.div`
//   position: relative;
//   z-index: 2;
//   max-width: 800px;
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   align-items: center;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const HeroTitle = styled.h1`
//   font-size: clamp(2rem, 3.5vw, 2.75rem);
//   font-weight: 800;
//   color: #ffffff;
//   letter-spacing: -0.5px;
//   margin: 0;

//   span {
//     background: ${brandGradient};
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }
// `;

// const HeroSubtitle = styled.p`
//   font-size: clamp(0.95rem, 1.8vw, 1.15rem);
//   color: ${borderColor};
//   line-height: 1.6;
//   margin: 0;
// `;

// const SearchInput = styled.input`
//   width: 100%;
//   max-width: 500px;
//   padding: 14px 20px;
//   border-radius: 12px;
//   border: 1px solid ${borderColor};
//   background: #ffffff;
//   color: ${textMain};
//   font-size: 1rem;
//   font-weight: 500;
//   outline: none;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
//   transition: all 0.25s ease;

//   &::placeholder {
//     color: ${textMuted};
//   }

//   &:focus {
//     border-color: ${primaryPink};
//     box-shadow: 0 10px 35px rgba(236, 72, 153, 0.2);
//   }
// `;

// /* --- Main Layout Container --- */
// const StoreLayout = styled.div`
//   max-width: 1200px;
//   margin: auto;
//   padding: 24px 16px;
//   display: grid;
//   grid-template-columns: 260px 1fr;
//   gap: 32px;
//   align-items: start;
//   width: 100%;
//   box-sizing: border-box;

//   @media (max-width: 968px) {
//     grid-template-columns: 1fr;
//     gap: 20px;
//   }
// `;

// /* --- Categories Sidebar --- */
// const Sidebar = styled.aside`
//   background: ${softBg};
//   border: 1px solid ${borderColor};
//   border-radius: 16px;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

//   @media (max-width: 968px) {
//     padding: 12px;
//     background: transparent;
//     border: none;
//     box-shadow: none;
//   }
// `;

// const SidebarTitle = styled.h3`
//   font-size: 1.15rem;
//   font-weight: 800;
//   color: ${textMain};
//   border-bottom: 1px solid ${borderColor};
//   padding-bottom: 12px;
//   margin: 0;
// `;

// const CategoryList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;

//   @media (max-width: 968px) {
//     display: none;
//   }
// `;

// const CategoryButton = styled.button`
//   background: ${(props) => (props.$active ? brandGradient : 'transparent')};
//   color: ${(props) => (props.$active ? '#ffffff' : textMain)};
//   border: 1px solid ${(props) => (props.$active ? 'transparent' : borderColor)};
//   padding: 12px 16px;
//   border-radius: 10px;
//   text-align: left;
//   font-size: 0.95rem;
//   font-weight: ${(props) => (props.$active ? '700' : '600')};
//   cursor: pointer;
//   transition: all 0.2s ease;
//   white-space: nowrap;
//   box-shadow: ${(props) => (props.$active ? '0 4px 15px rgba(236, 72, 153, 0.25)' : 'none')};

//   &:hover {
//     background: ${(props) => (props.$active ? brandGradient : softBg)};
//     border-color: ${(props) => (props.$active ? 'transparent' : primaryPink)};
//     color: ${(props) => (props.$active ? '#ffffff' : primaryPink)};
//   }
// `;

// /* --- Products Section --- */
// const ProductsWrapper = styled.main`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const StoreControls = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: ${softBg};
//   border: 1px solid ${borderColor};
//   border-radius: 14px;
//   padding: 16px 20px;
//   box-sizing: border-box;

//   @media (max-width: 576px) {
//     flex-direction: column;
//     gap: 12px;
//     align-items: stretch;
//   }
// `;

// const ResultsCount = styled.p`
//   font-size: 0.95rem;
//   color: ${textMuted};
//   font-weight: 600;
//   margin: 0;

//   span {
//     color: ${textMain};
//     font-weight: 800;
//   }
// `;

// const SortSelect = styled.select`
//   padding: 10px 14px;
//   border-radius: 10px;
//   border: 1px solid ${borderColor};
//   background: #ffffff;
//   color: ${textMain};
//   font-size: 0.9rem;
//   font-weight: 600;
//   outline: none;
//   cursor: pointer;
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);

//   &:focus {
//     border-color: ${primaryPink};
//   }
// `;

// const ProductsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
//   gap: 20px;
//   width: 100%;
//   box-sizing: border-box;

//   @media (max-width: 768px) {
//     grid-template-columns: repeat(2, 1fr);
//     gap: 12px;
//   }
// `;

// const ProductCard = styled.div`
//   background: #ffffff;
//   border-radius: 16px;
//   padding: 14px;
//   border: 1px solid ${borderColor};
//   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
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
//   box-shadow: 0 4px 12px rgba(236, 72, 153, 0.25);
//   transition: all 0.2s ease;

//   &:hover {
//     opacity: 0.92;
//     transform: translateY(-1px);
//   }
// `;

// const LoadingText = styled.div`
//   text-align: center;
//   padding: 60px 20px;
//   font-size: 1rem;
//   font-weight: 600;
//   color: ${textMuted};
//   grid-column: 1 / -1;
// `;

// /* --- Mobile Category Select Dropdown --- */
// const MobileCategorySelect = styled.select`
//   display: none;
//   width: 100%;
//   padding: 12px 16px;
//   border-radius: 12px;
//   border: 1px solid ${borderColor};
//   background: #ffffff;
//   color: ${textMain};
//   font-size: 0.95rem;
//   font-weight: 600;
//   outline: none;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

//   &:focus {
//     border-color: ${primaryPink};
//   }

//   @media (max-width: 968px) {
//     display: block;
//   }
// `;

// /* ================= COMPONENT ================= */

// export default function StorePage() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [activeCategoryId, setActiveCategoryId] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("featured");
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [wishlistIds, setWishlistIds] = useState([]);

//   // Fetch products and categories from Firestore
//   useEffect(() => {
//     async function fetchStoreData() {
//       try {
//         setLoading(true);

//         const [productsSnapshot, categoriesSnapshot] = await Promise.all([
//           getDocs(collection(db, "products")),
//           getDocs(collection(db, "categories")),
//         ]);

//         const fetchedProducts = productsSnapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             id: doc.id,
//             name: data.name || "Untitled Product",
//             categoryId: data.categoryId || "",
//             amount: Number(data.amount) || 0,
//             images: data.images || [],
//             image: data.image || "",
//             createdAt: data.createdAt,
//           };
//         });

//         const fetchedCategories = categoriesSnapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             id: doc.id,
//             title: data.title || "Untitled Category",
//             description: data.description || "",
//           };
//         });

//         setProducts(fetchedProducts);
//         setCategories(fetchedCategories);
//       } catch (error) {
//         console.error("Error fetching store data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchStoreData();
//   }, []);

//   // Filter products by active category ID and search query
//   const filteredProducts = products.filter((item) => {
//     const matchesCategory =
//       activeCategoryId === "all" || item.categoryId === activeCategoryId;
//     const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   // Sort products
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortBy === "price-low") return a.amount - b.amount;
//     if (sortBy === "price-high") return b.amount - a.amount;
//     if (sortBy === "title") return a.name.localeCompare(b.name);
//     return 0;
//   });

//   // Listen to authenticated user
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user || null);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Fetch user's wishlist IDs
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

//   // Toggle wishlist handler
//   const handleToggleWishlist = async (e, productId) => {
//     e.stopPropagation();

//     if (!currentUser) {
//       Swal.fire({
//         title: "Please Login",
//         text: "Please log in to manage your wishlist.",
//         icon: "warning",
//         confirmButtonColor: "#ec4899",
//         background: "#ffffff",
//         color: "#0f172a"
//       });
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
//         Swal.fire({ text: "Removed from wishlist!", icon: "info", timer: 1500, showConfirmButton: false, background: "#ffffff", color: "#0f172a" });
//       } else {
//         await setDoc(wishlistRef, {
//           userId: currentUser.uid,
//           productId: productId,
//           addedAt: new Date()
//         });
//         Swal.fire({ text: "Saved to wishlist!", icon: "success", timer: 1500, showConfirmButton: false, background: "#ffffff", color: "#0f172a" });
//       }
//     } catch (error) {
//       console.error("Error updating wishlist:", error);
//       if (isCurrentlyWishlisted) {
//         setWishlistIds([...wishlistIds, productId]);
//       } else {
//         setWishlistIds(wishlistIds.filter(id => id !== productId));
//       }
//       Swal.fire({ text: "Failed to update wishlist.", icon: "error", timer: 2000, showConfirmButton: false, background: "#ffffff", color: "#0f172a" });
//     }
//   };

//   return (
//     <PageContainer>
//       {/* Store Hero Banner with Search Bar */}
//       <StoreHero>
//         <HeroImage
//           src="./bag1.png"
//           alt="Store Hero Banner"
//         />
//         <HeroContent>
//           <HeroTitle>
//             <span>Shop Our Collections</span>
//           </HeroTitle>
//           <HeroSubtitle>
//             Explore premium accessories, bespoke products, and quality items designed to elevate your lifestyle.
//           </HeroSubtitle>
//           <SearchInput
//             type="text"
//             placeholder="Search products by name..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </HeroContent>
//       </StoreHero>

//       {/* Main Layout */}
//       <StoreLayout>
//         {/* Categories Sidebar */}
//         <Sidebar>
//           <SidebarTitle>Categories</SidebarTitle>

//           {/* Mobile Dropdown Select */}
//           <MobileCategorySelect
//             value={activeCategoryId}
//             onChange={(e) => setActiveCategoryId(e.target.value)}
//           >
//             <option value="all">All Items</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
//               </option>
//             ))}
//           </MobileCategorySelect>

//           {/* Desktop Sidebar Button List */}
//           <CategoryList>
//             <CategoryButton
//               $active={activeCategoryId === "all"}
//               onClick={() => setActiveCategoryId("all")}
//             >
//               All Items
//             </CategoryButton>

//             {categories.map((cat) => (
//               <CategoryButton
//                 key={cat.id}
//                 $active={activeCategoryId === cat.id}
//                 onClick={() => setActiveCategoryId(cat.id)}
//               >
//                 {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
//               </CategoryButton>
//             ))}
//           </CategoryList>
//         </Sidebar>

//         {/* Products Section */}
//         <ProductsWrapper>
//           {/* Controls Bar */}
//           <StoreControls>
//             <ResultsCount>
//               Showing <span>{sortedProducts.length}</span> curated items
//             </ResultsCount>
//             <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//               <option value="featured">Sort by: Featured</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="title">Name: A to Z</option>
//             </SortSelect>
//           </StoreControls>

//           {/* Grid */}
//           <ProductsGrid>
//             {loading ? (
//               <LoadingText>Loading curated collections...</LoadingText>
//             ) : sortedProducts.length === 0 ? (
//               <LoadingText>No products found matching your criteria.</LoadingText>
//             ) : (
//               sortedProducts.map((product) => {
//                 const displayImg = product.images?.[0] || product.image || "https://placehold.co/400x300?text=No+Image";
//                 const productPrice = Number(product.amount || 0);
//                 const isWishlisted = wishlistIds.includes(product.id);

//                 return (
//                   <ProductCard
//                     key={product.id}
//                     onClick={() => router.push(`/productdetail/${product.id}`)}
//                   >
//                     <CardImageWrapper>
//                       <CardLoveIcon 
//                         onClick={(e) => handleToggleWishlist(e, product.id)}
//                         title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
//                       >
//                         {isWishlisted ? (
//                           <span style={{ color: dangerRed, fontSize: "14px" }}>❤️</span>
//                         ) : (
//                           <span style={{ color: textMain, fontSize: "14px" }}>🤍</span>
//                         )}
//                       </CardLoveIcon>
//                       <CardImage src={displayImg} alt={product.name} />
//                     </CardImageWrapper>

//                     <ProductTitle>
//                       {product.name ? product.name.charAt(0).toUpperCase() + product.name.slice(1) : ""}
//                     </ProductTitle>
                    
//                     <ProductPriceRow>
//                       <PriceText>
//                         ₦{productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                       </PriceText>
//                       <AddButton onClick={(e) => {
//                         e.stopPropagation();
//                         router.push(`/productdetail/${product.id}`);
//                       }}>
//                         View
//                       </AddButton>
//                     </ProductPriceRow>
//                   </ProductCard>
//                 );
//               })
//             )}
//           </ProductsGrid>
//         </ProductsWrapper>
//       </StoreLayout>
//     </PageContainer>
//   );
// }






"use client";

import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db, auth } from "@/firebaseConfig";
import { collection, getDocs, doc, setDoc, deleteDoc, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

/* ================= THEME & COLORS ================= */

const brandCyan = '#00aeef';
const brandDarkNavy = '#0b1b48';
const brandGradient = 'linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)';
const cardBg = '#ffffff';
const borderColor = '#e2e8f0';
const textMain = '#0f172a';
const textMuted = '#475569';
const softBg = '#f8fafc';
const successGreen = '#10b981';
const dangerRed = '#ef4444';

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

/* ================= STYLED COMPONENTS ================= */

const PageContainer = styled.div`
  font-family: inherit;
  color: ${textMain};
  background: ${cardBg};
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100vh;
  padding-bottom: 60px;
`;

/* --- Store Hero Banner --- */
const StoreHero = styled.section`
  position: relative;
  height: 45vh;
  min-height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${textMain};
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(11, 27, 72, 0.75);
    z-index: 1;
  }
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.5px;
  margin: 0;

  span {
    background: ${brandGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(0.95rem, 1.8vw, 1.15rem);
  color: #e2e8f0;
  line-height: 1.6;
  margin: 0;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 14px 20px;
  border-radius: 12px;
  border: 1px solid ${borderColor};
  background: #ffffff;
  color: ${textMain};
  font-size: 1rem;
  font-weight: 500;
  outline: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;

  &::placeholder {
    color: ${textMuted};
  }

  &:focus {
    border-color: ${brandCyan};
    box-shadow: 0 10px 35px rgba(0, 174, 239, 0.2);
  }
`;

/* --- Main Layout Container --- */
const StoreLayout = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 24px 16px;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 32px;
  align-items: start;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

/* --- Categories Sidebar --- */
const Sidebar = styled.aside`
  background: ${softBg};
  border: 1px solid ${borderColor};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

  @media (max-width: 968px) {
    padding: 12px;
    background: transparent;
    border: none;
    box-shadow: none;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  color: ${textMain};
  border-bottom: 1px solid ${borderColor};
  padding-bottom: 12px;
  margin: 0;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 968px) {
    display: none;
  }
`;

const CategoryButton = styled.button`
  background: ${(props) => (props.$active ? brandGradient : 'transparent')};
  color: ${(props) => (props.$active ? '#ffffff' : textMain)};
  border: 1px solid ${(props) => (props.$active ? 'transparent' : borderColor)};
  padding: 12px 16px;
  border-radius: 10px;
  text-align: left;
  font-size: 0.95rem;
  font-weight: ${(props) => (props.$active ? '700' : '600')};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: ${(props) => (props.$active ? '0 4px 15px rgba(0, 174, 239, 0.25)' : 'none')};

  &:hover {
    background: ${(props) => (props.$active ? brandGradient : softBg)};
    border-color: ${(props) => (props.$active ? 'transparent' : brandCyan)};
    color: ${(props) => (props.$active ? '#ffffff' : brandCyan)};
  }
`;

/* --- Products Section --- */
const ProductsWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const StoreControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${softBg};
  border: 1px solid ${borderColor};
  border-radius: 14px;
  padding: 16px 20px;
  box-sizing: border-box;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
`;

const ResultsCount = styled.p`
  font-size: 0.95rem;
  color: ${textMuted};
  font-weight: 600;
  margin: 0;

  span {
    color: ${textMain};
    font-weight: 800;
  }
`;

const SortSelect = styled.select`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid ${borderColor};
  background: #ffffff;
  color: ${textMain};
  font-size: 0.9rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);

  &:focus {
    border-color: ${brandCyan};
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const ProductCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 14px;
  border: 1px solid ${borderColor};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  width: 100%;
  box-sizing: border-box;

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
  top: 10px;
  right: 10px;
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

const LoadingText = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 1rem;
  font-weight: 600;
  color: ${textMuted};
  grid-column: 1 / -1;
`;

/* --- Mobile Category Select Dropdown --- */
const MobileCategorySelect = styled.select`
  display: none;
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${borderColor};
  background: #ffffff;
  color: ${textMain};
  font-size: 0.95rem;
  font-weight: 600;
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:focus {
    border-color: ${brandCyan};
  }

  @media (max-width: 968px) {
    display: block;
  }
`;

/* ================= COMPONENT ================= */

export default function StorePage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);

  // Fetch products and categories from Firestore
  useEffect(() => {
    async function fetchStoreData() {
      try {
        setLoading(true);

        const [productsSnapshot, categoriesSnapshot] = await Promise.all([
          getDocs(collection(db, "products")),
          getDocs(collection(db, "categories")),
        ]);

        const fetchedProducts = productsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "Untitled Product",
            categoryId: data.categoryId || "",
            amount: Number(data.amount) || 0,
            images: data.images || [],
            image: data.image || "",
            variations: data.variations || [],
            createdAt: data.createdAt,
          };
        });

        const fetchedCategories = categoriesSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Category",
            description: data.description || "",
          };
        });

        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching store data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStoreData();
  }, []);

  // Filter products by active category ID and search query
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      activeCategoryId === "all" || item.categoryId === activeCategoryId;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.amount - b.amount;
    if (sortBy === "price-high") return b.amount - a.amount;
    if (sortBy === "title") return a.name.localeCompare(b.name);
    return 0;
  });

  // Listen to authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  // Fetch user's wishlist IDs
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

  // Toggle wishlist handler
  const handleToggleWishlist = async (e, productId) => {
    e.stopPropagation();

    if (!currentUser) {
      Swal.fire({
        title: "Please Login",
        text: "Please log in to manage your wishlist.",
        icon: "warning",
        confirmButtonColor: "#00aeef",
        background: "#ffffff",
        color: "#0f172a"
      });
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
        Swal.fire({ text: "Removed from wishlist!", icon: "info", timer: 1500, showConfirmButton: false, background: "#ffffff", color: "#0f172a" });
      } else {
        await setDoc(wishlistRef, {
          userId: currentUser.uid,
          productId: productId,
          addedAt: new Date()
        });
        Swal.fire({ text: "Saved to wishlist!", icon: "success", timer: 1500, showConfirmButton: false, background: "#ffffff", color: "#0f172a" });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      if (isCurrentlyWishlisted) {
        setWishlistIds([...wishlistIds, productId]);
      } else {
        setWishlistIds(wishlistIds.filter(id => id !== productId));
      }
      Swal.fire({ text: "Failed to update wishlist.", icon: "error", timer: 2000, showConfirmButton: false, background: "#ffffff", color: "#0f172a" });
    }
  };

  return (
    <PageContainer>
      {/* Store Hero Banner with Search Bar */}
      <StoreHero>
        <HeroImage
          src="./shop.png"
          alt="Store Hero Banner"
        />
        <HeroContent>
          <HeroTitle>
            Shop Our Products
            {/* <span>Shop Our Collections</span> */}
          </HeroTitle>
          <HeroSubtitle>
            Explore premium accessories, bespoke products, and quality items designed to elevate your lifestyle.
          </HeroSubtitle>
          <SearchInput
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </HeroContent>
      </StoreHero>

      {/* Main Layout */}
      <StoreLayout>
        {/* Categories Sidebar */}
        <Sidebar>
          <SidebarTitle>Categories</SidebarTitle>

          {/* Mobile Dropdown Select */}
          <MobileCategorySelect
            value={activeCategoryId}
            onChange={(e) => setActiveCategoryId(e.target.value)}
          >
            <option value="all">All Items</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
              </option>
            ))}
          </MobileCategorySelect>

          {/* Desktop Sidebar Button List */}
          <CategoryList>
            <CategoryButton
              $active={activeCategoryId === "all"}
              onClick={() => setActiveCategoryId("all")}
            >
              All Items
            </CategoryButton>

            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                $active={activeCategoryId === cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
              >
                {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
              </CategoryButton>
            ))}
          </CategoryList>
        </Sidebar>

        {/* Products Section */}
        <ProductsWrapper>
          {/* Controls Bar */}
          <StoreControls>
            <ResultsCount>
              Showing <span>{sortedProducts.length}</span> curated items
            </ResultsCount>
            <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Name: A to Z</option>
            </SortSelect>
          </StoreControls>

          {/* Grid */}
          <ProductsGrid>
            {loading ? (
              <LoadingText>Loading curated collections...</LoadingText>
            ) : sortedProducts.length === 0 ? (
              <LoadingText>No products found matching your criteria.</LoadingText>
            ) : (
              sortedProducts.map((product) => {
                const displayImg = product.images?.[0] || product.image || "https://placehold.co/400x300?text=No+Image";
                const productPrice = Number(product.amount || 0);
                const isWishlisted = wishlistIds.includes(product.id);

                return (
                  <ProductCard
                    key={product.id}
                    onClick={() => router.push(`/productdetail/${product.id}`)}
                  >
                    <CardImageWrapper>
                      <CardLoveIcon 
                        onClick={(e) => handleToggleWishlist(e, product.id)}
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        {isWishlisted ? (
                          <span style={{ color: dangerRed, fontSize: "14px" }}>❤️</span>
                        ) : (
                          <span style={{ color: textMain, fontSize: "14px" }}>🤍</span>
                        )}
                      </CardLoveIcon>
                      <CardImage src={displayImg} alt={product.name} />
                    </CardImageWrapper>

                    <ProductTitle>
                      {product.name ? product.name.charAt(0).toUpperCase() + product.name.slice(1) : ""}
                    </ProductTitle>

                    {/* 🌟 Variations displayed on store card */}
                {/* {product.variations && product.variations.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {product.variations.map((v, idx) => (
                      <div key={idx} style={{ fontSize: "0.75rem", color: textMuted, fontWeight: "600" }}>
                        <span style={{ color: brandCyan }}>{v.name}:</span> {v.options}
                      </div>
                    ))}
                  </div>
                )} */}
                    
                    <ProductPriceRow>
                      <PriceText>
                        ₦{productPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </PriceText>
                      <AddButton onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/productdetail/${product.id}`);
                      }}>
                        View
                      </AddButton>
                    </ProductPriceRow>
                  </ProductCard>
                );
              })
            )}
          </ProductsGrid>
        </ProductsWrapper>
      </StoreLayout>
    </PageContainer>
  );
}