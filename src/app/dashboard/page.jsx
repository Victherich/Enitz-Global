// "use client";

// import { useEffect, useState } from "react";
// import { auth, db } from "@/firebaseConfig";

// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import styled from "styled-components";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// // 🎨 BEES INTERIOR THEME COLORS (Strictly matching the theme system)
// const Blue = "#2563eb";
// const Dark = "#0f172a";
// const Border = "#e5eaf2";
// const White = "#ffffff";
// const Gold = "#D4AF37";
// const TextMuted = "#475569";
// const LightBg = "#f8fafc";

// // 🌟 Styled Components (Strict max 10px spacing/gaps/margins/padding rule)
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   color: ${Dark};
//   width: 100%;
// `;

// const GreetingBanner = styled.div`
//   background: linear-gradient(135deg, ${Blue} 0%, ${Gold} 100%);
//   color: ${White};
//   padding: 10px;
//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   box-shadow: 0 4px 15px rgba(15, 23, 42, 0.05);
// `;

// const Greeting = styled.h1`
//   font-size: 1.5rem;
//   font-weight: 800;
//   letter-spacing: -0.5px;
//   margin: 0;
// `;

// const SubGreeting = styled.p`
//   font-size: 0.95rem;
//   opacity: 0.9;
//   margin: 0;
// `;

// const SectionTitle = styled.h2`
//   font-size: 1.2rem;
//   font-weight: 700;
//   color: ${Blue};
//   margin: 10px 0 0 0;
// `;

// const StatsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//   gap: 10px;
// `;

// const StatCard = styled.div`
//   background: ${White};
//   border-radius: 10px;
//   padding: 10px;
//   border: 1px solid ${Border};
//   box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const StatLabel = styled.span`
//   font-size: 0.85rem;
//   font-weight: 600;
//   color: ${TextMuted};
// `;

// const StatValue = styled.span`
//   font-size: 1.25rem;
//   font-weight: 800;
//   color: ${Dark};
// `;

// const MenuGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//   gap: 10px;
// `;

// const MenuCard = styled.div.withConfig({
//   shouldForwardProp: (prop) => prop !== "clickable",
// })`
//   background: ${White};
//   border-radius: 10px;
//   padding: 10px;
//   border: 1px solid ${Border};
//   border-left: 4px solid ${Blue};
//   box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
//   cursor: ${(props) => (props.clickable ? "pointer" : "default")};
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   transition: all 0.2s ease;

//   &:hover {
//     transform: ${(props) => (props.clickable ? "translateY(-2px)" : "none")};
//     border-color: ${Blue};
//     box-shadow: 0 6px 15px rgba(37, 99, 235, 0.08);
//   }
// `;

// const MenuContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const MenuTitle = styled.h3`
//   margin: 0;
//   font-size: 1rem;
//   font-weight: 700;
//   // color: ${Dark};
//   color:#333;
// `;

// const MenuDesc = styled.p`
//   margin: 0;
//   font-size: 0.7rem;
//   color: ${TextMuted};
// `;

// const MenuIcon = styled.span`
//   font-size: 1.5rem;
// `;

// const SectionHeaderRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 10px 0 0 0;
// `;

// const ActionTextLink = styled.span`
//   font-size: 0.85rem;
//   font-weight: 700;
//   color: ${Blue};
//   cursor: pointer;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const RecentOrdersGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 10px;
// `;

// const OrderCard = styled.div`
//   background: ${White};
//   border-radius: 10px;
//   padding: 10px;
//   border: 1px solid ${Border};
//   box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const OrderHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
  
// `;

// const OrderId = styled.span`
//   font-size: 0.9rem;
//   font-weight: 800;
//   color: ${Dark};
// `;

