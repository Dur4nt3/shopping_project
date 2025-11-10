import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    beforeAll,
    afterAll,
} from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ThemeProvider from '../../../utilities/Theme';
import CartProvider from '../../../utilities/Cart';

import Root from '../../root/Root';
import Shop from '../../shop/Shop';
import Checkout from '../Checkout';

import shopLoader from '../../../utilities/loaders/shopLoader';

import { items } from '../../shop/tests/utilities/mockedItems';

// Note: Although items being checked-out have a controller, this test suite will test them
// This is due to the fact that said controllers are an exact 1:1 copy of the controllers in the cart
// In-fact the main container within the checkout page is mostly a "re-skin" of the cart itself
// Therefore, this test suite mainly focuses on testing the functionalities that checkout includes but cart doesn't

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

// Simple mock for the localStorage
window.localStorage = {
    getItem: vi
        .fn()
        .mockImplementationOnce(() => null)
        .mockImplementation(() => stringifiedStorage),
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

const originalError = console.error.bind(console.error);

describe('Test Suite for interacting with the checkout page', () => {
    beforeAll(() => {
        // This test suite works exactly as intended
        // The "test was not wrapped in act(...)" error is obnoxious and not helpful
        // This suppresses the error making sure it isn't bothering
        console.error = (...args) => {
            if (
                typeof args[0] === 'string' &&
                args[0].includes('not wrapped in act')
            ) {
                return;
            }

            originalError(...args);
        };
    });

    beforeEach(async () => {
        router = createMemoryRouter(routes, {
            initialEntries: ['/checkout'],
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
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly display the checkout page when no items are added', async () => {
        expect(
            screen.getByRole('heading', { name: 'Your Cart Is Empty!' })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('heading', {
                name: 'Add items to your cart before checking-out.',
            })
        ).toBeInTheDocument();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly display the checkout page when items are in the cart', async () => {
        // Items are loaded after this notice disappears
        await waitFor(() => {
            expect(
                screen.queryByRole('heading', {
                    name: 'Your Cart Is Empty!',
                })
            ).not.toBeInTheDocument();
        });

        expect(
            screen.getByRole('heading', { name: /order summary/i })
        ).toBeInTheDocument();

        const addedItemsCont = screen.getByTestId('added-items-cont');
        const addedItems = [...addedItemsCont.children];

        expect(addedItems).toHaveLength(4);
        expect(within(addedItems[0]).getByRole('heading', { name: /item 1/i }));
        expect(within(addedItems[1]).getByRole('heading', { name: /item 2/i }));
        expect(within(addedItems[2]).getByRole('heading', { name: /item 4/i }));
        expect(within(addedItems[3]).getByRole('heading', { name: /item 5/i }));

        const [checkedItem] = addedItems;

        expect(within(checkedItem).getByAltText(/item 1/i)).toBeInTheDocument();

        expect(
            within(checkedItem).getByText(/category 1/i)
        ).toBeInTheDocument();
        expect(within(checkedItem).getByText(/item 1/i)).toBeInTheDocument();

        expect(within(checkedItem).getByText('$20')).toBeInTheDocument();
        expect(within(checkedItem).getByText('$10 each')).toBeInTheDocument();

        expect(
            within(checkedItem).getByRole('button', { name: '-' })
        ).toBeInTheDocument();
        expect(
            within(checkedItem).getByRole('button', { name: '+' })
        ).toBeInTheDocument();

        expect(within(checkedItem).getByRole('spinbutton')).toHaveValue('2');

        expect(
            within(checkedItem).getByRole('button', {
                name: /remove item from cart/i,
            })
        ).toBeInTheDocument();

        const checkoutInfoCont = screen.getByTestId('checkout-button-wrapper');

        expect(
            within(checkoutInfoCont).getByText(/subtotal/i)
        ).toBeInTheDocument();
        expect(
            within(checkoutInfoCont).getByText(/shipping/i)
        ).toBeInTheDocument();
        expect(
            within(checkoutInfoCont).getByText('Pre-Tax Price:')
        ).toBeInTheDocument();

        expect(within(checkoutInfoCont).getByText('$210')).toBeInTheDocument();
        expect(within(checkoutInfoCont).getByText('$15')).toBeInTheDocument();
        expect(within(checkoutInfoCont).getByText('$225')).toBeInTheDocument();

        expect(
            within(checkoutInfoCont).getByRole('button', { name: /pay/i })
        ).toBeInTheDocument();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly display the "Thank You" notice', async () => {
        await waitFor(() => {
            expect(
                screen.queryByRole('heading', {
                    name: 'Your Cart Is Empty!',
                })
            ).not.toBeInTheDocument();
        });

        const checkoutInfoCont = screen.getByTestId('checkout-button-wrapper');
        const payButton = within(checkoutInfoCont).getByRole('button', {
            name: /pay/i,
        });

        await user.click(payButton);

        await waitFor(() => {
            expect(
                screen.getByRole('heading', { name: 'Thank You!' })
            ).toBeInTheDocument();
        });
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    afterAll(() => {
        console.error = originalError;
    });
});
