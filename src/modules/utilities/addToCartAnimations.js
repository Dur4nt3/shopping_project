export default function addToCartAnimations(addButtonRef, error = false) {
    if (error === true || error === 'max') {
        addButtonRef.current.textContent = error === 'max' ? 'Exceeded Max (Check Cart)' : 'Invalid Quantity!';
        addButtonRef.current.classList.add('shake-horizontal', 'error-adding');
        addButtonRef.current.disabled = true;
        setTimeout(() => {
            addButtonRef.current.textContent = 'Add to Cart';
            addButtonRef.current.classList.remove(
                'shake-horizontal',
                'error-adding'
            );
            addButtonRef.current.disabled = false;
        }, 1250);
        return;
    }
    addButtonRef.current.textContent = 'Success!';
    addButtonRef.current.classList.add('success-adding');
    addButtonRef.current.disabled = true;
    setTimeout(() => {
        addButtonRef.current.textContent = 'Add to Cart';
        addButtonRef.current.classList.remove('success-adding');
        addButtonRef.current.disabled = false;
    }, 1250);
}
