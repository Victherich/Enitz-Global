// "use client";

// import { useState, useEffect, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import styled from "styled-components";
// import { db, auth } from "@/firebaseConfig";
// import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import Swal from "sweetalert2";
// import ProductCard from "@/components/ProductCard";
// import SearchBar from "@/components/SearchBar";

// /* ================= THEME & COLORS ================= */

// const brandCyan = '#00aeef';
// const cardBg = '#ffffff';
// const borderColor = '#e2e8f0';
// const textMain = '#0f172a';
// const textMuted = '#475569';
// const softBg = '#f8fafc';

// /* ================= STYLED COMPONENTS ================= */

// const PageContainer = styled.div`
//   font-family: inherit;
//   color: ${textMain};
//   background: ${cardBg};
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   gap: 24px;
//   padding-bottom: 60px;
// `;

// const SearchHeaderSection = styled.section`
//   background: ${softBg};
//   border-bottom: 1px solid ${borderColor};
//   padding: 40px 16px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 20px;
//   text-align: center;
// `;

// const HeaderTitle = styled.h1`
//   font-size: clamp(1.5rem, 2.5vw, 2rem);
//   font-weight: 800;
//   color: ${textMain};
//   margin: 0;

//   span {
//     color: ${brandCyan};
//   }
// `;

// const ContentLayout = styled.main`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 16px;
//   width: 100%;
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   gap: 24px;
// `;

// const ControlsRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: ${softBg};
//   border: 1px solid ${borderColor};
//   border-radius: 12px;
//   padding: 14px 20px;
//   box-sizing: border-box;

//   @media (max-width: 576px) {
//     flex-direction: column;
//     gap: 12px;
//     align-items: stretch;
//   }
// `;

// const ResultsInfo = styled.p`
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

//   &:focus {
//     border-color: ${brandCyan};
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

// const MessageState = styled.div`
//   text-align: center;
//   padding: 80px 20px;
//   font-size: 1.05rem;
//   font-weight: 600;
//   color: ${textMuted};
//   grid-column: 1 / -1;
// `;

// /* ================= MAIN SEARCH COMPONENT ================= */
// export default function SearchContent() {
//   const searchParams = useSearchParams();
//   const searchQuery = searchParams.get("q") || "";

//   const [allProducts, setAllProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortBy, setSortBy] = useState("featured");
//   const [currentUser, setCurrentUser] = useState(null);
//   const [wishlistIds, setWishlistIds] = useState([]);

//   // Fetch Categories for name lookups
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const snapshot = await getDocs(collection(db, "categories"));
//         const cats = snapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title || "" }));
//         setCategories(cats);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     }
//     fetchCategories();
//   }, []);

//   const getCategoryName = (catId) => {
//     const found = categories.find((c) => c.id === catId);
//     return found ? found.title : "";
//   };

//   // Fetch all live products once on mount
//   useEffect(() => {
//     async function fetchAllLiveProducts() {
//       setLoading(true);
//       try {
//         const productsRef = collection(db, "products");
//         const q = query(productsRef, where("isLive", "==", true));
//         const querySnapshot = await getDocs(q);

//         const fetchedProducts = querySnapshot.docs.map((docSnap) => {
//           const data = docSnap.data();
//           let catIds = data.categoryIds || [];
//           if (catIds.length === 0 && data.categoryId) {
//             catIds = [data.categoryId];
//           }

//           return {
//             id: docSnap.id,
//             name: data.name || "Untitled Product",
//             categoryIds: catIds,
//             categoryId: data.categoryId || "",
//             amount: Number(data.amount) || 0,
//             images: data.images || [],
//             image: data.image || "",
//             isLive: data.isLive === true,
//           };
//         });

//         setAllProducts(fetchedProducts);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAllLiveProducts();
//   }, []);

//   // Filter products based on search query
//   const filteredProducts = allProducts.filter((item) => {
//     if (!searchQuery.trim()) return true;
//     const queryTerm = searchQuery.trim().toLowerCase();
//     const productName = (item.name || "").toLowerCase();
//     return productName.includes(queryTerm);
//   });

//   // Auth & Wishlist Management
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user || null);
//     });
//     return () => unsubscribe();
//   }, []);

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

//   const handleToggleWishlist = async (e, productId) => {
//     e.stopPropagation();

//     if (!currentUser) {
//       Swal.fire({
//         title: "Please Login",
//         text: "Please log in to manage your wishlist.",
//         icon: "warning",
//         confirmButtonColor: "#00aeef",
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

//   // Sorting Logic
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortBy === "price-low") return a.amount - b.amount;
//     if (sortBy === "price-high") return b.amount - a.amount;
//     if (sortBy === "title-asc") return a.name.localeCompare(b.name);
//     if (sortBy === "title-desc") return b.name.localeCompare(a.name);
//     return 0;
//   });

//   return (
//     <PageContainer>
//       <SearchHeaderSection>
//         <HeaderTitle>
//           Search Results for <span>&quot;{searchQuery}&quot;</span>
//         </HeaderTitle>
//         <SearchBar placeholder="Search for another product..." />
//       </SearchHeaderSection>

