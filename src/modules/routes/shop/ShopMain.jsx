import ShopItems from './ShopItems';
import ShopFilters from './ShopFilters';
import ShopLoadingError from './ShopLoadingError';

import extractCategories from '../../utilities/extractCategories';

import './stylesheets/ShopMain.css';

export default function ShopMain({
    items,
    status,
    filters,
    handleFilterAssignment,
}) {
    return (
        <main className='shop-main'>
            <ShopFilters
                filters={filters}
                handleFilterAssignment={handleFilterAssignment}
                categories={extractCategories(items)}
            />
            {items === null ? (
                <ShopLoadingError status={status} />
            ) : (
                <ShopItems items={items} />
            )}
        </main>
    );
}
