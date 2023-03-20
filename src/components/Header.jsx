import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const crytoEmail = md5(email).toString();
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${crytoEmail}` } alt={ name } data-testid="header-profile-picture" />
        <p data-testid="header-player-name">
          { name }
        </p>
        <p data-testid="header-score">
          Pontos:
          { score }
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    name: state.player.name,
    email: state.player.gravatarEmail,
    score: state.player.score,
  };
}

export default connect(mapStateToProps)(Header);
