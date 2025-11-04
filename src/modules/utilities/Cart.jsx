import { createContext } from 'react';
import { removeItemFromStorage, adjustItemStorage } from './handleCartStorage';
import useSyncCartItems from './useSyncCartItems';

// eslint-disable-next-line react-refresh/only-export-components
export const Cart = createContext({});

export default function CartProvider({ children }) {
    const { cart, setCart } = useSyncCartItems();

    const updateCart = (itemData, quantity, remove = false) => {
        if (remove) {
            const newCart = { ...cart };
            delete newCart[itemData.id];
            removeItemFromStorage(itemData.id);
            setCart(newCart);
            return;
        }

        if (Object.hasOwn(cart, itemData.id)) {
            const newCart = { ...cart };
            const newQuantity = newCart[itemData.id].quantity + quantity;
            newCart[itemData.id].quantity = newQuantity;
            adjustItemStorage(itemData.id, newQuantity);
            setCart(newCart);
        } else {
            const newCart = { ...cart };
            newCart[itemData.id] = { ...itemData };
            newCart[itemData.id].quantity = quantity;
            adjustItemStorage(itemData.id, quantity);
            setCart(newCart);
        }
    };

    return (
        <Cart.Provider value={{ cart, updateCart }}>{children}</Cart.Provider>
    );
}
