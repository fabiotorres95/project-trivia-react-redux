import React, { Component } from 'react';
import '../styles/Config.css';

class Config extends Component {
  render() {
    return (
      <div className="config">
        <h1
          data-testid="settings-title"
        >
          Configurações
        </h1>
        <p>Aqui estão as configurações do jogo.</p>
      </div>
    );
  }
}

export default Config;
