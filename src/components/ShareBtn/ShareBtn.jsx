import { useRef } from 'react';
import { FaShareNodes } from 'react-icons/fa6';

import './ShareBtn.scss';

const ShareBtn = () => {
    const copyTooltipRef = useRef();
    let tooltipTimer = null;

    const handleShareLink = async () => {
        try {
            copyTooltipRef.current.style.opacity = '1';
            copyTooltipRef.current.style.visibility = 'visible';
            await navigator.clipboard.writeText(document.location.href);
            tooltipTimer = setTimeout(() => {
                copyTooltipRef.current.style.opacity = '0';
                copyTooltipRef.current.style.visibility = 'hidden';
                clearTimeout(tooltipTimer);
            }, 3000);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button
            className="share-btn"
            onClick={handleShareLink}
            aria-label="Copy link to clipboard"
        >
            <span className="share-btn__icon">
                <FaShareNodes />
            </span>
            <span className="share-btn__text">share</span>
            <span ref={copyTooltipRef} className="share-btn__tooltip">
                Link copied
            </span>
        </button>
    );
};

export default ShareBtn;
