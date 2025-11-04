function locateItemIndex(parsedArray, itemID) {
    for (const itemIndex in parsedArray) {
        const item = parsedArray[itemIndex];
        if (item.id === itemID) {
            return itemIndex;
        }
    }
}

export function removeItemFromStorage(itemID) {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems === null) {
        return;
    }
    const parsedItemArray = JSON.parse(cartItems);

    const itemIndex = locateItemIndex(parsedItemArray, itemID);
    if (itemIndex !== undefined) {
        parsedItemArray.splice(itemIndex, 1);
    }

    localStorage.setItem('cartItems', JSON.stringify(parsedItemArray));
}

export function adjustItemStorage(itemID, quantity) {
    const cartItems = localStorage.getItem('cartItems');

    const parsedItemArray =
        JSON.parse(cartItems) === null ? [] : JSON.parse(cartItems);

    const itemIndex = locateItemIndex(parsedItemArray, itemID);
    if (itemIndex === undefined) {
        parsedItemArray.push({ id: itemID, quantity });
    } else {
        parsedItemArray[itemIndex] = { id: itemID, quantity };
    }

    localStorage.setItem('cartItems', JSON.stringify(parsedItemArray));
}
