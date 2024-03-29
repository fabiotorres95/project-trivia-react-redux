import React, { Component } from 'react';
import '../styles/Ranking.css';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div
        data-testid="ranking-title"
        className="ranking"
      >
        Ranking
      <>
        <div
          data-testid="ranking-title"
        >
          Ranking
        </div>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
