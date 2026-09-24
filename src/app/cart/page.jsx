
// 'use client';

// import React, { useState, useEffect, use } from 'react';
// import styled, { keyframes } from 'styled-components';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/components/CartContext';
// import Swal from 'sweetalert2';
// import { auth, db } from '@/firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';

// // --- ENITZ OFFICIAL BRAND THEME & STYLES ---
// const primaryNavy = '#0B1B48';
// const primaryCyan = '#00AEEF';
// const brandGradient = 'linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)';
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

// const PageWrapper = styled.div`
//   font-family: inherit;
//   color: ${textMain};
//   background: ${cardBg};
//   min-height: 100vh;
//   padding: 24px 16px 60px 16px;
//   box-sizing: border-box;
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   overflow-x: hidden;
// `;

// const CartHeader = styled.div`
//   display: flex;
//   align-items: baseline;
//   justify-content: space-between;
//   margin-bottom: 24px;
//   border-bottom: 2px solid ${borderColor};
//   padding-bottom: 12px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const Title = styled.h1`
//   font-size: clamp(1.5rem, 2vw, 2rem);
//   font-weight: 800;
//   color: ${textMain};
//   margin: 0;
// `;

// const ItemCount = styled.span`
//   color: ${textMuted};
//   font-size: 0.95rem;
//   font-weight: 600;
// `;

// const CartContent = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 380px;
//   gap: 32px;
//   width: 100%;
//   box-sizing: border-box;

//   @media (max-width: 968px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const ItemsList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const CartCard = styled.div`
//   display: grid;
//   grid-template-columns: 90px 1fr auto auto auto;
//   align-items: center;
//   gap: 16px;
//   background: ${softBg};
//   border: 1px solid ${borderColor};
//   border-radius: 16px;
//   padding: 16px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
//   box-sizing: border-box;
//   width: 100%;

//   @media (max-width: 600px) {
//     grid-template-columns: 70px 1fr;
//     grid-template-rows: auto auto auto;
//     gap: 10px;
//     padding: 12px;
//   }
// `;

// const ItemImage = styled.img`
//   width: 90px;
//   height: 90px;
//   object-fit: cover;
//   border-radius: 12px;
//   border: 1px solid ${borderColor};

//   @media (max-width: 600px) {
//     width: 70px;
//     height: 70px;
//     grid-row: span 2;
//   }
// `;

// const ItemDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
//   overflow: hidden;
// `;

// const ItemName = styled.h3`
//   font-size: 1rem;
//   font-weight: 700;
//   color: ${textMain};
//   margin: 0;
//   word-break: break-word;
// `;

// const ItemPrice = styled.div`
//   font-weight: 700;
//   color: ${textMain};
//   margin-top: 4px;
//   font-size: 0.95rem;
// `;

// const QuantityWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   border: 1px solid ${borderColor};
//   border-radius: 8px;
//   overflow: hidden;
//   background: ${cardBg};
//   width: fit-content;

//   @media (max-width: 600px) {
//     grid-column: 2;
//   }
// `;

// const QtyBtn = styled.button`
//   background: transparent;
//   border: none;
//   padding: 6px 12px;
//   cursor: pointer;
//   font-weight: 700;
//   color: ${textMain};
//   transition: background 0.2s;
//   &:hover {
//     background: ${softBg};
//     color: ${primaryCyan};
//   }
// `;

// const QtyDisplay = styled.span`
//   padding: 0 10px;
//   font-size: 0.9rem;
//   font-weight: 700;
//   color: ${textMain};
// `;

// const ItemTotal = styled.div`
//   font-weight: 800;
//   font-size: 1.05rem;
//   background: ${brandGradient};
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   min-width: 70px;
//   text-align: right;

//   @media (max-width: 600px) {
//     text-align: left;
//   }
// `;

