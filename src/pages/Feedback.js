import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text"> Pag de Feedback </h1>
        <Header />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.player.name,
    email: state.player.gravatarEmail,
    score: state.player.score,
  };
}
export default connect(mapStateToProps)(Feedback);
