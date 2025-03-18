import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import Button from '../common/Button';
import { validateForm, generateUTMUrl } from '../../utils/utmHelpers';

// Form wrapper to match the SEO ROI Calculator style
const FormWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

// Form header similar to the calculator tabs
const FormHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

// Main form container with white background and proper padding
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[6]};
`;

const FormSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const FormTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: 30px;
  line-height: 34px;
  font-weight: 800;
`;

const FormInstruction = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[6]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InputGroup = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const GroupTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: 28px;
  line-height: 34px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const GroupDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const RequiredBadge = styled.span`
  background-color: #2763eb;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-left: ${({ theme }) => theme.spacing[2]};
`;

const OptionalBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.gray[400]};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-left: ${({ theme }) => theme.spacing[2]};
`;

const ErrorSummary = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: rgba(239, 68, 68, 0.1);
  border-left: 4px solid ${({ theme }) => theme.colors.danger};
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const PreviewContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const PreviewTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
`;

const PreviewText = styled.p`
  font-family: monospace;
  word-break: break-all;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

// Button row to match the SEO ROI Calculator
const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

// Custom button with exact color specification
const GenerateButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: #2763eb;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px rgba(39, 99, 235, 0.2);
  
  &:hover:not(:disabled) {
    background-color: #2057d0;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(39, 99, 235, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ResetButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray[600]};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }
`;

// Update the common campaign mediums and sources for more comprehensive suggestions
const commonSources = [
  'google', 
  'facebook', 
  'twitter', 
  'linkedin', 
  'instagram', 
  'email', 
  'newsletter', 
  'bing', 
  'youtube',
  'tiktok',
  'pinterest',
  'direct',
  'referral',
  'organic',
  'paid_social',
  'display'
];

const commonMediums = [
  'cpc', 
  'organic', 
  'social', 
  'email', 
  'display', 
  'affiliate', 
  'referral', 
  'banner', 
  'ppc',
  'paid',
  'remarketing',
  'retargeting',
  'native',
  'video',
  'sms',
  'push'
];

const initialFormState = {
  websiteUrl: '',
  campaignId: '',
  campaignSource: '',
  campaignMedium: '',
  campaignName: '',
  campaignTerm: '',
  campaignContent: '',
};

// Add a new styled select element
const StyledSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 2px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.danger : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: border-color 0.2s ease;
  background-color: white;
  
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

const SelectContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  width: 100%;
`;

const SelectLabel = styled.label`
  display: block;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const RequiredSelectStar = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-left: ${({ theme }) => theme.spacing[1]};
`;

const HelpSelectText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-top: ${({ theme }) => theme.spacing[1]};
  margin-bottom: ${({ theme }) => theme.spacing[0]};
`;

const ErrorSelectText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.danger};
  margin-top: ${({ theme }) => theme.spacing[1]};
  margin-bottom: ${({ theme }) => theme.spacing[0]};
