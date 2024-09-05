import { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import supabase from '../../../supabaseClient';
import './PasswordRecovery.scss';

const PasswordRecovery = () => {
    const [inputValue, setinputValue] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const emailValidate = (email) => {
        if (!email) {
            setError('Required field');
            return;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setError('Invalid email address');
            return;
        }

        setError('');
        return true;
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (!emailValidate(inputValue)) return;

        try {
            setLoading(true);

            let { data, error } = await supabase.auth.resetPasswordForEmail(
                inputValue
            );

            data && setSuccess('Successfully reset password');
            error && setError(error.message);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
            setinputValue('');
        }
    };

    const changeInputValue = (evt) => {
        setSuccess('');
        emailValidate(evt.target.value);
        setinputValue(evt.target.value);
    };

    return (
        <div className="recovery">
            <div className="recovery__container">
                <header className="recovery__header">
                    <h1 className="recovery__title">Recover your password</h1>
                    <p className="recovery__info">
                        You&apos;ll receive an email to recover your password.
                    </p>
                </header>
                <form className="recovery__form" onSubmit={handleSubmit}>
                    <label className="recovery__label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="recovery__input"
                        type="text"
                        name="email"
                        id="email"
                        value={inputValue}
                        onChange={changeInputValue}
                    />
                    {error && (
                        <p className="recovery__error-message recovery__message">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="recovery__success-message recovery__message">
                            {success}
                        </p>
                    )}

                    {loading ? (
                        <div className="recovery__spinner">
                            <ImSpinner2 className="spinner" />
                        </div>
                    ) : (
                        <button className="recovery__btn" type="submit">
                            Send
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PasswordRecovery;
