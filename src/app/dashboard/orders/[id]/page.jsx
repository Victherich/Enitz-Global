




// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "@/firebaseConfig";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { useRouter, useParams } from "next/navigation";
// import styled from "styled-components";
// import Swal from "sweetalert2";

// // 🎨 NEW THEME COLORS & GRADIENTS (Vibrant Pink, Turquoise & Dynamic Accent)
// const PrimaryColor = "#ec4899";
// const Turquoise = "#06b6d4";
// const AccentGradient = "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)";
// const Dark = "#0f172a";
// const Border = "#e5eaf2";
// const White = "#ffffff";
// const TextMuted = "#475569";
// const Danger = "#ef4444";
// const Success = "#10b981";
// const Warning = "#f59e0b";

// // 🌟 Styled Components
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   color: ${Dark};
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 5px;
//   box-sizing: border-box;

//   @media (min-width: 768px) {
//     padding: 5px;
//     gap: 20px;
//   }
// `;

// const HeaderBanner = styled.div`
//   background: ${AccentGradient};
//   color: ${White};
//   padding: 16px;
//   border-radius: 12px;
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
//   box-shadow: 0 6px 20px rgba(236, 72, 153, 0.15);

//   @media (min-width: 768px) {
//     padding: 24px;
//   }
// `;

// const TopRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   flex-wrap: wrap;
//   gap: 10px;
// `;

// const ColorfulTitle = styled.h1`
//   font-size: 1.4rem;
//   font-weight: 800;
//   margin: 0;
//   background: linear-gradient(90deg, #ffffff 0%, #fbcfe8 100%);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   letter-spacing: -0.5px;
//   text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

//   @media (min-width: 768px) {
//     font-size: 2rem;
//   }
// `;

// const BackButton = styled.button`
//   background: rgba(255, 255, 255, 0.2);
//   color: ${White};
//   border: 1px solid rgba(255, 255, 255, 0.4);
//   padding: 8px 14px;
//   border-radius: 6px;
//   font-weight: 700;
//   font-size: 0.85rem;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     background: ${White};
//     color: ${PrimaryColor};
//   }
// `;

// const ColorfulSub = styled.p`
//   font-size: 0.9rem;
//   margin: 0;
//   color: #fdf2f8;
//   opacity: 0.95;

//   @media (min-width: 768px) {
//     font-size: 1rem;
//   }
// `;

// const GridContent = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 16px;

//   @media (min-width: 900px) {
//     grid-template-columns: 2fr 1fr;
//     gap: 20px;
//   }
// `;

// const Column = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const Card = styled.div`
//   background: ${White};
//   border-radius: 12px;
//   padding: 16px;
//   border: 1px solid ${Border};
//   border-top: 4px solid ${Turquoise};
//   box-shadow: 0 4px 15px rgba(15, 23, 42, 0.03);
//   display: flex;
//   flex-direction: column;
//   gap: 12px;

//   @media (min-width: 768px) {
//     padding: 20px;
//   }
// `;

// const CardTitle = styled.h3`
//   font-size: 1.1rem;
//   font-weight: 800;
//   margin: 0;
//   color: ${PrimaryColor};
//   border-bottom: 2px solid ${Border};
//   padding-bottom: 8px;
// `;

// const InfoGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 10px;

//   @media (min-width: 480px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
// `;

// const InfoItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 2px;
// `;

// const Label = styled.span`
//   font-size: 0.75rem;
//   color: ${TextMuted};
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   font-weight: 700;
// `;

// const Value = styled.span`
//   font-size: 0.9rem;
//   color: ${Dark};
//   font-weight: 600;
//   word-break: break-word;
// `;

// const BadgeContainer = styled.div`
//   display: flex;
//   gap: 6px;
//   flex-wrap: wrap;
// `;

// const Badge = styled.span`
//   background: ${(props) => 
//     props.$variant === "danger" ? "rgba(239, 68, 68, 0.1)" : 
//     props.$variant === "success" ? "rgba(16, 185, 129, 0.1)" : 
//     props.$variant === "warning" ? "rgba(245, 158, 11, 0.1)" : 
//     "rgba(6, 182, 212, 0.1)"
//   };
//   color: ${(props) => 
//     props.$variant === "danger" ? Danger : 
//     props.$variant === "success" ? Success : 
//     props.$variant === "warning" ? Warning : 
//     Turquoise
//   };
//   padding: 4px 10px;
//   border-radius: 6px;
//   font-size: 0.8rem;
//   font-weight: 700;
// `;

