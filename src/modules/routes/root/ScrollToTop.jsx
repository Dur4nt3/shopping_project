import { useEffect } from 'react';

import upSvg from '../../../assets/media/icons/general/up.svg';

import './stylesheets/ScrollToTop.css';

export default function ScrollToTop() {
    const viewportHeight = window.innerHeight;
    const pageHeight = document.body.scrollHeight;

    // In some occasions, an adjustment is needed after rendering 
    // (e.g., the button not disappearing after navigating to a path which doesn't require it)
    // This solves that issue
    useEffect(() => {
        if (document.querySelector('.scroll-to-top-cont') !== null) {
            if (!(document.body.scrollHeight >= window.innerHeight * 1.25)) {
                document
                    .querySelector('.scroll-to-top-cont')
                    .classList.add('hidden');
            }
        }

        // Reset the "hidden" state before executing the next effect/unmounting
        return () => {
            if (document.querySelector('.scroll-to-top-cont') !== null) {
                document
                    .querySelector('.scroll-to-top-cont')
                    .classList.remove('hidden');
            }
        };
    }, [viewportHeight, pageHeight]);

    // NOTE: there is not formula/specific consideration for the "1.25" multiplier
    // This can be freely adjusted according to UI/UX requirement
    // The bigger the number the higher the page can be without including the button
    if (pageHeight >= viewportHeight * 1.25) {
        return (
            <div className='scroll-to-top-cont'>
                <button
                    className='scroll-to-top'
                    aria-label='scroll to top'
                    onClick={() =>
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: 'smooth',
                        })
                    }
                >
                    <img src={upSvg} />
                </button>
            </div>
        );
    }
}
