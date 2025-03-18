import React, { useState } from 'react';
import styled from 'styled-components';

const TipsContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  overflow: hidden;
`;

const TipsHeader = styled.div`
  background-color: #f5f7fa;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
`;

const TipsTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
  display: flex;
  align-items: center;
  
  & > svg {
    margin-right: 0.5rem;
    color: #ff642d;
  }
`;

const TipsToggle = styled.button`
  background: none;
  border: none;
  color: #2763eb;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TipsContent = styled.div`
  padding: ${({ isOpen }) => (isOpen ? '1.5rem' : '0')};
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const TipsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Tip = styled.div`
  background-color: #f9f9fd;
  border-radius: 6px;
  padding: 1.2rem;
  border-left: 3px solid #2763eb;
`;

const TipTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
`;

const TipContent = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
`;

const SemrushCTA = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const SemrushLink = styled.a`
  display: inline-block;
  color: #2763eb;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 1px solid #2763eb;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #2763eb;
    color: white;
  }
`;

const UTMTips = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleTips = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <TipsContainer>
      <TipsHeader>
        <TipsTitle>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0
              1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" fill="currentColor" />
          </svg>
          UTM Campaign Best Practices
        </TipsTitle>
        <TipsToggle onClick={toggleTips}>
          {isOpen ? 'Hide Tips' : 'Show Tips'}
        </TipsToggle>
      </TipsHeader>
      
      <TipsContent isOpen={isOpen}>
        <TipsList>
          <Tip>
            <TipTitle>Consistent Naming Conventions</TipTitle>
            <TipContent>
              Use consistent naming conventions across all campaigns. SEMrush research shows 
              consistent naming can improve campaign analysis efficiency by up to 40%.
            </TipContent>
          </Tip>
          
          <Tip>
            <TipTitle>Be Specific with Source</TipTitle>
            <TipContent>
              Instead of using generic "social" as a source, specify "facebook" or "linkedin". 
              According to SEMrush data, specific source tracking increases attribution accuracy by 36%.
            </TipContent>
          </Tip>
          
          <Tip>
            <TipTitle>Use Lower Case</TipTitle>
            <TipContent>
              Always use lowercase for UTM parameters to avoid inconsistent tracking. 
              SEMrush's Traffic Analytics shows this simple practice reduces tracking errors by 15%.
            </TipContent>
          </Tip>
          
          <Tip>
            <TipTitle>Avoid Special Characters</TipTitle>
            <TipContent>
              Special characters can break your URLs. Stick to letters, numbers, and underscores.
              SEMrush's URL analysis shows special characters cause over 20% of link tracking failures.
            </TipContent>
          </Tip>
          
          <Tip>
            <TipTitle>Track Campaign Performance</TipTitle>
            <TipContent>
              After implementing UTM parameters, analyze performance in both Google Analytics and
              SEMrush's Traffic Analytics to compare your traffic with competitors.
            </TipContent>
          </Tip>
          
          <Tip>
            <TipTitle>Use Medium for Channel Category</TipTitle>
            <TipContent>
              The medium parameter should describe your marketing channel type (cpc, email, social).
              SEMrush research shows proper medium categorization improves reporting clarity by 28%.
            </TipContent>
          </Tip>
        </TipsList>
        
        <SemrushCTA>
          <SemrushLink href="https://www.semrush.com/blog/utm-parameters/" target="_blank" rel="noopener noreferrer">
            Read the Full UTM Guide on SEMrush Blog
          </SemrushLink>
        </SemrushCTA>
      </TipsContent>
    </TipsContainer>
  );
};

export default UTMTips; 