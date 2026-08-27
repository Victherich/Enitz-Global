


// "use client";

// import { useEffect, useState } from "react";
// import { auth, db } from "@/firebaseConfig";

// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import styled from "styled-components";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// // 🎨 KINGSWORD BAG CRAFT THEME COLORS (Vibrant luxury palette)
// const ThemePrimary = "#ec4899"; // Pink accent
// const ThemeSecondary = "#06b6d4"; // Cyan accent
// const Dark = "#0f172a";
// const Border = "rgba(226, 232, 240, 0.9)";
// const White = "#ffffff";
// const Gold = "#f59e0b";
// const TextMuted = "#475569";
// const LightBg = "#f8fafc";
// const ThemeGradient = "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)";
// const SoftGradientBg = "linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)";
// const SoftGradientBg2 = 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #9333ea 100%)'

// // 🌟 Styled Components (Retaining all functionalities with an ultra-modern aesthetic)
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   color: ${Dark};
//   width: 100%;
//   font-family: inherit;
// `;

// const GreetingBanner = styled.div`
//   background: ${SoftGradientBg2};
//   color: ${White};
//   padding: 1rem;
//   border-radius: 1.75rem;
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
//   box-shadow: 0 20px 40px -10px rgba(236, 72, 153, 0.3);
//   position: relative;
//   overflow: hidden;

//   &::after {
//     content: '';
//     position: absolute;
//     top: -50px;
//     right: -50px;
//     width: 200px;
//     height: 200px;
//     background: rgba(255, 255, 255, 0.1);
//     border-radius: 50%;
//     pointer-events: none;
//   }
// `;

// const Greeting = styled.h1`
//   font-size: 2rem;
//   font-weight: 800;
//   letter-spacing: -0.02em;
//   margin: 0;
// `;

// const SubGreeting = styled.p`
//   font-size: 1.05rem;
//   opacity: 0.95;
//   margin: 0;
//   max-width: 42rem;
//   line-height: 1.6;
// `;

// const SectionTitle = styled.h2`
//   font-size: 1.35rem;
//   font-weight: 800;
//   color: ${Dark};
//   margin: 1rem 0 0 0;
//   letter-spacing: -0.01em;
// `;

// const MenuGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
//   gap: 1.25rem;
// `;

// const MenuCard = styled.div.withConfig({
//   shouldForwardProp: (prop) => prop !== "clickable",
// })`
//   background: ${White};
//   border-radius: 1.25rem;
//   padding: 1.5rem;
//   border: 1px solid ${Border};
//   border-left: 5px solid ${ThemePrimary};
//   box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
//   cursor: ${(props) => (props.clickable ? "pointer" : "default")};
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

//   &:hover {
//     transform: ${(props) => (props.clickable ? "translateY(-4px)" : "none")};
//     border-color: ${ThemePrimary};
//     box-shadow: 0 20px 40px -10px rgba(236, 72, 153, 0.15);
//   }
// `;

// const MenuContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.35rem;
// `;

// const MenuTitle = styled.h3`
//   margin: 0;
//   font-size: 1.05rem;
//   font-weight: 800;
//   color: ${Dark};
// `;

// const MenuDesc = styled.p`
//   margin: 0;
//   font-size: 0.85rem;
//   color: ${TextMuted};
//   line-height: 1.4;
// `;

// const MenuIcon = styled.span`
//   font-size: 1.75rem;
//   background: ${SoftGradientBg};
//   width: 50px;
//   height: 50px;
//   border-radius: 1rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid rgba(236, 72, 153, 0.15);
//   flex-shrink: 0;
// `;

// const ActionTextLink = styled.span`
//   font-size: 0.9rem;
//   font-weight: 700;
//   color: #db2777;
//   cursor: pointer;
//   transition: color 0.2s ease;

//   &:hover {
//     color: ${ThemePrimary};
//     text-decoration: underline;
//   }
// `;

// const DetailsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 1.25rem;
// `;

// const DetailCard = styled.div`
//   background: ${White};
//   border-radius: 1.25rem;
//   padding: 1.5rem;
//   border: 1px solid ${Border};
//   box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
//   transition: all 0.3s ease;

