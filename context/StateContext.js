import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast"

const Context = createContext();

export const StateContext = ({ children }) => {
   const [showCart, setShowCart] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [totalPrice, setTotalPrice] = useState(0);
   // Total cart quantity
   const [totalQuantities, setTotalQuantities] = useState(0);
   const [qty, setQty] = useState(1);

   // Add to cart button
   const onAdd = (product, quantity) => {
      const checkProductInCart = cartItems.find(item => item._id === product._id);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

      if (checkProductInCart) {
         const updatedCartItems = cartItems.map((cartProduct) => {
            if (cartProduct._id === product._id)
               return {
                  ...cartProduct,
                  quantity: cartProduct.quantity + quantity
               }
         })

         setCartItems(updatedCartItems)
      } // if product doesn't contain previously  
      else {
         product.quantity = quantity;
         setCartItems([...cartItems, { ...product }]);

      }
      toast.success(`${qty} ${product.name} is added to cart.`)
   }

   // product remove button
   const onRemove = (product) => {
      foundProduct = cartItems.find(item => item._id === product._id);
      index = cartItems.findIndex(index => index._id === product._id);

      const newCartItem = cartItems.filter(item => item._id !== product._id);

      setTotalPrice(prevTotalPrice => prevTotalPrice - product.price * product.quantity);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities - product.quantity);
      setCartItems(newCartItem);

   }
   // Increase product quantity
   const incQty = () => {
      setQty((prevQty) => prevQty + 1)
   }
   // Decrease product quantity
   const decQty = () => {
      setQty((prevQty) => {
         if (prevQty - 1 < 1)
            return 1;

         return prevQty - 1;
      })
   }

   let foundProduct;
   let index;
   // cart functionality 
   const toggleCartItemQuantity = (id, value) => {
      foundProduct = cartItems.find((item) => item._id === id);
      index = cartItems.findIndex((product) => product._id === id);

      const newCartItem = cartItems.filter((item) => item._id !== id);
      if (value === 'inc') {
         setCartItems([...newCartItem, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
         setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
         setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)

      } else if (value === 'dec') {
         if (foundProduct.quantity > 1) {
            setCartItems([...newCartItem, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
         }
      }
   }

   return (
      <Context.Provider
         value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice, 
            setTotalQuantities,
         }} >
         {children}
      </Context.Provider>
   )
}

export const useStateContext = () => useContext(Context);