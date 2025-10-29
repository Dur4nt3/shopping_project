import { createContext, useState } from 'react';


// eslint-disable-next-line react-refresh/only-export-components
export const Cart = createContext({});

export default function CartProvider({ children }) {
    const [cart, setCart] = useState({});

    const updateCart = (itemID, quantity) => {
        if (Object.hasOwn(cart, itemID)) {
            const newCart = { ...cart };
            newCart[itemID] += quantity;
            setCart(newCart);
        } else {
            const newCart = { ...cart };
            newCart[itemID] = quantity;
            setCart(newCart);
        }
    }

    return (
        <Cart.Provider value={{ cart, updateCart }}>
            {children}
        </Cart.Provider>
    );
}
