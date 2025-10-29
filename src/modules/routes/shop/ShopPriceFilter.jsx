import { useState, useContext, useRef } from 'react';
import { InputNumber, ConfigProvider } from 'antd';
import { Theme } from '../../utilities/Theme';

import PriceFilterInputs from './PriceFilterInputs';
import FilterManagement from './FilterManagement';

export default function ShopPriceFilter({
    currentPriceFilter,
    applied,
    priceRange,
    applyFilter,
    activateFilter,
    deactivateFilter,
}) {
    const { theme } = useContext(Theme);

    const fromRef = useRef(null);
    const toRef = useRef(null);
    const [currentPriceRange, setCurrentPriceRange] = useState(
        currentPriceFilter === null ? priceRange : currentPriceFilter
    );

    function adjustPrices() {
        const newPriceRange = [...currentPriceRange];

        if (currentPriceRange[0] === null) {
            // eslint-disable-next-line prefer-destructuring
            newPriceRange[0] = priceRange[0];
        }
        if (currentPriceRange[1] === null) {
            // eslint-disable-next-line prefer-destructuring
            newPriceRange[1] = priceRange[1];
        }

        setCurrentPriceRange(newPriceRange);

        return newPriceRange;
    }

    function applyFilterWrapper(filterName) {
        const newPriceRange = adjustPrices();

        applyFilter(filterName, newPriceRange);
    }

    function activateFilterWrapper(filterName) {
        const newPriceRange = adjustPrices();

        activateFilter(filterName, newPriceRange);
    }

    return (
        <>
            <PriceFilterInputs
                theme={theme}
                fromRef={fromRef}
                toRef={toRef}
                currentPriceRange={currentPriceRange}
                setCurrentPriceRange={setCurrentPriceRange}
                priceRange={priceRange}
            />
            <FilterManagement
                filterName='price'
                filterValue={currentPriceRange}
                applied={applied}
                applyFilter={applyFilterWrapper}
                activateFilter={activateFilterWrapper}
                deactivateFilter={deactivateFilter}
            />
        </>
    );
}
