import ShopItemCont from './ShopItemCont';

import './stylesheets/ShopItems.css';

export default function ShopItems({ items }) {
    return (
        <div className='shop-items-grid'>
            {items.map((item) => (
                <ShopItemCont itemData={item} key={item.id} />
            ))}
        </div>
    );
}
