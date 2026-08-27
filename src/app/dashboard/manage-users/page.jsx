// "use client";

// import { useEffect, useState } from "react";
// import { db } from "@/firebaseConfig";
// import { 
//   collection, 
//   getDocs, 
//   updateDoc, 
//   doc, 
//   serverTimestamp 
// } from "firebase/firestore";
// import styled from "styled-components";
// import Swal from "sweetalert2";



// // // 🎨 NEW THEME COLORS & GRADIENTS (Vibrant Pink, Turquoise & Dynamic Accent)
// const PrimaryColor = "#ec4899";
// const AccentGradient = "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)";
// const Turquoise = "#06b6d4";
// const Dark = "#0f172a";
// const Border = "#e5eaf2";
// const White = "#ffffff";
// const TextMuted = "#475569";
// const Danger = "#ef4444";
// const Success = "#10b981";

// // 🌟 Styled Components (Strict max 10px spacing/gaps/margins/padding rule)
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   color: ${Dark};
//   width: 100%;
//   padding: 10px;
//   box-sizing: border-box;
// `;

// const HeaderBanner = styled.div`
//   background: ${AccentGradient};
//   color: ${White};
//   padding: 10px;
//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   box-shadow: 0 6px 20px rgba(236, 72, 153, 0.15);
// `;

// const ColorfulTitle = styled.h1`
//   font-size: 1.6rem;
//   font-weight: 800;
//   margin: 0;
//   background: linear-gradient(90deg, #ffffff 0%, #fbcfe8 100%);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   letter-spacing: -0.5px;
//   text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
// `;

// const ColorfulSub = styled.p`
//   font-size: 0.95rem;
//   margin: 0;
//   color: #fdf2f8;
//   opacity: 0.95;
// `;

// const SearchContainer = styled.div`
//   display: flex;
//   width: 100%;
//   margin: 0;
//   box-sizing: border-box;
// `;

// const StyledInput = styled.input`
//   border: 1px solid ${Border};
//   border-radius: 6px;
//   padding: 8px 10px;
//   font-size: 0.9rem;
//   outline: none;
//   color: ${Dark};
//   width: 100%;
//   box-sizing: border-box;
//   margin: 0;
//   background: ${White};
//   transition: all 0.2s ease;

//   &:focus {
//     border-color: ${PrimaryColor};
//     box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15);
//   }
// `;

// const ActionRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 10px 0 0 0;
// `;

// const ColorfulSectionTitle = styled.h2`
//   font-size: 1.25rem;
//   font-weight: 800;
//   margin: 0;
//   background: ${AccentGradient};
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// `;

// const UsersGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 10px;
// `;

// const UserCard = styled.div`
//   background: ${White};
//   border-radius: 10px;
//   padding: 10px;
//   border: 1px solid ${Border};
//   border-left: 4px solid ${(props) => (props.$isSuspended ? Danger : props.$isAdmin ? Turquoise : PrimaryColor)};
//   box-shadow: 0 4px 15px rgba(15, 23, 42, 0.04);
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   transition: transform 0.2s ease, box-shadow 0.2s ease;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 6px 20px rgba(236, 72, 153, 0.08);
//   }
// `;

// const CardHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
// `;

// const UserInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 2px;
// `;

// const UserName = styled.h3`
//   margin: 0;
//   font-size: 1rem;
//   font-weight: 700;
//   color: ${Dark};
// `;

// const UserEmail = styled.p`
//   margin: 0;
//   font-size: 0.85rem;
//   color: ${TextMuted};
//   word-break: break-word;
// `;

// const BadgeContainer = styled.div`
//   display: flex;
//   gap: 5px;
// `;

// const Badge = styled.span`
//   background: ${(props) => (props.$variant === "danger" ? "rgba(239, 68, 68, 0.1)" : props.$variant === "gold" ? "rgba(6, 182, 212, 0.12)" : "rgba(236, 72, 153, 0.1)")};
//   color: ${(props) => (props.$variant === "danger" ? Danger : props.$variant === "gold" ? Turquoise : PrimaryColor)};
//   padding: 3px 8px;
//   border-radius: 6px;
//   font-size: 0.75rem;
//   font-weight: 700;
//   letter-spacing: 0.3px;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 10px;
//   justify-content: flex-end;
//   margin-top: 5px;
// `;

