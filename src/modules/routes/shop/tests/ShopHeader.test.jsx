import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ThemeProvider from '../../../utilities/Theme';

import ShopHeader from '../ShopHeader';

const routes = [
    {
        path: '/',
        element: <ShopHeader />,
    },
];

let router;
let container;

describe('Test Suite For The Shop Header', () => {
    beforeEach(() => {
        router = createMemoryRouter(routes);

        container = render(
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        );
    });

    it('Renders the header (snapshot test)', async () => {
        expect(container).toMatchSnapshot();
    });
});
