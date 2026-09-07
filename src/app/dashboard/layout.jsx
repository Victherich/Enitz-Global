



// "use client";

// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/firebaseConfig";
// import { useRouter } from "next/navigation";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import { usePathname } from "next/navigation";

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

// /* ---------------- LAYOUT WRAPPER ---------------- */
// const LayoutWrapper = styled.div`
//   display: flex;
//   min-height: 100vh;
//   position: relative;
//   background: ${LightBg};
//   font-family: inherit;
// `;

// /* ---------------- SIDEBAR ---------------- */
// const Sidebar = styled.div`
//   width: 280px;
//   background: ${White};
//   border-right: 1px solid ${Border};
//   color: ${Dark};
//   padding: 1.5rem 1.25rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
//   z-index: 200;
//   box-shadow: 10px 0 30px rgba(15, 23, 42, 0.02);

//   @media (max-width: 768px) {
//     position: fixed;
//     top: 0;
//     left: 0;
//     transform: translateX(${(props) => (props.$open ? "0" : "-100%")});
//     height: 100vh;
//     box-shadow: ${(props) => (props.$open ? "20px 0 50px rgba(15, 23, 42, 0.15)" : "none")};
//   }
// `;

// const SidebarTop = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;

// const BrandLogo = styled.h2`
//   font-size: 1.2rem;
//   font-weight: 900;
//   letter-spacing: -0.02em;
//   color: ${Dark};
//   padding-bottom: 1rem;
//   border-bottom: 1px solid ${Border};
//   margin: 0;

//   span {
//     background: ${ThemeGradient};
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }
// `;

// const NavLinks = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const MenuItem = styled.div`
//   padding: 0.85rem 1rem;
//   cursor: pointer;
//   border-radius: 0.85rem;
//   font-size: 0.95rem;
//   font-weight: 700;
//   color: ${(props) => (props.$active ? White : TextMuted)};
//   background: ${(props) => (props.$active ? ThemeGradient : "transparent")};
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   box-shadow: ${(props) => (props.$active ? "0 10px 20px -5px rgba(236, 72, 153, 0.4)" : "none")};
//   transition: all 0.25s ease;

//   &:hover {
//     background: ${(props) => (props.$active ? ThemeGradient : "rgba(236, 72, 153, 0.06)")};
//     color: ${(props) => (props.$active ? White : ThemePrimary)};
//     transform: translateX(3px);
//   }
// `;

// const LogoutButton = styled.div`
//   padding: 0.85rem 1rem;
//   cursor: pointer;
//   border-radius: 0.85rem;
//   font-size: 0.95rem;
//   font-weight: 700;
//   color: #ef4444;
//   background: rgba(239, 68, 68, 0.05);
//   border: 1px solid rgba(239, 68, 68, 0.1);
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   transition: all 0.25s ease;

//   &:hover {
//     background: rgba(239, 68, 68, 0.12);
//     transform: translateY(-2px);
//   }
// `;

// /* ---------------- MAIN CONTENT AREA ---------------- */
// const MainContentArea = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   min-width: 0;
// `;

// const Topbar = styled.header`
//   height: 0px;
//   background: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(12px);
//   border-bottom: 1px solid ${Border};
//   padding: 0 1.5rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   position: sticky;
//   top: 0;
//   z-index: 100;
// `;

// const TopbarLeft = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// `;

// const TopbarRight = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// `;

// const Content = styled.main`
//   flex: 1;
//   padding: 2rem;
//   background: ${LightBg};
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;

//   @media (max-width: 768px) {
//     padding: 1.25rem;
//   }
// `;

// /* ---------------- OVERLAY (click-away) ---------------- */
// const Overlay = styled.div`
//   display: none;

//   @media (max-width: 768px) {
//     display: ${(props) => (props.$open ? "block" : "none")};
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
//     background: rgba(15, 23, 42, 0.5);
//     backdrop-filter: blur(4px);
//     z-index: 150;
//   }
// `;

// /* ---------------- HAMBURGER ---------------- */
// const Hamburger = styled.button`
//   width: 44px;
//   height: 44px;
//   background: ${White};
//   border: 1px solid ${Border};
//   border-radius: 0.85rem;
//   color: ${Dark};
//   font-size: 1.25rem;
//   display: none;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
//   transition: all 0.2s ease;

//   &:hover {
//     border-color: ${ThemePrimary};
//     color: ${ThemePrimary};
//   }

//   @media (max-width: 768px) {
//     display: flex;
//   }
// `;

