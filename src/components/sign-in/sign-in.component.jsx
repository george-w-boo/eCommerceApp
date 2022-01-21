import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
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

          <div className="buttons">
            <CustomButton type="submit">sign in</CustomButton>
            <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>sign in with Google</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;
