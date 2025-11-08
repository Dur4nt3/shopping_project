import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ThemeProvider from '../../../utilities/Theme';
import CartProvider from '../../../utilities/Cart';

import Root from '../Root';
import Shop from '../../shop/Shop';
import Checkout from '../../checkout/Checkout';

import shopLoader from '../../../utilities/loaders/shopLoader';

import { items } from '../../shop/tests/utilities/mockedItems';

window.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
        json: () => Promise.resolve(items),
    })
);

let parsedStorage = [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
    { id: 4, quantity: 3 },
    { id: 5, quantity: 1 },
];
let stringifiedStorage = JSON.stringify(parsedStorage);

function resetStorage() {
    parsedStorage = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
        { id: 4, quantity: 3 },
        { id: 5, quantity: 1 },
    ];
    stringifiedStorage = JSON.stringify(parsedStorage);
}

// Simple mock for the localStorage
window.localStorage = {
    getItem: vi.fn().mockImplementation(() => stringifiedStorage),
    setItem(key, newCart) {
        parsedStorage = JSON.parse(newCart);
        stringifiedStorage = newCart;
    },
    // Not being used, mocked for safety
    removeItem() {
        return null;
    },
};

const routes = [
    {
        path: '/',
        element: <Root />,
    },
    {
        path: 'shop',
        element: <Shop />,
        loader: shopLoader,
    },
    {
        path: 'checkout',
        element: <Checkout />,
    },
];

let router;
let user;

let cartButton;
let cartModal;

let addedItemsCont;
let testItem;

let checkoutWrapper;

