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

// Note: The purpose of this test suite is to ensure the cart works properly without any localStorage
// Specifically, this test ensures the cart can persist across paths without resetting (by utilizing the "Cart" context)

// Note 2: Please seek "CartModalDisplay.test.jsx" and "CartModalInteractions.test.jsx" for the rest of the tests
// Said test suites includes a full interaction with the cart

window.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
        json: () => Promise.resolve(items),
    })
);

// This mock for the localStorage ensures this test suite solely relies on the context
window.localStorage = {
    getItem() {
        return null;
    },
    setItem() {
        return null;
    },
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
        path: '/checkout',
        element: <Checkout />,
    },
];

let router;
let user;

// "ShopMainCartInteractions.test.jsx" already tested all the interactions
// I am using only these 2 variables because those are the fastest
// (when it comes to adding items to the cart)
let itemCont1;
let numberInput1;
let itemCont2;
let numberInput2;

let cart;

describe('Test Suite for viewing the cart with no localStorage', () => {
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

        await waitFor(() => {
            expect(
                Array.from(screen.getByTestId('shop-items-grid').children)
            ).toHaveLength(10);
        });

        cart = screen.getByRole('button', { name: /view cart/i });

        itemCont1 = screen.getByRole('heading', {
            name: 'Item 1',
        }).parentNode;
        itemCont2 = screen.getByRole('heading', {
            name: 'Item 2',
        }).parentNode;

        numberInput1 = within(itemCont1).getByRole('spinbutton');
        numberInput2 = within(itemCont2).getByRole('spinbutton');
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can display an item in the cart', async () => {
        await user.type(numberInput1, '{Backspace}2{Enter}');

        await user.click(cart);

        const addedItems = screen.getByTestId('added-items-cont');

        expect(
            within(addedItems).getByRole('heading', { name: /item 1/i })
        ).toBeInTheDocument();
        expect(within(addedItems).getByRole('spinbutton')).toHaveValue('2');

        const modal = screen.getByTestId('cart-modal');

        expect(within(modal).getAllByText('$20')).toHaveLength(2);
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can display multiple items in the cart', async () => {
        await user.type(numberInput1, '{Backspace}2{Enter}');
        await user.type(numberInput2, '{Backspace}1{Enter}');

        await user.click(cart);

        const addedItems = screen.getByTestId('added-items-cont');

        expect(
            within(addedItems).getByRole('heading', { name: /item 1/i })
        ).toBeInTheDocument();
        expect(within(addedItems).getAllByRole('spinbutton')[0]).toHaveValue(
            '2'
        );

        expect(
            within(addedItems).getByRole('heading', { name: /item 2/i })
        ).toBeInTheDocument();
        expect(within(addedItems).getAllByRole('spinbutton')[1]).toHaveValue(
            '1'
        );

        const modal = screen.getByTestId('cart-modal');

        expect(within(modal).getByText('$40')).toBeInTheDocument();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can display items in the cart across paths', async () => {
        await user.type(numberInput1, '{Backspace}2{Enter}');
        await user.type(numberInput2, '{Backspace}1{Enter}');

        expect(router.state.location.pathname).toBe('/shop');

        // Navigate to the homepage
        await user.click(screen.getByRole('link', { name: /pseudo shopper/i }));

        expect(router.state.location.pathname).toBe('/');

        // New path, need to redefine the cart button
        cart = screen.getByRole('button', { name: /view cart/i });
        await user.click(cart);

        const addedItems = screen.getByTestId('added-items-cont');

        expect(
            within(addedItems).getByRole('heading', { name: /item 1/i })
        ).toBeInTheDocument();
        expect(within(addedItems).getAllByRole('spinbutton')[0]).toHaveValue(
            '2'
        );

        expect(
            within(addedItems).getByRole('heading', { name: /item 2/i })
        ).toBeInTheDocument();
        expect(within(addedItems).getAllByRole('spinbutton')[1]).toHaveValue(
            '1'
        );

        const modal = screen.getByTestId('cart-modal');

        expect(within(modal).getByText('$40')).toBeInTheDocument();
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can utilize the checkout page without localStorage', async () => {
        await user.type(numberInput1, '{Backspace}2{Enter}');
        await user.type(numberInput2, '{Backspace}1{Enter}');

        expect(router.state.location.pathname).toBe('/shop');

        // Navigate to the homepage
        await user.click(screen.getByRole('link', { name: /checkout/i }));

        expect(router.state.location.pathname).toBe('/checkout');

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

        expect(addedItems).toHaveLength(2);
        expect(within(addedItems[0]).getByRole('heading', { name: /item 1/i }));
        expect(within(addedItems[1]).getByRole('heading', { name: /item 2/i }));
    });
});
