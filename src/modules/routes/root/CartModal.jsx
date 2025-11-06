import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Theme } from '../../utilities/Theme';
import { Cart } from '../../utilities/Cart';

import calculateTotal from '../../utilities/calculateTotal';

import NoCartItems from './NoCartItems';
import CartItem from './CartItem';

import closeLight from '../../../assets/media/icons/light/close.svg';
import closeDark from '../../../assets/media/icons/dark/close.svg';

import './stylesheets/CartModal.css';

export default function CartModal({ setCartStatus }) {
    const { theme } = useContext(Theme);
    const { cart, updateCart } = useContext(Cart);
    const navigate = useNavigate();
    const location = useLocation();

    const [cartItems, setCartItems] = useState(
        Object.keys(cart).map((id) => cart[id])
    );

    const totalPrice = calculateTotal(cart);

    useEffect(() => {
        setTimeout(() => {
            document
                .querySelector('.cart-modal')
                .classList.remove('cart-entrance');
        }, 1000);
    }, []);

    function exitCart() {
        const cartModal = document.querySelector('.cart-modal');
        cartModal.querySelector('.close-modal').disabled = true;
        cartModal.classList.add('cart-exit');
        setTimeout(() => {
            setCartStatus(false);
        }, 600);
    }

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

    if (cartItems.length === 0) {
        return (
            <div className="page-modal">
                <div className='cart-modal cart-entrance'>
                    <button
                        className='close-modal'
                        aria-label='close cart'
                        onClick={() => exitCart()}
                    >
                        <img
                            src={theme === 'light' ? closeLight : closeDark}
                            alt=''
                        />
                    </button>
                    <NoCartItems theme={theme} />
                </div>
            </div>
        );
    }

    return (
        <div className="page-modal">
            <div className='cart-modal cart-entrance'>
                <button
                    className='close-modal'
                    aria-label='close cart'
                    onClick={() => exitCart()}
                >
                    <img src={theme === 'light' ? closeLight : closeDark} alt='' />
                </button>
                <h1>Order Summary</h1>
                <div className='added-items-cont'>
                    {cartItems.map((item, index) => (
                        <CartItem
                            key={item.id}
                            theme={theme}
                            item={item}
                            index={index}
                            handleCartItemRemoval={handleCartItemRemoval}
                            handleQuantityAdjustment={handleQuantityAdjustment}
                        />
                    ))}
                </div>
                <div className='checkout-button-wrapper'>
                    <div className='all-items-price'>
                        <span>Subtotal:</span>
                        <span className='highlight-text'>${totalPrice}</span>
                    </div>
                    <button
                        className='checkout-button'
                        onClick={() => {
                            if (location.pathname === '/checkout') {
                                exitCart();
                                return;
                            }
                            navigate('/checkout')
                        }}
                    >
                        To Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