describe('Test Suite for interacting with the cart', () => {
    beforeEach(async () => {
        router = createMemoryRouter(routes, {
            initialEntries: ['/shop'],
            initialIndex: 0,
        });
        user = userEvent.setup();

        render(
            <CartProvider>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </CartProvider>
        );

        // The cart and the shop load at approx. the same time
        await waitFor(() => {
            expect(
                Array.from(screen.getByTestId('shop-items-grid').children)
            ).toHaveLength(10);
        });

        cartButton = screen.getByRole('button', { name: /view cart/i });
        await user.click(cartButton);

        cartModal = screen.getByTestId('cart-modal');

        expect(cartModal).toBeInTheDocument();

        addedItemsCont = within(cartModal).queryByTestId('added-items-cont');

        // Done to accommodate the remove all test
        if (addedItemsCont !== null) {
            // This test suite will be focusing on item 4
            // It is the 3rd item within the container
            [, , testItem] = [...addedItemsCont.children];
        }

        checkoutWrapper = within(cartModal).queryByTestId(
            'checkout-button-wrapper'
        );
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly utilize the decrement button', async () => {
        const numberInput = within(testItem).getByRole('spinbutton');

        expect(numberInput).toHaveValue('3');

        const decrementButton = within(testItem).getByRole('button', {
            name: '-',
        });

        await user.click(decrementButton);

        expect(numberInput).toHaveValue('2');

        await user.click(decrementButton);
        expect(numberInput).toHaveValue('1');
        expect(decrementButton).toBeDisabled();

        // The header defining the price of a single until doesn't match this query
        // Only the total for this item matches the query
        expect(within(testItem).getByText('$40')).toBeInTheDocument();

        // Total price reduced
        expect(within(checkoutWrapper).getByText('$130')).toBeInTheDocument();

        await user.click(
            within(cartModal).getByRole('button', { name: /close cart/i })
        );

        await waitFor(() => {
            expect(screen.queryByTestId('cart-modal')).not.toBeInTheDocument();
        });

        await user.click(cartButton);

        cartModal = screen.getByTestId('cart-modal');
        [, , testItem] = [
            ...within(cartModal).getByTestId('added-items-cont').children,
        ];
        checkoutWrapper = within(cartModal).getByTestId(
            'checkout-button-wrapper'
        );

        // Data unchanged after closing the modal
        // Only need to perform this test on one of the controllers
        // The logic behind the each of the controllers is almost exactly the same (therefore, not warranting repeating this test)
        expect(within(testItem).getByRole('spinbutton')).toHaveValue('1');
        expect(within(testItem).getByText('$40')).toBeInTheDocument();
        expect(within(checkoutWrapper).getByText('$130')).toBeInTheDocument();

        resetStorage();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly utilize the increment button', async () => {
        const numberInput = within(testItem).getByRole('spinbutton');

        expect(numberInput).toHaveValue('3');

        const incrementButton = within(testItem).getByRole('button', {
            name: '+',
        });

        await user.click(incrementButton);

        expect(numberInput).toHaveValue('4');

        for (let i = 1; i <= 6; i += 1) {
            await user.click(incrementButton);
        }
        expect(numberInput).toHaveValue('10');
        expect(incrementButton).toBeDisabled();

        expect(within(testItem).getByText('$400')).toBeInTheDocument();

        expect(within(checkoutWrapper).getByText('$490')).toBeInTheDocument();

        resetStorage();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly utilize the number input', async () => {
        const numberInput = within(testItem).getByRole('spinbutton');
        const decrementButton = within(testItem).getByRole('button', {
            name: '-',
        });
        const incrementButton = within(testItem).getByRole('button', {
            name: '+',
        });

        expect(numberInput).toHaveValue('3');

        await user.type(numberInput, '{Backspace}6{Enter}');
        expect(numberInput).toHaveValue('6');

        expect(within(testItem).getByText('$240')).toBeInTheDocument();
        expect(within(checkoutWrapper).getByText('$330')).toBeInTheDocument();

        await user.type(numberInput, '{Backspace}20{Enter}');
        expect(numberInput).toHaveValue('10');
        expect(incrementButton).toBeDisabled();

        expect(within(testItem).getByText('$400')).toBeInTheDocument();
        expect(within(checkoutWrapper).getByText('$490')).toBeInTheDocument();

        await user.type(numberInput, '{Backspace>2/}0{Enter}');
        expect(numberInput).toHaveValue('1');
        expect(decrementButton).toBeDisabled();

        expect(within(testItem).getByText('$40')).toBeInTheDocument();
        expect(within(checkoutWrapper).getByText('$130')).toBeInTheDocument();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    // This only needs to be tested once
    // The decrement, increment, and number input all call the same function when it comes to adjusting quantities
    // Note: these types of tests check that the application can properly utilize the localStorage
    // As between tests (i.e., "it" functions) the Cart context resets
    it('Can properly utilize localStorage after adjusting the quantity', async () => {
        const numberInput = within(testItem).getByRole('spinbutton');
        expect(numberInput).toHaveValue('1');
        expect(
            within(testItem).getByRole('button', {
                name: '-',
            })
        ).toBeDisabled();
        expect(within(testItem).getByText('$40')).toBeInTheDocument();
        expect(within(checkoutWrapper).getByText('$130')).toBeInTheDocument();

        resetStorage();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly add existing items to the cart', async () => {
        let numberInput = within(testItem).getByRole('spinbutton');
        expect(numberInput).toHaveValue('3');

        await user.click(
            within(cartModal).getByRole('button', { name: /close cart/i })
        );

        await waitFor(() => {
            expect(screen.queryByTestId('cart-modal')).not.toBeInTheDocument();
        });

        const itemCont = screen.getByRole('heading', {
            name: 'Item 4',
        }).parentNode;

        const shopItemInput = within(itemCont).getByRole('spinbutton');
        expect(shopItemInput).toHaveValue('0');

        await user.type(shopItemInput, '{Backspace}7{Enter}');

        await waitFor(() => {
            expect(
                within(itemCont).getByRole('button', {
                    name: /success/i,
                })
            ).toBeInTheDocument();
        });

        await user.click(cartButton);

        cartModal = screen.getByTestId('cart-modal');
        [, , testItem] = [
            ...within(cartModal).getByTestId('added-items-cont').children,
        ];
        checkoutWrapper = within(cartModal).getByTestId(
            'checkout-button-wrapper'
        );

        numberInput = within(testItem).getByRole('spinbutton');
        const incrementButton = within(testItem).getByRole('button', {
            name: '+',
        });
        expect(numberInput).toHaveValue('10');
        expect(incrementButton).toBeDisabled();

        expect(within(testItem).getByText('$400')).toBeInTheDocument();
        expect(within(checkoutWrapper).getByText('$490')).toBeInTheDocument();

        resetStorage();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly remove an item from the cart', async () => {
        // eslint-disable-next-line prefer-destructuring
        const removedItem = [...addedItemsCont.children][3];

        await user.click(
            within(removedItem).getByRole('button', {
                name: /remove item from cart/i,
            })
        );

        await waitFor(() => {
            expect([...addedItemsCont.children]).toHaveLength(3);
        });
        expect(within(checkoutWrapper).getByText('$160')).toBeInTheDocument();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly utilize localStorage after removing an item from the cart', async () => {
        expect([...addedItemsCont.children]).toHaveLength(3);
        expect(within(checkoutWrapper).getByText('$160')).toBeInTheDocument();

        resetStorage();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly remove all items', async () => {
        // Remove all items
        const [item1, item2, item4, item5] = [...addedItemsCont.children];

        // This HAS to be done in an inefficient manner like this
        // Any optimization for this sequence breaks the test
        await user.click(
            within(item1).getByRole('button', {
                name: /remove item from cart/i,
            })
        );
        await waitFor(() => {
            expect([...addedItemsCont.children]).toHaveLength(3);
        });

        await user.click(
            within(item2).getByRole('button', {
                name: /remove item from cart/i,
            })
        );
        await waitFor(() => {
            expect([...addedItemsCont.children]).toHaveLength(2);
        });

        await user.click(
            within(item4).getByRole('button', {
                name: /remove item from cart/i,
            })
        );
        await waitFor(() => {
            expect([...addedItemsCont.children]).toHaveLength(1);
        });

        await user.click(
            within(item5).getByRole('button', {
                name: /remove item from cart/i,
            })
        );
        await waitFor(() => {
            expect(
                within(cartModal).queryByTestId('added-items-cont')
            ).toBeNull();
        });

        expect(
            within(cartModal).getByRole('heading', {
                name: 'No Items In Cart...',
            })
        );
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly utilize the localStorage after removing all items from the cart', async () => {
        expect(within(cartModal).queryByTestId('added-items-cont')).toBeNull();
        expect(
            within(cartModal).getByRole('heading', {
                name: 'No Items In Cart...',
            })
        );

        resetStorage();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly utilize the checkout button', async () => {
        const checkoutButton = within(checkoutWrapper).getByRole('button', {
            name: /to checkout/i,
        });

        await user.click(checkoutButton);

        expect(router.state.location.pathname).toBe('/checkout');

        expect(
            document.querySelector('.checkout-link.currently-visited')
        ).not.toBeNull();

        expect(
            screen.getByRole('heading', { name: 'Checkout' })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('heading', {
                name: 'Almost yours, just one step away.',
            })
        ).toBeInTheDocument();
    });
});
