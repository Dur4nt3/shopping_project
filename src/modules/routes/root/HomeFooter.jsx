import { useContext } from 'react';
import { Theme } from '../../utilities/Theme';

import githubLight from '../../../assets/media/icons/light/github-mark.svg';
import githubDark from '../../../assets/media/icons/dark/github-mark.svg';

import './stylesheets/HomeFooter.css';

export default function HomeFooter() {
    const { theme } = useContext(Theme);

    return (
        <footer>
            <a
                href='https://github.com/Dur4nt3/shopping_project'
                rel='noopener noreferrer'
                aria-label='project github repository'
            >
                <img
                    src={theme === 'light' ? githubLight : githubDark}
                    alt='github repository'
                />
            </a>
        </footer>
    );
}