// const ProductsList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
// `;

// const ProductItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   padding: 10px;
//   border: 1px solid ${Border};
//   border-radius: 8px;
//   background: #f8fafc;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     border-color: ${PrimaryColor};
//     box-shadow: 0 2px 10px rgba(236, 72, 153, 0.08);
//   }
// `;

// const ProductImage = styled.img`
//   width: 60px;
//   height: 60px;
//   object-fit: cover;
//   border-radius: 6px;
//   border: 1px solid ${Border};
//   flex-shrink: 0;

//   @media (min-width: 768px) {
//     width: 70px;
//     height: 70px;
//   }
// `;

// const ProductDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 3px;
//   flex: 1;
//   min-width: 0;
// `;

// const ProductName = styled.h4`
//   margin: 0;
//   font-size: 0.95rem;
//   font-weight: 700;
//   color: ${Dark};
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// const ProductMeta = styled.span`
//   font-size: 0.8rem;
//   color: ${TextMuted};
// `;

// const ProductPriceTag = styled.div`
//   text-align: right;
//   font-weight: 800;
//   font-size: 0.95rem;
//   color: ${PrimaryColor};
//   white-space: nowrap;
// `;

// const SummaryRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: 0.9rem;
//   color: ${TextMuted};
//   font-weight: 600;

//   &.total {
//     font-size: 1.15rem;
//     color: ${PrimaryColor};
//     font-weight: 800;
//     border-top: 2px solid ${Border};
//     padding-top: 10px;
//     margin-top: 4px;
//   }

//   &.discount {
//     color: ${Success};
//   }
// `;

// const LoadingContainer = styled.div`
//   padding: 60px;
//   text-align: center;
//   font-size: 1.1rem;
//   color: ${PrimaryColor};
//   font-weight: 700;
// `;

// export default function OrderDetailsPage() {
//   const router = useRouter();
//   const params = useParams();
//   const orderId = params?.id;

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);




  
// // ⭐ Review Modal State
//   const [reviewModalOpen, setReviewModalOpen] = useState(false);
//   const [selectedProductForReview, setSelectedProductForReview] = useState(null);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [submittingReview, setSubmittingReview] = useState(false);



//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       if (!orderId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const docRef = doc(db, "orders", orderId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setOrder({ id: docSnap.id, ...docSnap.data() });
//         } else {
//           Swal.fire("Not Found", "Order does not exist in the database.", "error");
//         }
//       } catch (error) {
//         console.error("Error fetching order details:", error);
//         Swal.fire("Error", "Failed to retrieve order details.", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);







//   // 📝 Function to open the review modal for a specific product
//   const handleOpenReviewModal = (item) => {
//     setSelectedProductForReview(item);
//     setRating(5);
//     setComment("");
//     setReviewModalOpen(true);
//   };

//   // 🚀 Function to submit the review and update the product document in Firestore
//   const handleSubmitReview = async () => {
//     if (!selectedProductForReview || !selectedProductForReview.id) {
//       Swal.fire("Error", "Product ID is missing.", "error");
//       return;
//     }

//     try {
//       setSubmittingReview(true);
//       const productRef = doc(db, "products", selectedProductForReview.id);
//       const productSnap = await getDoc(productRef);

//       const newReview = {
//         userName: account.name || "Anonymous Customer",
//         userEmail: account.email || "",
//         rating: Number(rating),
//         comment: comment.trim(),
//         createdAt: new Date().toISOString(),
//       };

//       if (productSnap.exists()) {
//         const productData = productSnap.data();
//         const existingReviews = productData.reviews || [];
//         const updatedReviews = [newReview, ...existingReviews];

//         // Calculate new average rating
//         const totalRatingSum = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
//         const averageRating = (totalRatingSum / updatedReviews.length).toFixed(1);

//         await updateDoc(productRef, {
//           reviews: updatedReviews,
//           rating: Number(averageRating),
//           reviewCount: updatedReviews.length,
//         });
//       } else {
//         // If product doc doesn't exist yet, initialize it
//         await setDoc(productRef, {
//           reviews: [newReview],
//           rating: Number(rating),
//           reviewCount: 1,
//         }, { merge: true });
//       }

