



// "use client";

// import { useEffect, useState } from "react";
// import { db } from "@/firebaseConfig";
// import { 
//   collection, 
//   getDocs, 
//   addDoc, 
//   updateDoc, 
//   deleteDoc, 
//   doc, 
//   serverTimestamp,
//   query,
//   where,
//   writeBatch
// } from "firebase/firestore";
// import styled from "styled-components";
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
// const Danger = "#ef4444";

// // 🌟 Styled Components (Strict max 10px spacing/gaps/margins/padding rule)
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   color: ${Dark};
//   width: 100%;
//   padding: 10px;
//   box-sizing: border-box;
//   font-family: inherit;
// `;

// const HeaderBanner = styled.div`
//   background: ${ThemeGradient};
//   color: ${White};
//   padding: 10px;
//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   box-shadow: 0 15px 35px rgba(236, 72, 153, 0.2);
//   position: relative;
//   overflow: hidden;

//   &::after {
//     content: '';
//     position: absolute;
//     top: -30px;
//     right: -30px;
//     width: 120px;
//     height: 120px;
//     background: rgba(255, 255, 255, 0.1);
//     border-radius: 50%;
//     pointer-events: none;
//   }
// `;

// const ColorfulTitle = styled.h1`
//   font-size: 1.6rem;
//   font-weight: 900;
//   margin: 0;
//   color: ${White};
//   letter-spacing: -0.02em;
// `;

// const ColorfulSub = styled.p`
//   font-size: 0.95rem;
//   margin: 0;
//   color: rgba(255, 255, 255, 0.95);
//   font-weight: 500;
// `;

// const ActionRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 10px 0 0 0;
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 10px;
//   }
// `;

// const ColorfulSectionTitle = styled.h2`
//   font-size: 1.25rem;
//   font-weight: 900;
//   margin: 0;
//   background: ${ThemeGradient};
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// `;

// const PrimaryButton = styled.button`
//   background: ${ThemeGradient};
//   color: ${White};
//   border: none;
//   border-radius: 8px;
//   padding: 8px 10px;
//   font-weight: 800;
//   font-size: 0.9rem;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
//   transition: all 0.2s ease;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
//   }
// `;

// const CategoriesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
//   gap: 10px;
// `;

// const CategoryCard = styled.div`
//   background: ${White};
//   border-radius: 10px;
//   padding: 10px;
//   border: 1px solid ${Border};
//   border-left: 4px solid ${ThemePrimary};
//   box-shadow: 0 4px 15px rgba(15, 23, 42, 0.03);
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   transition: all 0.25s ease;

//   &:hover {
//     border-color: rgba(236, 72, 153, 0.3);
//     box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
//     transform: translateY(-2px);
//   }
// `;

// const CardHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const CategoryName = styled.h3`
//   margin: 0;
//   font-size: 1rem;
//   font-weight: 800;
//   color: ${Dark};
// `;

// const CategoryDesc = styled.p`
//   margin: 0;
//   font-size: 0.85rem;
//   color: ${TextMuted};
//   word-break: break-word;
//   font-weight: 500;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 10px;
//   justify-content: flex-end;
//   margin-top: 5px;
// `;

// const EditButton = styled.button`
//   background: rgba(236, 72, 153, 0.1);
//   color: ${ThemePrimary};
//   border: 1px solid rgba(236, 72, 153, 0.2);
//   border-radius: 6px;
//   padding: 6px 10px;
//   font-size: 0.8rem;
//   font-weight: 800;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     background: rgba(236, 72, 153, 0.2);
//   }
// `;

// const DeleteButton = styled.button`
//   background: rgba(239, 68, 68, 0.1);
//   color: ${Danger};
//   border: 1px solid rgba(239, 68, 68, 0.2);
//   border-radius: 6px;
//   padding: 6px 10px;
//   font-size: 0.8rem;
//   font-weight: 800;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     background: rgba(239, 68, 68, 0.2);
//   }
// `;

// const LoadingContainer = styled.div`
//   padding: 20px;
//   text-align: center;
//   color: ${Dark};
//   font-weight: 700;
//   background: ${White};
//   border-radius: 10px;
//   border: 1px solid ${Border};
// `;

// // 🌟 Custom Modal Styled Components (Strict max 10px limit)
// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(15, 23, 42, 0.6);
//   backdrop-filter: blur(4px);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
//   padding: 10px;
//   box-sizing: border-box;
// `;

