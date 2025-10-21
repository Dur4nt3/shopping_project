export default function extractPriceRange(items) {
    if (items === null) {
        return [];
    }
    
    let min = items[0].price;
    let max = items[0].price;

    for (const item of items) {
        if (item.price < min) {
            min = item.price;
        }
        if (item.price > max) {
            max = item.price;
        }
    }

    return [min,max];
}
