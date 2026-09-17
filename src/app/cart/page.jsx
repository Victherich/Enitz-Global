



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

// // --- KINGSWORD CRAFT THEME & STYLES ---
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
//     color: ${primaryPink};
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
//   box-shadow: 0 6px 20px rgba(236, 72, 153, 0.3);
//   transition: all 0.3s ease;
//   margin-top: 10px;

//   &:hover {
//     opacity: 0.92;
//     transform: translateY(-2px);
//     box-shadow: 0 8px 25px rgba(236, 72, 153, 0.45);
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
//   box-shadow: 0 6px 20px rgba(236, 72, 153, 0.3);
//   transition: all 0.3s ease;
//   margin-top: 8px;

//   &:hover {
//     opacity: 0.92;
//     transform: translateY(-2px);
//     box-shadow: 0 8px 25px rgba(236, 72, 153, 0.45);
//   }
// `;

// export default function CartPage() {
//   const { cart, updateQuantity, removeFromCart, clearCart, cartTotalItems, cartSubtotal } = useCart();
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);

//   const total = cartSubtotal;

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
//         confirmButtonColor: "#ec4899",
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
//             const itemPrice = item.price || item.amount || 0;
//             return (
//               <CartCard key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
//                 <ItemImage src={item.image || "https://placehold.co/90x90?text=No+Image"} alt={item.name} />
                
//                 <ItemDetails>
//                   <ItemName>{item.name}</ItemName>
//                   <ItemPrice>₦{itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ItemPrice>
//                 </ItemDetails>

//                 <QuantityWrapper>
//                   <QtyBtn onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, -1)}>-</QtyBtn>
//                   <QtyDisplay>{item.quantity}</QtyDisplay>
//                   <QtyBtn onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, 1)}>+</QtyBtn>
//                 </QuantityWrapper>

//                 <ItemTotal>₦{(itemPrice * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ItemTotal>

//                 <RemoveButton onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)} title="Remove item">
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
//             <span>₦{cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//           </SummaryRow>

//           <Divider />

//           <SummaryRow $total>
//             <span>Total</span>
//             <span>₦{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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

import React, { useState, useEffect, use } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';
import Swal from 'sweetalert2';
import { auth, db } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

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
  padding: 24px 16px 60px 16px;
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
  margin-bottom: 24px;
  border-bottom: 2px solid ${borderColor};
  padding-bottom: 12px;
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
  gap: 32px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const CartCard = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr auto auto auto;
  align-items: center;
  gap: 16px;
  background: ${softBg};
  border: 1px solid ${borderColor};
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 70px 1fr;
    grid-template-rows: auto auto auto;
    gap: 10px;
    padding: 12px;
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
  gap: 4px;
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
  margin-top: 4px;
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
  padding: 24px;
  height: fit-content;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  width: 100%;
  box-sizing: border-box;
`;

const SummaryTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${textMain};
  margin-bottom: 20px;
  margin-top: 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: ${(props) => (props.$total ? '1.15rem' : '0.95rem')};
  font-weight: ${(props) => (props.$total ? '800' : '600')};
  color: ${(props) => (props.$total ? textMain : textMuted)};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${borderColor};
  margin: 16px 0;
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

const EmptyContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
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
  margin-top: 8px;

  &:hover {
    opacity: 0.92;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 174, 239, 0.45);
  }
`;

// export default function CartPage() {
//   const { cart, updateQuantity, removeFromCart, clearCart, cartTotalItems, cartSubtotal } = useCart();
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);

//   const total = cartSubtotal;

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

//   return (
//     <PageWrapper>
//       <CartHeader>
//         <Title>Shopping Cart</Title>
//         <ItemCount>{cartTotalItems} items</ItemCount>
//       </CartHeader>

//       <CartContent>
//         {/* Items List */}
//         {/* <ItemsList>
//           {cart.map((item) => {
//             const itemPrice = item.price || item.amount || 0;
//             return (
//               <CartCard key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
//                 <ItemImage src={item.image || "https://placehold.co/90x90?text=No+Image"} alt={item.name} />
                
//                 <ItemDetails>
//                   <ItemName>{item.name}</ItemName>
//                   <ItemPrice>₦{itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ItemPrice>
//                 </ItemDetails>

//                 <QuantityWrapper>
//                   <QtyBtn onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, -1)}>-</QtyBtn>
//                   <QtyDisplay>{item.quantity}</QtyDisplay>
//                   <QtyBtn onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, 1)}>+</QtyBtn>
//                 </QuantityWrapper>

//                 <ItemTotal>₦{(itemPrice * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ItemTotal>

//                 <RemoveButton onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)} title="Remove item">
//                   &times;
//                 </RemoveButton>
//               </CartCard>
//             );
//           })}

//           <ClearCartButton onClick={clearCart}>Clear Cart</ClearCartButton>
//         </ItemsList> */}

