


// 'use client'
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { db, auth } from '@/firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
// import { 
//   collection, 
//   addDoc, 
//   updateDoc,
//   getDocs, 
//   deleteDoc, 
//   doc, 
//   getDoc,
//   query, 
//   where, 
//   serverTimestamp 
// } from 'firebase/firestore';
// import Swal from 'sweetalert2';
// import { useRouter } from 'next/navigation';

// export default function AddressManager({ onSelectAddress }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loadingAuth, setLoadingAuth] = useState(true);

//   const [addresses, setAddresses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [selectedId, setSelectedId] = useState(null);
//   const router = useRouter();

//   // Form State
//   const [formData, setFormData] = useState({
//     fullName: '',
//     phone: '',
//     street: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     country: 'Nigeria',
//     isDefault: false
//   });

//   // Listen to Firebase Auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setCurrentUser(user);
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const userSnap = await getDoc(userRef);

//           if (userSnap.exists()) {
//             setUserData(userSnap.data());
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       } else {
//         setCurrentUser(null);
//         setUserData(null);
//       }
//       setLoadingAuth(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const activeUserId = currentUser?.uid;

//   const fetchAddresses = async () => {
//     if (!activeUserId) return;
//     try {
//       setLoading(true);
//       const q = query(collection(db, 'addresses'), where('userId', '==', activeUserId));
//       const querySnapshot = await getDocs(q);
//       const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setAddresses(list);
      
//       const defaultAddr = list.find(a => a.isDefault);
//       if (defaultAddr && !selectedId) {
//         setSelectedId(defaultAddr.id);
//       }
//     } catch (error) {
//       console.error("Error fetching addresses: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeUserId) {
//       fetchAddresses();
//     }
//   }, [activeUserId]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleOpenAdd = () => {
//     setEditingId(null);
//     setFormData({
//       fullName: '',
//       phone: '',
//       street: '',
//       city: '',
//       state: '',
//       postalCode: '',
//       country: 'Nigeria',
//       isDefault: false
//     });
//     setShowForm(true);
//   };

//   const handleOpenEdit = (addr) => {
//     setEditingId(addr.id);
//     setFormData({
//       fullName: addr.fullName || '',
//       phone: addr.phone || '',
//       street: addr.street || '',
//       city: addr.city || '',
//       state: addr.state || '',
//       postalCode: addr.postalCode || '',
//       country: addr.country || 'Nigeria',
//       isDefault: !!addr.isDefault
//     });
//     setShowForm(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!activeUserId) return;
//     try {
//       if (editingId) {
//         // Update existing address
//         const addressRef = doc(db, 'addresses', editingId);
//         await updateDoc(addressRef, {
//           ...formData,
//           updatedAt: serverTimestamp()
//         });
//       } else {
//         // Add new address
//         await addDoc(collection(db, 'addresses'), {
//           ...formData,
//           userId: activeUserId,
//           createdAt: serverTimestamp()
//         });
//       }

//       setFormData({
//         fullName: '',
//         phone: '',
//         street: '',
//         city: '',
//         state: '',
//         postalCode: '',
//         country: 'Nigeria',
//         isDefault: false
//       });
//       setEditingId(null);
//       setShowForm(false);
//       fetchAddresses();
//     } catch (error) {
//       console.error("Error saving address: ", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#ec4899',
//       cancelButtonColor: '#ef4444',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (!result.isConfirmed) return;

//     try {
//       await deleteDoc(doc(db, 'addresses', id));
//       if (selectedId === id) {
//         setSelectedId(null);
//       }
//       fetchAddresses();
//       Swal.fire(
//         'Deleted!',
//         'Your address has been deleted.',
//         'success'
//       );
//     } catch (error) {
//       console.error("Error deleting address: ", error);
//       Swal.fire(
//         'Error!',
//         'Failed to delete the address. Please try again.',
//         'error'
//       );
//     }
//   };

//   const handleUseAddress = (addr) => {
//     try {
//       localStorage.setItem('selectedAddress', JSON.stringify(addr));
//       setSelectedId(addr.id);
//       if (onSelectAddress) {
//         onSelectAddress(addr);
//       }
//       router.push('/dashboard/order-summary'); // Adjust the route path as needed for your application
//     } catch (error) {
//       console.error("Error saving selected address to localStorage:", error);
//     }
//   };

//   if (loadingAuth) {
//     return <LoadingText>Loading user session...</LoadingText>;
//   }

//   if (!activeUserId) {
//     return <LoadingText>Please log in to manage your addresses.</LoadingText>;
//   }

//   if (loading) return <LoadingText>Loading addresses...</LoadingText>;

//   return (
//     <Container>
//       <HeaderRow>
//         <h3>Select your Delivery Address</h3>
//         {!showForm && (
//           <PrimaryButton onClick={handleOpenAdd}>+ Add New Address</PrimaryButton>
//         )}
//       </HeaderRow>

//       {showForm && (
//         <AddressForm onSubmit={handleSubmit}>
//           <h4>{editingId ? 'Edit Delivery Address' : 'Add New Delivery Address'}</h4>
//           <FormGrid>
//             <Input 
//               type="text" 
//               name="fullName" 
//               placeholder="Full Name" 
//               value={formData.fullName} 
//               onChange={handleChange} 
//               required 
//             />
//             <Input 
//               type="tel" 
//               name="phone" 
//               placeholder="Phone Number" 
//               value={formData.phone} 
//               onChange={handleChange} 
//               required 
//             />
//             <Input 
//               type="text" 
//               name="street" 
//               placeholder="Street Address (e.g. 15 Admiralty Way)" 
//               value={formData.street} 
//               onChange={handleChange} 
//               required 
//               style={{ gridColumn: '1 / -1' }}
//             />
//             <Input 
//               type="text" 
//               name="city" 
//               placeholder="City" 
//               value={formData.city} 
//               onChange={handleChange} 
//               required 
//             />
//             <Input 
//               type="text" 
//               name="state" 
//               placeholder="State/Province" 
//               value={formData.state} 
//               onChange={handleChange} 
//               required 
//             />
//             <Input 
//               type="text" 
//               name="postalCode" 
//               placeholder="Postal Code (Optional)" 
//               value={formData.postalCode} 
//               onChange={handleChange} 
//             />
//             <Input 
//               type="text" 
//               name="country" 
//               placeholder="Country" 
//               value={formData.country} 
//               onChange={handleChange} 
//               required 
//             />
//           </FormGrid>
//           <br/>
//           {/* <CheckboxLabel>
//             <input 
//               type="checkbox" 
//               name="isDefault" 
//               checked={formData.isDefault} 
//               onChange={handleChange} 
//             />
//             Set as default shipping address
//           </CheckboxLabel> */}
//           <ButtonRow>
//             <PrimaryButton type="submit">{editingId ? 'Update Address' : 'Save Address'}</PrimaryButton>
//             <SecondaryButton type="button" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</SecondaryButton>
//           </ButtonRow>
//         </AddressForm>
//       )}

//       <AddressGrid>
//         {addresses.length === 0 ? (
//           !showForm && (
//             <EmptyContainer>
//               <EmptyText>
//                 No saved addresses found. Please add an address to continue.
//               </EmptyText>
//               <PrimaryButton onClick={handleOpenAdd}>+ Add New Address</PrimaryButton>
//             </EmptyContainer>
//           )
//         ) : (
//           addresses.map((addr) => (
//             <AddressCard 
//               key={addr.id} 
//               selected={selectedId === addr.id}
//             >
//               {addr.isDefault && <DefaultBadge>Default</DefaultBadge>}
//               <AddrName>{addr.fullName}</AddrName>
//               <AddrText>{addr.street}</AddrText>
//               <AddrText>{addr.city}, {addr.state} {addr.postalCode}</AddrText>
//               <AddrText>{addr.country}</AddrText>
//               <AddrText>Phone: {addr.phone}</AddrText>

//               <CardActions>
//                 <ActionGroup>
//                   <EditBtn type="button" onClick={() => handleOpenEdit(addr)}>
//                     Edit
//                   </EditBtn>
//                   <DeleteBtn type="button" onClick={() => handleDelete(addr.id)}>
//                     Delete
//                   </DeleteBtn>
//                 </ActionGroup>
                
//                 <UseAddressButton 
//                   selected={selectedId === addr.id}
//                   type="button" 
//                   onClick={() => handleUseAddress(addr)}
//                 >
//                   USE THIS ADDRESS
//                 </UseAddressButton>
//               </CardActions>
//             </AddressCard>
//           ))
//         )}
//       </AddressGrid>
//     </Container>
//   );
// }

// // --- Styled Components (Theme Colors Set) ---

// const PrimaryColor = "#ec4899"; // Vibrant Pink from the logo
// const AccentGradient = "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)"; // Pink -> Orange -> Turquoise
// const Dark = "#1e293b";
// const Border = "#e2e8f0";
// const White = "#ffffff";
// const Turquoise = "#06b6d4";

// const Container = styled.div`
//   width: 100%;
//   box-sizing: border-box;
//   color: ${Dark};
// `;

// const HeaderRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 24px;
//   border-bottom: 2px solid ${Turquoise};
//   padding-bottom: 12px;

//   h3 {
//     margin: 0;
//     font-size: 1.35rem;
//     color: ${PrimaryColor};
//     font-weight: 800;
//     letter-spacing: 0.5px;
//   }
// `;

// const PrimaryButton = styled.button`
//   background: ${AccentGradient};
//   color: ${White}; 
//   border: none;
//   padding: 10px 18px;
//   border-radius: 8px;
//   font-weight: 700;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   box-shadow: 0 4px 14px rgba(236, 72, 153, 0.25);

//   &:hover { 
//     opacity: 0.92;
//     transform: translateY(-1px);
//     box-shadow: 0 6px 18px rgba(236, 72, 153, 0.35);
//   }
// `;

// const SecondaryButton = styled.button`
//   background: #f8fafc;
//   color: ${Dark};
//   border: 1px solid ${Border};
//   padding: 10px 16px;
//   border-radius: 8px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover { 
//     background: ${Border};
//     color: ${PrimaryColor};
//   }
// `;

// const AddressForm = styled.form`
//   background: ${White};
//   border: 1px solid ${Border};
//   border-top: 4px solid ${PrimaryColor};
//   border-radius: 12px;
//   padding: 24px;
//   margin-bottom: 28px;
//   box-shadow: 0 8px 24px rgba(30, 41, 59, 0.04);

//   h4 {
//     margin-top: 0;
//     margin-bottom: 18px;
//     font-size: 1.15rem;
//     color: ${PrimaryColor};
//     font-weight: 700;
//   }
// `;

// const FormGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 14px;

//   @media (max-width: 600px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const Input = styled.input`
//   padding: 12px;
//   border: 1px solid ${Border};
//   border-radius: 8px;
//   font-size: 0.95rem;
//   width: 100%;
//   box-sizing: border-box;
//   background: #f8fafc;
//   color: ${Dark};
//   transition: all 0.2s ease;

//   &:focus { 
//     outline: none; 
//     border-color: ${PrimaryColor}; 
//     box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.2);
//     background: ${White};
//   }
// `;

// const CheckboxLabel = styled.label`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   margin: 18px 0;
//   font-size: 0.9rem;
//   color: ${Dark};
//   cursor: pointer;
// `;

// const ButtonRow = styled.div`
//   display: flex;
//   gap: 12px;
// `;

// const AddressGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//   gap: 18px;
// `;

// const AddressCard = styled.div`
//   background: ${White};
//   border: 2px solid ${props => props.selected ? PrimaryColor : Border};
//   border-top: 4px solid ${props => props.selected ? Turquoise : PrimaryColor};
//   border-radius: 12px;
//   padding: 20px;
//   position: relative;
//   box-shadow: ${props => props.selected ? '0 6px 16px rgba(236, 72, 153, 0.12)' : '0 2px 6px rgba(30, 41, 59, 0.02)'};
//   transition: all 0.2s ease;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;

//   &:hover {
//     border-color: ${PrimaryColor};
//     box-shadow: 0 6px 18px rgba(6, 182, 212, 0.15);
//   }
// `;

// const DefaultBadge = styled.span`
//   position: absolute;
//   top: 16px;
//   right: 16px;
//   background: #fdf2f8;
//   color: ${PrimaryColor};
//   border: 1px solid rgba(236, 72, 153, 0.3);
//   font-size: 0.75rem;
//   padding: 3px 8px;
//   border-radius: 6px;
//   font-weight: 700;
//   letter-spacing: 0.05em;
//   text-transform: uppercase;
// `;

// const AddrName = styled.h4`
//   margin: 0 0 8px 0;
//   font-size: 1.05rem;
//   color: ${Dark};
//   font-weight: 700;
// `;

// const AddrText = styled.p`
//   margin: 4px 0;
//   font-size: 0.9rem;
//   color: #64748b;
// `;

// const CardActions = styled.div`
//   margin-top: 18px;
//   padding-top: 12px;
//   border-top: 1px solid ${Border};
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
// `;

// const ActionGroup = styled.div`
//   display: flex;
//   gap: 12px;
//   align-items: center;
// `;

// const EditBtn = styled.button`
//   background: transparent;
//   color: ${PrimaryColor};
//   border: none;
//   font-size: 0.85rem;
//   cursor: pointer;
//   font-weight: 700;
//   padding: 0;
//   transition: color 0.2s ease;

//   &:hover { 
//     color: ${Turquoise};
//     text-decoration: underline; 
//   }
// `;

// const DeleteBtn = styled.button`
//   background: transparent;
//   color: #ef4444;
//   border: none;
//   font-size: 0.85rem;
//   cursor: pointer;
//   font-weight: 700;
//   padding: 0;
//   transition: opacity 0.2s ease;

//   &:hover { 
//     opacity: 0.8;
//     text-decoration: underline; 
//   }
// `;

// const UseAddressButton = styled.button`
//   width: 100%;
//   background: ${AccentGradient};
//   color: ${White};
//   border: none;
//   padding: 10px 14px;
//   border-radius: 8px;
//   font-size: 0.85rem;
//   font-weight: 700;
//   letter-spacing: 0.5px;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     opacity: 0.92;
//     background: ${AccentGradient};
//   }
// `;

// const LoadingText = styled.p`
//   color: ${PrimaryColor};
//   font-size: 0.95rem;
//   font-weight: 600;
// `;

// const EmptyContainer = styled.div`
//   grid-column: 1 / -1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   padding: 40px 20px;
//   gap: 20px;
// `;

// const EmptyText = styled.p`
//   color: ${Dark};
//   font-size: 1.25rem;
//   font-weight: 700;
//   margin: 0;
// `;







'use client'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db, auth } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  updateDoc,
  getDocs, 
  deleteDoc, 
  doc, 
  getDoc,
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

