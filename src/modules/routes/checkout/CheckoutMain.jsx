import { useContext, useState, useEffect } from 'react';
import { Theme } from '../../utilities/Theme';
import { Cart } from '../../utilities/Cart';

import calculateTotal from '../../utilities/calculateTotal';

import NoCartItems from '../root/NoCartItems';
import CheckoutSummary from './CheckoutSummary';
import CheckoutPayForm from './CheckoutPayForm';

import './stylesheets/CheckoutMain.css';

// Although this component is very similar to "CartModal.jsx"
// there are some nuances which led me to decide to create a different component
// rather than attempting to adjust "CartModal.jsx" to accommodate both components
export default function CheckoutMain() {
    const { theme } = useContext(Theme);
    const { cart, updateCart } = useContext(Cart);
    const [showPayForm, setPayFormStatus] = useState(false);

    const [cartItems, setCartItems] = useState(
        Object.keys(cart).map((id) => cart[id])
    );

    useEffect(() => {
        setCartItems(Object.keys(cart).map((id) => cart[id]));
    }, [cart]);

    const totalPrice = calculateTotal(cart);
    const shippingPrice =
        totalPrice * 0.05 >= 15 ? Number((totalPrice * 0.05).toFixed(2)) : 15;

    function handleCartItemRemoval(itemID, index) {
        document
            .querySelector(`#cart-item-${itemID}`)
            .classList.add('fade-out');
        setTimeout(() => {
            const newCartItems = [...cartItems];
            newCartItems.splice(index, 1);
            updateCart(cartItems[index], 0, true);
            setCartItems(newCartItems);
        }, 300);
    }

    function handleQuantityAdjustment(item, quantity) {
        const quantityDelta = quantity - item.quantity;
        updateCart(item, quantityDelta);
    }

    function displayPayForm() {
        document.querySelector('.checkout-main').classList.add('fade-out');
        setTimeout(() => {
            setPayFormStatus(true);
            document
                .querySelector('.checkout-main')
                .classList.remove('fade-out');
            document.querySelector('.checkout-main').classList.add('fade-in');
        }, 525);
    }

    function hidePayForm() {
        document.querySelector('.checkout-main').classList.add('fade-out');
        setTimeout(() => {
            setPayFormStatus(false);
            document
                .querySelector('.checkout-main')
                .classList.remove('fade-out');
            document.querySelector('.checkout-main').classList.add('fade-in');
        }, 525);
    }

    if (cartItems.length === 0) {
        return (
            <div className='checkout-main'>
                <NoCartItems theme={theme} variant={'checkout'} />
            </div>
        );
    }

    return (
        <div className='checkout-main'>
            {showPayForm === true ? (
                <CheckoutPayForm theme={theme} hidePayForm={hidePayForm} />
            ) : (
                <CheckoutSummary
                    cartItems={cartItems}
                    theme={theme}
                    handleCartItemRemoval={handleCartItemRemoval}
                    handleQuantityAdjustment={handleQuantityAdjustment}
                    totalPrice={totalPrice}
                    shippingPrice={shippingPrice}
                    displayPayForm={displayPayForm}
                />
            )}
        </div>
    );
}
