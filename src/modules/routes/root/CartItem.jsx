import { useState } from 'react';
import CartItemCountController from './CartItemCountController';

import closeLight from '../../../assets/media/icons/light/close.svg';
import closeDark from '../../../assets/media/icons/dark/close.svg';

export default function CartItem({
    theme,
    item,
    index,
    handleCartItemRemoval,
    handleQuantityAdjustment,
}) {
    const [quantity, setQuantity] = useState(item.quantity);
    const [queueRemoval, setQueueRemoval] = useState(false);

    function removeItem() {
        setQueueRemoval(true);

        setTimeout(() => {
            handleCartItemRemoval(item.id, index);
        }, 300)
    }

    function setOrderCount(quantity) {
        if (quantity < 0 || quantity > 10 || quantity === null) {
            return;
        }

        handleQuantityAdjustment(item, quantity);
        setQuantity(quantity);
    }

    return (
        <div
            className={queueRemoval ? 'cart-item fade-out' : 'cart-item'}
            key={item.id}
            id={`cart-item-${item.id}`}
        >
            <div className='item-img-cont'>
                <img src={item.image} alt={item.title} />
            </div>

            <div className='cart-item-info'>
                <h2 className='cart-item-category'>{item.category}</h2>
                <h2 className='cart-item-title'>{item.title}</h2>
            </div>

            <div className='quantity-cont'>
                <p className='price-total'>${quantity * item.price}</p>
                <p className='price-one'>${item.price} each</p>
                <div className='quantity-controller'>
                    <CartItemCountController
                        theme={theme}
                        quantity={quantity}
                        setOrderCount={setOrderCount}
                    />
                </div>
            </div>

            <button
                className='remove-from-cart'
                aria-label='remove item from cart'
                onClick={() => removeItem()}
            >
                <img src={theme === 'light' ? closeLight : closeDark} alt='' />
            </button>
        </div>
    );
}
