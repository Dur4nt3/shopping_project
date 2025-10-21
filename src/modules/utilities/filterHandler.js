export default class FilterHandler {
    constructor(
        allFilters,
        activeFilter,
        applyFilter,
        activateFilter,
        deactivateFilter,
        categories,
        priceRange
    ) {
        this.allFilters = allFilters;
        this.activeFilter = activeFilter;
        this.applyFilter = applyFilter;
        this.activateFilter = activateFilter;
        this.deactivateFilter = deactivateFilter;
        this.categories = categories;
        this.priceRange = priceRange;
    }
}
