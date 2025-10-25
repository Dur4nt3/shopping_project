import { useState } from 'react';
import ShopPriceFilter from './ShopPriceFilter';
import ShopCategoryFilter from './ShopCategoryFilter';
import ShopRatingFilter from './ShopRatingFilter';

import './stylesheets/ShopFilters.css';

function selectedFilter(
    activeFilter,
    filters,
    toggleFilter,
    categories
) {

    if (activeFilter.name === 'price') {
        return (
            <ShopPriceFilter
                currentPriceFilter={filters.price.data}
                applied={filters.price.applied}
                toggleFilter={toggleFilter}
            />
        );
    }
    if (activeFilter.name === 'category') {
        return (
            <ShopCategoryFilter
                currentCategoryFilter={filters.category.data}
                applied={filters.category.applied}
                toggleFilter={toggleFilter}
                categories={categories}
            />
        );
    }

    if (activeFilter.name === 'rating') {
        return (
            <ShopRatingFilter
                currentRatingFilter={filters.rating.data}
                applied={filters.rating.applied}
                toggleFilter={toggleFilter}
            />
        );
    }
}

export default function ShopFilters({
    filters,
    toggleFilter,
    categories,
}) {

    const [activeFilter, setActiveFilter] = useState({
        name: null,
        domNode: null,
    });

    function handleFilterActivation(target, name) {
        const newActiveFilter = { ...activeFilter };
        if (target === activeFilter.domNode) {
            newActiveFilter.name = null;
            newActiveFilter.domNode = null;
        } else {
            newActiveFilter.name = name;
            newActiveFilter.domNode = target;
        }

        if (activeFilter.domNode !== null) {
            activeFilter.domNode.classList.remove('active-filter');
        }

        if (newActiveFilter.domNode !== null) {
            newActiveFilter.domNode.classList.add('active-filter');
        }

        setActiveFilter(newActiveFilter);
    }

    return (
        <div className='shop-filters-cont'>
            <div className='filter-buttons'>
                <button
                    onClick={(event) =>
                        handleFilterActivation(event.target, 'price')
                    }
                >
                    Price
                </button>
                <button
                    onClick={(event) =>
                        handleFilterActivation(event.target, 'category')
                    }
                >
                    Category
                </button>
                <button
                    onClick={(event) =>
                        handleFilterActivation(event.target, 'rating')
                    }
                >
                    Rating
                </button>
            </div>
            <div className='filter-content'>
                {selectedFilter(
                    activeFilter,
                    filters,
                    toggleFilter,
                    categories
                )}
            </div>
        </div>
    );
}