// const RemoveButton = styled.button`
//   background: transparent;
//   border: none;
//   font-size: 1.4rem;
//   color: ${textMuted};
//   cursor: pointer;
//   padding: 4px 8px;
//   border-radius: 6px;
//   transition: all 0.2s;
//   &:hover {
//     color: ${dangerRed};
//     background: #fef2f2;
//   }
// `;

// const ClearCartButton = styled.button`
//   align-self: flex-start;
//   background: transparent;
//   border: 1px solid ${dangerRed};
//   color: ${dangerRed};
//   padding: 10px 18px;
//   border-radius: 10px;
//   font-weight: 600;
//   cursor: pointer;
//   margin-top: 10px;
//   transition: all 0.2s;
//   &:hover {
//     background: ${dangerRed};
//     color: #fff;
//   }
// `;

// const SummaryCard = styled.div`
//   background: ${softBg};
//   border: 1px solid ${borderColor};
//   border-radius: 20px;
//   padding: 24px;
//   height: fit-content;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
//   width: 100%;
//   box-sizing: border-box;
// `;

// const SummaryTitle = styled.h2`
//   font-size: 1.25rem;
//   font-weight: 800;
//   color: ${textMain};
//   margin-bottom: 20px;
//   margin-top: 0;
// `;

// const SummaryRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 12px;
//   font-size: ${(props) => (props.$total ? '1.15rem' : '0.95rem')};
//   font-weight: ${(props) => (props.$total ? '800' : '600')};
//   color: ${(props) => (props.$total ? textMain : textMuted)};
// `;

// const Divider = styled.hr`
//   border: none;
//   border-top: 1px solid ${borderColor};
//   margin: 16px 0;
// `;

// const CheckoutButton = styled.button`
//   width: 100%;
//   background: ${brandGradient};
//   color: #fff;
//   border: none;
//   padding: 14px;
//   border-radius: 12px;
//   font-weight: 700;
//   font-size: 1rem;
//   cursor: pointer;
//   box-shadow: 0 6px 20px rgba(0, 174, 239, 0.3);
//   transition: all 0.3s ease;
//   margin-top: 10px;

//   &:hover {
//     opacity: 0.92;
//     transform: translateY(-2px);
//     box-shadow: 0 8px 25px rgba(0, 174, 239, 0.45);
//   }
// `;

// const EmptyContainer = styled.div`
//   text-align: center;
//   padding: 80px 20px;
//   max-width: 500px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 16px;
// `;

// const EmptyIcon = styled.div`
//   font-size: 4rem;
//   animation: ${floatAnimation} 4s ease-in-out infinite;
// `;

// const EmptyTitle = styled.h2`
//   font-size: 1.8rem;
//   color: ${textMain};
//   margin: 0;
//   font-weight: 800;
// `;

// const EmptyText = styled.p`
//   color: ${textMuted};
//   margin: 0;
//   font-size: 1rem;
// `;

// const ShopNowButton = styled(Link)`
//   display: inline-block;
//   background: ${brandGradient};
//   color: #fff;
//   padding: 12px 24px;
//   border-radius: 12px;
//   font-weight: 700;
//   text-decoration: none;
//   box-shadow: 0 6px 20px rgba(0, 174, 239, 0.3);
//   transition: all 0.3s ease;
//   margin-top: 8px;

//   &:hover {
//     opacity: 0.92;
//     transform: translateY(-2px);
//     box-shadow: 0 8px 25px rgba(0, 174, 239, 0.45);
//   }
// `;




// export default function CartPage() {
//   const { cart, updateQuantity, removeFromCart, clearCart, cartTotalItems, cartSubtotal } = useCart();
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);

//   // 🌟 Helper function to compute active price (Tiered vs Single) based on item quantity
//   const getEffectiveUnitPrice = (item) => {
//     const basePrice = Number(item.basePrice || item.price || item.amount) || 0;
    
//     // If no tiered pricing exists, return standard base price
//     if (!item.tieredPricing || !Array.isArray(item.tieredPricing) || item.tieredPricing.length === 0) {
//       return basePrice;
//     }

