import { useState, useContext, useRef } from 'react';
import { Theme } from '../../utilities/Theme';
import { Cart } from '../../utilities/Cart';
import ItemRating from './ItemRating';
import ItemCountController from './ItemCountController';
import addToCartAnimations from '../../utilities/addToCartAnimations';

export default function ShopItemCont({ itemData }) {
    const { theme } = useContext(Theme);
    const { cart, updateCart } = useContext(Cart);
    const addButtonRef = useRef(null);
    const [orderCount, setOrderCount] = useState(0);

    function handleCartAddition() {
        if (addButtonRef.current.disabled) {
            return;
        }

        if (orderCount > 10 || orderCount <= 0) {
            setOrderCount(0);
            addToCartAnimations(addButtonRef, true);
            return;
        }

        if (cart[itemData.id]) {
            if (cart[itemData.id].quantity + orderCount > 10) {
                setOrderCount(0);
                addToCartAnimations(addButtonRef, 'max');
                return;
            }
        }

        addToCartAnimations(addButtonRef);
        setOrderCount(0);
        updateCart(itemData, orderCount);
    }

    return (
        <div className='item-cont'>
            <h2 className='item-title'>{itemData.title}</h2>
            <h4 className='item-category'>{itemData.category}</h4>
            <img
                src={itemData.image}
                alt={itemData.title}
                className='item-img'
            />
            <div className='rating-data'>
                <span className='item-rating'>
                    <ItemRating rating={itemData.rating.rate} theme={theme} />
                </span>
                <span className='rating-count' data-testid='rating-count'>
                    ({itemData.rating.count} Reviews)
                </span>
            </div>
            <h4 className='item-price'>${itemData.price}</h4>
            <ItemCountController
                theme={theme}
                orderCount={orderCount}
                setOrderCount={setOrderCount}
                handleCartAddition={handleCartAddition}
            />
            <button
                className='add-to-cart'
                onClick={() => handleCartAddition()}
                ref={addButtonRef}
            >
                Add to Cart
            </button>
        </div>
    );
}
