import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './components/Layout/Layout';
import UTMForm from './components/Form/UTMForm';
import ResultCard from './components/Results/ResultCard';
import InfoSection from './components/common/InfoSection';
import SemrushModule from './components/common/SemrushModule';
import { saveUTMHistory, loadUTMHistory } from './utils/utmHelpers';
import styled from 'styled-components';

// Styled components for improved UI
const ResultsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding-bottom: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const ResultsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray[800]};
  margin: 0;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40%;
    height: 3px;
    background: linear-gradient(to right, #2763eb, #4e89ff);
    border-radius: 3px;
  }
`;

const ResultsCount = styled.span`
  display: inline-block;
  background-color: #2763eb;
  color: white;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-left: ${({ theme }) => theme.spacing[2]};
`;

const InfoSectionWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

const SemrushModuleWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.gray[500]};
  
  & > span {
    font-size: 48px;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    display: block;
  }
`;

function App() {
  const [results, setResults] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // Load UTM history from local storage on initial render
  useEffect(() => {
    try {
      const history = loadUTMHistory();
      if (Array.isArray(history)) {
        setResults(history);
      }
    } catch (error) {
      console.error('Error loading UTM history:', error);
    }
  }, []);
  
  // Save UTM history to local storage when results change
  useEffect(() => {
    try {
      saveUTMHistory(results);
    } catch (error) {
      console.error('Error saving UTM history:', error);
    }
  }, [results]);
  
  const handleFormSubmit = (result) => {
    setResults([result, ...results]);
  };
  
  const clearResults = () => {
    setResults([]);
  };
  
  const handleCopy = (index) => {
    const result = results[index];
    navigator.clipboard.writeText(result.utmUrl).then(() => {
      setCopiedIndex(index);
      
      // Reset the copied state after 3 seconds
      setTimeout(() => {
        setCopiedIndex(null);
      }, 3000);
    });
  };
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <UTMForm onSubmit={handleFormSubmit} onReset={clearResults} />
        
        {results.length > 0 ? (
          <ResultsSection>
            <ResultsHeader>
              <ResultsTitle>
                Generated URLs <ResultsCount>{results.length}</ResultsCount>
              </ResultsTitle>
            </ResultsHeader>
            
            {results.map((result, index) => (
              <ResultCard
                key={result.timestamp}
                utmResult={result}
                onCopy={() => handleCopy(index)}
                isCopied={copiedIndex === index}
              />
            ))}
          </ResultsSection>
        ) : (
          <ResultsSection>
            <EmptyState>
              <span>🔗</span>
              <h3>No URLs Generated Yet</h3>
              <p>Fill out the form above to create your first UTM URL</p>
            </EmptyState>
          </ResultsSection>
        )}
        
        <SemrushModuleWrapper>
          <SemrushModule />
        </SemrushModuleWrapper>
        
        <InfoSectionWrapper>
          <InfoSection />
        </InfoSectionWrapper>
      </Layout>
    </ThemeProvider>
  );
}

export default App; 