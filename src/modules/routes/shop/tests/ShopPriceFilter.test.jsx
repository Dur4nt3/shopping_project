import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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

describe('Test Suite for the price filter', () => {
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

    it('Can toggle the price filter', async () => {
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /price/i })
            ).toBeInTheDocument();
        });

        const priceFilter = screen.getByRole('button', { name: /price/i });

        // Toggling on the filter content
        await user.click(priceFilter);

        const fromInput = screen.getByLabelText('From');

        expect(fromInput).toBeInTheDocument;
        expect(fromInput).toHaveValue('10.00');
        expect(
            screen.getByRole('button', { name: /clear the from price/i })
        ).toBeInTheDocument();

        const toInput = screen.getByLabelText('To');

        expect(toInput).toBeInTheDocument;
        expect(toInput).toHaveValue('100.00');
        expect(
            screen.getByRole('button', { name: /clear the to price/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('button', { name: 'Apply' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Deactivate' })
        ).toBeInTheDocument();

        // Toggling off the filter content
        await user.click(priceFilter);

        // DO NOT use "toThrowError" it massively throttles the test suite for absolutely 0 value
        // "query" accomplishes the exact same thing without being a massive burden on the test suite

        expect(screen.queryByLabelText('From')).toBeNull();
        expect(screen.queryByLabelText('To')).toBeNull();
        expect(screen.queryByRole('button', { name: 'Apply' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Deactivate' })).toBeNull();
    }, 10000);

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly interact with the price filter', async () => {
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /price/i })
            ).toBeInTheDocument();
        });

        const priceFilter = screen.getByRole('button', { name: /price/i });
        await user.click(priceFilter);

        // Important note for the test:
        // As determined by "ShopFiltersToggle.test.jsx"
        // due to the provided, mocked, items
        // the "From" input will be set to 10.00, and the "To" input will be set to 100.00
        const fromInput = screen.getByLabelText('From');
        const toInput = screen.getByLabelText('To');

        const clearFrom = screen.getByRole('button', {
            name: /clear the from price/i,
        });
        const clearTo = screen.getByRole('button', {
            name: /clear the to price/i,
        });

        // Cannot set a price to a number lower than 0
        await user.type(fromInput, '{Backspace>5/}-1{Enter}');
        expect(fromInput).toHaveValue('0.00');

        // Trying to set it to a number higher than the "To" filter input
        await user.type(fromInput, '{Backspace>4/}101{Enter}');
        expect(fromInput).toHaveValue('100.00');

        // Clear should set it back to the default value
        // Default "From" = lowest priced item (10.00) | Default "To" = highest priced item (100.00)
        await user.click(clearFrom);
        expect(fromInput).toHaveValue('10.00');

        await user.type(fromInput, '{Backspace>5/}50');
        // This means both enter and clicking away allows updating the input value
        await user.click(toInput);
        expect(fromInput).toHaveValue('50.00');

        // Now testing the "To" filter
        await user.click(clearFrom);
        await user.type(fromInput, '{Backspace>5/}-1{Enter}');

        // The "To" input cannot be lower than the "From" input
        // By extension this means that the "To" input cannot be lower than 0
        await user.type(toInput, '{Backspace>6/}-1{Enter}');
        expect(toInput).toHaveValue('0.00');

        await user.click(clearTo);
        expect(toInput).toHaveValue('100.00');

        await user.click(clearFrom);
        await user.type(toInput, '{Backspace>6/}5{Enter}');
        expect(toInput).toHaveValue('10.00');

        await user.type(toInput, '{Backspace>5/}50');
        await user.click(fromInput);
        expect(toInput).toHaveValue('50.00');

        // Rounds values correctly
        await user.click(clearFrom);
        await user.click(clearTo);

        await user.type(fromInput, '{Backspace>2/}999{Enter}');
        expect(fromInput).toHaveValue('11.00');
        await user.type(toInput, '{Backspace>2/}999{Enter}');
        expect(toInput).toHaveValue('101.00');
    }, 10000);

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can filter items based on price', async () => {
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /price/i })
            ).toBeInTheDocument();
        });

        const priceFilter = screen.getByRole('button', { name: /price/i });
        const categoryFilter = screen.getByRole('button', {
            name: /category/i,
        });
        await user.click(priceFilter);

        let fromInput = screen.getByLabelText('From');
        let toInput = screen.getByLabelText('To');

        await user.type(fromInput, '{Backspace>5/}9{Enter}');
        await user.type(toInput, '{Backspace>6/}9{Enter}');

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('?from=9&to=9');
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        expect(
            screen.getByRole('heading', { name: /no items found.../i })
        ).toBeInTheDocument();

        // Selecting another filter and going back shouldn't clear the previous filter data
        await user.click(categoryFilter);
        await user.click(priceFilter);

        // Every time you switch to a different filter
        // you have to redefine the inputs and buttons as they are different
        fromInput = screen.getByLabelText('From');
        toInput = screen.getByLabelText('To');

        expect(fromInput).toHaveValue('9.00');
        expect(toInput).toHaveValue('9.00');

        await user.type(toInput, '{Backspace>4/}150{Enter}');
        await user.type(fromInput, '{Backspace>4/}150{Enter}');

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('?from=150&to=150');
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        expect(
            screen.getByRole('heading', { name: /no items found.../i })
        ).toBeInTheDocument();

        await user.type(fromInput, '{Backspace>6/}40{Enter}');
        await user.type(toInput, '{Backspace>6/}70{Enter}');

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('?from=40&to=70');
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        expect([
            ...screen.getByTestId('shop-items-grid').children,
        ]).toHaveLength(4);
        expect(
            screen.getByRole('heading', { name: 'Item 4' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Item 5' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Item 6' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: 'Item 7' })
        ).toBeInTheDocument();

        await user.type(toInput, '{Backspace>5/}99.99{Enter}');
        await user.type(fromInput, '{Backspace>5/}90{Enter}');

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('?from=90&to=99.99');
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        expect([
            ...screen.getByTestId('shop-items-grid').children,
        ]).toHaveLength(1);
        expect(
            screen.getByRole('heading', { name: 'Item 9' })
        ).toBeInTheDocument();

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

        // Switching when a filter is deactivated still preserves the input values
        await user.click(categoryFilter);
        await user.click(priceFilter);

        fromInput = screen.getByLabelText('From');
        toInput = screen.getByLabelText('To');

        expect(fromInput).toHaveValue('90.00');
        expect(toInput).toHaveValue('99.99');

        await user.click(screen.getByRole('button', { name: 'Activate' }));
        await waitFor(() => {
            expect(router.state.location.search).toBe('?from=90&to=99.99');
        });

        expect([
            ...screen.getByTestId('shop-items-grid').children,
        ]).toHaveLength(1);
        expect(
            screen.getByRole('heading', { name: 'Item 9' })
        ).toBeInTheDocument();

        expect(screen.queryByRole('button', { name: 'Activate' })).toBeNull();
        expect(
            screen.getByRole('button', { name: 'Deactivate' })
        ).toBeInTheDocument();
    }, 15000);
});
