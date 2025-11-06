import emptyLight from '../../../assets/media/icons/light/empty.svg';
import emptyDark from '../../../assets/media/icons/dark/empty.svg';

export default function NoCartItems({ theme, variant }) {
    return (
        <div className='no-cart-items-cont'>
            <img src={theme === 'light' ? emptyLight : emptyDark} />
            <h3 className='no-items-notice'>{variant === 'cart' ? 'No Items In Cart...' : 'Your Cart Is Empty!'}</h3>
            <h4>Add items to your cart before checking-out.</h4>
        </div>
    );
}
