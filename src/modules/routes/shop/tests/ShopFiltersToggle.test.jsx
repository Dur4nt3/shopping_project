import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ThemeProvider from '../../../utilities/Theme';

import Shop from '../../shop/Shop';

import shopLoader from '../../../utilities/loaders/shopLoader';

import { items } from './utilities/mockedItems';

// This file only includes tests for toggling the filters on and off

// "ShopFiltersData.test.jsx" is the file which includes testing filtered data
// "ShopFiltersInteraction.test.jsx" is the file which includes interacting with the filter inputs

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
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        );
    });

    it('Can activate and deactivate the price filter', async () => {
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
    });

    it('Can activate and deactivate the category filter', async () => {
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
    });

    it('Can activate and deactivate the rating filter', async () => {
        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /rating/i })
            ).toBeInTheDocument();
        });

        const ratingFilter = screen.getByRole('button', { name: /rating/i });

        await user.click(ratingFilter);

        const filterContent = screen.getByTestId('filter-content');

        const starsInputs = within(filterContent).getAllByRole('radio');

        // 0-5 stars rating, i.e., 5 stars total
        expect(starsInputs).toHaveLength(5);
        starsInputs.forEach((starInput) =>
            expect(starInput.getAttribute('aria-checked')).toBe('false')
        );

        expect(
            screen.getByRole('button', { name: 'Apply' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Deactivate' })
        ).toBeInTheDocument();

        await user.click(ratingFilter);

        expect(within(filterContent).queryAllByRole('radio')).toHaveLength(0);
        expect(screen.queryByRole('button', { name: 'Apply' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Deactivate' })).toBeNull();
    });

    it('Can activate and deactivate the query filter', async () => {
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
    });
});
