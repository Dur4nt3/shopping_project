import CartItem from '../root/CartItem';

export default function CheckoutSummary({
    cartItems,
    theme,
    handleCartItemRemoval,
    handleQuantityAdjustment,
    totalPrice,
    shippingPrice,
    displayPayForm,
}) {
    return (
        <>
            <div className='order-summary-cont'>
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
            </div>
            <div className='checkout-button-wrapper'>
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
                    onClick={() => displayPayForm()}
                >
                    Pay
                </button>
            </div>
        </>
    );
}
