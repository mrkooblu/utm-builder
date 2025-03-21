import React from 'react';
import styled from 'styled-components';
import CustomDropdown from './CustomDropdown';

const InputContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const RequiredStar = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-left: ${({ theme }) => theme.spacing[1]};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 2px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.danger : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme, hasError }) => 
      hasError 
        ? `${theme.colors.danger}` 
        : `${theme.colors.primary}`};
  }
  
  /* Add styling for the dropdown arrow */
  &::-webkit-calendar-picker-indicator {
    opacity: 0.6;
    filter: invert(0.5);
  }
  
  /* Custom dropdown styling - these work differently across browsers */
  &::-webkit-list-button,
  &::-webkit-inner-spin-button {
    display: none;
  }
`;

const HelpText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-top: ${({ theme }) => theme.spacing[1]};
  margin-bottom: ${({ theme }) => theme.spacing[0]};
`;

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.danger};
  margin-top: ${({ theme }) => theme.spacing[1]};
  margin-bottom: ${({ theme }) => theme.spacing[0]};
`;

const InputField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  required = false,
  helpText,
  error,
  placeholder,
  list,
  options = [],
}) => {
  // Determine if this is a dropdown field
  const isDropdown = !!list;
  const dropdownType = list === 'sourceOptions' ? 'source' : list === 'mediumOptions' ? 'medium' : 'default';
  
  return (
    <InputContainer>
      <Label htmlFor={name}>
        {label}
        {required && <RequiredStar>*</RequiredStar>}
      </Label>
      
      {isDropdown ? (
        <CustomDropdown
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          hasError={!!error}
          placeholder={placeholder}
          options={options}
          required={required}
          type={dropdownType}
        />
      ) : (
        <StyledInput
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          hasError={!!error}
          required={required}
          placeholder={placeholder}
          autoComplete="off"
        />
      )}
      
      {helpText && <HelpText>{helpText}</HelpText>}
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

export default InputField; 