// const ModalContainer = styled.div`
//   background: ${White};
//   border-radius: 10px;
//   padding: 10px;
//   width: 100%;
//   max-width: 400px;
//   border: 1px solid ${Border};
//   box-shadow: 0 15px 35px rgba(15, 23, 42, 0.15);
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const ModalTitle = styled.h3`
//   margin: 0;
//   font-size: 1.1rem;
//   font-weight: 900;
//   background: ${ThemeGradient};
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
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
//   font-weight: 600;

//   &:focus {
//     border-color: ${ThemePrimary};
//     box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15);
//   }
// `;

// const StyledTextarea = styled.textarea`
//   border: 1px solid ${Border};
//   border-radius: 6px;
//   padding: 8px 10px;
//   font-size: 0.9rem;
//   outline: none;
//   color: ${Dark};
//   width: 100%;
//   box-sizing: border-box;
//   resize: vertical;
//   min-height: 70px;
//   margin: 0;
//   font-weight: 600;

//   &:focus {
//     border-color: ${ThemePrimary};
//     box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15);
//   }
// `;

// const ModalActions = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
//   margin-top: 5px;
// `;

// const CancelButton = styled.button`
//   background: ${LightBg};
//   color: ${TextMuted};
//   border: 1px solid ${Border};
//   border-radius: 6px;
//   padding: 6px 10px;
//   font-size: 0.85rem;
//   font-weight: 800;
//   cursor: pointer;

//   &:hover {
//     background: #cbd5e1;
//     color: ${Dark};
//   }
// `;

// const SaveButton = styled.button`
//   background: ${ThemeGradient};
//   color: ${White};
//   border: none;
//   border-radius: 6px;
//   padding: 6px 10px;
//   font-size: 0.85rem;
//   font-weight: 800;
//   cursor: pointer;
//   box-shadow: 0 4px 10px rgba(236, 72, 153, 0.2);

//   &:hover {
//     opacity: 0.95;
//   }
// `;

// export default function CategoriesCrudPage() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Modal State Controls
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [titleInput, setTitleInput] = useState("");
//   const [descInput, setDescInput] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const querySnapshot = await getDocs(collection(db, "categories"));
//       const list = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setCategories(list);
//     } catch (error) {
//       Swal.fire("Error", "Failed to fetch categories.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const openAddModal = () => {
//     setEditingId(null);
//     setTitleInput("");
//     setDescInput("");
//     setIsModalOpen(true);
//   };

//   const openEditModal = (cat) => {
//     setEditingId(cat.id);
//     setTitleInput(cat.title);
//     setDescInput(cat.description || "");
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setTitleInput("");
//     setDescInput("");
//     setEditingId(null);
//   };

//   const handleSaveCategory = async (e) => {
//     e.preventDefault();
//     if (!titleInput.trim()) {
//       Swal.fire("Validation", "Please enter a category title.", "warning");
//       return;
//     }

//     try {
//       if (editingId) {
//         const docRef = doc(db, "categories", editingId);
//         await updateDoc(docRef, {
//           title: titleInput,
//           description: descInput,
//         });
//         Swal.fire("Updated!", "Category updated successfully.", "success");
//       } else {
//         await addDoc(collection(db, "categories"), {
//           title: titleInput,
//           description: descInput,
//           createdAt: serverTimestamp(),
//         });
//         Swal.fire("Success!", "Category added successfully.", "success");
//       }
//       closeModal();
//       fetchCategories();
//     } catch (error) {
//       Swal.fire("Error", "Could not save category.", "error");
//     }
//   };

//   const handleDeleteCategory = async (categoryToDelete) => {
//     try {
//       // 1. Check if any products use this category
//       const productsQuery = query(collection(db, "products"), where("categoryId", "==", categoryToDelete.id));
//       const productsSnapshot = await getDocs(productsQuery);

//       if (!productsSnapshot.empty) {
//         // 2. Build options for alternative categories
//         const categoryOptions = categories
//           .filter(cat => cat.id !== categoryToDelete.id)
//           .reduce((acc, cat) => {
//             acc[cat.id] = cat.title;
//             return acc;
//           }, { "uncategorized": "Move to Uncategorized" });

//         // 3. Prompt admin where to move the products
//         const { value: targetChoice } = await Swal.fire({
//           title: "Category Contains Products!",
//           text: `There are ${productsSnapshot.size} product(s) in "${categoryToDelete.title}". Where should these products go before deletion?`,
//           input: "select",
//           inputOptions: categoryOptions,
//           inputPlaceholder: "Select a fallback category",
//           showCancelButton: true,
//           confirmButtonText: "Proceed & Reassign",
//           confirmButtonColor: "#ec4899",
//           cancelButtonColor: TextMuted,
//         });

