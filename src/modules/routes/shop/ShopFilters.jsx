import { useState, useContext } from 'react';
import { useSearchParams } from 'react-router';
import {
    applyFilter,
    activateFilter,
    deactivateFilter,
} from '../../utilities/filterCallbacks';

import FilterHandler from '../../utilities/filterHandler';
import selectedFilter from '../../utilities/selectedFilter';

import { Theme } from '../../utilities/Theme';

import searchLight from '../../../assets/media/icons/light/search.svg';
import searchDark from '../../../assets/media/icons/dark/search.svg';

import './stylesheets/ShopFilters.css';

export default function ShopFilters({
    filters,
    toggleFilter,
    categories,
    priceRange,
}) {
    const { theme } = useContext(Theme);

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

    function applyFilterWrapper(name, value) {
        applyFilter(name, value, setSearchParams);
    }

    function activateFilterWrapper(name, value) {
        activateFilter(name, value, setSearchParams, toggleFilter);
    }

    function deactivateFilterWrapper(name) {
        deactivateFilter(name, setSearchParams, toggleFilter);
    }

    return (
        <div className='shop-filters-cont'>
            <div className='filter-buttons'>
                <div className='main-filter-buttons'>
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
                <div className='secondary-filter-buttons'>
                    <button
                        onClick={(event) =>
                            handleFilterActivation(event.currentTarget, 'query')
                        }
                    >
                        <img
                            src={
                                theme === 'light' &&
                                !(activeFilter.name === 'query')
                                    ? searchLight
                                    : searchDark
                            }
                            alt='search items by name'
                        />
                    </button>
                </div>
            </div>
            <div className='filter-content'>
                {selectedFilter(
                    new FilterHandler(
                        filters,
                        activeFilter,
                        applyFilterWrapper,
                        activateFilterWrapper,
                        deactivateFilterWrapper,
                        categories,
                        priceRange
                    )
                )}
            </div>
        </div>
    );
}
