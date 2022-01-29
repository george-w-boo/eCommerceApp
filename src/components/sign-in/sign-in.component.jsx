import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import { googleSignInStart } from '../../redux/user/user.actions';
import { signInWithEmailAndPassword } from 'firebase/auth';

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer,
} from './sign-in.styles';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      this.setState({email: '', password: ''});
    } catch(error) {
      console.log(error);
      alert(error);
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;

    this.setState({[name]: value});
  }

  render() {
    const { googleSignInStart } = this.props;
    return (
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            required
            handleChange={this.handleChange}
            label="Email"
          />

          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            required
            handleChange={this.handleChange}
            label="Password"
          />

          <ButtonsBarContainer>
            <CustomButton type="submit">sign in</CustomButton>
            <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>sign in with Google</CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart())
})

export default connect(null, mapDispatchToProps)(SignIn);
