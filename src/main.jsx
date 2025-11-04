import './index.css';
import './assets/stylesheets/reset.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router';

import ThemeProvider from './modules/utilities/Theme';
import CartProvider from './modules/utilities/Cart';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <CartProvider>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </CartProvider>
    </StrictMode>
);
