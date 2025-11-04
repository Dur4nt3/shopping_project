import emptyLight from '../../../assets/media/icons/light/empty.svg';
import emptyDark from '../../../assets/media/icons/dark/empty.svg';

export default function NoCartItems({ theme }) {
    return (
        <div className='no-cart-items-cont'>
            <img src={theme === 'light' ? emptyLight : emptyDark} />
            <h3 className='no-items-notice'>No Items In Cart...</h3>
            <h4>Items added to your cart will show up here.</h4>
        </div>
    );
}
