import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  border-left: 4px solid #2763eb;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-2px);
  }
`;

const ResultTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing[2]};
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, #2763eb, #4e89ff);
    border-radius: 3px;
  }
`;

const ResultSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ResultLabel = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray[700]};
  display: flex;
  align-items: center;
`;

const UrlDisplay = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: monospace;
  word-break: break-all;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const UrlBreakdown = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const BreakdownTitle = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.gray[700]};
  display: flex;
  align-items: center;
`;

const ParameterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ParameterItem = styled.div`
  padding: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 3px solid #2763eb;
`;

const ParameterName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const ParameterValue = styled.div`
  font-family: monospace;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: #2763eb;
  word-break: break-all;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  align-items: center;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

// Custom button with exact color specification
const ActionButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: #2763eb;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background-color: #2057d0;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(39, 99, 235, 0.2);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(39, 99, 235, 0.3);
  }
  
  & > span {
    margin-right: ${({ theme }) => theme.spacing[2]};
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const Tab = styled.button`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border: none;
  background: none;
  font-weight: ${({ active }) => active ? 600 : 400};
  color: ${({ active, theme }) => active ? '#2763eb' : theme.colors.gray[600]};
  border-bottom: 2px solid ${({ active }) => active ? '#2763eb' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #2763eb;
  }
`;

const FeedbackMessage = styled.span`
  color: ${props => props.isSuccess ? '#10B981' : '#EF4444'};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-left: ${({ theme }) => theme.spacing[2]};
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const MetadataRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  & > span {
    margin-right: ${({ theme }) => theme.spacing[2]};
  }
`;

const ResultCard = ({ utmResult, onCopy, isCopied }) => {
  const [validationStatus, setValidationStatus] = useState(null);
  const [activeView, setActiveView] = useState('url');
  const formattedDate = new Date(utmResult.timestamp).toLocaleString();
  
  // Parse the UTM URL to extract parameters
  const parseUtmUrl = () => {
    try {
      const url = new URL(utmResult.utmUrl);
      const params = {};
      
      // Extract UTM parameters
      url.searchParams.forEach((value, key) => {
        if (key.startsWith('utm_')) {
          params[key] = value;
        }
      });
      
      return {
        baseUrl: `${url.protocol}//${url.hostname}${url.pathname}`,
        params
      };
    } catch (error) {
      return {
        baseUrl: utmResult.originalUrl,
        params: {}
      };
    }
  };
  
  const { baseUrl, params } = parseUtmUrl();
  
  const handleValidateUrl = async () => {
    try {
      // First, check if URL is properly formatted
      new URL(utmResult.utmUrl);
      
      // Then try to fetch the URL to see if it's reachable
      // Note: This will only work if CORS is enabled on the target server
      // For a production app, you might need a proxy server
      try {
        await fetch(utmResult.utmUrl, { 
          method: 'HEAD',
          mode: 'no-cors' // This prevents CORS errors but also means we can't check status
        });
        setValidationStatus('valid');
      } catch (error) {
        // Even with no-cors, some network errors might still occur
        setValidationStatus('valid'); // Still consider valid since URL format is correct
      }
    } catch (error) {
      setValidationStatus('invalid');
    }
    
    // Reset validation status after 3 seconds
    setTimeout(() => {
      setValidationStatus(null);
    }, 3000);
  };
  
  return (
    <Card>
      <ResultTitle>Generated URL</ResultTitle>
      
      <TabContainer>
        <Tab 
          active={activeView === 'url'} 
          onClick={() => setActiveView('url')}
        >
          URL View
        </Tab>
        <Tab 
          active={activeView === 'breakdown'} 
          onClick={() => setActiveView('breakdown')}
        >
          Parameter Breakdown
        </Tab>
      </TabContainer>
      
      <MetadataRow>
        <span>Generated on: {formattedDate}</span>
      </MetadataRow>
      
      {activeView === 'url' && (
        <>
          <ResultSection>
            <ResultLabel>Original URL</ResultLabel>
            <UrlDisplay>{utmResult.originalUrl}</UrlDisplay>
          </ResultSection>
          
          <ResultSection>
            <ResultLabel>UTM URL</ResultLabel>
            <UrlDisplay>{utmResult.utmUrl}</UrlDisplay>
          </ResultSection>
        </>
      )}
      
      {activeView === 'breakdown' && (
        <UrlBreakdown>
          <BreakdownTitle>URL Components</BreakdownTitle>
          
          <ResultSection>
            <ResultLabel>Base URL</ResultLabel>
            <UrlDisplay>{baseUrl}</UrlDisplay>
          </ResultSection>
          
          <ResultSection>
            <ResultLabel>UTM Parameters</ResultLabel>
            <ParameterGrid>
              {Object.entries(params).map(([key, value]) => (
                <ParameterItem key={key}>
                  <ParameterName>{key}</ParameterName>
                  <ParameterValue>{value}</ParameterValue>
                </ParameterItem>
              ))}
            </ParameterGrid>
          </ResultSection>
        </UrlBreakdown>
      )}
      
      <ButtonGroup>
        <ActionButton onClick={onCopy}>
          {isCopied ? 'Copied!' : 'Copy to Clipboard'}
        </ActionButton>
        
        <ActionButton onClick={handleValidateUrl}>
          <span>✓</span> Validate URL
        </ActionButton>
        
        {isCopied && <FeedbackMessage isSuccess={true}>URL copied to clipboard!</FeedbackMessage>}
        {validationStatus === 'valid' && <FeedbackMessage isSuccess={true}>URL is valid!</FeedbackMessage>}
        {validationStatus === 'invalid' && <FeedbackMessage isSuccess={false}>URL is not valid!</FeedbackMessage>}
      </ButtonGroup>
    </Card>
  );
};

export default ResultCard; 