//   &:hover {
//     border-color: rgba(236, 72, 153, 0.3);
//     box-shadow: 0 15px 35px rgba(15, 23, 42, 0.06);
//   }
// `;

// const DetailTitle = styled.h3`
//   margin: 0;
//   font-size: 0.95rem;
//   font-weight: 700;
//   color: ${TextMuted};
//   text-transform: uppercase;
//   letter-spacing: 0.05em;
// `;

// const DetailValue = styled.p`
//   margin: 0;
//   font-size: 1.1rem;
//   font-weight: 700;
//   color: ${Dark};
//   word-break: break-all;
// `;

// const LoadingContainer = styled.div`
//   padding: 4rem 2rem;
//   text-align: center;
//   color: ${Dark};
//   font-weight: 700;
//   font-size: 1.25rem;
//   background: ${White};
//   border-radius: 1.5rem;
//   border: 1px solid ${Border};
//   box-shadow: 0 10px 30px rgba(15, 23, 42, 0.03);
//   max-width: 500px;
//   margin: 3rem auto;
// `;

// const DashboardHome = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = auth.currentUser;
//       if (!user) return;
//       const docRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setUserData(docSnap.data());
//       }
//       setLoading(false);
//     };

//     fetchUserData();
//   }, []);

//   // 📝 Function to handle editing the phone number
//   const handleEditPhone = async () => {
//     const user = auth.currentUser;
//     if (!user) return;

//     const { value: newPhone } = await Swal.fire({
//       title: "Edit Phone Number",
//       input: "text",
//       inputLabel: "Enter your new phone number",
//       inputValue: userData?.phone || "",
//       showCancelButton: true,
//       confirmButtonColor: ThemePrimary,
//       cancelButtonColor: TextMuted,
//       inputValidator: (value) => {
//         if (!value) {
//           return "You need to write something!";
//         }
//       },
//     });

//     if (newPhone) {
//       try {
//         const docRef = doc(db, "users", user.uid);
//         await updateDoc(docRef, { phone: newPhone });
//         setUserData((prev) => ({ ...prev, phone: newPhone }));
//         Swal.fire("Updated!", "Your phone number has been updated.", "success");
//       } catch (error) {
//         Swal.fire("Error", "Failed to update phone number.", "error");
//       }
//     }
//   };



//   // 📝 Function to handle editing the full name
//   const handleEditName = async () => {
//     const user = auth.currentUser;
//     if (!user) return;

//     const { value: newName } = await Swal.fire({
//       title: "Edit Full Name",
//       input: "text",
//       inputLabel: "Enter your full name",
//       inputValue: userData?.name || "",
//       showCancelButton: true,
//       confirmButtonColor: ThemePrimary,
//       cancelButtonColor: TextMuted,
//       inputValidator: (value) => {
//         if (!value) {
//           return "You need to write something!";
//         }
//       },
//     });

//     if (newName) {
//       try {
//         const docRef = doc(db, "users", user.uid);
//         await updateDoc(docRef, { name: newName });
//         setUserData((prev) => ({ ...prev, name: newName }));
//         Swal.fire("Updated!", "Your name has been updated.", "success");
//       } catch (error) {
//         Swal.fire("Error", "Failed to update name.", "error");
//       }
//     }
//   };




//   // 🚪 Function to handle signing out with Swal confirmation
//   const handleSignOut = async () => {
//     const confirmResult = await Swal.fire({
//       title: "Sign Out",
//       text: "Are you sure you want to sign out?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: ThemePrimary,
//       cancelButtonColor: TextMuted,
//       confirmButtonText: "Yes, Sign Out"
//     });

//     if (confirmResult.isConfirmed) {
//       try {
//         await auth.signOut();
//         router.push("/login"); // Adjust to your login route if needed
//       } catch (error) {
//         Swal.fire("Error", "Failed to sign out. Please try again.", "error");
//       }
//     }
//   };



//   if (loading) {
//     return (
//       <LoadingContainer>
//         <h2>Loading dashboard...</h2>
//       </LoadingContainer>
//     );
//   }

