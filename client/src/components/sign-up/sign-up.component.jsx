import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import {
  SignUpContainer,
  SignUpTitle,
} from './sign-up.styles';

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    dispatch(signUpStart({displayName, email, password}))
  }

  const handleChange = event => {
    const { name, value } = event.target;

    setUserCredentials({...userCredentials, [name]: value});
  };

  return (
    <SignUpContainer>
      <SignUpTitle>I don't have an account</SignUpTitle>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN-UP</CustomButton>
      </form>
    </SignUpContainer>
  );
};

export default SignUp;
