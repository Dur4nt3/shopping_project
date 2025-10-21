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
                applyFilter={applyFilter}
                activateFilter={activateFilter}
                deactivateFilter={deactivateFilter}
            />
        </>
    );
}
