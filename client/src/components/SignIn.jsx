import React, { Component } from 'react';
import { motion } from 'framer-motion';

import { signIn } from '../services/user';
import './SignIn.css';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      isError: false,
      errorMsg: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      isError: false,
      errorMsg: '',
    });
  };

  onSignIn = (event) => {
    event.preventDefault();

    const { history, setUser } = this.props;

    signIn(this.state)
      .then((res) => {
        setUser(res.user);
      })
      .then(() => history.push(`/items`))
      .catch((error) => {
        console.error(error);
        this.setState({
          isError: true,
          errorMsg: 'Invalid Credentials',
          username: '',
          password: '',
        });
      });
  };

  renderError = () => {
    const toggleForm = this.state.isError ? 'danger' : '';
    if (this.state.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {this.state.errorMsg}
        </button>
      );
    } else {
      return <button type="submit">Sign In</button>;
    }
  };

  render() {
    const { username, password } = this.state;

    return (
      <motion.div
        className="form-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h3>Sign In</h3>
        <form onSubmit={this.onSignIn}>
          <label>Username</label>
          <input
            required
            type="text"
            name="username"
            value={username}
            placeholder="Enter Username"
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          {this.renderError()}
        </form>
      </motion.div>
    );
  }
}

export default SignIn;
