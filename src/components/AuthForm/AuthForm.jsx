import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessage, Form, Formik, useField } from 'formik';
import { ImSpinner2 } from 'react-icons/im';
import * as Yup from 'yup';

import supabase from '../../../supabaseClient';
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

const AuthForm = ({ textBtn, title }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isSignUpPage = pathname === '/signup';

    const handleSubmit = async ({ email, password }) => {
        const action = isSignUpPage ? 'signUp' : 'signInWithPassword';
        let { data, error } = await supabase.auth[action]({
            email,
            password,
        });

        const link = isSignUpPage ? '/login' : '/';
        data.user && navigate(link);

        error && console.log(error.message);
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
                            .email('Wrong email address')
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
                <div className="auth-form__bottom">
                    <div className="auth-form__bottom-links">
                        <div className="auth-form__bottom-link-wrapper">
                            <span className="auth-form__bottom-link-text">
                                {isSignUpPage
                                    ? 'Are you already registered?'
                                    : 'You are not registered yet?'}
                            </span>
                            <Link
                                className="auth-form__bottom-link"
                                to={isSignUpPage ? '/login' : '/signup'}
                            >
                                {isSignUpPage ? 'Log in' : 'Sign Up'}
                            </Link>
                        </div>
                        <div className="auth-form__signup-link"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
