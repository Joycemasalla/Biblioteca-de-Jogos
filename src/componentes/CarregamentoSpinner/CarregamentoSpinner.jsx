import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const girar = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  width: ${props => props.tamanho}px;
  height: ${props => props.tamanho}px;
  border: ${props => Math.max(2, props.tamanho / 8)}px solid ${props => props.cor}20;
  border-top-color: ${props => props.cor};
  border-radius: 50%;
  animation: ${girar} 0.8s linear infinite;
`;

class CarregamentoSpinner extends Component {
  render() {
    const { tamanho = 24, cor = '#3b82f6' } = this.props;
    return <SpinnerWrapper tamanho={tamanho} cor={cor} />;
  }
}

export default CarregamentoSpinner;