`;

const UTMForm = ({ onSubmit, onReset }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [urlPreview, setUrlPreview] = useState('');
  const [touchedFields, setTouchedFields] = useState({});
  const [sourceOptions, setSourceOptions] = useState(commonSources);
  const [mediumOptions, setMediumOptions] = useState(commonMediums);
  const [showErrors, setShowErrors] = useState(false);
  
  // Validate form as user types
  useEffect(() => {
    // Only validate touched fields
    if (Object.keys(touchedFields).length > 0) {
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);
    }
  }, [formData, touchedFields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Mark field as touched
    setTouchedFields({
      ...touchedFields,
      [name]: true
    });
    
    // Filter suggestions based on input
    if (name === 'campaignSource') {
      setSourceOptions(commonSources.filter(source => 
        source.toLowerCase().includes(value.toLowerCase())
      ));
    }
    
    if (name === 'campaignMedium') {
      setMediumOptions(commonMediums.filter(medium => 
        medium.toLowerCase().includes(value.toLowerCase())
      ));
    }
    
    // Generate preview URL as user types
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    
    try {
      if (updatedFormData.websiteUrl && (updatedFormData.campaignSource || updatedFormData.campaignName || updatedFormData.campaignId)) {
        const previewUrl = generateUTMUrl(updatedFormData);
        setUrlPreview(previewUrl);
      }
    } catch (error) {
      // Don't update preview if there's an error
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields({
      ...touchedFields,
      [name]: true
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched for validation
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouchedFields(allTouched);
    
    // Validate form
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    
    // Set showErrors to true on form submission
    setShowErrors(true);
    
    // If no errors, generate UTM URL and pass to parent
    if (Object.keys(validationErrors).length === 0) {
      try {
        const utmUrl = generateUTMUrl(formData);
        const result = {
          originalUrl: formData.websiteUrl,
          utmUrl,
          timestamp: Date.now(),
        };
        onSubmit(result);
        
        // Reset form
        setFormData(initialFormState);
        setUrlPreview('');
        setTouchedFields({});
        setShowErrors(false); // Reset showErrors on successful submission
      } catch (error) {
        setErrors({ 
          websiteUrl: 'There was an error generating the URL. Please check your inputs.' 
        });
      }
    }
  };
  
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setUrlPreview('');
    setTouchedFields({});
    setShowErrors(false); // Reset showErrors on form reset
    
    // Call the onReset function from props if it exists
    if (onReset && typeof onReset === 'function') {
      onReset();
    }
  };

  return (
    <FormWrapper>
      <FormHeader>UTM Builder</FormHeader>
      <FormContainer onSubmit={handleSubmit}>
        <FormSection>
          <FormTitle>Enter the website URL, and campaign information</FormTitle>
          <FormInstruction>Fill out fields marked with an asterisk (*), and the campaign URL will be generated for you.</FormInstruction>
          
          {showErrors && Object.keys(errors).length > 0 && (
            <ErrorSummary>
              <ErrorText>Please fix the following errors:</ErrorText>
              <ul>
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field}>{message}</li>
                ))}
              </ul>
            </ErrorSummary>
          )}
          
          <InputGroup>
            <GroupTitle>Website Information <RequiredBadge>Required</RequiredBadge></GroupTitle>
            <GroupDescription>Enter the base URL that will receive the campaign parameters</GroupDescription>
            
            <InputField
              label="Website URL"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              helpText="The full website URL (e.g., https://www.example.com)"
              error={touchedFields.websiteUrl && errors.websiteUrl}
              placeholder="https://www.example.com"
            />
          </InputGroup>
          
          <InputGrid>
            <InputGroup>
              <GroupTitle>Primary Parameters <RequiredBadge>Required</RequiredBadge></GroupTitle>
              <GroupDescription>These parameters define the basic campaign tracking information</GroupDescription>
              
              <InputField
                label="Campaign Source"
                name="campaignSource"
                value={formData.campaignSource}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                helpText="The referrer (e.g., google, newsletter)"
                error={touchedFields.campaignSource && errors.campaignSource}
                placeholder="google"
                list="sourceOptions"
              />
              <datalist id="sourceOptions">
                {commonSources.map(source => (
                  <option key={source} value={source} />
                ))}
              </datalist>
              
              <InputField
                label="Campaign Medium"
                name="campaignMedium"
                value={formData.campaignMedium}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                helpText="Marketing medium (e.g., cpc, banner, email)"
                error={touchedFields.campaignMedium && errors.campaignMedium}
                placeholder="cpc"
                list="mediumOptions"
              />
              <datalist id="mediumOptions">
                {commonMediums.map(medium => (
                  <option key={medium} value={medium} />
                ))}
              </datalist>
              
              <InputField
                label="Campaign Name"
                name="campaignName"
                value={formData.campaignName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                helpText="Product, promo code, or slogan (e.g., spring_sale)"
                error={touchedFields.campaignName && (errors.campaignName || errors.campaignNameOrId)}
                placeholder="spring_sale"
              />
            </InputGroup>
            
            <InputGroup>
              <GroupTitle>Additional Parameters <OptionalBadge>Optional</OptionalBadge></GroupTitle>
              <GroupDescription>These parameters provide more detailed tracking information</GroupDescription>
              
              <InputField
                label="Campaign ID"
                name="campaignId"
                value={formData.campaignId}
                onChange={handleChange}
                onBlur={handleBlur}
                helpText="The ads campaign id"
                error={touchedFields.campaignId && errors.campaignId}
                placeholder="abc-123"
              />
              
              <InputField
                label="Campaign Term"
                name="campaignTerm"
                value={formData.campaignTerm}
                onChange={handleChange}
                onBlur={handleBlur}
                helpText="Identify the paid keywords"
                error={touchedFields.campaignTerm && errors.campaignTerm}
                placeholder="running_shoes"
              />
              
              <InputField
                label="Campaign Content"
                name="campaignContent"
                value={formData.campaignContent}
                onChange={handleChange}
                onBlur={handleBlur}
                helpText="Use to differentiate ads"
                error={touchedFields.campaignContent && errors.campaignContent}
                placeholder="logolink"
              />
            </InputGroup>
          </InputGrid>
          
          {urlPreview && (
            <PreviewContainer>
              <PreviewTitle>URL Preview</PreviewTitle>
              <PreviewText>{urlPreview}</PreviewText>
            </PreviewContainer>
          )}
          
          <ButtonRow>
            <GenerateButton type="submit">Generate URL</GenerateButton>
            <ResetButton type="button" onClick={handleReset}>Reset</ResetButton>
          </ButtonRow>
        </FormSection>
      </FormContainer>
    </FormWrapper>
  );
};

export default UTMForm; 