//   if (!userData) {
//     return (
//       <LoadingContainer>
//         <h2>No user data found.</h2>
//       </LoadingContainer>
//     );
//   }

//   return (
//     <Container>
//       {/* Welcome Banner */}
//       <GreetingBanner>
//         <Greeting>
//           Welcome back, {userData.role === 'admin' ? "ADMIN: " : ""} {userData.name || userData.email} 👋
//         </Greeting>
//         <SubGreeting>
//           Manage your handcrafted luxury bag orders, track artisan designs, and explore our exclusive store catalog.
//         </SubGreeting>
//       </GreetingBanner>

//       {/* E-Commerce Quick Actions / Navigation */}
//       {userData.role === 'admin' && (
//         <SectionTitle>ADMIN Actions</SectionTitle>
//       )}
//       {userData.role === 'admin' && (
//         <MenuGrid>
//           <MenuCard clickable onClick={() => router.push("/dashboard/manage-categories")}>
//             <MenuContent>
//               <MenuTitle>Manage Product Categories</MenuTitle>
//               <MenuDesc>Create, View, Update and Delete product categories</MenuDesc>
//             </MenuContent>
//             <MenuIcon>🛍️</MenuIcon>
//           </MenuCard>

//           <MenuCard clickable onClick={() => router.push("/dashboard/manage-products")}>
//             <MenuContent>
//               <MenuTitle>Manage Products</MenuTitle>
//               <MenuDesc>Create, View, Update and Delete products</MenuDesc>
//             </MenuContent>
//             <MenuIcon>🛍️</MenuIcon>
//           </MenuCard>

//           <MenuCard clickable onClick={() => router.push("/dashboard/manage-orders")}>
//             <MenuContent>
//               <MenuTitle>Manage Orders</MenuTitle>
//               <MenuDesc>View and manage customer orders</MenuDesc>
//             </MenuContent>
//             <MenuIcon>📦</MenuIcon>
//           </MenuCard>

//           <MenuCard clickable onClick={() => router.push("/dashboard/manage-users")}>
//             <MenuContent>
//               <MenuTitle>Manage Users</MenuTitle>
//               <MenuDesc>View and manage customer information</MenuDesc>
//             </MenuContent>
//             <MenuIcon>👜</MenuIcon>
//           </MenuCard>

//           <MenuCard clickable onClick={() => router.push("/dashboard/promocodes")}>
//             <MenuContent>
//               <MenuTitle>Manage Promo Codes</MenuTitle>
//               <MenuDesc>View and manage promo codes</MenuDesc>
//             </MenuContent>
//             <MenuIcon>💥</MenuIcon>
//           </MenuCard>

//           <MenuCard clickable onClick={() => router.push("/dashboard/analytics")}>
//             <MenuContent>
//               <MenuTitle>Analytics</MenuTitle>
//               <MenuDesc>View store performance metrics</MenuDesc>
//             </MenuContent>
//             <MenuIcon>📈</MenuIcon>
//           </MenuCard>

//           <MenuCard clickable onClick={() => router.push("/dashboard/hostinglist")}>
//             <MenuContent>
//               <MenuTitle>Manage Hosting</MenuTitle>
//               <MenuDesc>View and manage hosting services</MenuDesc>
//             </MenuContent>
//             <MenuIcon>🌐</MenuIcon>
//           </MenuCard>
//         </MenuGrid>
//       )}

//       {/* E-Commerce Quick Actions / Navigation */}
//       <SectionTitle>Customer Actions</SectionTitle>
//       <MenuGrid>
//         <MenuCard clickable onClick={() => router.push("/dashboard/myorders")}>
//           <MenuContent>
//             <MenuTitle>My Orders</MenuTitle>
//             <MenuDesc>Track shipping & delivery status</MenuDesc>
//           </MenuContent>
//           <MenuIcon>🛍️</MenuIcon>
//         </MenuCard>

