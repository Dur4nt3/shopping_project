import { useEffect, useState } from 'react';

export default function useSyncCartItems() {
    const [cart, setCart] = useState({});

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems !== null) {
            const addedItemIDs = cartItems.map((item) => item.id);
            fetch('https://fakestoreapi.com/products')
                .then((response) => {
                    if (response.status >= 400) {
                        throw new Error('server error');
                    }
                    return response.json();
                })
                .then((jsonData) => {
                    const newCart = {};
                    for (const item of jsonData) {
                        // Added all the items
                        if (
                            Object.keys(newCart).length === addedItemIDs.length
                        ) {
                            break;
                        }

                        const indexOfID = addedItemIDs.indexOf(item.id);

                        if (indexOfID >= 0) {
                            newCart[item.id] = { ...item };
                            newCart[item.id].quantity =
                                cartItems[indexOfID].quantity;
                        }
                    }
                    setCart(newCart);
                })
                .catch((error) => console.error(error));
        }
    }, []);

    return { cart, setCart };
}
