import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ThemeProvider from '../../../utilities/Theme';
import CartProvider from '../../../utilities/Cart';

import Shop from '../../shop/Shop';

import shopLoader from '../../../utilities/loaders/shopLoader';

import { items } from './utilities/mockedItems';

// Note for the test:
// When it comes to applying filters, there is no difference between applying 2 filters at the same time
// and applying 3 or 4 filters at the same time
// The application's logic doesn't change the more filters you apply
// The only difference between 1 filter applied and multiple filters applied is how the URL search parameters look
// The end results are the same

// Due to the fact that in other test suites we already determined that all filters work individually
// here, we only need to ensure 2 filters (doesn't matter what filters) work properly at the same time
// 2 filters working at the same time should logically cover any of them working at the same time

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

    it('Can properly filter data with multiple filters active', async () => {
        // Only waiting for one, as if one shows, all of them are shown
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /price/i })
            ).toBeInTheDocument();
        });

        const categoryFilter = screen.getByRole('button', {
            name: /category/i,
        });
        const ratingFilter = screen.getByRole('button', { name: /rating/i });

        await user.click(categoryFilter);

        const selectInput = within(
            screen.getByTestId('filter-content')
        ).getByRole('combobox');

        await user.click(selectInput);

        const listBox = screen.getByRole('listbox');
        await user.click(within(listBox).getByText(/category 1/i));

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe(
                '?category=category%25201'
            );
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        // We already checked that applying individual filters work
        // Therefore, I don't check to make sure the items are filtered
        // You can view "Shop{filter name}Filter.test.jsx" to see individual filter tests
        await user.click(ratingFilter);

        const starsInputs = within(
            screen.getByTestId('filter-content')
        ).getAllByRole('radio');

        await user.click(starsInputs[4]);

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe(
                '?category=category%25201&rating=5'
            );
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        // Check that you can filter into no items with multiple filters active
        expect(
            screen.getByRole('heading', { name: /no items found.../i })
        ).toBeInTheDocument();

        await user.click(starsInputs[3]);

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe(
                '?category=category%25201&rating=4'
            );
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        let shopItemsGrid = screen.getByTestId('shop-items-grid');

        // Multiple filters active are able to show the correct items
        expect([...shopItemsGrid.children]).toHaveLength(1);
        expect(
            within(shopItemsGrid).getByRole('heading', {
                name: 'Item 4',
            })
        ).toBeInTheDocument();

        await user.click(categoryFilter);

        // Applying filters doesn't affect the input values of other filters
        expect(
            document.querySelector('.ant-select-selection-wrap')
        ).toHaveTextContent(/category 1/i);

        await user.click(screen.getByRole('button', { name: 'Deactivate' }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('?rating=4');
        });

        shopItemsGrid = screen.getByTestId('shop-items-grid');

        // Deactivating filters doesn't affect other filters
        expect([...shopItemsGrid.children]).toHaveLength(3);
        expect(
            within(shopItemsGrid).getByRole('heading', {
                name: 'Item 3',
            })
        ).toBeInTheDocument();
        expect(
            within(shopItemsGrid).getByRole('heading', {
                name: 'Item 4',
            })
        ).toBeInTheDocument();
        expect(
            within(shopItemsGrid).getByRole('heading', {
                name: 'Item 8',
            })
        ).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Activate' }));

        await waitFor(() => {
            expect(router.state.location.search).toBe(
                '?rating=4&category=category%25201'
            );
        });

        // Activating a filter when one is already active appends it
        // rather than overriding a previously applied filter
        await waitFor(() => {
            expect([...shopItemsGrid.children]).toHaveLength(1);
        });
        expect(
            within(shopItemsGrid).getByRole('heading', {
                name: 'Item 4',
            })
        ).toBeInTheDocument();
    }, 15000);

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Retains search parameters when navigating from /shop to /shop', async () => {
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /category/i })
            ).toBeInTheDocument();
        });

        const categoryFilter = screen.getByRole('button', {
            name: /category/i,
        });

        await user.click(categoryFilter);

        const filterContent = screen.getByTestId('filter-content');

        const selectInput = within(filterContent).getByRole('combobox');

        await user.click(selectInput);

        const listBox = screen.getByRole('listbox');
        await user.click(within(listBox).getByText(/category 1/i));

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe(
                '?category=category%25201'
            );
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        const menuButton = screen.getByRole('button', {
            name: /open navigation menu/i,
        });

        await user.click(menuButton);

        const menuShopLink = screen.getByTestId('menu-shop-link');
        expect(menuShopLink).toHaveAttribute(
            'href',
            '/shop?category=category%25201'
        );

        // Navigating from the menu
        await user.click(menuShopLink);

        // Still retaining the search parameters
        expect(router.state.location.search).toBe('?category=category%25201');

        const navShopLink = within(screen.getByTestId('nav-links')).getByRole(
            'link',
            { name: /shop/i }
        );
        expect(navShopLink).toHaveAttribute(
            'href',
            '/shop?category=category%25201'
        );

        // Navigating from the navbar
        await user.click(navShopLink);

        expect(router.state.location.search).toBe('?category=category%25201');
    }, 10000);
});