//         <MenuCard clickable onClick={() => router.push("/dashboard/mywishlist")}>
//           <MenuContent>
//             <MenuTitle>My Wishlist</MenuTitle>
//             <MenuDesc>View saved items & special offers</MenuDesc>
//           </MenuContent>
//           <MenuIcon>📦</MenuIcon>
//         </MenuCard>
//       </MenuGrid>

//       {/* Primary User Details */}
//       <SectionTitle>Your Account Details</SectionTitle>
//       <DetailsGrid>
//        <DetailCard>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <DetailTitle>Full Name</DetailTitle>
//             <ActionTextLink onClick={handleEditName}>Edit</ActionTextLink>
//           </div>
//           <DetailValue>{userData.name}</DetailValue>
//         </DetailCard>

//         <DetailCard>
//           <DetailTitle>Email Address</DetailTitle>
//           <DetailValue>{userData.email}</DetailValue>
//         </DetailCard>

//         <DetailCard>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <DetailTitle>Phone Number</DetailTitle>
//             <ActionTextLink onClick={handleEditPhone}>Edit</ActionTextLink>
//           </div>
//           <DetailValue>{userData.phone || "Not provided"}</DetailValue>
//         </DetailCard>

//       <DetailCard 
//           onClick={handleSignOut}
//           style={{ 
//             cursor: "pointer", 
//             background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)", 
//             border: "1px solid #fca5a5",
//             transition: "all 0.2s ease"
//           }}
//         >
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <DetailTitle style={{ color: "#dc2626", fontWeight: "700" }}>Session</DetailTitle>
//             <span style={{ 
//               background: "#dc2626", 
//               color: "#ffffff", 
//               padding: "6px 14px", 
//               borderRadius: "6px", 
//               fontSize: "12px", 
//               fontWeight: "600",
//               boxShadow: "0 2px 4px rgba(220, 38, 38, 0.2)"
//             }}>
//               Sign Out
//             </span>
//           </div>
//           <DetailValue style={{ color: "#991b1b", fontSize: "13px", marginTop: "4px" }}>
//             Safely log out of your dashboard session
//           </DetailValue>
//         </DetailCard>
        
//       </DetailsGrid>
//     </Container>
//   );
// };

// export default DashboardHome;





"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebaseConfig";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// 🎨 ENITZ GLOBAL BRAND THEME COLORS
const PrimaryNavy = "#0B1B48";
const PrimaryCyan = "#00AEEF";
const Dark = "#0f172a";
const Border = "#cbd5e1";
const White = "#ffffff";
const TextMuted = "#475569";
const LightBg = "#f8fafc";
const ThemeGradient = "linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)";
const SoftGradientBg = "linear-gradient(135deg, rgba(11, 27, 72, 0.05) 0%, rgba(0, 174, 239, 0.05) 100%)";

// 🌟 Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: ${Dark};
  width: 100%;
  font-family: inherit;
`;

const GreetingBanner = styled.div`
  background: ${ThemeGradient};
  color: ${White};
  padding: 32px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 20px 40px -10px rgba(11, 27, 72, 0.25);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    pointer-events: none;
  }
`;

const Greeting = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin: 0;
`;

const SubGreeting = styled.p`
  font-size: 1.05rem;
  opacity: 0.95;
  margin: 0;
  max-width: 42rem;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${PrimaryNavy};
  margin: 16px 0 0 0;
  letter-spacing: -0.5px;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
`;

const MenuCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "clickable",
})`
  background: ${White};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${Border};
  border-left: 5px solid ${PrimaryCyan};
  box-shadow: 0 10px 30px rgba(11, 27, 72, 0.03);
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;

  &:hover {
    transform: ${(props) => (props.clickable ? "translateY(-3px)" : "none")};
    border-color: ${PrimaryCyan};
    box-shadow: 0 15px 35px rgba(11, 27, 72, 0.08);
  }
`;

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MenuTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: ${PrimaryNavy};
`;

const MenuDesc = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${TextMuted};
  line-height: 1.4;
`;

const MenuIcon = styled.span`
  font-size: 1.5rem;
  background: ${SoftGradientBg};
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 174, 239, 0.15);
  flex-shrink: 0;
`;