// 🎨 NAVY & CYAN THEME COLORS & GRADIENTS
const PrimaryNavy = "#0B1B48";
const PrimaryCyan = "#00AEEF";
const ThemeGradient = "linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)";
const Dark = "#0f172a";
const Border = "#e5eaf2";
const White = "#ffffff";
const TextMuted = "#475569";
const Danger = "#ef4444";

export default function AddressManager({ onSelectAddress }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Nigeria',
    isDefault: false
  });

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const activeUserId = currentUser?.uid;

  const fetchAddresses = async () => {
    if (!activeUserId) return;
    try {
      setLoading(true);
      const q = query(collection(db, 'addresses'), where('userId', '==', activeUserId));
      const querySnapshot = await getDocs(q);
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAddresses(list);
      
      const defaultAddr = list.find(a => a.isDefault);
      if (defaultAddr && !selectedId) {
        setSelectedId(defaultAddr.id);
      }
    } catch (error) {
      console.error("Error fetching addresses: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeUserId) {
      fetchAddresses();
    }
  }, [activeUserId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Nigeria',
      isDefault: false
    });
    setShowForm(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingId(addr.id);
    setFormData({
      fullName: addr.fullName || '',
      phone: addr.phone || '',
      street: addr.street || '',
      city: addr.city || '',
      state: addr.state || '',
      postalCode: addr.postalCode || '',
      country: addr.country || 'Nigeria',
      isDefault: !!addr.isDefault
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activeUserId) return;
    try {
      if (editingId) {
        const addressRef = doc(db, 'addresses', editingId);
        await updateDoc(addressRef, {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'addresses'), {
          ...formData,
          userId: activeUserId,
          createdAt: serverTimestamp()
        });
      }

      setFormData({
        fullName: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Nigeria',
        isDefault: false
      });
      setEditingId(null);
      setShowForm(false);
      fetchAddresses();
    } catch (error) {
      console.error("Error saving address: ", error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: PrimaryNavy,
      cancelButtonColor: Danger,
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      await deleteDoc(doc(db, 'addresses', id));
      if (selectedId === id) {
        setSelectedId(null);
      }
      fetchAddresses();
      Swal.fire(
        'Deleted!',
        'Your address has been deleted.',
        'success'
      );
    } catch (error) {
      console.error("Error deleting address: ", error);
      Swal.fire(
        'Error!',
        'Failed to delete the address. Please try again.',
        'error'
      );
    }
  };

  const handleUseAddress = (addr) => {
    try {
      localStorage.setItem('selectedAddress', JSON.stringify(addr));
      setSelectedId(addr.id);
      if (onSelectAddress) {
        onSelectAddress(addr);
      }
      router.push('/dashboard/order-summary');
    } catch (error) {
      console.error("Error saving selected address to localStorage:", error);
    }
  };

  if (loadingAuth) {
    return <LoadingText>Loading user session...</LoadingText>;
  }

  if (!activeUserId) {
    return <LoadingText>Please log in to manage your addresses.</LoadingText>;
  }

  if (loading) return <LoadingText>Loading addresses...</LoadingText>;

  return (
    <Container>
      <HeaderRow>
        <h3>Select your Delivery Address</h3>
        {!showForm && (
          <PrimaryButton onClick={handleOpenAdd}>+ Add New Address</PrimaryButton>
        )}
      </HeaderRow>

      {showForm && (
        <AddressForm onSubmit={handleSubmit}>
          <h4>{editingId ? 'Edit Delivery Address' : 'Add New Delivery Address'}</h4>
          <FormGrid>
            <Input 
              type="text" 
              name="fullName" 
              placeholder="Full Name" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
            />
            <Input 
              type="tel" 
              name="phone" 
              placeholder="Phone Number" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
            <Input 
              type="text" 
              name="street" 
              placeholder="Street Address (e.g. 15 Admiralty Way)" 
              value={formData.street} 
              onChange={handleChange} 
              required 
              style={{ gridColumn: '1 / -1' }}
            />
            <Input 
              type="text" 
              name="city" 
              placeholder="City" 
              value={formData.city} 
              onChange={handleChange} 
              required 
            />
            <Input 
              type="text" 
              name="state" 
              placeholder="State/Province" 
              value={formData.state} 
              onChange={handleChange} 
              required 
            />
            <Input 
              type="text" 
              name="postalCode" 
              placeholder="Postal Code (Optional)" 
              value={formData.postalCode} 
              onChange={handleChange} 
            />
            <Input 
              type="text" 
              name="country" 
              placeholder="Country" 
              value={formData.country} 
              onChange={handleChange} 
              required 
            />
          </FormGrid>
          <div style={{ height: '10px' }} />
          <ButtonRow>
            <PrimaryButton type="submit">{editingId ? 'Update Address' : 'Save Address'}</PrimaryButton>
            <SecondaryButton type="button" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</SecondaryButton>
          </ButtonRow>
        </AddressForm>
      )}

      <AddressGrid>
        {addresses.length === 0 ? (
          !showForm && (
            <EmptyContainer>
              <EmptyText>
                No saved addresses found. Please add an address to continue.
              </EmptyText>
              <PrimaryButton onClick={handleOpenAdd}>+ Add New Address</PrimaryButton>
            </EmptyContainer>
          )
        ) : (
          addresses.map((addr) => (
            <AddressCard 
              key={addr.id} 
              selected={selectedId === addr.id}
            >
              {addr.isDefault && <DefaultBadge>Default</DefaultBadge>}
              <AddrName>{addr.fullName}</AddrName>
              <AddrText>{addr.street}</AddrText>
              <AddrText>{addr.city}, {addr.state} {addr.postalCode}</AddrText>
              <AddrText>{addr.country}</AddrText>
              <AddrText>Phone: {addr.phone}</AddrText>

              <CardActions>
                <ActionGroup>
                  <EditBtn type="button" onClick={() => handleOpenEdit(addr)}>
                    Edit
                  </EditBtn>
                  <DeleteBtn type="button" onClick={() => handleDelete(addr.id)}>
                    Delete
                  </DeleteBtn>
                </ActionGroup>
                
                <UseAddressButton 
                  selected={selectedId === addr.id}
                  type="button" 
                  onClick={() => handleUseAddress(addr)}
                >
                  USE THIS ADDRESS
                </UseAddressButton>
              </CardActions>
            </AddressCard>
          ))
        )}
      </AddressGrid>
    </Container>
  );
}

// --- Styled Components (Navy & Cyan Theme Applied) ---

const Container = styled.div`
  background: ${White};
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.04);
  border: 1px solid ${Border};
  box-sizing: border-box;
  width: 100%;
  color: ${Dark};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
  border-bottom: 2px solid ${PrimaryCyan};
  padding-bottom: 10px;

  h3 {
    margin: 0;
    font-size: 20px;
    color: ${PrimaryNavy};
    font-weight: 800;
  }
`;

const PrimaryButton = styled.button`
  background: ${ThemeGradient};
  color: ${White}; 
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(11, 27, 72, 0.25);

  &:hover { 
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.button`
  background: #F8FAFC;
  color: ${Dark};
  border: 1px solid ${Border};
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover { 
    background: ${Border};
    border-color: ${PrimaryCyan};
  }
`;

const AddressForm = styled.form`
  background: ${White};
  border: 1px solid ${Border};
  border-top: 4px solid ${PrimaryCyan};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  gap: 10px;

  h4 {
    margin: 0;
    font-size: 15px;
    color: ${PrimaryNavy};
    font-weight: 700;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid ${Border};
  border-radius: 6px;
  font-size: 13px;
  width: 100%;
  box-sizing: border-box;
  background: #F8FAFC;
  color: ${Dark};
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

  &:focus { 
    border-color: ${PrimaryCyan}; 
    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.15);
    background: ${White};
  }

  &::placeholder {
    color: ${TextMuted};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 10px;
  width: 100%;
`;

const AddressCard = styled.div`
  background: ${White};
  border: 1px solid ${props => props.selected ? PrimaryCyan : Border};
  border-left: 4px solid ${props => props.selected ? PrimaryCyan : PrimaryNavy};
  border-radius: 10px;
  padding: 10px;
  position: relative;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 174, 239, 0.08);
  }