//         if (!targetChoice) return; // Cancelled by user

//         // 4. Batch update products and delete category
//         const batch = writeBatch(db);

//         productsSnapshot.forEach((productDoc) => {
//           batch.update(productDoc.ref, { 
//             categoryId: targetChoice === "uncategorized" ? null : targetChoice,
//             categoryName: targetChoice === "uncategorized" ? "Uncategorized" : categoryOptions[targetChoice]
//           });
//         });

//         const categoryRef = doc(db, "categories", categoryToDelete.id);
//         batch.delete(categoryRef);

//         await batch.commit();
//         Swal.fire("Success!", "Category deleted and products safely reassigned.", "success");
//         fetchCategories();
//         return;
//       }

//       // 5. Standard delete if no products are linked
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "This action cannot be undone!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: Danger,
//         cancelButtonColor: TextMuted,
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (result.isConfirmed) {
//         await deleteDoc(doc(db, "categories", categoryToDelete.id));
//         Swal.fire("Deleted!", "Category has been removed.", "success");
//         fetchCategories();
//       }
//     } catch (error) {
//       Swal.fire("Error", "Could not delete category.", "error");
//     }
//   };

//   const filteredCategories = categories.filter((cat) =>
//     cat.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) {
//     return <LoadingContainer>Loading categories...</LoadingContainer>;
//   }

//   return (
//     <Container>
//       <HeaderBanner>
//         <ColorfulTitle>Product Categories Management 👜</ColorfulTitle>
//         <ColorfulSub>Organize your luxury bag collections, add new artisanal categories, and manage inventory layouts.</ColorfulSub>
//       </HeaderBanner>

//       <ActionRow>
//         <ColorfulSectionTitle>All Categories ({categories.length})</ColorfulSectionTitle>
     
//         <StyledInput 
//           type="text" 
//           placeholder="Search categories by name..." 
//           value={searchQuery} 
//           onChange={(e) => setSearchQuery(e.target.value)} 
//           style={{ maxWidth: "250px", marginRight: "10px" }}
//         />

//         <PrimaryButton onClick={openAddModal}>
//           <span>+ Add Category</span>
//         </PrimaryButton>
//       </ActionRow>

//       {filteredCategories.length === 0 ? (
//         <LoadingContainer>No categories found. Click "+ Add Category" to create one.</LoadingContainer>
//       ) : (
//         <CategoriesGrid>
//           {filteredCategories.map((cat) => (
//             <CategoryCard key={cat.id}>
//               <CardHeader>
//                 <CategoryName>
//                   {cat.title ? cat.title.charAt(0).toUpperCase() + cat.title.slice(1) : ""}
//                 </CategoryName>
//               </CardHeader>
//               <CategoryDesc>
//                 {(() => {
//                   const desc = cat.description || "No description provided.";
//                   return desc ? desc.charAt(0).toUpperCase() + desc.slice(1) : "";
//                 })()}
//               </CategoryDesc>
//               <ButtonGroup>
//                 <EditButton onClick={() => openEditModal(cat)}>Edit</EditButton>
//                 <DeleteButton onClick={() => handleDeleteCategory(cat)}>Delete</DeleteButton>
//               </ButtonGroup>
//             </CategoryCard>
//           ))}
//         </CategoriesGrid>
//       )}

//       {/* 🌟 Custom Form Modal */}
//       {isModalOpen && (
//         <ModalOverlay onClick={closeModal}>
//           <ModalContainer onClick={(e) => e.stopPropagation()}>
//             <ModalTitle>{editingId ? "Edit Category" : "Create New Category"}</ModalTitle>
//             <form onSubmit={handleSaveCategory} style={{ display: "flex", flexDirection: "column", gap: "10px", margin: 0 }}>
//               <StyledInput 
//                 type="text" 
//                 placeholder="Category Title" 
//                 value={titleInput} 
//                 onChange={(e) => setTitleInput(e.target.value)} 
//                 required 
//               />
//               <StyledTextarea 
//                 placeholder="Category Description" 
//                 value={descInput} 
//                 onChange={(e) => setDescInput(e.target.value)} 
//               />
//               <ModalActions>
//                 <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
//                 <SaveButton type="submit">{editingId ? "Save Changes" : "Create Category"}</SaveButton>
//               </ModalActions>
//             </form>
//           </ModalContainer>
//         </ModalOverlay>
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
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  query,
  where,
  writeBatch
} from "firebase/firestore";
import styled from "styled-components";
import Swal from "sweetalert2";

