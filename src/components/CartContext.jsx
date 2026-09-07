"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "app_cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) {
          setCart(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Error loading cart from localStorage", error);
      }
    }
  }, []);

  const saveCartToStorage = (updatedCart) => {
    setCart(updatedCart);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
      } catch (error) {
        console.error("Error saving cart to localStorage", error);
      }
    }
  };

  const addToCart = (productToAdd) => {
    const currentCart = [...cart];
    
    // Check if exact variant/product exists
    const existingIndex = currentCart.findIndex(
      (item) =>
        item.id === productToAdd.id &&
        item.selectedColor === productToAdd.selectedColor &&
        item.selectedSize === productToAdd.selectedSize
    );

    if (existingIndex > -1) {
      currentCart[existingIndex].quantity += (productToAdd.quantity || 1);
    } else {
      currentCart.push({
        ...productToAdd,
        quantity: productToAdd.quantity || 1,
      });
    }

    saveCartToStorage(currentCart);
  };

  const updateQuantity = (id, selectedColor, selectedSize, delta) => {
    const updated = cart
      .map((item) => {
        if (
          item.id === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);

    saveCartToStorage(updated);
  };

  const removeFromCart = (id, selectedColor, selectedSize) => {
    const updated = cart.filter(
      (item) =>
        !(
          item.id === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        )
    );
    saveCartToStorage(updated);
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  const cartTotalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price || item.amount || 0) * item.quantity, 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartTotalItems,
      cartSubtotal,
    }),
    [cart, cartTotalItems, cartSubtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}



// "use client";

// import { createContext, useContext, useState, useEffect, useMemo } from "react";

// const CartContext = createContext(null);

// const CART_STORAGE_KEY = "app_cart";

// /**
//  * Helper to generate a unique, consistent identifier string for any item variant,
//  * regardless of what variations are passed (color, size, storage, material, etc.).
//  */
// const getCartItemKey = (item) => {
//   // Base identifier is the product ID
//   let key = item.id;
  
//   // If a custom explicit variantKey was passed, use it
//   if (item.variantKey) return `${item.id}_${item.variantKey}`;

//   // Otherwise, safely extract and sort all dynamic properties starting with "selected" or custom attributes
//   const variantProps = {};
//   Object.keys(item).forEach((keyName) => {
//     if (keyName.startsWith("selected") || keyName === "variant" || keyName === "attributes") {
//       variantProps[keyName] = item[keyName];
//     }
//   });

//   // If variations array exists (e.g. [{name: 'Size', selectedOption: 'XL'}])
//   if (Array.isArray(item.variations)) {
//     item.variations.forEach((v) => {
//       if (v.name && (v.selectedOption || v.options)) {
//         variantProps[v.name] = v.selectedOption || v.options;
//       }
//     });
//   }

//   // Append sorted keys/values to the string key
//   const sortedKeys = Object.keys(variantProps).sort();
//   if (sortedKeys.length > 0) {
//     const serialized = sortedKeys.map((k) => `${k}:${JSON.stringify(variantProps[k])}`).join("|");
//     key += `_${serialized}`;
//   }

//   return key;
// };

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);

//   console.log(cart)

//   // Load cart on client mount
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       try {
//         const saved = localStorage.getItem(CART_STORAGE_KEY);
//         if (saved) {
//           setCart(JSON.parse(saved));
//         }
//       } catch (error) {
//         console.error("Error loading cart from localStorage", error);
//       }
//     }
//   }, []);

//   const saveCartToStorage = (updatedCart) => {
//     setCart(updatedCart);
//     if (typeof window !== "undefined") {
//       try {
//         localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
//       } catch (error) {
//         console.error("Error saving cart to localStorage", error);
//       }
//     }
//   };

//   const addToCart = (productToAdd) => {
//     const currentCart = [...cart];
//     const targetKey = getCartItemKey(productToAdd);

//     // Check if exact variant hash exists using our dynamic helper
//     const existingIndex = currentCart.findIndex((item) => getCartItemKey(item) === targetKey);

//     if (existingIndex > -1) {
//       currentCart[existingIndex].quantity += (productToAdd.quantity || 1);
//     } else {
//       currentCart.push({
//         ...productToAdd,
//         quantity: productToAdd.quantity || 1,
//       });
//     }

//     saveCartToStorage(currentCart);
//   };

//   const updateQuantity = (productOrIdentifier, delta, oldColor, oldSize) => {
//     // Supports matching either via full product object or passing exact variation attributes
//     let targetKey = "";
//     if (typeof productOrIdentifier === "object" && productOrIdentifier !== null) {
//       targetKey = getCartItemKey(productOrIdentifier);
//     } else {
//       // Legacy fallback support
//       targetKey = getCartItemKey({ id: productOrIdentifier, selectedColor: oldColor, selectedSize: oldSize });
//     }

//     const updated = cart
//       .map((item) => {
//         if (getCartItemKey(item) === targetKey) {
//           const newQty = item.quantity + delta;
//           return newQty > 0 ? { ...item, quantity: newQty } : null;
//         }
//         return item;
//       })
//       .filter(Boolean);

//     saveCartToStorage(updated);
//   };

//   const removeFromCart = (productOrIdentifier, oldColor, oldSize) => {
//     let targetKey = "";
//     if (typeof productOrIdentifier === "object" && productOrIdentifier !== null) {
//       targetKey = getCartItemKey(productOrIdentifier);
//     } else {
//       targetKey = getCartItemKey({ id: productOrIdentifier, selectedColor: oldColor, selectedSize: oldSize });
//     }

//     const updated = cart.filter((item) => getCartItemKey(item) !== targetKey);
//     saveCartToStorage(updated);
//   };

//   const clearCart = () => {
//     saveCartToStorage([]);
//   };

//   const cartTotalItems = useMemo(() => {
//     return cart.reduce((acc, item) => acc + item.quantity, 0);
//   }, [cart]);

//   const cartSubtotal = useMemo(() => {
//     return cart.reduce((sum, item) => sum + (item.price || item.amount || 0) * item.quantity, 0);
//   }, [cart]);

//   const value = useMemo(
//     () => ({
//       cart,
//       addToCart,
//       updateQuantity,
//       removeFromCart,
//       clearCart,
//       cartTotalItems,
//       cartSubtotal,
//     }),
//     [cart, cartTotalItems, cartSubtotal]
//   );

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// }