// const OrderStatus = styled.span`
//   font-size: 0.75rem;
//   font-weight: 700;
//   padding: 4px 8px;
//   border-radius: 4px;
//   background: ${(props) => (props.$status === "Delivered" ? "rgba(16, 185, 129, 0.1)" : "rgba(37, 99, 235, 0.1)")};
//   color: ${(props) => (props.$status === "Delivered" ? "#10b981" : Blue)};
// `;

// const OrderDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   font-size: 0.85rem;
//   color: ${TextMuted};
// `;

// const DetailsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 10px;
// `;

// const DetailCard = styled.div`
//   background: ${White};
//   border-radius: 10px;
//   padding: 10px;
//   border: 1px solid ${Border};
//   box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const DetailTitle = styled.h3`
//   margin: 0;
//   font-size: 0.95rem;
//   font-weight: 700;
//   color: ${Dark};
// `;

// const DetailValue = styled.p`
//   margin: 0;
//   font-size: 0.9rem;
//   color: ${TextMuted};
//   word-break: break-all;
// `;

// const LoadingContainer = styled.div`
//   padding: 10px;
//   text-align: center;
//   color: ${Dark};
//   font-weight: 600;
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




// // 📝 Function to handle editing the phone number
//   const handleEditPhone = async () => {
//     const user = auth.currentUser;
//     if (!user) return;

//     const { value: newPhone } = await Swal.fire({
//       title: "Edit Phone Number",
//       input: "text",
//       inputLabel: "Enter your new phone number",
//       inputValue: userData?.phone || "",
//       showCancelButton: true,
//       confirmButtonColor: Blue,
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
//         <Greeting>Welcome back, {userData.role==='admin'?"ADMIN:":''} {userData.name || userData.email} 👋</Greeting>
//         <SubGreeting>
//           Manage your luxury interior orders, track design consultations, and explore our exclusive store catalog.
//         </SubGreeting>
//       </GreetingBanner>

//        {/* E-Commerce Quick Actions / Navigation */}
//       {userData.role==='admin' && (
//         <SectionTitle>ADMIN Actions</SectionTitle>
//       )}
//       {userData.role==='admin'&&<MenuGrid>
//            <MenuCard clickable onClick={() => router.push("/dashboard/manage-categories")}>
//           <MenuContent>
//             <MenuTitle>Manage Product Categories</MenuTitle>
//             <MenuDesc>Create, View, Update and Delete product categories</MenuDesc>
//           </MenuContent>
//           <MenuIcon>🛍️</MenuIcon>
//         </MenuCard>
//         <MenuCard clickable onClick={() => router.push("/dashboard/manage-products")}>
//           <MenuContent>
//             <MenuTitle>Manage Products</MenuTitle>
//             <MenuDesc>Create, View, Update and Delete products</MenuDesc>
//           </MenuContent>
//           <MenuIcon>🛍️</MenuIcon>
//         </MenuCard>

//         <MenuCard clickable onClick={() => router.push("/dashboard/manage-orders")}>
//           <MenuContent>
//             <MenuTitle>Manage Orders</MenuTitle>
//             <MenuDesc>View and manage customer orders</MenuDesc>
//           </MenuContent>
//           <MenuIcon>📦</MenuIcon>
//         </MenuCard>

//         <MenuCard clickable onClick={() => router.push("/dashboard/manage-users")}>
//           <MenuContent>
//             <MenuTitle>Manage Users</MenuTitle>
//             <MenuDesc>View and manage customer information</MenuDesc>
//           </MenuContent>
//           <MenuIcon>🛋️</MenuIcon>
//         </MenuCard>

//          <MenuCard clickable onClick={() => router.push("/dashboard/promocodes")}>
//           <MenuContent>
//             <MenuTitle>Manage Promo Codes</MenuTitle>
//             <MenuDesc>View and manage promo codes</MenuDesc>
//           </MenuContent>
//           <MenuIcon>💥</MenuIcon>
//         </MenuCard>