//     const currentQty = Number(item.quantity) || 1;

//     // Find matching tier range
//     const matchedTier = item.tieredPricing.find((tier) => {
//       const min = Number(tier.minQty) || 0;
//       const max = (tier.maxQty !== undefined && tier.maxQty !== null && tier.maxQty !== '') 
//         ? Number(tier.maxQty) 
//         : Infinity;
      
//       return currentQty >= min && currentQty <= max;
//     });

//     return matchedTier ? Number(matchedTier.price) : basePrice;
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
//       if (authUser) {
//         setUser(authUser);
//         try {
//           const userRef = doc(db, "users", authUser.uid);
//           const userSnap = await getDoc(userRef);

//           if (userSnap.exists()) {
//             setUserData(userSnap.data());
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       } else {
//         setUser(null);
//         setUserData(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleCheckout = () => {
//     if (user) {
//       router.push('/dashboard/addressmanager');
//     } else {
//       Swal.fire({
//         title: "Please Login to Proceed",
//         text: "You need to be logged in to complete your checkout. If you don't have an account, please sign up.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Login / Sign Up",
//         cancelButtonText: "Cancel",
//         confirmButtonColor: "#00AEEF",
//         cancelButtonColor: "#475569",
//         background: "#ffffff",
//         color: "#0f172a"
//       }).then((result) => {
//         if (result.isConfirmed) {
//           router.push('/login');
//         }
//       });
//     }
//   };

//   if (cart.length === 0) {
//     return (
//       <PageWrapper>
//         <EmptyContainer>
//           <EmptyIcon>🛒</EmptyIcon>
//           <EmptyTitle>Your cart is empty</EmptyTitle>
//           <EmptyText>Discover our signature products and add your favorites to the cart.</EmptyText>
//           <ShopNowButton href="/store">Continue Shopping</ShopNowButton>
//         </EmptyContainer>
//       </PageWrapper>
//     );
//   }

//   // 🌟 Compute dynamic subtotal incorporating real-time tiered pricing
//   const dynamicCartSubtotal = cart.reduce((acc, item) => {
//     const unitPrice = getEffectiveUnitPrice(item);
//     return acc + (unitPrice * (Number(item.quantity) || 1));
//   }, 0);

//   return (
//     <PageWrapper>
//       <CartHeader>
//         <Title>Shopping Cart</Title>
//         <ItemCount>{cartTotalItems} items</ItemCount>
//       </CartHeader>

//       <CartContent>
//         {/* Items List */}
//         <ItemsList>
//           {cart.map((item) => {
//             const itemPrice = getEffectiveUnitPrice(item);
//             const itemTotalCost = itemPrice * (Number(item.quantity) || 1);

//             return (
//               <CartCard key={`${item.id}-${JSON.stringify(item.variations)}`}>
//                 <ItemImage src={item.image || "https://placehold.co/90x90?text=No+Image"} alt={item.name} />
                
//                 <ItemDetails>
//                   <ItemName>{item.name}</ItemName>
                  
//                   {item.variations && typeof item.variations === 'object' && Object.keys(item.variations).length > 0 && (
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px", marginBottom: "4px" }}>
//                       {Object.entries(item.variations).map(([key, value]) => (
//                         <span key={key} style={{ fontSize: "0.75rem", color: textMuted, background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", fontWeight: "600", textTransform: "capitalize" }}>
//                           {key}: <strong style={{ color: textMain }}>{String(value)}</strong>
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {/* Real-time active price per unit */}
//                   <ItemPrice>
//                     ₦{itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per unit
//                   </ItemPrice>
//                 </ItemDetails>
                
//                  <QuantityWrapper>
//                    <QtyBtn onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, -1)}>-</QtyBtn>
//                    <QtyDisplay>{item.quantity}</QtyDisplay>
//                    <QtyBtn onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, 1)}>+</QtyBtn>
//                  </QuantityWrapper>

//                 <ItemTotal>₦{itemTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ItemTotal>

//                 <RemoveButton onClick={() => removeFromCart(item.id)} title="Remove item">
//                   &times;
//                 </RemoveButton>
//               </CartCard>
//             );
//           })}

//           <ClearCartButton onClick={clearCart}>Clear Cart</ClearCartButton>
//         </ItemsList>

//         {/* Order Summary */}
//         <SummaryCard>
//           <SummaryTitle>Cart Summary</SummaryTitle>
          
//           <SummaryRow>
//             <span>Subtotal</span>
//             <span>₦{dynamicCartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//           </SummaryRow>

//           <Divider />

//           <SummaryRow $total>
//             <span>Total</span>
//             <span>₦{dynamicCartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//           </SummaryRow>

//           <CheckoutButton onClick={handleCheckout}>
//             Proceed to Checkout
//           </CheckoutButton>
//         </SummaryCard>
//       </CartContent>
//     </PageWrapper>
//   );
// }







'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';
import Swal from 'sweetalert2';
import { auth, db } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// --- ENITZ OFFICIAL BRAND THEME & STYLES ---
const primaryNavy = '#0B1B48';
const primaryCyan = '#00AEEF';
const brandGradient = 'linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)';
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

const PageWrapper = styled.div`
  font-family: inherit;
  color: ${textMain};
  background: ${cardBg};
  min-height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: hidden;
`;

const CartHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 2px solid ${borderColor};
  padding-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 800;
  color: ${textMain};
  margin: 0;
`;

const ItemCount = styled.span`
  color: ${textMuted};
  font-size: 0.95rem;
  font-weight: 600;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const CartCard = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr auto auto auto;
  align-items: center;
  gap: 10px;
  background: ${softBg};
  border: 1px solid ${borderColor};
  border-radius: 16px;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 70px 1fr;
    grid-template-rows: auto auto auto;
    gap: 10px;
    padding: 10px;
  }
