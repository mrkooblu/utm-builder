import React from 'react';
import styled from 'styled-components';

const getButtonStyles = (variant = 'primary') => {
  switch (variant) {
    case 'primary':
      return `
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
        
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primary}dd;
        }
      `;
    case 'secondary':
      return `
        background-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.white};
        
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.secondary}dd;
        }
      `;
    case 'outline':
      return `
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
        border: 1px solid ${({ theme }) => theme.colors.primary};
        
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primary}11;
        }
      `;
    default:
      return `
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
      `;
  }
};

const StyledButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${({ theme }) => theme.fontSizes.md};
  
  ${({ variant }) => getButtonStyles(variant)}
  
  ${({ fullWidth }) =>
    fullWidth &&
    `
      width: 100%;
    `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  fullWidth = false, 
  disabled = false 
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 