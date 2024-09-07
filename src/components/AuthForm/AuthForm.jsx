import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Form, Formik, useField } from 'formik';
import { ImSpinner2 } from 'react-icons/im';
import * as Yup from 'yup';

import supabase from '../../../supabaseClient';
import { setAddAlertText, setAddAlertType } from '../Alert/store/alertSlice';
import './AuthForm.scss';

const MyTextInput = ({ label, ...props }) => {
    const [field] = useField(props);

    return (
        <>
            <label className="auth-form__label" htmlFor={props.name}>
                {label}
            </label>
            <input className="auth-form__input" {...field} {...props} />
        </>
    );
};

const AuthForm = ({ textBtn, title, type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async ({ email, password }) => {
        const action =
            type === 'signUp'
                ? 'signUp'
                : type === 'logIn'
                ? 'signInWithPassword'
                : 'updateUser';

        try {
            let { data, error } = await supabase.auth[action]({
                email,
                password,
            });

            const link =
                type === 'signUp' ? '/login' : type === 'logIn' ? '/' : '/';

            data?.user && navigate(link);

            if (error) {
                dispatch(setAddAlertText(error.message));
                dispatch(setAddAlertType('error'));
            }
        } catch (error) {
            dispatch(setAddAlertText(error.message));
            dispatch(setAddAlertType('error'));
        }
    };

    return (
        <div className="auth-form">
            <div className="auth-form__container">
                <h1 className="auth-form__title">{title}</h1>
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
                            <div className="auth-form__form-item">
                                <MyTextInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                />
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
