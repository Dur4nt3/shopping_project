import { useState, useContext } from 'react';
import { Theme } from '../../utilities/Theme';
import ItemRating from './ItemRating';
import ItemCountController from './ItemCountController';

export default function ShopItemCont({ itemData }) {
    const { theme } = useContext(Theme);
    const [orderCount, setOrderCount] = useState(0);

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
            <h4 className='item-price'>{itemData.price}$</h4>
            <ItemCountController
                theme={theme}
                orderCount={orderCount}
                setOrderCount={setOrderCount}
            />
            <button className='add-to-cart'>Add to Cart</button>
        </div>
    );
}