//       <ContentLayout>
//         <ControlsRow>
//           <ResultsInfo>
//             Found <span>{sortedProducts.length}</span> matching products
//           </ResultsInfo>
//           <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//             <option value="featured">Sort by: Featured</option>
//             <option value="price-low">Price: Low to High</option>
//             <option value="price-high">Price: High to Low</option>
//             <option value="title-asc">Name: A to Z</option>
//             <option value="title-desc">Name: Z to A</option>
//           </SortSelect>
//         </ControlsRow>

//         <ProductsGrid>
//           {loading ? (
//             <MessageState>Searching database...</MessageState>
//           ) : sortedProducts.length === 0 ? (
//             <MessageState>No products found matching &quot;{searchQuery}&quot;.</MessageState>
//           ) : (
//             sortedProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 isWishlisted={wishlistIds.includes(product.id)}
//                 onToggleWishlist={handleToggleWishlist}
//                 getCategoryName={getCategoryName}
//               />
//             ))
//           )}
//         </ProductsGrid>
//       </ContentLayout>
//     </PageContainer>
//   );
// }





"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import { db, auth } from "@/firebaseConfig";
import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

/* ================= THEME & COLORS ================= */

const brandCyan = '#00aeef';
const cardBg = '#ffffff';
const borderColor = '#e2e8f0';
const textMain = '#0f172a';
const textMuted = '#475569';
const softBg = '#f8fafc';

/* ================= STYLED COMPONENTS ================= */

const PageContainer = styled.div`
  font-family: inherit;
  color: ${textMain};
  background: ${cardBg};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 60px;
`;

const SearchHeaderSection = styled.section`
  background: ${softBg};
  border-bottom: 1px solid ${borderColor};
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 800;
  color: ${textMain};
  margin: 0;

  span {
    color: ${brandCyan};
  }
`;

const ContentLayout = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${softBg};
  border: 1px solid ${borderColor};
  border-radius: 12px;
  padding: 14px 20px;
  box-sizing: border-box;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
`;

const ResultsInfo = styled.p`
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

const MessageState = styled.div`
  text-align: center;
  padding: 80px 20px;
  font-size: 1.05rem;
  font-weight: 600;
  color: ${textMuted};
  grid-column: 1 / -1;
`;

/* ================= INTERNAL SEARCH CONTENT COMPONENT ================= */
function SearchContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);

  // Fetch Categories for name lookups
  useEffect(() => {
    async function fetchCategories() {
      try {
        const snapshot = await getDocs(collection(db, "categories"));
        const cats = snapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title || "" }));
        setCategories(cats);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, []);

  const getCategoryName = (catId) => {
    const found = categories.find((c) => c.id === catId);
    return found ? found.title : "";
  };

  // Fetch all live products once on mount
  useEffect(() => {
    async function fetchAllLiveProducts() {
      setLoading(true);
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("isLive", "==", true));
        const querySnapshot = await getDocs(q);

        const fetchedProducts = querySnapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          let catIds = data.categoryIds || [];
          if (catIds.length === 0 && data.categoryId) {
            catIds = [data.categoryId];
          }

          return {
            id: docSnap.id,
            name: data.name || "Untitled Product",
            categoryIds: catIds,
            categoryId: data.categoryId || "",
            amount: Number(data.amount) || 0,
            images: data.images || [],
            image: data.image || "",
            isLive: data.isLive === true,
          };
        });

        setAllProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllLiveProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = allProducts.filter((item) => {
    if (!searchQuery.trim()) return true;
    const queryTerm = searchQuery.trim().toLowerCase();
    const productName = (item.name || "").toLowerCase();
    return productName.includes(queryTerm);
  });

  // Auth & Wishlist Management
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });
    return () => unsubscribe();
  }, []);

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

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.amount - b.amount;
    if (sortBy === "price-high") return b.amount - a.amount;
    if (sortBy === "title-asc") return a.name.localeCompare(b.name);
    if (sortBy === "title-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <PageContainer>
      <SearchHeaderSection>
        <HeaderTitle>
          Search Results for <span>&quot;{searchQuery}&quot;</span>
        </HeaderTitle>
        <SearchBar placeholder="Search for another product..." />
      </SearchHeaderSection>

      <ContentLayout>
        <ControlsRow>
          <ResultsInfo>
            Found <span>{sortedProducts.length}</span> matching products
          </ResultsInfo>
          <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="title-asc">Name: A to Z</option>
            <option value="title-desc">Name: Z to A</option>
          </SortSelect>
        </ControlsRow>

        <ProductsGrid>
          {loading ? (
            <MessageState>Searching database...</MessageState>
          ) : sortedProducts.length === 0 ? (
            <MessageState>No products found matching &quot;{searchQuery}&quot;.</MessageState>
          ) : (
            sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
                getCategoryName={getCategoryName}
              />
            ))
          )}
        </ProductsGrid>
      </ContentLayout>
    </PageContainer>
  );
}

/* ================= EXPORTED PAGE WRAPPER ================= */
export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "100px", fontFamily: "inherit" }}>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}