//      {/* Items List */}
//         <ItemsList>
//           {cart.map((item) => {
//             const itemPrice = item.price || item.amount || 0;
//             return (
//               <CartCard key={`${item.id}-${JSON.stringify(item.variations)}`}>
//                 <ItemImage src={item.image || "https://placehold.co/90x90?text=No+Image"} alt={item.name} />
                
//                 <ItemDetails>
//                   <ItemName>{item.name}</ItemName>
                  
//                   {/* 🌟 Dynamically display object variations */}
//                   {item.variations && typeof item.variations === 'object' && Object.keys(item.variations).length > 0 && (
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px", marginBottom: "4px" }}>
//                       {Object.entries(item.variations).map(([key, value]) => (
//                         <span key={key} style={{ fontSize: "0.75rem", color: textMuted, background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", fontWeight: "600", textTransform: "capitalize" }}>
//                           {key}: <strong style={{ color: textMain }}>{String(value)}</strong>
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   <ItemPrice>₦{itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ItemPrice>
//                 </ItemDetails>

//                 <QuantityWrapper>
//                   <QtyBtn onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, -1)}>-</QtyBtn>
//                   <QtyDisplay>{item.quantity}</QtyDisplay>
//                   <QtyBtn onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, 1)}>+</QtyBtn>
//                 </QuantityWrapper>

//                 <ItemTotal>₦{(itemPrice * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ItemTotal>

//                 <RemoveButton onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)} title="Remove item">
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
//             <span>₦{cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//           </SummaryRow>

//           <Divider />

//           <SummaryRow $total>
//             <span>Total</span>
//             <span>₦{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//           </SummaryRow>

//           <CheckoutButton onClick={handleCheckout}>
//             Proceed to Checkout
//           </CheckoutButton>
//         </SummaryCard>
//       </CartContent>
//     </PageWrapper>
//   );
// }






export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotalItems, cartSubtotal } = useCart();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  // 🌟 Helper function to compute active price (Tiered vs Single) based on item quantity
  const getEffectiveUnitPrice = (item) => {
    const basePrice = Number(item.basePrice || item.price || item.amount) || 0;
    
    // If no tiered pricing exists, return standard base price
    if (!item.tieredPricing || !Array.isArray(item.tieredPricing) || item.tieredPricing.length === 0) {
      return basePrice;
    }

    const currentQty = Number(item.quantity) || 1;

    // Find matching tier range
    const matchedTier = item.tieredPricing.find((tier) => {
      const min = Number(tier.minQty) || 0;
      const max = (tier.maxQty !== undefined && tier.maxQty !== null && tier.maxQty !== '') 
        ? Number(tier.maxQty) 
        : Infinity;
      
      return currentQty >= min && currentQty <= max;
    });

    return matchedTier ? Number(matchedTier.price) : basePrice;
  };

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

  // 🌟 Compute dynamic subtotal incorporating real-time tiered pricing
  const dynamicCartSubtotal = cart.reduce((acc, item) => {
    const unitPrice = getEffectiveUnitPrice(item);
    return acc + (unitPrice * (Number(item.quantity) || 1));
  }, 0);

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
            const itemPrice = getEffectiveUnitPrice(item);
            const itemTotalCost = itemPrice * (Number(item.quantity) || 1);

            return (
              <CartCard key={`${item.id}-${JSON.stringify(item.variations)}`}>
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

                  {/* Real-time active price per unit */}
                  <ItemPrice>
                    ₦{itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per unit
                  </ItemPrice>
                </ItemDetails>

                {/* 🌟 Fixed: Pass item.id and delta (+1 / -1) correctly */}
                {/* <QuantityWrapper>
                  <QtyBtn onClick={() => updateQuantity(item.id, -1)}>-</QtyBtn>
                  <QtyDisplay>{item.quantity}</QtyDisplay>
                  <QtyBtn onClick={() => updateQuantity(item.id, 1)}>+</QtyBtn>
                </QuantityWrapper> */}

                
                 <QuantityWrapper>
                   <QtyBtn onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, -1)}>-</QtyBtn>
                   <QtyDisplay>{item.quantity}</QtyDisplay>
                   <QtyBtn onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, 1)}>+</QtyBtn>
                 </QuantityWrapper>

                <ItemTotal>₦{itemTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</ItemTotal>

                <RemoveButton onClick={() => removeFromCart(item.id)} title="Remove item">
                  &times;
                </RemoveButton>
              </CartCard>
            );
          })}

          <ClearCartButton onClick={clearCart}>Clear Cart</ClearCartButton>
        </ItemsList>

        {/* Order Summary */}
        <SummaryCard>
          <SummaryTitle>Cart Summary</SummaryTitle>
          
          <SummaryRow>
            <span>Subtotal</span>
            <span>₦{dynamicCartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </SummaryRow>

          <Divider />

          <SummaryRow $total>
            <span>Total</span>
            <span>₦{dynamicCartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </SummaryRow>

          <CheckoutButton onClick={handleCheckout}>
            Proceed to Checkout
          </CheckoutButton>
        </SummaryCard>
      </CartContent>
    </PageWrapper>
  );
}