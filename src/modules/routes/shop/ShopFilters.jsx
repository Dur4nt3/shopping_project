import { useState } from 'react';
import { useSearchParams } from 'react-router';
import ShopPriceFilter from './ShopPriceFilter';
import ShopCategoryFilter from './ShopCategoryFilter';
import ShopRatingFilter from './ShopRatingFilter';

import './stylesheets/ShopFilters.css';

function selectedFilter(
    filters,
    categories,
    activeFilter,
    applyFilter,
    activateFilter,
    deactivateFilter
) {
    if (activeFilter.name === 'price') {
        return (
            <ShopPriceFilter
                currentPriceFilter={filters.price.data}
                applied={filters.price.applied}
                applyFilter={applyFilter}
                activateFilter={activateFilter}
                deactivateFilter={deactivateFilter}
            />
        );
    }
    if (activeFilter.name === 'category') {
        return (
            <ShopCategoryFilter
                currentCategoryFilter={filters.category.data}
                applied={filters.category.applied}
                categories={categories}
                applyFilter={applyFilter}
                activateFilter={activateFilter}
                deactivateFilter={deactivateFilter}
            />
        );
    }

    if (activeFilter.name === 'rating') {
        return (
            <ShopRatingFilter
                currentRatingFilter={filters.rating.data}
                applied={filters.rating.applied}
                applyFilter={applyFilter}
                activateFilter={activateFilter}
                deactivateFilter={deactivateFilter}
            />
        );
    }
}

export default function ShopFilters({ filters, toggleFilter, categories }) {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
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

    function applyFilter(name, value) {
        if (value !== null) {
            setSearchParams((searchParams) => {
                searchParams.set(name, encodeURIComponent(value));
                return searchParams;
            });
        }
    }

    function activateFilter(name, value) {
        if (value !== null) {
            setSearchParams((searchParams) => {
                searchParams.set(name, encodeURIComponent(value));
                return searchParams;
            });
        }
        toggleFilter(name);
    }

    function deactivateFilter(name) {
        setSearchParams((searchParams) => {
            searchParams.delete(name);
            return searchParams;
        });
        toggleFilter(name);
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
                    filters,
                    categories,
                    activeFilter,
                    applyFilter,
                    activateFilter,
                    deactivateFilter
                )}
            </div>
        </div>
    );
}
