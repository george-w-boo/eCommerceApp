import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer,
} from './sign-in.styles';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const dispatch = useDispatch();
  const emailSignInStartHandler = (email, password) =>
    dispatch(emailSignInStart({ email, password }));

  const handleSubmit = async event => {
    event.preventDefault();

    emailSignInStartHandler(email, password);
  };

  const handleChange = (event) => {
    const {name, value} = event.target;

    setUserCredentials({...userCredentials, [name]: value});
  };

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          required
          handleChange={handleChange}
          label="Email"
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          required
          handleChange={handleChange}
          label="Password"
        />

        <ButtonsBarContainer>
          <CustomButton type="submit">sign in</CustomButton>
          <CustomButton type="button" onClick={() => dispatch(googleSignInStart())} isGoogleSignIn>sign in with Google</CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
