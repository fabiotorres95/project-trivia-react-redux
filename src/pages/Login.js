import React, { Component } from 'react';

class Login extends Component {
  state = {
    name: '',
    email: '',
    btnDisabled: true,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  render() {
    const { btnDisabled, name, email } = this.state;
    return (
      <>
        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header> */}
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          onChange={ this.handleChange }
          value={ name }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          onChange={ this.handleChange }
          value={ email }
        />
        <button
          data-testid="btn-play"
          disabled={ btnDisabled }
          // onClick={ this.handleChange }
        >
          {' '}
          Play
        </button>
      </>
    );
  }
}

export default Login;