// /* ---------------- HOME BUTTON ---------------- */
// const HomeButton = styled.button`
//   width: 44px;
//   height: 44px;
//   border-radius: 0.85rem;
//   background: ${White};
//   color: ${Dark};
//   border: 1px solid ${Border};
//   font-size: 1.15rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
//   transition: all 0.2s ease;

//   &:hover {
//     border-color: ${ThemePrimary};
//     color: ${ThemePrimary};
//     transform: translateY(-2px);
//   }
// `;

// /* ---------------- LOADING STATE ---------------- */
// const LoadingWrapper = styled.div`
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: ${LightBg};
//   color: ${Dark};
//   font-size: 1.2rem;
//   font-weight: 700;
// `;

// export default function DashboardLayout({ children }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const showHomeButton = pathname !== "/dashboard";

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         router.replace("/login");
//       }
//       setLoading(false);
//     });

//     return () => unsub();
//   }, [router]);

//   if (loading) {
//     return (
//       <LoadingWrapper>
//         <p>Loading dashboard...</p>
//       </LoadingWrapper>
//     );
//   }

//   /* ---------------- SIGN OUT ---------------- */
//   const signOut = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be signed out of your account.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: ThemePrimary,
//       cancelButtonColor: "#ef4444",
//       confirmButtonText: "Yes, Sign Out",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         auth.signOut();
//         Swal.fire("Signed Out", "You have been logged out successfully.", "success");
//         router.push("/login");
//       }
//     });
//   };

//   /* ---------------- CLOSE SIDEBAR ON MOBILE ---------------- */
//   const closeSidebar = () => {
//     if (window.innerWidth <= 768) {
//       setSidebarOpen(false);
//     }
//   };

//   return (
//     <LayoutWrapper>
//       {/* CLICK-AWAY OVERLAY */}
//       <Overlay $open={sidebarOpen} onClick={() => setSidebarOpen(false)} />

//       {/* SIDEBAR */}
//       <Sidebar $open={sidebarOpen}>
//         <SidebarTop>
//           <BrandLogo>
//             KINGSWORD <span>BAG CRAFT</span>
//           </BrandLogo>

//           <NavLinks>
//             <MenuItem
//               $active={pathname === "/dashboard"}
//               onClick={() => {
//                 router.push("/dashboard");
//                 closeSidebar();
//               }}
//             >
//               📊 My Dashboard
//             </MenuItem>
//           </NavLinks>
//         </SidebarTop>

//         <LogoutButton
//           onClick={() => {
//             signOut();
//             closeSidebar();
//           }}
//         >
//           🚪 Sign Out
//         </LogoutButton>
//       </Sidebar>

//       {/* MAIN CONTENT AREA */}
//       <MainContentArea>
//         {/* TOPBAR */}
//         <Topbar>
//           <TopbarLeft>
//             <Hamburger onClick={() => setSidebarOpen(!sidebarOpen)}>
//               ☰
//             </Hamburger>
//           </TopbarLeft>

//           <TopbarRight>
//             {showHomeButton && (
//               <HomeButton
//                 onClick={() => {
//                   router.push("/dashboard");
//                   closeSidebar();
//                 }}
//                 title="Return to Dashboard"
//               >
//                 🏠
//               </HomeButton>
//             )}
//           </TopbarRight>
//         </Topbar>

//         {/* CONTENT */}
//         <Content onClick={closeSidebar}>
//           {children}
//         </Content>
//       </MainContentArea>
//     </LayoutWrapper>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";

// 🎨 ENITZ BRAND THEME COLORS
const PrimaryNavy = "#0B1B48";
const PrimaryCyan = "#00AEEF";
const Dark = "#0f172a";
const Border = "#cbd5e1";
const White = "#ffffff";
const TextMuted = "#475569";
const LightBg = "#f8fafc";
const ThemeGradient = "linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)";

/* ---------------- LAYOUT WRAPPER ---------------- */
const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
  background: ${LightBg};
  font-family: inherit;
`;

/* ---------------- SIDEBAR ---------------- */
const Sidebar = styled.div`
  width: 280px;
  background: ${White};
  border-right: 1px solid ${Border};
  color: ${Dark};
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 200;
  box-shadow: 10px 0 30px rgba(11, 27, 72, 0.03);

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(${(props) => (props.$open ? "0" : "-100%")});
    height: 100vh;
    box-shadow: ${(props) => (props.$open ? "20px 0 50px rgba(11, 27, 72, 0.15)" : "none")};
  }