`;

const ItemImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid ${borderColor};

  @media (max-width: 600px) {
    width: 70px;
    height: 70px;
    grid-row: span 2;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
`;

const ItemName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${textMain};
  margin: 0;
  word-break: break-word;
`;

const ItemPrice = styled.div`
  font-weight: 700;
  color: ${textMain};
  margin-top: 10px;
  font-size: 0.95rem;
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${borderColor};
  border-radius: 8px;
  overflow: hidden;
  background: ${cardBg};
  width: fit-content;

  @media (max-width: 600px) {
    grid-column: 2;
  }
`;

const QtyBtn = styled.button`
  background: transparent;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 700;
  color: ${textMain};
  transition: background 0.2s;
  &:hover {
    background: ${softBg};
    color: ${primaryCyan};
  }
`;

const QtyDisplay = styled.span`
  padding: 0 10px;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${textMain};
`;

const ItemTotal = styled.div`
  font-weight: 800;
  font-size: 1.05rem;
  background: ${brandGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  min-width: 70px;
  text-align: right;

  @media (max-width: 600px) {
    text-align: left;
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.4rem;
  color: ${textMuted};
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s;
  &:hover {
    color: ${dangerRed};
    background: #fef2f2;
  }
`;

const ClearCartButton = styled.button`
  align-self: flex-start;
  background: transparent;
  border: 1px solid ${dangerRed};
  color: ${dangerRed};
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s;
  &:hover {
    background: ${dangerRed};
    color: #fff;
  }
`;

const SummaryCard = styled.div`
  background: ${softBg};
  border: 1px solid ${borderColor};
  border-radius: 20px;
  padding: 10px;
  height: fit-content;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  width: 100%;
  box-sizing: border-box;
`;

const SummaryTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${textMain};
  margin-bottom: 10px;
  margin-top: 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: ${(props) => (props.$total ? '1.15rem' : '0.95rem')};
  font-weight: ${(props) => (props.$total ? '800' : '600')};
  color: ${(props) => (props.discount ? '#2e7d32' : props.$total ? textMain : textMuted)};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${borderColor};
  margin: 10px 0;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: ${brandGradient};
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 174, 239, 0.3);
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    opacity: 0.92;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 174, 239, 0.45);
  }
`;

const PromoForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const PromoInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid ${borderColor};
  border-radius: 8px;
  font-size: 0.9rem;
  background: ${cardBg};
  color: ${textMain};
  &:focus {
    outline: none;
    border-color: ${primaryCyan};
  }
`;

const ApplyButton = styled.button`
  background: ${textMain};
  color: #fff;
  border: none;
  padding: 0 14px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background: ${primaryNavy};
  }
`;

const TextButton = styled.button`
  background: transparent;
  color: ${dangerRed};
  border: none;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const EmptyContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  animation: ${floatAnimation} 4s ease-in-out infinite;
`;

const EmptyTitle = styled.h2`
  font-size: 1.8rem;
  color: ${textMain};
  margin: 0;
  font-weight: 800;
`;

const EmptyText = styled.p`
  color: ${textMuted};
  margin: 0;
  font-size: 1rem;
`;

const ShopNowButton = styled(Link)`
  display: inline-block;
  background: ${brandGradient};
  color: #fff;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(0, 174, 239, 0.3);
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    opacity: 0.92;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 174, 239, 0.45);
  }