//       Swal.fire("Success!", "Your review has been posted.", "success");
//       setReviewModalOpen(false);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       Swal.fire("Error", "Failed to submit review. Please try again.", "error");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };








//   if (loading) {
//     return <LoadingContainer>Loading complete order information...</LoadingContainer>;
//   }

//   if (!order) {
//     return (
//       <Container>
//         <LoadingContainer>
//           Order not found.
//           <br /><br />
//           <BackButton onClick={() => router.back()}>Go Back</BackButton>
//         </LoadingContainer>
//       </Container>
//     );
//   }

//   const account = order.accountInfo || {};
//   const address = order.deliveryAddress || {};
//   const items = order.items || [];
//   const currency = order.currency || "NGN";

//   const formattedDate = order.createdAt?.toDate 
//     ? new Date(order.createdAt.toDate()).toLocaleString() 
//     : "Recent";

//   return (
//     <Container>
//       {/* Header Banner */}
//       <HeaderBanner>
//         <TopRow>
//           <ColorfulTitle>{order.orderNumber || `Order #${order.id.slice(0, 8)}`}</ColorfulTitle>
//           <BackButton onClick={() => router.back()}>← Back to Orders</BackButton>
//         </TopRow>
//         <ColorfulSub>Placed on: {formattedDate}</ColorfulSub>
//       </HeaderBanner>

//       <GridContent>
//         {/* Left Column: Products & Totals */}
//         <Column>
//           {/* Products Card */}
//           <Card>
//             <CardTitle>Ordered Products ({items.length})</CardTitle>
//             <ProductsList>
//               {/* {items.map((item, index) => {
//                 const price = Number(item.price || item.amount || 0);
//                 const qty = Number(item.quantity || 1);
//                 const itemTotal = price * qty;
//                 const imgSrc = item.image || item.img || item.imageUrl || "https://placehold.co/100x100?text=Product";

//                 return (
//                   <ProductItem key={`${item.id || index}`} onClick={() => router.push(`/productdetail/${item.id}`)}>
//                     <ProductImage src={imgSrc} alt={item.name || item.title || "Product Image"} />
//                     <ProductDetails>
//                       <ProductName>{item.name || item.title || "Unnamed Product"}</ProductName>
//                       <p style={{fontSize:'0.6rem'}}>ID: {item.id}</p>
//                       <ProductMeta>Qty: {qty} × ₦{price.toLocaleString()}</ProductMeta>
//                     </ProductDetails>
//                     <ProductPriceTag>
//                       ₦{itemTotal.toLocaleString()}
//                     </ProductPriceTag>
//                   </ProductItem>
//                 );
//               })} */}

//               {items.map((item, index) => {
//                 const price = Number(item.price || item.amount || 0);
//                 const qty = Number(item.quantity || 1);
//                 const itemTotal = price * qty;
//                 const imgSrc = item.image || item.img || item.imageUrl || "https://placehold.co/100x100?text=Product";

//                 return (
//                   <ProductItem key={`${item.id || index}`}>
//                     <ProductImage 
//                       src={imgSrc} 
//                       alt={item.name || item.title || "Product Image"} 
//                       onClick={() => router.push(`/productdetail/${item.id}`)}
//                       style={{ cursor: "pointer" }}
//                     />
//                     <ProductDetails onClick={() => router.push(`/productdetail/${item.id}`)} style={{ cursor: "pointer" }}>
//                       <ProductName>{item.name || item.title || "Unnamed Product"}</ProductName>
//                       <p style={{fontSize:'0.6rem', margin: 0}}>ID: {item.id}</p>
//                       <ProductMeta>Qty: {qty} × ₦{price.toLocaleString()}</ProductMeta>
//                     </ProductDetails>
                    
//                     <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
//                       <ProductPriceTag>
//                         ₦{itemTotal.toLocaleString()}
//                       </ProductPriceTag>
//                       {item.id && (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleOpenReviewModal(item);
//                           }}
//                           style={{
//                             background: PrimaryColor,
//                             color: White,
//                             border: "none",
//                             padding: "4px 10px",
//                             borderRadius: "6px",
//                             fontSize: "0.75rem",
//                             fontWeight: "700",
//                             cursor: "pointer",
//                           }}
//                         >
//                           ⭐ Review
//                         </button>
//                       )}
//                     </div>
//                   </ProductItem>
//                 );
//               })}
//             </ProductsList>

