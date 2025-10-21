function filterByPrice(currentItems, priceFilter) {
    const filteredItems = [];

    for (const item of currentItems) {
        if (item.price >= priceFilter[0] && item.price <= priceFilter[1]) {
            filteredItems.push(item);
        }
    }

    return filteredItems;
}

function filterByCategory(currentItems, categoryFilter) {
    const filteredItems = [];

    for (const item of currentItems) {
        if (item.category === categoryFilter) {
            filteredItems.push(item);
        }
    }

    return filteredItems;
}

function filterByRating(currentItems, ratingFilter) {
    const filteredItems = [];

    for (const item of currentItems) {
        if (item.rating.rate >= ratingFilter) {
            filteredItems.push(item);
        }
    }

    return filteredItems;
}

function filterByQuery(currentItems, queryFilter) {
    const filteredItems = [];

    for (const item of currentItems) {
        const escapedQuery = queryFilter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedQuery, 'i');

        if (regex.test(item.title)) {
            filteredItems.push(item);
        }
    }

    return filteredItems;
}

export default function createFilteredItems(items, filters) {
    let currentItems = [...items];

    if (filters.price.data !== null && filters.price.applied === true) {
        currentItems = filterByPrice(currentItems, filters.price.data);
    }

    if (filters.category.data !== null && filters.category.applied === true) {
        currentItems = filterByCategory(currentItems, filters.category.data);
    }

    if (filters.rating.data !== null && filters.rating.applied === true) {
        currentItems = filterByRating(currentItems, filters.rating.data);
    }

    if (filters.query.data !== null && filters.query.applied === true) {
        currentItems = filterByQuery(currentItems, filters.query.data);
    }

    return currentItems;
}
