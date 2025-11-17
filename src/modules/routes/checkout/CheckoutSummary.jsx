import { useState } from 'react';
import CartItem from '../root/CartItem';

export default function CheckoutSummary({
    cartItems,
    theme,
    handleCartItemRemoval,
    handleQuantityAdjustment,
    totalPrice,
    shippingPrice,
    setPayFormStatus,
}) {
    const [queueHide, setQueueHide] = useState(false);

    function hideSummary() {
        setQueueHide(true);

        setTimeout(() => {
            setPayFormStatus(true);
        }, 525);
    }

    return (
        <>
            <div
                className={
                    queueHide
                        ? 'order-summary-cont fade-out'
                        : 'order-summary-cont'
                }
                data-testid='order-summary-cont'
            >
                <h1>Order Summary</h1>
                <div
                    className='added-items-cont'
                    data-testid='added-items-cont'
                >
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
            </div>
            <div
                className={
                    queueHide
                        ? 'checkout-button-wrapper fade-out'
                        : 'checkout-button-wrapper'
                }
                data-testid='checkout-button-wrapper'
            >
                <div className='all-items-price'>
                    <span>Subtotal:</span>
                    <span className='highlight-text'>${totalPrice}</span>
                </div>
                <div className='shipping-price'>
                    <span>Shipping:</span>
                    <span className='highlight-text'>${shippingPrice}</span>
                </div>
                <div className='pretax-price'>
                    <span>Pre-Tax Price:</span>
                    <span className='highlight-text'>
                        ${Number((totalPrice + shippingPrice).toFixed(2))}
                    </span>
                </div>
                <button
                    className='checkout-button'
                    onClick={() => hideSummary()}
                >
                    Pay
                </button>
            </div>
        </>
    );
}
