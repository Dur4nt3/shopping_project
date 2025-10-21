import { useContext } from 'react';

import ShopItems from './ShopItems';
import ShopFilters from './ShopFilters';
import NoItemsNotice from './NoItemsNotice';

import { Theme } from '../../utilities/Theme';

import errorLight from '../../../assets/media/icons/light/error.svg';
import errorDark from '../../../assets/media/icons/dark/error.svg';

import './stylesheets/ShopMain.css';

export default function ShopMain({
    items,
    loading,
    error,
    filters,
    toggleFilter,
    categories,
    priceRange,
}) {
    const { theme } = useContext(Theme);

    if (loading) {
        return (
            <main className='shop-main'>
                <div className='loading-cont'>
                    <div className='custom-loader'></div>
                    <h3>Loading Items...</h3>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className='shop-main'>
                <div className='error-cont'>
                    <img src={theme === 'light' ? errorLight : errorDark} />
                    <h3>An Error Occurred!</h3>
                    <p>Couldn't load items due to an internal error.</p>
                </div>
            </main>
        );
    }

    return (
        <main className='shop-main'>
            <ShopFilters
                filters={filters}
                toggleFilter={toggleFilter}
                categories={categories}
                priceRange={priceRange}
            />
            {items.length !== 0 ? (
                <ShopItems items={items} />
            ) : (
                <NoItemsNotice theme={theme} />
            )}
        </main>
    );
}