// const AdminButton = styled.button`
//   background: rgba(6, 182, 212, 0.12);
//   color: #0e7490;
//   border: none;
//   border-radius: 6px;
//   padding: 6px 10px;
//   font-size: 0.8rem;
//   font-weight: 700;
//   cursor: pointer;
//   transition: background 0.2s ease;

//   &:hover {
//     background: rgba(6, 182, 212, 0.22);
//   }
// `;

// const SuspendButton = styled.button`
//   background: ${(props) => (props.$isSuspended ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)")};
//   color: ${(props) => (props.$isSuspended ? Success : Danger)};
//   border: none;
//   border-radius: 6px;
//   padding: 6px 10px;
//   font-size: 0.8rem;
//   font-weight: 700;
//   cursor: pointer;
//   transition: background 0.2s ease;

//   &:hover {
//     background: ${(props) => (props.$isSuspended ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)")};
//   }
// `;

// const LoadingContainer = styled.div`
//   padding: 10px;
//   text-align: center;
//   color: ${PrimaryColor};
//   font-weight: 600;
// `;

// export default function UsersManagementPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const querySnapshot = await getDocs(collection(db, "users"));
//       const list = querySnapshot.docs.map((docSnap) => ({
//         id: docSnap.id,
//         ...docSnap.data(),
//       }));
//       setUsers(list);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       Swal.fire("Error", "Failed to fetch users.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleToggleAdmin = async (user) => {
//     const nextIsAdmin = !user.isAdmin;
//     const newRole = nextIsAdmin ? "admin" : "customer";
//     const actionText = nextIsAdmin ? "promote this user to Admin" : "demote this user to Customer";

//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: `Do you want to ${actionText}?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: `Yes, update role!`,
//     });

//     if (result.isConfirmed) {
//       try {
//         const userRef = doc(db, "users", user.id);
//         await updateDoc(userRef, {
//           isAdmin: nextIsAdmin,
//           role: newRole, // Syncing role string for multi-purpose backend checks
//           updatedAt: serverTimestamp(),
//         });
        
//         // Optimistically update local state for instant feedback
//         setUsers(users.map(u => u.id === user.id ? { ...u, isAdmin: nextIsAdmin, role: newRole } : u));

//         Swal.fire("Updated!", `User role successfully updated to ${newRole}.`, "success");
//       } catch (error) {
//         console.error("Error updating user role:", error);
//         Swal.fire("Error", "Could not update user role.", "error");
//       }
//     }
//   };

