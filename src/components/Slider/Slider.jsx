import { useEffect, useRef, useState } from 'react';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';

import './Slider.scss';

const Slider = ({ sliderItems, showAllItems, duration, timingFn }) => {
    const sliderRef = useRef(null);
    const sliderItemsRef = useRef(null);
    const itemCount = sliderItems?.length;
    const startTouchPosition = useRef(null);
    const [itemCounter, setItemCounter] = useState(0);
    const [translateWidth, setTranslateWidth] = useState(0);
    const [sliderOn, setSliderOn] = useState(false);

    const handlePrevSlide = () => {
        if (!itemCounter)
            sliderItemsRef.current.style.transition = `transform ${duration}ms ${
                timingFn || 'ease'
            }`;

        if (itemCounter <= 0) {
            sliderItemsRef.current.childNodes[
                itemCount - Math.abs(itemCounter - 1)
            ].style.transform = `translateX(-${154 * itemCount}px)`; //154 = item width + column-gap
        } else {
            sliderItemsRef.current.childNodes[
                itemCounter - 1
            ].style.transform = `translateX(${0}px)`;
        }

        sliderItemsRef.current.style.transform = `translateX(${
            translateWidth + 154
        }px)`;

        setTranslateWidth(translateWidth + 154);

        if (itemCounter === Number(`-${itemCount - 1}`)) {
            setTimeout(() => {
                sliderItemsRef.current.style.transition = 'transform 0ms';

                sliderItemsRef.current.style.transform = `translateX(${0}px)`;

                sliderItemsRef.current.childNodes.forEach((el) => {
                    el.style.transform = 'translateX(0)';
                });
                setItemCounter(0);
                setTranslateWidth(0);
            }, duration);
        } else {
            setItemCounter(itemCounter - 1);
        }
    };

    const handleNextSlide = () => {
        if (!itemCounter)
            sliderItemsRef.current.style.transition = `transform ${duration}ms ${
                timingFn || 'ease'
            }`;

        if (itemCounter < 0) {
            setTimeout(() => {
                sliderItemsRef.current.childNodes[
                    itemCount - Math.abs(itemCounter)
                ].style.transform = `translateX(${0}px)`;
            }, duration);
        } else {
            if (itemCounter) {
                sliderItemsRef.current.childNodes[
                    Math.abs(itemCounter - 1)
                ].style.transform = `translateX(${154 * itemCount}px)`;
            }
        }

        sliderItemsRef.current.style.transform = `translateX(${
            translateWidth - 154
        }px)`;

        setTranslateWidth(translateWidth - 154);

        if (itemCounter === itemCount - 1) {
            setTimeout(() => {
                sliderItemsRef.current.style.transition = 'transform 0ms';
                sliderItemsRef.current.style.transform = `translateX(${0}px)`;
                sliderItemsRef.current.childNodes.forEach((el) => {
                    el.style.transform = 'translateX(0)';
                });
                setItemCounter(0);
                setTranslateWidth(0);
            }, duration);
        } else {
            setItemCounter(itemCounter + 1);
        }
    };

    const handleSetStartTouchPosition = (e) =>
        (startTouchPosition.current = e.changedTouches[0].clientX);

    const handleNextSlideByMove = (e) => {
        if (!startTouchPosition.current) return;

        const currentTouchPosition = e.changedTouches[0].clientX;
        const direction = startTouchPosition.current - currentTouchPosition;

        if (direction > 10) {
            handleNextSlide();
        }
        if (direction < -10) {
            handlePrevSlide();
        }
        startTouchPosition.current = null;
    };

    useEffect(() => {
        const slider = sliderRef.current;

        const sliderOnOff = (entries) => {
            if (entries[0].contentRect.width - 154 * itemCount < -15) {
                !sliderOn && setSliderOn(true);
            } else if (entries[0].contentRect.width > 154 * itemCount) {
                sliderOn && setSliderOn(false);
            }
        };

        const resizeObserver = new ResizeObserver(sliderOnOff);

        if (slider) resizeObserver.observe(slider);

        return () => {
            if (slider) resizeObserver.unobserve(slider);
        };
    }, [itemCount, sliderOn]);

    return (
        <div ref={sliderRef} className="slider">
            {sliderOn && !showAllItems && (
                <div className="slider__arrows">
                    <button onClick={handlePrevSlide} className="slider__arrow">
                        <FaCircleArrowLeft />
                    </button>

                    <button onClick={handleNextSlide} className="slider__arrow">
                        <FaCircleArrowRight />
                    </button>
                </div>
            )}
            <div
                className={`slider__items ${
                    showAllItems ? 'show-all-items' : ''
                }`}
                ref={sliderItemsRef}
                onTouchMove={handleNextSlideByMove}
                onTouchStart={handleSetStartTouchPosition}
            >
                {sliderItems}
            </div>
        </div>
    );
};

export default Slider;