//         <MenuCard clickable onClick={() => router.push("/dashboard/analytics")}>
//           <MenuContent>
//             <MenuTitle>Analytics</MenuTitle>
//             <MenuDesc>View store performance metrics</MenuDesc>
//           </MenuContent>
//           <MenuIcon>📈</MenuIcon>
//         </MenuCard>

//         <MenuCard clickable onClick={() => router.push("/dashboard/hostinglist")}>
//           <MenuContent>
//             <MenuTitle>Manage Hosting</MenuTitle>
//             <MenuDesc>View and manage hosting services</MenuDesc>
//           </MenuContent>
//           <MenuIcon>🌐</MenuIcon>
//         </MenuCard>

//       </MenuGrid>}

//       {/* E-Commerce Metrics / Quick Stats */}
//       {/* <SectionTitle>Store Overview</SectionTitle>
//       <StatsGrid>
//         <StatCard>
//           <StatLabel>Active Orders</StatLabel>
//           <StatValue>2</StatValue>
//         </StatCard>
//         <StatCard>
//           <StatLabel>Wishlist Items</StatLabel>
//           <StatValue>5</StatValue>
//         </StatCard>
//         <StatCard>
//           <StatLabel>My Cart Items</StatLabel>
//           <StatValue>1 Item</StatValue>
//         </StatCard>
     
//       </StatsGrid> */}

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

//         {/* <MenuCard clickable  onClick={() => router.push("/dashboard/addressmanager")}>
//           <MenuContent>
//             <MenuTitle>My Addresses</MenuTitle>
//             <MenuDesc>View and manage your saved addresses</MenuDesc>
//           </MenuContent>
//           <MenuIcon>🛋️</MenuIcon>
//         </MenuCard> */}

//       </MenuGrid>

//       {/* Recent Orders Section */}
//       {/* <SectionHeaderRow>
//         <SectionTitle style={{ margin: 0 }}>Recent Orders</SectionTitle>
//         <ActionTextLink onClick={() => Swal.fire("All Orders", "Viewing complete order history.", "info")}>
//           View All
//         </ActionTextLink>
//       </SectionHeaderRow> */}
//       {/* <RecentOrdersGrid>
//         <OrderCard>
//           <OrderHeader>
//             <OrderId>#BS-89421</OrderId>
//             <OrderStatus $status="Processing">Processing</OrderStatus>
//           </OrderHeader>
//           <OrderDetails>
//             <span>Items: Velvet Armchair (x1), Gold Accent Table (x1)</span>
//             <span>Total: $1,450.00</span>
//             <span style={{ color: Blue, fontWeight: "600", cursor: "pointer" }} onClick={() => Swal.fire("Tracking", "Order is currently being crafted in our workshop.", "info")}>
//               Track Shipment ➔
//             </span>
//           </OrderDetails>
//         </OrderCard>

//         <OrderCard>
//           <OrderHeader>
//             <OrderId>#BS-88310</OrderId>
//             <OrderStatus $status="Delivered">Delivered</OrderStatus>
//           </OrderHeader>
//           <OrderDetails>
//             <span>Items: Minimalist Marble Pendant Light (x2)</span>
//             <span>Total: $680.00</span>
//             <span style={{ color: Blue, fontWeight: "600", cursor: "pointer" }} onClick={() => Swal.fire("Invoice", "Downloading official receipt...", "success")}>
//               Download Invoice ➔
//             </span>
//           </OrderDetails>
//         </OrderCard>
//       </RecentOrdersGrid> */}

//       {/* Primary User Details */}
//       <SectionTitle>Your Account Details</SectionTitle>
//       <DetailsGrid>
//         <DetailCard>
//           <DetailTitle>Full Name</DetailTitle>
//           <DetailValue>{userData.name}</DetailValue>
//         </DetailCard>

