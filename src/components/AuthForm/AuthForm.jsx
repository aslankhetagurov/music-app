import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Form, Formik, useField } from 'formik';
import { ImSpinner2 } from 'react-icons/im';
import * as Yup from 'yup';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import supabase from '../../../supabaseClient';
import { setAddAlertText, setAddAlertType } from '../Alert/store/alertSlice';
import { setAddUserInfo } from '../../store/slices/authSlice';
import logo from '/logo.webp';
import { fetchUserCollection } from '../UserCollection/store/userCollectionSlice';
import './AuthForm.scss';

const MyTextInput = ({ label, ...props }) => {
    const [field] = useField(props);

    return (
        <>
            <label className="auth-form__label" htmlFor={props.name}>
                {label}
            </label>
            <input
                className="auth-form__input auth-form__input-password"
                {...field}
                {...props}
            />
        </>
    );
};

const AuthForm = ({ textBtn, title, type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggleShowPassword, setToggleShowPassword] = useState(false);

    const handleSubmit = async ({ email, password }) => {
        try {
            if (type === 'signUp') {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) {
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                    return;
                }

                if (data?.user) {
                    dispatch(setAddAlertText('Please confirm your email'));
                    dispatch(setAddAlertType('info'));
                }
            } else if (type === 'logIn') {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) {
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                    return;
                }

                if (data?.user) {
                    const { data: userInfo, error: userInfoError } =
                        await supabase
                            .from('users')
                            .select('*')
                            .eq('id', data.user.id);

                    if (userInfoError) {
                        dispatch(setAddAlertText('Failed to load user data'));
                        dispatch(setAddAlertType('error'));
                        return;
                    }

                    if (userInfo?.length) {
                        dispatch(fetchUserCollection(userInfo[0].email));
                        dispatch(
                            setAddUserInfo({ ...data.user, ...userInfo[0] })
                        );
                    }

                    navigate('/');
                }
            } else if (type === 'update') {
                const { error } = await supabase.auth.updateUser({ password });

                if (error) {
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                    return;
                }

                dispatch(setAddAlertText('Password updated successfully'));
                dispatch(setAddAlertType('info'));
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            dispatch(setAddAlertText(error.message));
            dispatch(setAddAlertType('error'));
        }
    };

    const handleToggleShowPassword = () =>
        setToggleShowPassword(!toggleShowPassword);

    return (
        <div className="auth-form">
            <div className="auth-form__container">
                <div className="auth-form__header">
                    <Link className="auth-form__logo" to="/">
                        <img
                            className="auth-form__logo-img"
                            src={logo}
                            alt="logo"
                        />
                    </Link>
                    <h1 className="auth-form__title">{title}</h1>
                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Invalid email address')
                            .required('Required field'),
                        password: Yup.string()
                            .min(6, 'Minimum 6 characters')
                            .required('Required field'),
                    })}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ isSubmitting }) => (
                        <Form className="auth-form__form">
                            <div className="auth-form__form-item">
                                <MyTextInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                />
                                <ErrorMessage
                                    component="div"
                                    className="auth-form__error"
                                    name="email"
                                />
                            </div>
                            <div className="auth-form__form-item ">
                                <MyTextInput
                                    label="Password"
                                    name="password"
                                    type={
                                        toggleShowPassword ? 'text' : 'password'
                                    }
                                />

                                <button
                                    className="auth-form__show-password-btn"
                                    onClick={handleToggleShowPassword}
                                    type="button"
                                >
                                    {toggleShowPassword ? (
                                        <FaRegEyeSlash />
                                    ) : (
                                        <FaRegEye />
                                    )}
                                </button>

                                <ErrorMessage
                                    component="div"
                                    className="auth-form__error"
                                    name="password"
                                />
                                {type === 'logIn' && (
                                    <div className="auth-form__recover-password">
                                        <span>Forgot your password? </span>
                                        <Link
                                            className="auth-form__recover-link"
                                            to="/recover"
                                        >
                                            Recover
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="auth-form__btn-wrapper">
                                {isSubmitting ? (
                                    <div className="auth-form__spinner">
                                        <ImSpinner2 className="spinner" />
                                    </div>
                                ) : (
                                    <button
                                        className="auth-form__btn"
                                        type="submit"
                                    >
                                        {textBtn}
                                    </button>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
                {type !== 'update' && (
                    <div className="auth-form__bottom">
                        <div className="auth-form__bottom-links">
                            <div className="auth-form__bottom-link-wrapper">
                                <span className="auth-form__bottom-link-text">
                                    {type === 'signUp'
                                        ? 'Are you already registered?'
                                        : 'You are not registered yet?'}
                                </span>
                                <Link
                                    className="auth-form__bottom-link"
                                    to={
                                        type === 'signUp' ? '/login' : '/signup'
                                    }
                                >
                                    {type === 'signUp' ? 'Log in' : 'Sign Up'}
                                </Link>
                            </div>
                            <div className="auth-form__signup-link"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
