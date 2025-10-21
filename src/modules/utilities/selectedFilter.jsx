import ShopPriceFilter from '../routes/shop/ShopPriceFilter';
import ShopCategoryFilter from '../routes/shop/ShopCategoryFilter';
import ShopRatingFilter from '../routes/shop/ShopRatingFilter';
import ShopQueryFilter from '../routes/shop/ShopQueryFilter';

export default function selectedFilter(filterHandler) {
    const {
        allFilters,
        applyFilter,
        activateFilter,
        deactivateFilter,
        activeFilter,
        categories,
        priceRange,
    } = filterHandler;

    if (activeFilter.name === 'price') {
        return (
            <ShopPriceFilter
                currentPriceFilter={allFilters.price.data}
                applied={allFilters.price.applied}
                priceRange={priceRange}
                applyFilter={applyFilter}
                activateFilter={activateFilter}
                deactivateFilter={deactivateFilter}
            />
        );
    }
    if (activeFilter.name === 'category') {
        return (
            <ShopCategoryFilter
                currentCategoryFilter={allFilters.category.data}
                applied={allFilters.category.applied}
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
                currentRatingFilter={allFilters.rating.data}
                applied={allFilters.rating.applied}
                applyFilter={applyFilter}
                activateFilter={activateFilter}
                deactivateFilter={deactivateFilter}
            />
        );
    }

    if (activeFilter.name === 'query') {
        return (
            <ShopQueryFilter
                currentQueryFilter={allFilters.query.data}
                applied={allFilters.query.applied}
                applyFilter={applyFilter}
                activateFilter={activateFilter}
                deactivateFilter={deactivateFilter}
            />
        );
    }
}
