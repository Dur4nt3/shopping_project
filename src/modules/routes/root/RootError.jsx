import { useContext } from 'react';
import { Link } from 'react-router';
import { Theme } from '../../utilities/Theme';

import forwardSvg from '../../../assets/media/icons/general/forward.svg';
import bugLight from '../../../assets/media/icons/light/bug.svg';
import bugDark from '../../../assets/media/icons/dark/bug.svg';

import './stylesheets/RootError.css';

export default function RootError() {
    const { theme } = useContext(Theme);

    return (
        <div className='app-error-cont'>
            <img src={theme === 'light' ? bugLight : bugDark} alt='' />
            <h1>Unable to complete your request</h1>
            <p>We hit a snag while processing your request.</p>
            <p>Return to the homepage and try again!</p>
            <Link to='/'>
                Homepage
                <img src={forwardSvg} />
            </Link>
        </div>
    );
}
