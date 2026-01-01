import { useEffect, useState } from 'react';

import upSvg from '../../../assets/media/icons/general/up.svg';

import './stylesheets/ScrollToTop.css';

export default function ScrollToTop() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const checkHeight = () => {
            const pageHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            setShowButton(pageHeight >= viewportHeight * 1.25);
        };

        checkHeight(); // initial

        const resizeObserver = new ResizeObserver(checkHeight);
        resizeObserver.observe(document.body);

        window.addEventListener('resize', checkHeight);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', checkHeight);
        };
    }, []);

    if (!showButton) {
        return null;
    }

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