// 🎨 UPDATED THEME COLORS
const PrimaryNavy = "#0B1B48";
const PrimaryCyan = "#00AEEF";
const Dark = "#0f172a";
const Border = "#cbd5e1";
const White = "#ffffff";
const TextMuted = "#475569";
const LightBg = "#f8fafc";
const ThemeGradient = "linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)";
const Danger = "#ef4444";

// 🌟 Styled Components (Strict max 10px spacing/gaps/margins/padding rule)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${Dark};
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-family: inherit;
`;

const HeaderBanner = styled.div`
  background: ${ThemeGradient};
  color: ${White};
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 15px 35px rgba(11, 27, 72, 0.2);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -30px;
    right: -30px;
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    pointer-events: none;
  }
`;

const ColorfulTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 900;
  margin: 0;
  color: ${White};
  letter-spacing: -0.02em;
`;

const ColorfulSub = styled.p`
  font-size: 0.95rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 0 0;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const ColorfulSectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 900;
  margin: 0;
  background: ${ThemeGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PrimaryButton = styled.button`
  background: ${ThemeGradient};
  color: ${White};
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  font-weight: 800;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 15px rgba(0, 174, 239, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 174, 239, 0.4);
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 10px;
`;

const CategoryCard = styled.div`
  background: ${White};
  border-radius: 10px;
  padding: 10px;
  border: 1px solid ${Border};
  border-left: 4px solid ${PrimaryCyan};
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.03);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(0, 174, 239, 0.3);
    box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryName = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: ${Dark};
`;

const CategoryDesc = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${TextMuted};
  word-break: break-word;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 5px;
`;

const EditButton = styled.button`
  background: rgba(0, 174, 239, 0.1);
  color: ${PrimaryCyan};
  border: 1px solid rgba(0, 174, 239, 0.2);
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 174, 239, 0.2);
  }
`;

const DeleteButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  color: ${Danger};
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
  }
`;

const LoadingContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: ${Dark};
  font-weight: 700;
  background: ${White};
  border-radius: 10px;
  border: 1px solid ${Border};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 10px;
  box-sizing: border-box;
`;

const ModalContainer = styled.div`
  background: ${White};
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  max-width: 400px;
  border: 1px solid ${Border};
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.15);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 900;
  background: ${ThemeGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledInput = styled.input`
  border: 1px solid ${Border};
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.9rem;
  outline: none;
  color: ${Dark};
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  font-weight: 600;

  &:focus {
    border-color: ${PrimaryCyan};
    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.15);
  }
`;

const StyledTextarea = styled.textarea`
  border: 1px solid ${Border};
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.9rem;
  outline: none;
  color: ${Dark};
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 70px;
  margin: 0;
  font-weight: 600;

  &:focus {
    border-color: ${PrimaryCyan};
    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.15);
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 5px;
`;

const CancelButton = styled.button`
  background: ${LightBg};
  color: ${TextMuted};
  border: 1px solid ${Border};
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: #cbd5e1;
    color: ${Dark};
  }
`;

const SaveButton = styled.button`
  background: ${ThemeGradient};
  color: ${White};
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 174, 239, 0.2);

  &:hover {
    opacity: 0.95;
  }
