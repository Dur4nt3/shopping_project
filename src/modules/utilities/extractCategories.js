export default function extractCategories(items) {
    if (items === null) {
        return [];
    }

    const categories = [];
    
    for (const item of items) {
        categories.push(item.category);
    }

    // Remove duplicate categories
    const categoriesSet = new Set(categories);

    return [ ...categoriesSet ];
}