//   const handleToggleSuspend = async (user) => {
//     const newSuspendStatus = !user.isSuspended;
//     const actionText = newSuspendStatus ? "suspend" : "activate";
    
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: `Do you want to ${actionText} this user account?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: newSuspendStatus ? "#d33" : "#28a745",
//       cancelButtonColor: "#6c757d",
//       confirmButtonText: `Yes, ${actionText} it!`,
//     });

//     if (result.isConfirmed) {
//       try {
//         const userRef = doc(db, "users", user.id);
//         await updateDoc(userRef, {
//           isSuspended: newSuspendStatus,
//           updatedAt: serverTimestamp(),
//         });

//         // Optimistically update local state
//         setUsers(users.map(u => u.id === user.id ? { ...u, isSuspended: newSuspendStatus } : u));

//         Swal.fire("Success!", `User account has been ${actionText}ed.`, "success");
//       } catch (error) {
//         console.error("Error updating suspension status:", error);
//         Swal.fire("Error", `Could not ${actionText} user account.`, "error");
//       }
//     }
//   };

//   const filteredUsers = users.filter((u) => {
//     const nameMatch = u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
//     const emailMatch = u.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
//     return nameMatch || emailMatch;
//   });

//   if (loading) {
//     return <LoadingContainer>Loading users directory...</LoadingContainer>;
//   }

//   return (
//     <Container>
//       <HeaderBanner>
//         <ColorfulTitle>User Accounts Management 👥</ColorfulTitle>
//         <ColorfulSub>Monitor platform members, assign administrative privileges, and manage account statuses.</ColorfulSub>
//       </HeaderBanner>

//       <SearchContainer>
//         <StyledInput 
//           type="text" 
//           placeholder="Search users by name or email..." 
//           value={searchQuery} 
//           onChange={(e) => setSearchQuery(e.target.value)} 
//         />
//       </SearchContainer>

//       <ActionRow>
//         <ColorfulSectionTitle>Registered Users ({filteredUsers.length})</ColorfulSectionTitle>
//       </ActionRow>

//       {filteredUsers.length === 0 ? (
//         <LoadingContainer>No matching users found.</LoadingContainer>
//       ) : (
//         <UsersGrid>
//           {filteredUsers.map((user) => (
//             <UserCard key={user.id} $isAdmin={user.isAdmin} $isSuspended={user.isSuspended}>
//               <CardHeader>
//                 <UserInfo>
//                   <UserName>{user.name || "Unnamed User"}</UserName>
//                   <UserEmail>{user.email || "No email provided"}</UserEmail>
//                 </UserInfo>
//                 <BadgeContainer>
//                   {user.isSuspended && <Badge $variant="danger">Suspended</Badge>}
//                   {user.isAdmin && <Badge $variant="gold">Admin</Badge>}
//                   {!user.isAdmin && !user.isSuspended && <Badge>Active</Badge>}
//                 </BadgeContainer>
//               </CardHeader>
              
//               <ButtonGroup>
//                 <AdminButton onClick={() => handleToggleAdmin(user)}>
//                   {user.isAdmin ? "Remove Admin" : "Make Admin"}
//                 </AdminButton>
//                 <SuspendButton 
//                   $isSuspended={user.isSuspended} 
//                   onClick={() => handleToggleSuspend(user)}
//                 >
//                   {user.isSuspended ? "Activate" : "Suspend"}
//                 </SuspendButton>
//               </ButtonGroup>
//             </UserCard>
//           ))}
//         </UsersGrid>
//       )}
//     </Container>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { 
  collection, 
  getDocs, 
  updateDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";
import styled from "styled-components";
import Swal from "sweetalert2";

// 🎨 NEW THEME COLORS & GRADIENTS (Navy & Cyan Theme)
const PrimaryNavy = "#0B1B48";
const PrimaryCyan = "#00AEEF";
const ThemeGradient = "linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)";
const Dark = "#0f172a";
const Border = "#cbd5e1";
const White = "#ffffff";
const TextMuted = "#475569";
const LightBg = "#f8fafc";
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

const ColorfulSub = styled.p`
  font-size: 0.9rem;
  margin: 0;
  color: #f1f5f9;
  opacity: 0.95;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  border: 1px solid ${Border};
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.95rem;
  outline: none;
  color: ${Dark};
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  background: ${White};
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(15, 23, 42, 0.02);

  &:focus {
    border-color: ${PrimaryCyan};
    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.15);
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0 0 0;
`;

const ColorfulSectionTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 800;
  margin: 0;
  color: ${PrimaryNavy};
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;

const UserCard = styled.div`
  background: ${White};
  border-radius: 12px;
  padding: 16px;
  border: 1px solid ${Border};
  border-top: 4px solid ${(props) => (props.$isSuspended ? Danger : props.$isAdmin ? PrimaryCyan : PrimaryNavy)};
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 174, 239, 0.08);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: ${Dark};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserEmail = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${TextMuted};
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
    props.$variant === "gold" ? "rgba(0, 174, 239, 0.1)" : 
    "rgba(11, 27, 72, 0.08)"
  };
  color: ${(props) => 
    props.$variant === "danger" ? Danger : 
    props.$variant === "gold" ? PrimaryCyan : 
    PrimaryNavy
  };
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 4px;
`;

const AdminButton = styled.button`
  background: rgba(0, 174, 239, 0.1);
  color: ${PrimaryCyan};
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 174, 239, 0.2);
  }
`;

const SuspendButton = styled.button`
  background: ${(props) => (props.$isSuspended ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)")};
  color: ${(props) => (props.$isSuspended ? Success : Danger)};
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.$isSuspended ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)")};
  }