//             <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
//               <SummaryRow>
//                 <span>Subtotal</span>
//                 <span>{currency} {Number(order.subtotal || 0).toLocaleString()}</span>
//               </SummaryRow>
//               <SummaryRow>
//                 <span>Delivery Fee</span>
//                 <span>{currency} {Number(order.deliveryFee || 0).toLocaleString()}</span>
//               </SummaryRow>
//               {order.discount > 0 && (
//                 <SummaryRow className="discount">
//                   <span>Discount ({order.promoCode || "Promo"})</span>
//                   <span>-{currency} {Number(order.discount || 0).toLocaleString()}</span>
//                 </SummaryRow>
//               )}
//               <SummaryRow className="total">
//                 <span>Final Total</span>
//                 <span>{currency} {Number(order.finalTotal || 0).toLocaleString()}</span>
//               </SummaryRow>
//             </div>
//           </Card>
//         </Column>

//         {/* Right Column: Status, Account & Delivery Address */}
//         <Column>
//           {/* Status Card */}
//           <Card>
//             <CardTitle>Order Status & Payment</CardTitle>
//             <InfoGrid>
//               <InfoItem>
//                 <Label>Order Status</Label>
//                 <BadgeContainer>
//                   <Badge $variant={
//                     order.orderStatus?.toLowerCase() === "delivered" ? "success" : 
//                     order.orderStatus?.toLowerCase() === "cancelled" ? "danger" : "warning"
//                   }>
//                     {order.orderStatus?.toUpperCase() || "PENDING"}
//                   </Badge>
//                 </BadgeContainer>
//               </InfoItem>
//               <InfoItem>
//                 <Label>Payment Status</Label>
//                 <BadgeContainer>
//                   <Badge $variant={
//                     order.paymentStatus?.toLowerCase() === "paid" ? "success" : "warning"
//                   }>
//                     {order.paymentStatus?.toUpperCase() || "PENDING"}
//                   </Badge>
//                 </BadgeContainer>
//               </InfoItem>
//             </InfoGrid>
//             <InfoItem style={{ marginTop: "8px" }}>
//               <Label>Payment Type</Label>
//               <Value>{order.paymentType || "ONLINE PAYMENT"}</Value>
//             </InfoItem>
//           </Card>

//           {/* Account Information Card */}
//           <Card>
//             <CardTitle>Customer Account</CardTitle>
//             <InfoGrid>
//               <InfoItem>
//                 <Label>Full Name</Label>
//                 <Value>{account.name || "Valued Customer"}</Value>
//               </InfoItem>
//               <InfoItem>
//                 <Label>Email Address</Label>
//                 <Value>{account.email || "Not provided"}</Value>
//               </InfoItem>
//               <InfoItem style={{ gridColumn: "span 2" }}>
//                 <Label>Phone Number</Label>
//                 <Value>{account.phone || "Not provided"}</Value>
//               </InfoItem>
//             </InfoGrid>
//           </Card>

//           {/* Delivery Address Card */}
//           <Card>
//             <CardTitle>Delivery Address</CardTitle>
//             <InfoGrid>
//               <InfoItem style={{ gridColumn: "span 2" }}>
//                 <Label>Recipient Name</Label>
//                 <Value>{address.fullName || account.name || "Valued Customer"}</Value>
//               </InfoItem>
//               <InfoItem style={{ gridColumn: "span 2" }}>
//                 <Label>Street Address</Label>
//                 <Value>{address.street || address.address || "Not provided"}</Value>
//               </InfoItem>
//               <InfoItem>
//                 <Label>City / State</Label>
//                 <Value>{address.city ? `${address.city}, ${address.state}` : "Not provided"}</Value>
//               </InfoItem>
//               <InfoItem>
//                 <Label>Postal Code / Country</Label>
//                 <Value>{address.country ? `${address.postalCode || ""} ${address.country}` : "Nigeria"}</Value>
//               </InfoItem>
//               <InfoItem style={{ gridColumn: "span 2" }}>
//                 <Label>Delivery Phone</Label>
//                 <Value>{address.phone || account.phone || "Not provided"}</Value>
//               </InfoItem>
//             </InfoGrid>
//           </Card>
//         </Column>
//       </GridContent>