const ActionTextLink = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${PrimaryCyan};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const DetailCard = styled.div`
  background: ${White};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${Border};
  box-shadow: 0 10px 30px rgba(11, 27, 72, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 174, 239, 0.3);
    box-shadow: 0 15px 35px rgba(11, 27, 72, 0.06);
  }
`;

const DetailTitle = styled.h3`
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${TextMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.p`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${Dark};
  word-break: break-all;
`;

const LoadingContainer = styled.div`
  padding: 64px 32px;
  text-align: center;
  color: ${PrimaryNavy};
  font-weight: 700;
  font-size: 1.1rem;
  background: ${White};
  border-radius: 20px;
  border: 1px solid ${Border};
  box-shadow: 0 10px 30px rgba(11, 27, 72, 0.03);
  max-width: 500px;
  margin: 48px auto;
`;

const DashboardHome = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  // 📝 Function to handle editing the phone number
  const handleEditPhone = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const { value: newPhone } = await Swal.fire({
      title: "Edit Phone Number",
      input: "text",
      inputLabel: "Enter your new phone number",
      inputValue: userData?.phone || "",
      showCancelButton: true,
      confirmButtonColor: PrimaryNavy,
      cancelButtonColor: TextMuted,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (newPhone) {
      try {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, { phone: newPhone });
        setUserData((prev) => ({ ...prev, phone: newPhone }));
        Swal.fire("Updated!", "Your phone number has been updated.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to update phone number.", "error");
      }
    }
  };

  // 📝 Function to handle editing the full name
  const handleEditName = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const { value: newName } = await Swal.fire({
      title: "Edit Full Name",
      input: "text",
      inputLabel: "Enter your full name",
      inputValue: userData?.name || "",
      showCancelButton: true,
      confirmButtonColor: PrimaryNavy,
      cancelButtonColor: TextMuted,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (newName) {
      try {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, { name: newName });
        setUserData((prev) => ({ ...prev, name: newName }));
        Swal.fire("Updated!", "Your name has been updated.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to update name.", "error");
      }
    }
  };

  // 🚪 Function to handle signing out with Swal confirmation
  const handleSignOut = async () => {
    const confirmResult = await Swal.fire({
      title: "Sign Out",
      text: "Are you sure you want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PrimaryNavy,
      cancelButtonColor: TextMuted,
      confirmButtonText: "Yes, Sign Out"
    });

    if (confirmResult.isConfirmed) {
      try {
        await auth.signOut();
        router.push("/login");
      } catch (error) {
        Swal.fire("Error", "Failed to sign out. Please try again.", "error");
      }
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <h2>Loading dashboard...</h2>
      </LoadingContainer>
    );
  }

  if (!userData) {
    return (
      <LoadingContainer>
        <h2>No user data found.</h2>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {/* Welcome Banner */}
      <GreetingBanner>
        <Greeting>
          Welcome back, {userData.role === 'admin' ? "ADMIN: " : ""} {userData.name || userData.email} 👋
        </Greeting>
        <SubGreeting>
          Manage your account services, track project workflows, and explore your client portal options.
        </SubGreeting>
      </GreetingBanner>

      {/* ADMIN Actions / Navigation */}
      {userData.role === 'admin' && (
        <>
          <SectionTitle>ADMIN Actions</SectionTitle>
          <MenuGrid>
            <MenuCard clickable onClick={() => router.push("/dashboard/manage-categories")}>
              <MenuContent>
                <MenuTitle>Manage Product Categories</MenuTitle>
                <MenuDesc>Create, View, Update and Delete product categories</MenuDesc>
              </MenuContent>
              <MenuIcon>🛍️</MenuIcon>
            </MenuCard>

            <MenuCard clickable onClick={() => router.push("/dashboard/manage-products")}>
              <MenuContent>
                <MenuTitle>Manage Products</MenuTitle>
                <MenuDesc>Create, View, Update and Delete products</MenuDesc>
              </MenuContent>
              <MenuIcon>🛍️</MenuIcon>
            </MenuCard>

            <MenuCard clickable onClick={() => router.push("/dashboard/manage-orders")}>
              <MenuContent>
                <MenuTitle>Manage Orders</MenuTitle>
                <MenuDesc>View and manage customer orders</MenuDesc>
              </MenuContent>
              <MenuIcon>📦</MenuIcon>
            </MenuCard>

            <MenuCard clickable onClick={() => router.push("/dashboard/manage-users")}>
              <MenuContent>
                <MenuTitle>Manage Users</MenuTitle>
                <MenuDesc>View and manage customer information</MenuDesc>
              </MenuContent>
              <MenuIcon>👜</MenuIcon>
            </MenuCard>

            <MenuCard clickable onClick={() => router.push("/dashboard/promocodes")}>
              <MenuContent>
                <MenuTitle>Manage Promo Codes</MenuTitle>
                <MenuDesc>View and manage promo codes</MenuDesc>
              </MenuContent>
              <MenuIcon>💥</MenuIcon>
            </MenuCard>

            <MenuCard clickable onClick={() => router.push("/dashboard/analytics")}>
              <MenuContent>
                <MenuTitle>Analytics</MenuTitle>
                <MenuDesc>View store performance metrics</MenuDesc>
              </MenuContent>
              <MenuIcon>📈</MenuIcon>
            </MenuCard>

            <MenuCard clickable onClick={() => router.push("/dashboard/hostinglist")}>
              <MenuContent>
                <MenuTitle>Manage Hosting</MenuTitle>
                <MenuDesc>View and manage hosting services</MenuDesc>
              </MenuContent>
              <MenuIcon>🌐</MenuIcon>
            </MenuCard>
          </MenuGrid>
        </>
      )}

      {/* Customer / Standard User Actions */}
      <SectionTitle>Quick Actions</SectionTitle>
      <MenuGrid>
        <MenuCard clickable onClick={() => router.push("/dashboard/myorders")}>
          <MenuContent>
            <MenuTitle>My Orders</MenuTitle>
            <MenuDesc>Track shipping & delivery status</MenuDesc>
          </MenuContent>
          <MenuIcon>🛍️</MenuIcon>
        </MenuCard>

        <MenuCard clickable onClick={() => router.push("/dashboard/mywishlist")}>
          <MenuContent>
            <MenuTitle>My Wishlist</MenuTitle>
            <MenuDesc>View saved items & special offers</MenuDesc>
          </MenuContent>
          <MenuIcon>📦</MenuIcon>
        </MenuCard>
      </MenuGrid>

      {/* Primary User Details */}
      <SectionTitle>Your Account Details</SectionTitle>
      <DetailsGrid>
        <DetailCard>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <DetailTitle>Full Name</DetailTitle>
            <ActionTextLink onClick={handleEditName}>Edit</ActionTextLink>
          </div>
          <DetailValue>{userData.name}</DetailValue>
        </DetailCard>

        <DetailCard>
          <DetailTitle>Email Address</DetailTitle>
          <DetailValue>{userData.email}</DetailValue>
        </DetailCard>

        <DetailCard>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <DetailTitle>Phone Number</DetailTitle>
            <ActionTextLink onClick={handleEditPhone}>Edit</ActionTextLink>
          </div>
          <DetailValue>{userData.phone || "Not provided"}</DetailValue>
        </DetailCard>

        <DetailCard 
          onClick={handleSignOut}
          style={{ 
            cursor: "pointer", 
            background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)", 
            border: "1px solid #fca5a5",
            transition: "all 0.2s ease"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <DetailTitle style={{ color: "#dc2626", fontWeight: "700" }}>Session</DetailTitle>
            <span style={{ 
              background: "#dc2626", 
              color: "#ffffff", 
              padding: "6px 14px", 
              borderRadius: "6px", 
              fontSize: "12px", 
              fontWeight: "600",
              boxShadow: "0 2px 4px rgba(220, 38, 38, 0.2)"
            }}>
              Sign Out
            </span>
          </div>
          <DetailValue style={{ color: "#991b1b", fontSize: "13px", marginTop: "4px" }}>
            Safely log out of your dashboard session
          </DetailValue>
        </DetailCard>
      </DetailsGrid>
    </Container>
  );
};

export default DashboardHome;