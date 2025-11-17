import { useState } from 'react';

import checkLight from '../../../assets/media/icons/light/check.svg';
import checkDark from '../../../assets/media/icons/dark/check.svg';

export default function CheckoutPayForm({ theme, setPayFormStatus }) {
    const [queueHide, setQueueHide] = useState(false);

    function hideSummary() {
        setQueueHide(true);

        setTimeout(() => {
            setPayFormStatus(false);
        }, 525);
    }

    return (
        <div className={queueHide ? 'pay-form-cont fade-out' : 'pay-form-cont'}>
            <img
                src={theme === 'light' ? checkLight : checkDark}
                alt='checkmark'
            />
            <h1>Thank You!</h1>
            <p>This is as far as I go with "Pseudo Shopper".</p>
            <p>
                If you have any feedback, feel free to contact me through the
                email on my GitHub profile.
            </p>
            <button
                className='return-to-checkout'
                onClick={() => hideSummary()}
            >
                Return to Checkout
            </button>
        </div>
    );
}