//       {/* ⭐ Product Review Modal */}
//       {reviewModalOpen && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           background: "rgba(0,0,0,0.5)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           zIndex: 1000,
//           padding: "15px"
//         }}>
//           <div style={{
//             background: White,
//             borderRadius: "12px",
//             padding: "24px",
//             width: "100%",
//             maxWidth: "450px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "16px",
//             boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
//           }}>
//             <h3 style={{ margin: 0, color: PrimaryColor, fontSize: "1.2rem" }}>
//               Review: {selectedProductForReview?.name || selectedProductForReview?.title}
//             </h3>

//             <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//               <Label>Rating (1 to 5 Stars)</Label>
//               <select 
//                 value={rating} 
//                 onChange={(e) => setRating(Number(e.target.value))}
//                 style={{ padding: "10px", borderRadius: "6px", border: `1px solid ${Border}`, fontSize: "0.95rem" }}
//               >
//                 <option value={5}>⭐⭐⭐⭐⭐ (5 - Excellent)</option>
//                 <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
//                 <option value={3}>⭐⭐⭐ (3 - Good)</option>
//                 <option value={2}>⭐⭐ (2 - Fair)</option>
//                 <option value={1}>⭐ (1 - Poor)</option>
//               </select>
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//               <Label>Your Review Comment</Label>
//               <textarea 
//                 rows={4}
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 placeholder="Write your thoughts about this handcrafted bag..."
//                 style={{ padding: "10px", borderRadius: "6px", border: `1px solid ${Border}`, fontSize: "0.9rem", resize: "vertical" }}
//               />
//             </div>

//             <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
//               <button 
//                 onClick={() => setReviewModalOpen(false)}
//                 style={{ background: "#e2e8f0", color: Dark, border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "750", cursor: "pointer" }}
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleSubmitReview}
//                 disabled={submittingReview}
//                 style={{ background: PrimaryColor, color: White, border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "750", cursor: "pointer" }}
//               >
//                 {submittingReview ? "Submitting..." : "Post Review"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// }







"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useRouter, useParams } from "next/navigation";
import styled from "styled-components";
import Swal from "sweetalert2";

// 🎨 NEW THEME COLORS & GRADIENTS (Navy & Cyan Theme)
const PrimaryNavy = "#0B1B48";
const PrimaryCyan = "#00AEEF";
const Dark = "#0f172a";
const Border = "#cbd5e1";
const White = "#ffffff";
const TextMuted = "#475569";
const LightBg = "#f8fafc";
const ThemeGradient = "linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)";
const Danger = "#ef4444";
const Success = "#10b981";
const Warning = "#f59e0b";

// 🌟 Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${Dark};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 5px;
    gap: 20px;
  }
`;

const HeaderBanner = styled.div`
  background: ${ThemeGradient};
  color: ${White};
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 6px 20px rgba(11, 27, 72, 0.15);

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const ColorfulTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(90deg, #ffffff 0%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: ${White};
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${White};
    color: ${PrimaryNavy};
  }
