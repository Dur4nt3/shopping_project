import { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { Theme } from '../../utilities/Theme';

import NavMenu from './NavMenu';

import sunSvg from '../../../assets/media/icons/general/light-mode.svg';
import moonSvg from '../../../assets/media/icons/general/dark-mode.svg';
import cartLightSvg from '../../../assets/media/icons/light/cart.svg';
import cartDarkSvg from '../../../assets/media/icons/dark/cart.svg';
import menuLightSvg from '../../../assets/media/icons/light/menu.svg';
import menuDarkSvg from '../../../assets/media/icons/dark/menu.svg';

import './stylesheets/MainNav.css';

export default function MainNav() {
    const { theme, toggleTheme } = useContext(Theme);
    const [menuOpen, setMenuStatus] = useState(false);

    const nextThemeName = theme === 'light' ? 'dark mode' : 'light mode';

    return (
        <nav>
            {menuOpen && <NavMenu setMenuStatus={setMenuStatus} />}
            <h1 className='site-name'>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        isActive ? 'currently-visited' : ''
                    }
                >
                    Pseudo Shopper
                </NavLink>
            </h1>
            <div className='nav-secondaries'>
                <div className='nav-links'>
                    <NavLink
                        to='/shop'
                        className={({ isActive }) =>
                            isActive
                                ? 'shop-link currently-visited'
                                : 'shop-link'
                        }
                    >
                        Shop
                    </NavLink>
                    <NavLink
                        to='/checkout'
                        className={({ isActive }) =>
                            isActive
                                ? 'checkout-link currently-visited'
                                : 'checkout-link'
                        }
                    >
                        Checkout
                    </NavLink>
                </div>

                <div className='nav-icons'>
                    <button
                        className='icon-button nav-cart'
                        aria-label='view cart'
                    >
                        {theme === 'light' ? (
                            <img src={cartLightSvg} alt='view cart' />
                        ) : (
                            <img src={cartDarkSvg} alt='view cart' />
                        )}
                    </button>
                    <button
                        aria-label={`change to ${nextThemeName}`}
                        className='icon-button'
                        onClick={() => {
                            theme === 'light'
                                ? document.body.classList.add('dark-mode')
                                : document.body.classList.remove('dark-mode');
                            toggleTheme();
                        }}
                    >
                        {theme === 'light' ? (
                            <img src={sunSvg} alt='change to dark mode' />
                        ) : (
                            <img src={moonSvg} alt='change to light mode' />
                        )}
                    </button>
                    <button
                        aria-label='open navigation menu'
                        className='icon-button nav-menu-button'
                        onClick={() => {
                            if (menuOpen === false) {
                                setMenuStatus(true);
                            }
                        }}
                    >
                        {theme === 'light' ? (
                            <img src={menuLightSvg} alt='view cart' />
                        ) : (
                            <img src={menuDarkSvg} alt='view cart' />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
