import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 2px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.danger : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: border-color 0.2s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme, hasError }) => 
      hasError 
        ? `${theme.colors.danger}` 
        : `${theme.colors.primary}`};
  }
`;

const DropdownIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 1000;
  margin-top: 5px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const OptionGroup = styled.div`
  padding: 8px 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  }
`;

const GroupHeader = styled.div`
  padding: 5px 15px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[500]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Option = styled.div`
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  
  &:hover, &.selected {
    background-color: ${({ theme }) => theme.colors.gray[50]};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &.selected {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

const NoResults = styled.div`
  padding: 10px 15px;
  color: ${({ theme }) => theme.colors.gray[500]};
  text-align: center;
  font-style: italic;
`;

const CustomValueOption = styled(Option)`
  border-top: 1px dashed ${({ theme }) => theme.colors.gray[200]};
  color: ${({ theme }) => theme.colors.primary};
  font-style: italic;
`;

// Group options for better organization
const groupOptions = (options, type) => {
  if (type === 'source') {
    // Group sources into categories
    return [
      {
        name: 'Search Engines',
        options: options.filter(opt => ['google', 'bing', 'yahoo'].includes(opt))
      },
      {
        name: 'Social Media',
        options: options.filter(opt => ['facebook', 'twitter', 'linkedin', 'instagram', 'tiktok', 'pinterest'].includes(opt))
      },
      {
        name: 'Marketing Channels',
        options: options.filter(opt => ['email', 'newsletter', 'direct', 'referral', 'organic', 'paid_social', 'display'].includes(opt))
      }
    ];
  } else if (type === 'medium') {
    // Group mediums into categories
    return [
      {
        name: 'Paid Media',
        options: options.filter(opt => ['cpc', 'ppc', 'paid', 'display'].includes(opt))
      },
      {
        name: 'Content Types',
        options: options.filter(opt => ['social', 'email', 'banner', 'video', 'sms', 'push', 'native'].includes(opt))
      },
      {
        name: 'Referral Types',
        options: options.filter(opt => ['organic', 'referral', 'affiliate'].includes(opt))
      },
      {
        name: 'Targeting',
        options: options.filter(opt => ['remarketing', 'retargeting'].includes(opt))
      }
    ];
  }
  // Fallback to ungrouped
  return [{ name: 'Options', options }];
};

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  name,
  hasError,
  onBlur,
  type = 'source', // 'source' or 'medium'
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [inputValue, setInputValue] = useState(value || '');
  const [customValue, setCustomValue] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  
  // Helper function to trigger onChange - wrapped in useCallback to prevent recreating on every render
  const triggerOnChange = useCallback((value) => {
    if (onChange) {
      const event = {
        target: {
          name,
          value
        }
      };
      onChange(event);
    }
  }, [onChange, name]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        
        // If there's input but dropdown is closing, treat as a custom value
        if (inputValue.trim() !== '' && !options.includes(inputValue)) {
          triggerOnChange(inputValue);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputValue, options, triggerOnChange]);
  
  // Update filtered options when input value changes
  useEffect(() => {
    let filtered = options;
    
    // Only filter if there's actually input text
    if (inputValue.trim() !== '') {
      filtered = options.filter(option => 
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      
      // Set a custom value if input doesn't match any option exactly
      if (!options.includes(inputValue) && inputValue.trim() !== '') {
        setCustomValue(inputValue);
      } else {
        setCustomValue('');
      }
    } else {
      setCustomValue('');
    }
    
    const groups = groupOptions(filtered, type);
    // Filter out empty groups
    const nonEmptyGroups = groups.filter(group => group.options.length > 0);
    setFilteredGroups(nonEmptyGroups);
  }, [inputValue, options, type]);
  
  // Initialize input value when value prop changes
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);
  
  // Initialize dropdown groups on mount
  useEffect(() => {
    const groups = groupOptions(options, type);
    setFilteredGroups(groups);
  }, [options, type]);
  
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true); // Always show dropdown when typing
    
    // Immediately update the form value for custom inputs
    triggerOnChange(newValue);
  };
  
  const handleOptionClick = (option) => {
    setInputValue(option);
    setIsOpen(false);
    triggerOnChange(option);
  };
  
  const handleInputFocus = () => {
    // Always show dropdown on focus
    setIsOpen(true);
  };
  
  const handleInputClick = () => {
    // Toggle dropdown on click and show all options if clicked when empty
    setIsOpen(!isOpen);
    
    // If the field is empty and we're opening the dropdown, show all options
    if (inputValue.trim() === '' && !isOpen) {
      const groups = groupOptions(options, type);
      setFilteredGroups(groups);
    }
  };
  
  const handleInputBlur = (e) => {
    // Allow time for option click event before closing
    setTimeout(() => {
      if (onBlur) {
        onBlur(e);
      }
    }, 200);
  };
  
  const handleCustomValueClick = () => {
    setIsOpen(false);
    // Custom value is already set in inputValue and onChange already triggered during typing
  };
  
  const hasOptions = filteredGroups.some(group => group.options.length > 0);
  const showCustomValueOption = customValue && !options.includes(customValue);
  
  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownInput
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onClick={handleInputClick}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        hasError={hasError}
        name={name}
        required={required}
        autoComplete="off"
      />
      <DropdownIcon>
        ▼
      </DropdownIcon>
      <OptionsContainer isOpen={isOpen}>
        {showCustomValueOption && (
          <CustomValueOption onClick={handleCustomValueClick}>
            Use "{customValue}"
          </CustomValueOption>
        )}
        
        {hasOptions ? (
          filteredGroups.map((group, index) => (
            <OptionGroup key={index}>
              <GroupHeader>{group.name}</GroupHeader>
              {group.options.map((option) => (
                <Option
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={option === value ? 'selected' : ''}
                >
                  {option === value && '✓ '}{option}
                </Option>
              ))}
            </OptionGroup>
          ))
        ) : (
          !showCustomValueOption && <NoResults>No matching options</NoResults>
        )}
      </OptionsContainer>
    </DropdownContainer>
  );
};

export default CustomDropdown; 