//         <DetailCard>
//           <DetailTitle>Email Address</DetailTitle>
//           <DetailValue>{userData.email}</DetailValue>
//         </DetailCard>
// <DetailCard>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <DetailTitle>Phone Number</DetailTitle>
//             <ActionTextLink onClick={handleEditPhone}>Edit</ActionTextLink>
//           </div>
//           <DetailValue>{userData.phone || "Not provided"}</DetailValue>
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

// 🎨 KINGSWORD BAG CRAFT THEME COLORS (Vibrant luxury palette)
const ThemePrimary = "#ec4899"; // Pink accent
const ThemeSecondary = "#06b6d4"; // Cyan accent
const Dark = "#0f172a";
const Border = "rgba(226, 232, 240, 0.9)";
const White = "#ffffff";
const Gold = "#f59e0b";
const TextMuted = "#475569";
const LightBg = "#f8fafc";
const ThemeGradient = "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)";
const SoftGradientBg = "linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)";
const SoftGradientBg2 = 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #9333ea 100%)'

// 🌟 Styled Components (Retaining all functionalities with an ultra-modern aesthetic)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: ${Dark};
  width: 100%;
  font-family: inherit;
`;

const GreetingBanner = styled.div`
  background: ${SoftGradientBg2};
  color: ${White};
  padding: 1rem;
  border-radius: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 20px 40px -10px rgba(236, 72, 153, 0.3);
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
  letter-spacing: -0.02em;
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
  font-size: 1.35rem;
  font-weight: 800;
  color: ${Dark};
  margin: 1rem 0 0 0;
  letter-spacing: -0.01em;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
`;

const MenuCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "clickable",
})`
  background: ${White};
  border-radius: 1.25rem;
  padding: 1.5rem;
  border: 1px solid ${Border};
  border-left: 5px solid ${ThemePrimary};
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: ${(props) => (props.clickable ? "translateY(-4px)" : "none")};
    border-color: ${ThemePrimary};
    box-shadow: 0 20px 40px -10px rgba(236, 72, 153, 0.15);
  }
`;

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const MenuTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: ${Dark};
`;

const MenuDesc = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${TextMuted};
  line-height: 1.4;
`;

const MenuIcon = styled.span`
  font-size: 1.75rem;
  background: ${SoftGradientBg};
  width: 50px;
  height: 50px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(236, 72, 153, 0.15);
  flex-shrink: 0;
`;

const ActionTextLink = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  color: #db2777;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${ThemePrimary};
    text-decoration: underline;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
`;

const DetailCard = styled.div`
  background: ${White};
  border-radius: 1.25rem;
  padding: 1.5rem;
  border: 1px solid ${Border};
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(236, 72, 153, 0.3);
    box-shadow: 0 15px 35px rgba(15, 23, 42, 0.06);
  }
`;

const DetailTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: ${TextMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DetailValue = styled.p`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${Dark};
  word-break: break-all;
`;

const LoadingContainer = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  color: ${Dark};
  font-weight: 700;
  font-size: 1.25rem;
  background: ${White};
  border-radius: 1.5rem;
  border: 1px solid ${Border};
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.03);
  max-width: 500px;
  margin: 3rem auto;
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
      confirmButtonColor: ThemePrimary,
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
      confirmButtonColor: ThemePrimary,
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
      confirmButtonColor: ThemePrimary,
      cancelButtonColor: TextMuted,
      confirmButtonText: "Yes, Sign Out"
    });

    if (confirmResult.isConfirmed) {
      try {
        await auth.signOut();
        router.push("/login"); // Adjust to your login route if needed
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
          Manage your handcrafted luxury bag orders, track artisan designs, and explore our exclusive store catalog.
        </SubGreeting>
      </GreetingBanner>

      {/* E-Commerce Quick Actions / Navigation */}
      {userData.role === 'admin' && (
        <SectionTitle>ADMIN Actions</SectionTitle>
      )}
      {userData.role === 'admin' && (
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
      )}

      {/* E-Commerce Quick Actions / Navigation */}
      <SectionTitle>Customer Actions</SectionTitle>
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