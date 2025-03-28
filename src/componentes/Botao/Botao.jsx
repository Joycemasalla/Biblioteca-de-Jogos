import React, { Component } from 'react';
import styled from 'styled-components';
import { Loader2 } from 'lucide-react';

const BotaoEstilizado = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${props => {
    switch (props.tamanho) {
      case 'pequeno': return '0.5rem 1rem';
      case 'grande': return '1rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  }};
  font-size: ${props => {
    switch (props.tamanho) {
      case 'pequeno': return '0.875rem';
      case 'grande': return '1.125rem';
      default: return '1rem';
    }
  }};
  border-radius: 0.375rem;
  transition: all 0.2s;
  cursor: ${props => props.carregando ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.carregando ? 0.7 : 1};

  ${props => {
    switch (props.variante) {
      case 'primario':
        return `
          background: #3b82f6;
          color: white;
          border: none;
          &:hover:not(:disabled) { background: #2563eb; }
        `;
      case 'secundario':
        return `
          background: #e5e7eb;
          color: #1f2937;
          border: none;
          &:hover:not(:disabled) { background: #d1d5db; }
        `;
      case 'fantasma':
        return `
          background: transparent;
          color: #4b5563;
          border: 1px solid #e5e7eb;
          &:hover:not(:disabled) { background: #f3f4f6; }
        `;
      default:
        return '';
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

class Botao extends Component {
  render() {
    const { 
      variante = 'primario', 
      tamanho = 'medio', 
      carregando = false, 
      children, 
      ...props 
    } = this.props;

    return (
      <BotaoEstilizado
        variante={variante}
        tamanho={tamanho}
        carregando={carregando}
        disabled={carregando || props.disabled}
        {...props}
      >
        {carregando && <Loader2 className="animate-spin" size={16} />}
        {children}
      </BotaoEstilizado>
    );
  }
}

export default Botao;