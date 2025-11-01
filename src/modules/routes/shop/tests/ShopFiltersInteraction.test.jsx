import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    fireEvent,
    render,
    screen,
    waitFor,
    within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ThemeProvider from '../../../utilities/Theme';

import Shop from '../../shop/Shop';

import shopLoader from '../../../utilities/loaders/shopLoader';

import { items } from './utilities/mockedItems';

// This file only includes tests for interacting with the filter inputs
// The main goal of this test suite (as opposed to "ShopFiltersData.test.jsx")
// is to ensure local filter state is updating as the user interacts with the filters
// This serves as a basis for "ShopFiltersData.test.jsx"
// ensuring the user can alter the filter inputs

// Note this is mainly done for price (ensuring minimum and maximums are held)
// and rating (ensuring that filled stars correlate to the queried rating)
// but I've decided to include category and query for the sake of including all filters

// "ShopFiltersData.test.jsx" is the file which includes testing filtered data
// "ShopFiltersToggle.test.jsx" is the file which includes testing toggling the filters

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

describe('Test Suite for interacting with filters', () => {
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

    // it('Can properly interact with the price filter', async () => {
    //     await waitFor(() => {
    //         expect(
    //             screen.getByRole('button', { name: /price/i })
    //         ).toBeInTheDocument();
    //     });

    //     const priceFilter = screen.getByRole('button', { name: /price/i });
    //     await user.click(priceFilter);

    //     // Important note for the test:
    //     // As determined by "ShopFiltersToggle.test.jsx"
    //     // due to the provided, mocked, items
    //     // the "From" input will be set to 10.00, and the "To" input will be set to 100.00
    //     const fromInput = screen.getByLabelText('From');
    //     const toInput = screen.getByLabelText('To');

    //     const clearFrom = screen.getByRole('button', {
    //         name: /clear the from price/i,
    //     });
    //     const clearTo = screen.getByRole('button', {
    //         name: /clear the to price/i,
    //     });

    //     // Cannot set a price to a number lower than 0
    //     await user.type(fromInput, '{Backspace>5/}-1{Enter}');
    //     expect(fromInput).toHaveValue('0.00');

    //     // Trying to set it to a number higher than the "To" filter input
    //     await user.type(fromInput, '{Backspace>4/}101{Enter}');
    //     expect(fromInput).toHaveValue('100.00');

    //     // Clear should set it back to the default value
    //     // Default "From" = lowest priced item (10.00) | Default "To" = highest priced item (100.00)
    //     await user.click(clearFrom);
    //     expect(fromInput).toHaveValue('10.00');

    //     await user.type(fromInput, '{Backspace>5/}50');
    //     // This means both enter and clicking away allows updating the input value
    //     await user.click(toInput);
    //     expect(fromInput).toHaveValue('50.00');

    //     // Now testing the "To" filter
    //     await user.click(clearFrom);
    //     await user.type(fromInput, '{Backspace>5/}-1{Enter}');

    //     // The "To" input cannot be lower than the "From" input
    //     // By extension this means that the "To" input cannot be lower than 0
    //     await user.type(toInput, '{Backspace>6/}-1{Enter}');
    //     expect(toInput).toHaveValue('0.00');

    //     await user.click(clearTo);
    //     expect(toInput).toHaveValue('100.00');

    //     await user.click(clearFrom);
    //     await user.type(toInput, '{Backspace>6/}5{Enter}');
    //     expect(toInput).toHaveValue('10.00');

    //     await user.type(toInput, '{Backspace>5/}50');
    //     await user.click(fromInput);
    //     expect(toInput).toHaveValue('50.00');

    //     // Rounds values correctly
    //     await user.click(clearFrom);
    //     await user.click(clearTo);

    //     await user.type(fromInput, '{Backspace>2/}999{Enter}');
    //     expect(fromInput).toHaveValue('11.00');
    //     await user.type(toInput, '{Backspace>2/}999{Enter}');
    //     expect(toInput).toHaveValue('101.00');
    // });

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
    });

    // it('Can properly interact with the rating filter', async () => {});

    // it('Can properly interact with the query filter', async () => {});
});