`;

export default function CategoriesCrudPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State Controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "categories"));
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(list);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch categories.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitleInput("");
    setDescInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingId(cat.id);
    setTitleInput(cat.title);
    setDescInput(cat.description || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitleInput("");
    setDescInput("");
    setEditingId(null);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!titleInput.trim()) {
      Swal.fire("Validation", "Please enter a category title.", "warning");
      return;
    }

    try {
      if (editingId) {
        const docRef = doc(db, "categories", editingId);
        await updateDoc(docRef, {
          title: titleInput,
          description: descInput,
        });
        Swal.fire("Updated!", "Category updated successfully.", "success");
      } else {
        await addDoc(collection(db, "categories"), {
          title: titleInput,
          description: descInput,
          createdAt: serverTimestamp(),
        });
        Swal.fire("Success!", "Category added successfully.", "success");
      }
      closeModal();
      fetchCategories();
    } catch (error) {
      Swal.fire("Error", "Could not save category.", "error");
    }
  };

  const handleDeleteCategory = async (categoryToDelete) => {
    try {
      const productsQuery = query(collection(db, "products"), where("categoryId", "==", categoryToDelete.id));
      const productsSnapshot = await getDocs(productsQuery);

      if (!productsSnapshot.empty) {
        const categoryOptions = categories
          .filter(cat => cat.id !== categoryToDelete.id)
          .reduce((acc, cat) => {
            acc[cat.id] = cat.title;
            return acc;
          }, { "uncategorized": "Move to Uncategorized" });

        const { value: targetChoice } = await Swal.fire({
          title: "Category Contains Products!",
          text: `There are ${productsSnapshot.size} product(s) in "${categoryToDelete.title}". Where should these products go before deletion?`,
          input: "select",
          inputOptions: categoryOptions,
          inputPlaceholder: "Select a fallback category",
          showCancelButton: true,
          confirmButtonText: "Proceed & Reassign",
          confirmButtonColor: PrimaryCyan,
          cancelButtonColor: TextMuted,
        });

        if (!targetChoice) return;

        const batch = writeBatch(db);

        productsSnapshot.forEach((productDoc) => {
          batch.update(productDoc.ref, { 
            categoryId: targetChoice === "uncategorized" ? null : targetChoice,
            categoryName: targetChoice === "uncategorized" ? "Uncategorized" : categoryOptions[targetChoice]
          });
        });

        const categoryRef = doc(db, "categories", categoryToDelete.id);
        batch.delete(categoryRef);

        await batch.commit();
        Swal.fire("Success!", "Category deleted and products safely reassigned.", "success");
        fetchCategories();
        return;
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: Danger,
        cancelButtonColor: TextMuted,
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteDoc(doc(db, "categories", categoryToDelete.id));
        Swal.fire("Deleted!", "Category has been removed.", "success");
        fetchCategories();
      }
    } catch (error) {
      Swal.fire("Error", "Could not delete category.", "error");
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <LoadingContainer>Loading categories...</LoadingContainer>;
  }

  return (
    <Container>
      <HeaderBanner>
        <ColorfulTitle>Product Categories Management 👜</ColorfulTitle>
        <ColorfulSub>Organize your luxury bag collections, add new artisanal categories, and manage inventory layouts.</ColorfulSub>
      </HeaderBanner>

      <ActionRow>
        <ColorfulSectionTitle>All Categories ({categories.length})</ColorfulSectionTitle>
     
        <StyledInput 
          type="text" 
          placeholder="Search categories by name..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          style={{ maxWidth: "250px", marginRight: "10px" }}
        />

        <PrimaryButton onClick={openAddModal}>
          <span>+ Add Category</span>
        </PrimaryButton>
      </ActionRow>

      {filteredCategories.length === 0 ? (
        <LoadingContainer>No categories found. Click "+ Add Category" to create one.</LoadingContainer>
      ) : (
        <CategoriesGrid>
          {filteredCategories.map((cat) => (
            <CategoryCard key={cat.id}>
              <CardHeader>
                <CategoryName>
                  {cat.title ? cat.title.charAt(0).toUpperCase() + cat.title.slice(1) : ""}
                </CategoryName>
              </CardHeader>
              <CategoryDesc>
                {(() => {
                  const desc = cat.description || "No description provided.";
                  return desc ? desc.charAt(0).toUpperCase() + desc.slice(1) : "";
                })()}
              </CategoryDesc>
              <ButtonGroup>
                <EditButton onClick={() => openEditModal(cat)}>Edit</EditButton>
                <DeleteButton onClick={() => handleDeleteCategory(cat)}>Delete</DeleteButton>
              </ButtonGroup>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      )}

      {/* 🌟 Custom Form Modal */}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{editingId ? "Edit Category" : "Create New Category"}</ModalTitle>
            <form onSubmit={handleSaveCategory} style={{ display: "flex", flexDirection: "column", gap: "10px", margin: 0 }}>
              <StyledInput 
                type="text" 
                placeholder="Category Title" 
                value={titleInput} 
                onChange={(e) => setTitleInput(e.target.value)} 
                required 
              />
              <StyledTextarea 
                placeholder="Category Description" 
                value={descInput} 
                onChange={(e) => setDescInput(e.target.value)} 
              />
              <ModalActions>
                <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
                <SaveButton type="submit">{editingId ? "Save Changes" : "Create Category"}</SaveButton>
              </ModalActions>
            </form>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Container>
  );
}