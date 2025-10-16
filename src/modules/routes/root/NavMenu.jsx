import { useEffect, useRef } from 'react';
import { Link } from 'react-router';

import './stylesheets/NavMenu.css';

import closeSvg from '../../../assets/media/icons/general/close.svg';

export default function NavMenu({ setMenuStatus }) {
    const menuRef = useRef(null);

    useEffect(() => {
        if (menuRef.current !== null) {
            menuRef.current.classList.add('fade-in');
            menuRef.current.classList.remove('hidden');
            setTimeout(() => {
                if (menuRef.current !== null) {
                    menuRef.current.classList.remove('fade-in');
                }
            }, 600);
        }
    }, []);

    return (
        <div className='nav-menu hidden' ref={menuRef}>
            <button
                aria-label='close navigation menu'
                onClick={() => {
                    menuRef.current.classList.remove('fade-in');
                    setMenuStatus(false);
                }}
            >
                <img src={closeSvg} alt='close menu' />
            </button>
            <div className='nav-menu-inner'>
                <Link to='/shop' data-testid='menu-shop-link'>Shop</Link>
                <Link to='/checkout' data-testid='menu-checkout-link'>Checkout</Link>
            </div>
        </div>
    );
}