`;

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotalItems, cartSubtotal, getItemEffectivePrice } = useCart();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  // Promo code state
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Load any previously applied promo from localStorage
  useEffect(() => {
    try {
      const savedDiscount = localStorage.getItem('appliedDiscount');
      const savedPromoName = localStorage.getItem('appliedPromoName');
      if (savedDiscount) setDiscount(Number(savedDiscount));
      if (savedPromoName) setAppliedPromo(savedPromoName);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        try {
          const userRef = doc(db, "users", authUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Clear promo if cart becomes empty
  useEffect(() => {
    if (cart.length === 0) {
      handleRemovePromo();
    }
  }, [cart.length]);

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;

    try {
      const codeFormatted = promoCodeInput.trim().toUpperCase();
      const q = query(collection(db, "promoCodes"), where("code", "==", codeFormatted));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Swal.fire('Invalid Code', 'The promo code entered does not exist or has expired.', 'error');
        return;
      }

      const promoData = querySnapshot.docs[0].data();
      let calculatedDiscount = 0;

      if (promoData.discountType === 'percentage') {
        calculatedDiscount = (cartSubtotal * promoData.discountValue) / 100;
      } else {
        calculatedDiscount = promoData.discountValue;
      }

      const promoDescription = `${promoData.code} (${promoData.discountType === 'percentage' ? `${promoData.discountValue}%` : `₦${promoData.discountValue.toLocaleString()}`} Off)`;

      setDiscount(calculatedDiscount);
      setAppliedPromo(promoDescription);
      
      localStorage.setItem('appliedDiscount', calculatedDiscount.toString());
      localStorage.setItem('appliedPromoName', promoDescription);

      Swal.fire('Success!', `Promo code "${promoData.code}" applied successfully!`, 'success');
      setPromoCodeInput('');
    } catch (error) {
      console.error("Error applying promo code:", error);
      Swal.fire('Error', 'Could not apply promo code. Please try again.', 'error');
    }
  };

  const handleRemovePromo = () => {
    setDiscount(0);
    setAppliedPromo(null);
    localStorage.removeItem('appliedDiscount');
    localStorage.removeItem('appliedPromoName');
  };

  const handleCheckout = () => {
    if (user) {
      router.push('/dashboard/addressmanager');
    } else {
      Swal.fire({
        title: "Please Login to Proceed",
        text: "You need to be logged in to complete your checkout. If you don't have an account, please sign up.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login / Sign Up",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#00AEEF",
        cancelButtonColor: "#475569",
        background: "#ffffff",
        color: "#0f172a"
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
    }
  };

  if (cart.length === 0) {
    return (
      <PageWrapper>
        <EmptyContainer>
          <EmptyIcon>🛒</EmptyIcon>
          <EmptyTitle>Your cart is empty</EmptyTitle>
          <EmptyText>Discover our signature products and add your favorites to the cart.</EmptyText>
          <ShopNowButton href="/store">Continue Shopping</ShopNowButton>
        </EmptyContainer>
      </PageWrapper>
    );
  }

  const finalCartTotal = Math.max(0, cartSubtotal - discount);

  return (
    <PageWrapper>
      <CartHeader>
        <Title>Shopping Cart</Title>
        <ItemCount>{cartTotalItems} items</ItemCount>
      </CartHeader>

      <CartContent>
        {/* Items List */}
        <ItemsList>
          {cart.map((item) => {
            const itemPrice = getItemEffectivePrice(item);
            const itemTotalCost = itemPrice * (Number(item.quantity) || 1);

            return (
              <CartCard key={`${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}>
                <ItemImage src={item.image || "https://placehold.co/90x90?text=No+Image"} alt={item.name} />
                
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  
                  {item.variations && typeof item.variations === 'object' && Object.keys(item.variations).length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px", marginBottom: "4px" }}>
                      {Object.entries(item.variations).map(([key, value]) => (
                        <span key={key} style={{ fontSize: "0.75rem", color: textMuted, background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", fontWeight: "600", textTransform: "capitalize" }}>
                          {key}: <strong style={{ color: textMain }}>{String(value)}</strong>
                        </span>
                      ))}
                    </div>
                  )}

                  <ItemPrice>
                    ₦{itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per unit
                  </ItemPrice>
                </ItemDetails>
                
                 <QuantityWrapper>
                   <QtyBtn onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, -1)}>-</QtyBtn>
                   <QtyDisplay>{item.quantity}</QtyDisplay>
                   <QtyBtn onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, 1)}>+</QtyBtn>
                 </QuantityWrapper>

                <ItemTotal>₦{itemTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ItemTotal>

                <RemoveButton onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)} title="Remove item">
                  &times;
                </RemoveButton>
              </CartCard>
            );
          })}

          <ClearCartButton onClick={() => { clearCart(); handleRemovePromo(); }}>Clear Cart</ClearCartButton>
        </ItemsList>

        {/* Order Summary Card */}
        <SummaryCard>
          <SummaryTitle>Cart Summary</SummaryTitle>
          
          <SummaryRow>
            <span>Subtotal</span>
            <span>₦{cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </SummaryRow>

          {discount > 0 && (
            <SummaryRow discount>
              <span>Discount ({appliedPromo})</span>
              <span>-₦{discount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </SummaryRow>
          )}

          <Divider />

          <SummaryRow $total>
            <span>Total</span>
            <span>₦{finalCartTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </SummaryRow>

          {/* Promo Code Input Box Form */}
          {!appliedPromo ? (
            <PromoForm onSubmit={handleApplyPromo}>
              <PromoInput 
                type="text" 
                placeholder="Enter promo code" 
                value={promoCodeInput}
                onChange={(e) => setPromoCodeInput(e.target.value)}
              />
              <ApplyButton type="submit">Apply</ApplyButton>
            </PromoForm>
          ) : (
            <div style={{ margin: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "8px 12px", borderRadius: "8px" }}>
              <span style={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: "600" }}>🎟️ {appliedPromo}</span>
              <TextButton type="button" onClick={handleRemovePromo}>Remove</TextButton>
            </div>
          )}

          <CheckoutButton onClick={handleCheckout}>
            Proceed to Checkout
          </CheckoutButton>
        </SummaryCard>
      </CartContent>
    </PageWrapper>
  );
}