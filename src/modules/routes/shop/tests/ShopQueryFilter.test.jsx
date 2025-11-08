import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ThemeProvider from '../../../utilities/Theme';
import CartProvider from '../../../utilities/Cart';

import Shop from '../../shop/Shop';

import shopLoader from '../../../utilities/loaders/shopLoader';

import { items } from './utilities/mockedItems';

window.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
        json: () => Promise.resolve(items),
    })
);

const routes = [
    {
        path: 'shop',
        element: <Shop />,
        loader: shopLoader,
    },
];

let router;
let user;

describe('Test Suite for toggling the filters on and off', () => {
    beforeEach(() => {
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
    });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can toggle the query filter', async () => {
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /search items by name/i })
            ).toBeInTheDocument();
        });

        const queryFilter = screen.getByRole('button', {
            name: /search items by name/i,
        });

        await user.click(queryFilter);

        const searchInput = screen.getByPlaceholderText(/search items/i);
        expect(searchInput).toHaveValue('');

        expect(
            screen.getByRole('button', { name: 'Apply' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Deactivate' })
        ).toBeInTheDocument();

        await user.click(queryFilter);

        expect(screen.queryByPlaceholderText(/search items/i)).toBeNull();
        expect(screen.queryByRole('button', { name: 'Apply' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Deactivate' })).toBeNull();
    }, 10000);

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly interact with the query filter', async () => {
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /search items by name/i })
            ).toBeInTheDocument();
        });

        const queryFilter = screen.getByRole('button', {
            name: /search items by name/i,
        });

        await user.click(queryFilter);

        const searchInput = screen.getByPlaceholderText(/search items/i);

        await user.type(searchInput, 'backpack');

        expect(searchInput).toHaveValue('backpack');

        await user.type(searchInput, '{Backspace>8/}jacket');

        expect(searchInput).toHaveValue('jacket');
    }, 10000);

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can filter items based on a query', async () => {
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /search items by name/i })
            ).toBeInTheDocument();
        });

        const queryFilter = screen.getByRole('button', {
            name: /search items by name/i,
        });
        const priceFilter = screen.getByRole('button', {
            name: /price/i,
        });

        await user.click(queryFilter);

        let searchInput = screen.getByPlaceholderText(/search items/i);

        await user.type(searchInput, 'item 11');

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('?query=item%252011');
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        expect(
            screen.getByRole('heading', { name: /no items found.../i })
        ).toBeInTheDocument();

        // Can apply via pressing enter
        // If this doesn't pass pressing apply might be necessary
        // As mentioned this is rather peculiar quirk with the tests
        // The query string being as expected is the what actually indicates that pressing enter works
        await user.type(searchInput, '{Backspace>7/}{Enter}');

        await waitFor(() => {
            expect(router.state.location.search).toBe('?query=');
        });

        expect([
            ...screen.getByTestId('shop-items-grid').children,
        ]).toHaveLength(10);

        await user.type(searchInput, 'EM 1{Enter}');

        await waitFor(() => {
            expect(router.state.location.search).toBe('?query=EM%25201');
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        expect([
            ...screen.getByTestId('shop-items-grid').children,
        ]).toHaveLength(2);
        expect(
            within(screen.getByTestId('shop-items-grid')).getByRole('heading', {
                name: 'Item 1',
            })
        ).toBeInTheDocument();
        expect(
            within(screen.getByTestId('shop-items-grid')).getByRole('heading', {
                name: 'Item 10',
            })
        ).toBeInTheDocument();

        await user.click(priceFilter);
        await user.click(queryFilter);

        searchInput = screen.getByPlaceholderText(/search items/i);
        expect(searchInput).toHaveValue('EM 1');

        await user.click(screen.getByRole('button', { name: 'Deactivate' }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('');
        });

        expect(screen.queryByRole('button', { name: 'Deactivate' })).toBeNull();
        expect(
            screen.getByRole('button', { name: 'Activate' })
        ).toBeInTheDocument();

        expect([
            ...screen.getByTestId('shop-items-grid').children,
        ]).toHaveLength(10);

        await user.click(priceFilter);
        await user.click(queryFilter);

        searchInput = screen.getByPlaceholderText(/search items/i);
        expect(searchInput).toHaveValue('EM 1');

        await user.click(screen.getByRole('button', { name: 'Activate' }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('?query=EM%25201');
        });

        expect([
            ...screen.getByTestId('shop-items-grid').children,
        ]).toHaveLength(2);
        expect(
            within(screen.getByTestId('shop-items-grid')).getByRole('heading', {
                name: 'Item 1',
            })
        ).toBeInTheDocument();
        expect(
            within(screen.getByTestId('shop-items-grid')).getByRole('heading', {
                name: 'Item 10',
            })
        ).toBeInTheDocument();

        expect(screen.queryByRole('button', { name: 'Activate' })).toBeNull();
        expect(
            screen.getByRole('button', { name: 'Deactivate' })
        ).toBeInTheDocument();
    }, 10000);
});
