import MainNav from './MainNav';
import FloatingBackground from './FloatingBackground';

import { Link } from 'react-router';

import forwardSvg from '../../../assets/media/icons/general/forward.svg'
import './stylesheets/HomeHeader.css';

export default function HomeHeader() {
    return (
        <header>
            <MainNav />
            <FloatingBackground />
            <div className='header-main'>
                <h1 className='header-text1'>Pseudo</h1>
                <h1 className='header-text2'>Shopper</h1>
                <h3>Made for every shopper.</h3>
                <Link to='/shop'>
                    Shop Now
                    <img src={forwardSvg} />
                </Link>
            </div>
        </header>
    );
}
