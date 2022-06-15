import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../utils/mutations';
import { authActions } from '../slices/auth';
import './login.scss';

import Auth from '../utils/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const unsuccessfullNotify = () => {
    toast('password or username is incorrect');
  };
  // sets the default form of the log in page to present a login form
  const [currentView, setCurrentView] = useState('logIn');
  // calling our mutations to add a login session or a user
  const [login] = useMutation(LOGIN_USER);
  const [addUser] = useMutation(ADD_USER);

  // uses our APU to establish a login session, and redirects user to the profile page when login
  const loginForm = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { data } = await login({
          variables: { ...values },
        });

        const token = await data.login.token;
        dispatch(authActions.login());
        Auth.login(token);
        navigate('/profile', { replace: true });
      } catch (err) {
        console.error(err);
        unsuccessfullNotify();
      }
    },
  });
  // uses the add user mutation to create a user
  const registerForm = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const data = await addUser({
          variables: { input: { ...values } },
        });

        const token = await data.data.addUser.token;
        dispatch(authActions.login());
        Auth.login(token);
        navigate('/profile', { replace: true });
      } catch (err) {
        console.error(err);
      }
    },
  });

  const changeView = (view) => {
    setCurrentView(view);
  };
  // renders the specific form based on login, signup or forgot password
  const renderSwitch = (currentView) => {
    switch (currentView) {
      case 'signUp':
        return (
          <form onSubmit={registerForm.handleSubmit}>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={registerForm.handleChange}
                    value={registerForm.values.username}
                    required
                  />
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={registerForm.handleChange}
                    value={registerForm.values.email}
                    required
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={registerForm.handleChange}
                    values={registerForm.values.password}
                    required
                  />
                </li>
              </ul>
            </fieldset>
            <button>Submit</button>
            <button type="button" onClick={() => changeView('logIn')}>
              Have an Account?
            </button>
          </form>
        );
      case 'logIn':
        return (
          <form onSubmit={loginForm.handleSubmit}>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
            />
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.username}
                    placeholder="Username"
                    required
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.password}
                    required
                  />
                </li>
                <li>
                  <i />
                  <p onClick={() => changeView('PWReset')}>Forgot Password?</p>
                </li>
              </ul>
            </fieldset>
            <button>Login</button>
            <button type="button" onClick={() => changeView('signUp')}>
              Create an Account
            </button>
          </form>
        );
      case 'PWReset':
        return (
          <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => changeView('logIn')}>
              Go Back
            </button>
          </form>
        );
      default:
        break;
    }
  };

  return <section id="entry-page">{renderSwitch(currentView)}</section>;
};

export default LoginForm;