`;

const ColorfulSub = styled.p`
  font-size: 0.9rem;
  margin: 0;
  color: #f1f5f9;
  opacity: 0.95;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const GridContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 900px) {
    grid-template-columns: 2fr 1fr;
    gap: 20px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  background: ${White};
  border-radius: 12px;
  padding: 16px;
  border: 1px solid ${Border};
  border-top: 4px solid ${PrimaryCyan};
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0;
  color: ${PrimaryNavy};
  border-bottom: 2px solid ${Border};
  padding-bottom: 8px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Label = styled.span`
  font-size: 0.75rem;
  color: ${TextMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700;
`;

const Value = styled.span`
  font-size: 0.9rem;
  color: ${Dark};
  font-weight: 600;
  word-break: break-word;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  background: ${(props) => 
    props.$variant === "danger" ? "rgba(239, 68, 68, 0.1)" : 
    props.$variant === "success" ? "rgba(16, 185, 129, 0.1)" : 
    props.$variant === "warning" ? "rgba(245, 158, 11, 0.1)" : 
    "rgba(0, 174, 239, 0.1)"
  };
  color: ${(props) => 
    props.$variant === "danger" ? Danger : 
    props.$variant === "success" ? Success : 
    props.$variant === "warning" ? Warning : 
    PrimaryCyan
  };
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
`;

const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border: 1px solid ${Border};
  border-radius: 8px;
  background: ${LightBg};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${PrimaryCyan};
    box-shadow: 0 2px 10px rgba(0, 174, 239, 0.08);
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid ${Border};
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  min-width: 0;
`;

const ProductName = styled.h4`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: ${Dark};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductMeta = styled.span`
  font-size: 0.8rem;
  color: ${TextMuted};
`;

const ProductPriceTag = styled.div`
  text-align: right;
  font-weight: 800;
  font-size: 0.95rem;
  color: ${PrimaryNavy};
  white-space: nowrap;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: ${TextMuted};
  font-weight: 600;

  &.total {
    font-size: 1.15rem;
    color: ${PrimaryNavy};
    font-weight: 800;
    border-top: 2px solid ${Border};
    padding-top: 10px;
    margin-top: 4px;
  }

  &.discount {
    color: ${Success};
  }
`;

const LoadingContainer = styled.div`
  padding: 60px;
  text-align: center;
  font-size: 1.1rem;
  color: ${PrimaryNavy};
  font-weight: 700;
`;

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⭐ Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProductForReview, setSelectedProductForReview] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() });
        } else {
          Swal.fire("Not Found", "Order does not exist in the database.", "error");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        Swal.fire("Error", "Failed to retrieve order details.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // 📝 Function to open the review modal for a specific product
  const handleOpenReviewModal = (item) => {
    setSelectedProductForReview(item);
    setRating(5);
    setComment("");
    setReviewModalOpen(true);
  };

  // 🚀 Function to submit the review and update the product document in Firestore
  const handleSubmitReview = async () => {
    if (!selectedProductForReview || !selectedProductForReview.id) {
      Swal.fire("Error", "Product ID is missing.", "error");
      return;
    }

    try {
      setSubmittingReview(true);
      const productRef = doc(db, "products", selectedProductForReview.id);
      const productSnap = await getDoc(productRef);

      const newReview = {
        userName: account.name || "Anonymous Customer",
        userEmail: account.email || "",
        rating: Number(rating),
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
      };

      if (productSnap.exists()) {
        const productData = productSnap.data();
        const existingReviews = productData.reviews || [];
        const updatedReviews = [newReview, ...existingReviews];

        // Calculate new average rating
        const totalRatingSum = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = (totalRatingSum / updatedReviews.length).toFixed(1);

        await updateDoc(productRef, {
          reviews: updatedReviews,
          rating: Number(averageRating),
          reviewCount: updatedReviews.length,
        });
      } else {
        // If product doc doesn't exist yet, initialize it
        await setDoc(productRef, {
          reviews: [newReview],
          rating: Number(rating),
          reviewCount: 1,
        }, { merge: true });
      }

      Swal.fire("Success!", "Your review has been posted.", "success");
      setReviewModalOpen(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire("Error", "Failed to submit review. Please try again.", "error");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return <LoadingContainer>Loading complete order information...</LoadingContainer>;
  }

  if (!order) {
    return (
      <Container>
        <LoadingContainer>
          Order not found.
          <br /><br />
          <BackButton onClick={() => router.back()}>Go Back</BackButton>
        </LoadingContainer>
      </Container>
    );
  }

  const account = order.accountInfo || {};
  const address = order.deliveryAddress || {};
  const items = order.items || [];
  const currency = order.currency || "NGN";

  const formattedDate = order.createdAt?.toDate 
    ? new Date(order.createdAt.toDate()).toLocaleString() 
    : "Recent";

  return (
    <Container>
      {/* Header Banner */}
      <HeaderBanner>
        <TopRow>
          <ColorfulTitle>{order.orderNumber || `Order #${order.id.slice(0, 8)}`}</ColorfulTitle>
          <BackButton onClick={() => router.back()}>← Back to Orders</BackButton>
        </TopRow>
        <ColorfulSub>Placed on: {formattedDate}</ColorfulSub>
      </HeaderBanner>

      <GridContent>
        {/* Left Column: Products & Totals */}
        <Column>
          {/* Products Card */}
          <Card>
            <CardTitle>Ordered Products ({items.length})</CardTitle>
            {/* <ProductsList>
              {items.map((item, index) => {
                const price = Number(item.price || item.amount || 0);
                const qty = Number(item.quantity || 1);
                const itemTotal = price * qty;
                const imgSrc = item.image || item.img || item.imageUrl || "https://placehold.co/100x100?text=Product";

                return (
                  <ProductItem key={`${item.id || index}`}>
                    <ProductImage 
                      src={imgSrc} 
                      alt={item.name || item.title || "Product Image"} 
                      onClick={() => router.push(`/productdetail/${item.id}`)}
                      style={{ cursor: "pointer" }}
                    />
                    <ProductDetails onClick={() => router.push(`/productdetail/${item.id}`)} style={{ cursor: "pointer" }}>
                      <ProductName>{item.name || item.title || "Unnamed Product"}</ProductName>
                      <p style={{fontSize:'0.6rem', margin: 0}}>ID: {item.id}</p>
                      <ProductMeta>Qty: {qty} × ₦{price.toLocaleString()}</ProductMeta>
                    </ProductDetails>
                    
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                      <ProductPriceTag>
                        ₦{itemTotal.toLocaleString()}
                      </ProductPriceTag>
                      {item.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenReviewModal(item);
                          }}
                          style={{
                            background: PrimaryCyan,
                            color: White,
                            border: "none",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          ⭐ Review
                        </button>
                      )}
                    </div>
                  </ProductItem>
                );
              })}
            </ProductsList> */}
<ProductsList>
  {items.map((item, index) => {
    const price = Number(item.price || item.amount || 0);
    const qty = Number(item.quantity || 1);
    const itemTotal = price * qty;
    const imgSrc = item.image || item.img || item.imageUrl || "https://placehold.co/100x100?text=Product";

    return (
      <ProductItem key={`${item.id || index}-${JSON.stringify(item.variations || {})}`}>
        <ProductImage 
          src={imgSrc} 
          alt={item.name || item.title || "Product Image"} 
          onClick={() => router.push(`/productdetail/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        <ProductDetails onClick={() => router.push(`/productdetail/${item.id}`)} style={{ cursor: "pointer" }}>
          <ProductName>{item.name || item.title || "Unnamed Product"}</ProductName>
          
          {/* 🌟 Display Saved Variations */}
          {item.variations && typeof item.variations === 'object' && Object.keys(item.variations).length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "4px" }}>
              {Object.entries(item.variations).map(([key, value]) => (
                <span 
                  key={key} 
                  style={{ 
                    fontSize: "0.65rem", 
                    color: "#475569", 
                    background: "#f1f5f9", 
                    padding: "1px 6px", 
                    borderRadius: "4px", 
                    fontWeight: "600", 
                    textTransform: "capitalize",
                    border: "1px solid #e2e8f0"
                  }}
                >
                  {key}: <strong style={{ color: "#0f172a" }}>{String(value)}</strong>
                </span>
              ))}
            </div>
          )}

          <p style={{fontSize:'0.6rem', margin: '2px 0 0 0', color: '#94a3b8'}}>ID: {item.id}</p>
          <ProductMeta>Qty: {qty} × ₦{price.toLocaleString()}</ProductMeta>
        </ProductDetails>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
          <ProductPriceTag>
            ₦{itemTotal.toLocaleString()}
          </ProductPriceTag>
          {item.id && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenReviewModal(item);
              }}
              style={{
                background: PrimaryCyan,
                color: White,
                border: "none",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              ⭐ Review
            </button>
          )}
        </div>
      </ProductItem>
    );
  })}
</ProductsList>


            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <SummaryRow>
                <span>Subtotal</span>
                <span>{currency} {Number(order.subtotal || 0).toLocaleString()}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Delivery Fee</span>
                <span>{currency} {Number(order.deliveryFee || 0).toLocaleString()}</span>
              </SummaryRow>
              {order.discount > 0 && (
                <SummaryRow className="discount">
                  <span>Discount ({order.promoCode || "Promo"})</span>
                  <span>-{currency} {Number(order.discount || 0).toLocaleString()}</span>
                </SummaryRow>
              )}
              <SummaryRow className="total">
                <span>Final Total</span>
                <span>{currency} {Number(order.finalTotal || 0).toLocaleString()}</span>
              </SummaryRow>
            </div>
          </Card>
        </Column>

        {/* Right Column: Status, Account & Delivery Address */}
        <Column>
          {/* Status Card */}
          <Card>
            <CardTitle>Order Status & Payment</CardTitle>
            <InfoGrid>
              <InfoItem>
                <Label>Order Status</Label>
                <BadgeContainer>
                  <Badge $variant={
                    order.orderStatus?.toLowerCase() === "delivered" ? "success" : 
                    order.orderStatus?.toLowerCase() === "cancelled" ? "danger" : "warning"
                  }>
                    {order.orderStatus?.toUpperCase() || "PENDING"}
                  </Badge>
                </BadgeContainer>
              </InfoItem>
              <InfoItem>
                <Label>Payment Status</Label>
                <BadgeContainer>
                  <Badge $variant={
                    order.paymentStatus?.toLowerCase() === "paid" ? "success" : "warning"
                  }>
                    {order.paymentStatus?.toUpperCase() || "PENDING"}
                  </Badge>
                </BadgeContainer>
              </InfoItem>
            </InfoGrid>
            <InfoItem style={{ marginTop: "8px" }}>
              <Label>Payment Type</Label>
              <Value>{order.paymentType || "ONLINE PAYMENT"}</Value>
            </InfoItem>
          </Card>

          {/* Account Information Card */}
          <Card>
            <CardTitle>Customer Account</CardTitle>
            <InfoGrid>
              <InfoItem>
                <Label>Full Name</Label>
                <Value>{account.name || "Valued Customer"}</Value>
              </InfoItem>
              <InfoItem>
                <Label>Email Address</Label>
                <Value>{account.email || "Not provided"}</Value>
              </InfoItem>
              <InfoItem style={{ gridColumn: "span 2" }}>
                <Label>Phone Number</Label>
                <Value>{account.phone || "Not provided"}</Value>
              </InfoItem>
            </InfoGrid>
          </Card>

          {/* Delivery Address Card */}
          <Card>
            <CardTitle>Delivery Address</CardTitle>
            <InfoGrid>
              <InfoItem style={{ gridColumn: "span 2" }}>
                <Label>Recipient Name</Label>
                <Value>{address.fullName || account.name || "Valued Customer"}</Value>
              </InfoItem>
              <InfoItem style={{ gridColumn: "span 2" }}>
                <Label>Street Address</Label>
                <Value>{address.street || address.address || "Not provided"}</Value>
              </InfoItem>
              <InfoItem>
                <Label>City / State</Label>
                <Value>{address.city ? `${address.city}, ${address.state}` : "Not provided"}</Value>
              </InfoItem>
              <InfoItem>
                <Label>Postal Code / Country</Label>
                <Value>{address.country ? `${address.postalCode || ""} ${address.country}` : "Nigeria"}</Value>
              </InfoItem>
              <InfoItem style={{ gridColumn: "span 2" }}>
                <Label>Delivery Phone</Label>
                <Value>{address.phone || account.phone || "Not provided"}</Value>
              </InfoItem>
            </InfoGrid>
          </Card>
        </Column>
      </GridContent>

      {/* ⭐ Product Review Modal */}
      {reviewModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "15px"
        }}>
          <div style={{
            background: White,
            borderRadius: "12px",
            padding: "24px",
            width: "100%",
            maxWidth: "450px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ margin: 0, color: PrimaryNavy, fontSize: "1.2rem" }}>
              Review: {selectedProductForReview?.name || selectedProductForReview?.title}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Label>Rating (1 to 5 Stars)</Label>
              <select 
                value={rating} 
                onChange={(e) => setRating(Number(e.target.value))}
                style={{ padding: "10px", borderRadius: "6px", border: `1px solid ${Border}`, fontSize: "0.95rem" }}
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                <option value={3}>⭐⭐⭐ (3 - Good)</option>
                <option value={2}>⭐⭐ (2 - Fair)</option>
                <option value={1}>⭐ (1 - Poor)</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Label>Your Review Comment</Label>
              <textarea 
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your thoughts about this product..."
                style={{ padding: "10px", borderRadius: "6px", border: `1px solid ${Border}`, fontSize: "0.9rem", resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
              <button 
                onClick={() => setReviewModalOpen(false)}
                style={{ background: "#e2e8f0", color: Dark, border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "750", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitReview}
                disabled={submittingReview}
                style={{ background: PrimaryCyan, color: White, border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "750", cursor: "pointer" }}
              >
                {submittingReview ? "Submitting..." : "Post Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}