`;

const LoadingContainer = styled.div`
  padding: 60px;
  text-align: center;
  color: ${PrimaryNavy};
  font-weight: 700;
  font-size: 1.1rem;
`;

export default function UsersManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "users"));
      const list = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setUsers(list);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire("Error", "Failed to fetch users.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleAdmin = async (user) => {
    const nextIsAdmin = !user.isAdmin;
    const newRole = nextIsAdmin ? "admin" : "customer";
    const actionText = nextIsAdmin ? "promote this user to Admin" : "demote this user to Customer";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${actionText}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PrimaryNavy,
      cancelButtonColor: Danger,
      confirmButtonText: `Yes, update role!`,
    });

    if (result.isConfirmed) {
      try {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          isAdmin: nextIsAdmin,
          role: newRole,
          updatedAt: serverTimestamp(),
        });
        
        setUsers(users.map(u => u.id === user.id ? { ...u, isAdmin: nextIsAdmin, role: newRole } : u));

        Swal.fire("Updated!", `User role successfully updated to ${newRole}.`, "success");
      } catch (error) {
        console.error("Error updating user role:", error);
        Swal.fire("Error", "Could not update user role.", "error");
      }
    }
  };

  const handleToggleSuspend = async (user) => {
    const newSuspendStatus = !user.isSuspended;
    const actionText = newSuspendStatus ? "suspend" : "activate";
    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${actionText} this user account?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newSuspendStatus ? Danger : Success,
      cancelButtonColor: TextMuted,
      confirmButtonText: `Yes, ${actionText} it!`,
    });

    if (result.isConfirmed) {
      try {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          isSuspended: newSuspendStatus,
          updatedAt: serverTimestamp(),
        });

        setUsers(users.map(u => u.id === user.id ? { ...u, isSuspended: newSuspendStatus } : u));

        Swal.fire("Success!", `User account has been ${actionText}ed.`, "success");
      } catch (error) {
        console.error("Error updating suspension status:", error);
        Swal.fire("Error", `Could not ${actionText} user account.`, "error");
      }
    }
  };

  const filteredUsers = users.filter((u) => {
    const nameMatch = u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const emailMatch = u.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    return nameMatch || emailMatch;
  });

  if (loading) {
    return <LoadingContainer>Loading users directory...</LoadingContainer>;
  }

  return (
    <Container>
      <HeaderBanner>
        <ColorfulTitle>User Accounts Management 👥</ColorfulTitle>
        <ColorfulSub>Monitor platform members, assign administrative privileges, and manage account statuses.</ColorfulSub>
      </HeaderBanner>

      <SearchContainer>
        <StyledInput 
          type="text" 
          placeholder="Search users by name or email..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </SearchContainer>

      <ActionRow>
        <ColorfulSectionTitle>Registered Users ({filteredUsers.length})</ColorfulSectionTitle>
      </ActionRow>

      {filteredUsers.length === 0 ? (
        <LoadingContainer>No matching users found.</LoadingContainer>
      ) : (
        <UsersGrid>
          {filteredUsers.map((user) => (
            <UserCard key={user.id} $isAdmin={user.isAdmin} $isSuspended={user.isSuspended}>
              <CardHeader>
                <UserInfo>
                  <UserName>{user.name || "Unnamed User"}</UserName>
                  <UserEmail>{user.email || "No email provided"}</UserEmail>
                </UserInfo>
                <BadgeContainer>
                  {user.isSuspended && <Badge $variant="danger">Suspended</Badge>}
                  {user.isAdmin && <Badge $variant="gold">Admin</Badge>}
                  {!user.isAdmin && !user.isSuspended && <Badge>Active</Badge>}
                </BadgeContainer>
              </CardHeader>
              
              <ButtonGroup>
                <AdminButton onClick={() => handleToggleAdmin(user)}>
                  {user.isAdmin ? "Remove Admin" : "Make Admin"}
                </AdminButton>
                <SuspendButton 
                  $isSuspended={user.isSuspended} 
                  onClick={() => handleToggleSuspend(user)}
                >
                  {user.isSuspended ? "Activate" : "Suspend"}
                </SuspendButton>
              </ButtonGroup>
            </UserCard>
          ))}
        </UsersGrid>
      )}
    </Container>
  );
}