import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getToken from '../services/triviaAPI';

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

  startGame = async () => {
    const { history } = this.props;
    await getToken();
    history.push('/game');
  };

  settingsGame = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { btnDisabled, name, email } = this.state;
    return (
      <>
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
          onClick={ this.startGame }
        >
          {' '}
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.settingsGame }
        >
          Configurações
        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
