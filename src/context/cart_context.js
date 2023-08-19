import React, { useEffect, useContext, useReducer, useState } from "react";

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const getLocalStorage = () => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.parse(cart);
    } else return [];
  };

  const [cart, setCart] = useState(getLocalStorage());
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingFee, setShippingFee] = useState(150);

  const addToCart = (id, color, amount, product) => {
    const tempItem = cart.find((i) => i.id === id + color);
    if (tempItem) {
      const tempCart = cart.map((item) => {
        if (item.id === id + color) {
          let newAmount = item.amount + amount;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        } else return item;
      });
      setCart(tempCart);
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      setCart([...cart, newItem]);
    }
  };
  const removeItem = (id) => {
    const tempCart = cart.filter((item) => item.id != id);
    setCart(tempCart);
  };
  const toggleAmount = (id, ref) => {
    const tempCart = cart.map((item) => {
      if (item.id === id) {
        let newAmount = item.amount;

        if (ref === "inc") {
          newAmount += 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          console.log(id,ref);
        }

        if (ref === "dec") {
          newAmount -= 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          console.log(id,ref);
        }

        return { ...item, amount: newAmount };
      } else {
        return item;
      }
    });

    setCart(tempCart);
  };
  const clearItems = () => {
    setCart([]);
  };

  const calculateTotalValues = () => {
    let newTotalItems = 0;
    let newTotalAmount = 0;

    cart.forEach((item) => {
      newTotalItems += item.amount;
      newTotalAmount += item.amount * item.price;
    });

    setTotalItems(newTotalItems);
    setTotalAmount(newTotalAmount);
  };
  
  useEffect(() => {
    calculateTotalValues();
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        totalItems,
        shippingFee,
        addToCart,
        removeItem,
        toggleAmount,
        clearItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
