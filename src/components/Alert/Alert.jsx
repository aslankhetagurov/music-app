import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';

import {
    selectAlertText,
    selectAlertType,
    setAddAlertText,
} from './store/alertSlice';
import './Alert.scss';

const Alert = () => {
    const dispatch = useDispatch();
    const alertText = useSelector(selectAlertText);
    const alertType = useSelector(selectAlertType);

    const handleCloseAlert = () => {
        dispatch(setAddAlertText(null));
    };

    useEffect(() => {
        const timeoutId =
            alertText &&
            setTimeout(() => {
                dispatch(setAddAlertText(null));
            }, 7000);

        return () => {
            clearTimeout(timeoutId);
        };
        // eslint-disable-next-line
    }, [alertText]);

    return (
        <div
            className={`alert alert__type-${alertType} ${
                alertText ? 'alert__show' : ''
            }`}
        >
            <p className="alert__text">{alertText}</p>
            <button onClick={handleCloseAlert} className="alert__close-btn">
                <IoMdClose />
            </button>
        </div>
    );
};

export default Alert;
