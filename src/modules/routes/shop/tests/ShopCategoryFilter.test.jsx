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

describe('Test Suite for the category filter', () => {
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

    it('Can toggle the category filter', async () => {
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /category/i })
            ).toBeInTheDocument();
        });

        const categoryFilter = screen.getByRole('button', {
            name: /category/i,
        });

        await user.click(categoryFilter);

        // Although there isn't another select input on the page, this is for safety
        const filterContent = screen.getByTestId('filter-content');

        // This is just a wrapper Ant Design uses over the actual select element
        // It is used to get access to the actual select element (by clicking on it)
        const selectInput = within(filterContent).getByRole('combobox');

        expect(selectInput).toBeInTheDocument();
        expect(
            within(filterContent).getByText(/filter by category/i)
        ).toBeInTheDocument();

        await user.click(selectInput);
        // The actual listbox (select) only appear after clicking the input
        const selectOptions = [...screen.getByRole('listbox').children];
        expect(selectOptions).toHaveLength(4);
        expect(selectOptions[0]).toHaveTextContent(/category 1/i);
        expect(selectOptions[1]).toHaveTextContent(/category 2/i);
        expect(selectOptions[2]).toHaveTextContent(/category 3/i);
        expect(selectOptions[3]).toHaveTextContent(/category 4/i);

        expect(
            screen.getByRole('button', { name: 'Apply' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Deactivate' })
        ).toBeInTheDocument();

        await user.click(categoryFilter);

        expect(within(filterContent).queryByRole('combobox')).toBeNull();
        expect(screen.queryByRole('button', { name: 'Apply' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Deactivate' })).toBeNull();
    }, 10000);

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can properly interact with the category filter', async () => {
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

        // Currently this is only way (I know of) to get the value of the select input
        // Unfortunately, Ant Design doesn't set the value on the input (selectInput variable in this case)
        const selectValue = document.querySelector(
            '.ant-select-selection-wrap'
        );

        // Initial placeholder
        expect(selectValue).toHaveTextContent(/filter by category/i);

        await user.click(selectInput);

        const listBox = screen.getByRole('listbox');
        await user.click(within(listBox).getByText(/category 1/i));
        expect(selectValue).toHaveTextContent(/category 1/i);

        await user.click(selectInput);
        await user.click(within(listBox).getByText(/category 2/i));
        expect(selectValue).toHaveTextContent(/category 2/i);

        await user.click(selectInput);
        await user.click(within(listBox).getByText(/category 3/i));
        expect(selectValue).toHaveTextContent(/category 3/i);

        await user.click(selectInput);
        await user.click(within(listBox).getByText(/category 4/i));
        expect(selectValue).toHaveTextContent(/category 4/i);
    }, 10000);

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    it('Can filter items based on categories', async () => {
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /category/i })
            ).toBeInTheDocument();
        });

        const categoryFilter = screen.getByRole('button', {
            name: /category/i,
        });
        const priceFilter = screen.getByRole('button', {
            name: /price/i,
        });

        await user.click(categoryFilter);

        const shopItemsGrid = screen.getByTestId('shop-items-grid');
        const filterContent = screen.getByTestId('filter-content');

        const selectInput = within(filterContent).getByRole('combobox');

        const selectValue = document.querySelector(
            '.ant-select-selection-wrap'
        );

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

        expect([...shopItemsGrid.children]).toHaveLength(3);
        expect(
            within(shopItemsGrid).getAllByRole('heading', {
                name: /category 1/i,
            })
        ).toHaveLength(3);

        await user.click(selectInput);
        await user.click(within(listBox).getByText(/category 4/i));

        await user.click(screen.getByRole('button', { name: /apply/i }));

        await waitFor(() => {
            expect(router.state.location.search).toBe(
                '?category=category%25204'
            );
        });

        await user.click(screen.getByRole('button', { name: /apply/i }));

        expect([...shopItemsGrid.children]).toHaveLength(2);
        expect(
            within(shopItemsGrid).getAllByRole('heading', {
                name: /category 4/i,
            })
        ).toHaveLength(2);

        await user.click(priceFilter);
        await user.click(categoryFilter);

        expect(selectValue).toHaveTextContent(/category 4/i);

        await user.click(screen.getByRole('button', { name: 'Deactivate' }));

        await waitFor(() => {
            expect(router.state.location.search).toBe('');
        });

        expect(screen.queryByRole('button', { name: 'Deactivate' })).toBeNull();
        expect(
            screen.getByRole('button', { name: 'Activate' })
        ).toBeInTheDocument();

        expect([...shopItemsGrid.children]).toHaveLength(10);

        await user.click(priceFilter);
        await user.click(categoryFilter);

        expect(selectValue).toHaveTextContent(/category 4/i);

        await user.click(screen.getByRole('button', { name: 'Activate' }));

        await waitFor(() => {
            expect(router.state.location.search).toBe(
                '?category=category%25204'
            );
        });

        expect([...shopItemsGrid.children]).toHaveLength(2);
        expect(
            within(shopItemsGrid).getAllByRole('heading', {
                name: /category 4/i,
            })
        ).toHaveLength(2);

        expect(screen.queryByRole('button', { name: 'Activate' })).toBeNull();
        expect(
            screen.getByRole('button', { name: 'Deactivate' })
        ).toBeInTheDocument();
    }, 15000);
});