`;

const DefaultBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 174, 239, 0.1);
  color: ${PrimaryCyan};
  border: 1px solid rgba(0, 174, 239, 0.3);
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
  text-transform: uppercase;
`;

const AddrName = styled.h4`
  margin: 0;
  font-size: 14px;
  color: ${PrimaryNavy};
  font-weight: 700;
`;

const AddrText = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${TextMuted};
`;

const CardActions = styled.div`
  margin-top: 4px;
  padding-top: 8px;
  border-top: 1px solid ${Border};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const EditBtn = styled.button`
  background: transparent;
  color: ${PrimaryCyan};
  border: none;
  font-size: 12px;
  cursor: pointer;
  font-weight: 700;
  padding: 0;
  transition: opacity 0.2s ease;

  &:hover { 
    text-decoration: underline; 
  }
`;

const DeleteBtn = styled.button`
  background: transparent;
  color: ${Danger};
  border: none;
  font-size: 12px;
  cursor: pointer;
  font-weight: 700;
  padding: 0;
  transition: opacity 0.2s ease;

  &:hover { 
    opacity: 0.8;
    text-decoration: underline; 
  }
`;

const UseAddressButton = styled.button`
  width: 100%;
  background: ${ThemeGradient};
  color: ${White};
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(11, 27, 72, 0.25);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const LoadingText = styled.p`
  color: ${PrimaryNavy};
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  padding: 10px;
`;

const EmptyContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  gap: 10px;
`;

const EmptyText = styled.p`
  color: ${Dark};
  font-size: 14px;
  font-weight: 700;
  margin: 0;
`;