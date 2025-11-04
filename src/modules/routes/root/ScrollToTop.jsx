import upSvg from '../../../assets/media/icons/general/up.svg';

import './stylesheets/ScrollToTop.css';

export default function ScrollToTop() {
    
    const viewportHeight = window.innerHeight;
    const pageHeight = document.body.scrollHeight;

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
