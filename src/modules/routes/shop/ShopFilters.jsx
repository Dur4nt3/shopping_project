import { useState } from 'react';
import {
    PriceFilter,
    CategoryFilter,
    RatingFilter,
} from './tests/ShopFIlterTypes';

import './stylesheets/ShopFilters.css';

function selectedFilter(activeFilter, filters, setFilters) {
    if (activeFilter.name === 'price') {
        return (
            <PriceFilter
                currentPriceFilter={filters.price}
                setFilters={setFilters}
            />
        );
    }
    if (activeFilter.name === 'category') {
        return (
            <CategoryFilter
                currentCategoryFilter={filters.price}
                setFilters={setFilters}
            />
        );
    }

    if (activeFilter.name === 'rating') {
        return (
            <RatingFilter
                currentRatingFilter={filters.price}
                setFilters={setFilters}
            />
        );
    }
}

export default function ShopFilters({ filters, setFilters }) {
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
                {selectedFilter(activeFilter, filters, setFilters)}
            </div>
        </div>
    );
}
