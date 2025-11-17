export default function determineCartClass(entranceFinished, exitQueued) {
    if (exitQueued) {
        return 'cart-modal cart-exit';
    }

    if (entranceFinished && !exitQueued) {
        return 'cart-modal';
    }

    return 'cart-modal cart-entrance';
}