`;

const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const BrandLogo = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: ${PrimaryNavy};
  padding-bottom: 16px;
  border-bottom: 1px solid ${Border};
  margin: 0;

  span {
    color: ${PrimaryCyan};
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  color: ${(props) => (props.$active ? White : TextMuted)};
  background: ${(props) => (props.$active ? ThemeGradient : "transparent")};
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: ${(props) => (props.$active ? "0 8px 20px rgba(0, 174, 239, 0.25)" : "none")};
  transition: all 0.25s ease;

  &:hover {
    background: ${(props) => (props.$active ? ThemeGradient : "rgba(0, 174, 239, 0.06)")};
    color: ${(props) => (props.$active ? White : PrimaryNavy)};
    transform: translateX(3px);
  }
`;

const LogoutButton = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.12);
    transform: translateY(-2px);
  }
`;

/* ---------------- MAIN CONTENT AREA ---------------- */
const MainContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Topbar = styled.header`
  // height: 70px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${Border};
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const TopbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TopbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Content = styled.main`
  flex: 1;
  padding: 32px;
  background: ${LightBg};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

/* ---------------- OVERLAY (click-away) ---------------- */
const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$open ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(11, 27, 72, 0.4);
    backdrop-filter: blur(4px);
    z-index: 150;
  }
`;

/* ---------------- HAMBURGER ---------------- */
const Hamburger = styled.button`
  width: 44px;
  height: 44px;
  background: ${White};
  border: 1px solid ${Border};
  border-radius: 10px;
  color: ${PrimaryNavy};
  font-size: 1.25rem;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(11, 27, 72, 0.03);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${PrimaryCyan};
    color: ${PrimaryCyan};
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

/* ---------------- HOME BUTTON ---------------- */
const HomeButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${White};
  color: ${PrimaryNavy};
  border: 1px solid ${Border};
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(11, 27, 72, 0.03);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${PrimaryCyan};
    color: ${PrimaryCyan};
    transform: translateY(-2px);
  }
`;

/* ---------------- LOADING STATE ---------------- */
const LoadingWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${LightBg};
  color: ${PrimaryNavy};
  font-size: 1.1rem;
  font-weight: 600;
  padding: 24px;
  box-sizing: border-box;
`;

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showHomeButton = pathname !== "/dashboard";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading) {
    return (
      <LoadingWrapper>
        <p>Loading dashboard...</p>
      </LoadingWrapper>
    );
  }

  /* ---------------- SIGN OUT ---------------- */
  const signOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PrimaryNavy,
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Sign Out",
    }).then((result) => {
      if (result.isConfirmed) {
        auth.signOut();
        Swal.fire("Signed Out", "You have been logged out successfully.", "success");
        router.push("/login");
      }
    });
  };

  /* ---------------- CLOSE SIDEBAR ON MOBILE ---------------- */
  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <LayoutWrapper>
      {/* CLICK-AWAY OVERLAY */}
      <Overlay $open={sidebarOpen} onClick={() => setSidebarOpen(false)} />

      {/* SIDEBAR */}
      <Sidebar $open={sidebarOpen}>
        <SidebarTop>
          <BrandLogo>
            ENITZ 
            {/* <span>GLOBAL</span> */}
          </BrandLogo>

          <NavLinks>
            <MenuItem
              $active={pathname === "/dashboard"}
              onClick={() => {
                router.push("/dashboard");
                closeSidebar();
              }}
            >
              📊 My Dashboard
            </MenuItem>
          </NavLinks>
        </SidebarTop>

        <LogoutButton
          onClick={() => {
            signOut();
            closeSidebar();
          }}
        >
          🚪 Sign Out
        </LogoutButton>
      </Sidebar>

      {/* MAIN CONTENT AREA */}
      <MainContentArea>
        {/* TOPBAR */}
        <Topbar>
          <TopbarLeft>
            <Hamburger onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </Hamburger>
          </TopbarLeft>

          <TopbarRight>
            {showHomeButton && (
              <HomeButton
                onClick={() => {
                  router.push("/dashboard");
                  closeSidebar();
                }}
                title="Return to Dashboard"
              >
                🏠
              </HomeButton>
            )}
          </TopbarRight>
        </Topbar>

        {/* CONTENT */}
        <Content onClick={closeSidebar}>
          {children}
        </Content>
      </MainContentArea>
    </LayoutWrapper>
  );
}