export default function calculateTotal(items) {
    let total = 0;
    for (const itemID of Object.keys(items)) {
        const item = items[itemID];
        total += (item.price * item.quantity);
    }

    return Number(total.toFixed(2));
}