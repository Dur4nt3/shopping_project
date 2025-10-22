import ShopItems from './ShopItems';
import ShopFilters from './ShopFilters';
import ShopLoadingError from './ShopLoadingError';

import './stylesheets/ShopMain.css';

export default function ShopMain({ items, status, filters, setFilters }) {
    return (
        <main className='shop-main'>
            <ShopFilters filters={filters} setFilters={setFilters} />
            {items === null ? (
                <ShopLoadingError status={status} />
            ) : (
                <ShopItems items={items} />
            )}
        </main>
    );
}
