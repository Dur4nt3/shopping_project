import { useContext } from 'react';
import { Link } from 'react-router';
import { Theme } from '../../utilities/Theme';

import sunSvg from '../../../assets/media/icons/general/light-mode.svg';
import moonSvg from '../../../assets/media/icons/general/dark-mode.svg';
import cartLightSvg from '../../../assets/media/icons/light/cart.svg';
import cartDarkSvg from '../../../assets/media/icons/dark/cart.svg';
import menuLightSvg from '../../../assets/media/icons/light/menu.svg';
import menuDarkSvg from '../../../assets/media/icons/dark/menu.svg';

import './stylesheets/MainNav.css';

export default function MainNav() {
    const { theme, toggleTheme } = useContext(Theme);

    return (
        <nav>
            <h1 className='site-name'>Pseudo Shopper</h1>
            <div className='nav-secondaries'>
                <Link to='/shop' className='shop-link'>
                    Shop
                </Link>
                <div className='nav-icons'>
                    <button
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
                    <button className='icon-button nav-cart'>
                        {theme === 'light' ? (
                            <img src={cartLightSvg} alt='view cart' />
                        ) : (
                            <img src={cartDarkSvg} alt='view cart' />
                        )}
                    </button>
                    <button className='icon-button nav-menu'>
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
