import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const HeaderSubtitle = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: 400;
`;

const PoweredBy = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const PoweredByText = styled.span`
  font-size: 0.85rem;
  color: #666;
`;

const SemrushLogo = styled.img`
  height: 20px;
`;

const SemrushLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ToolLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ToolLink = styled.a`
  color: #2763eb;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ff642d;
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <div>
        <HeaderTitle>
          UTM Campaign Builder
          <HeaderSubtitle> - Create tracking links for your campaigns</HeaderSubtitle>
        </HeaderTitle>
      </div>
      
      <ToolLinks>
        <ToolLink href="https://www.semrush.com/analytics/traffic/" target="_blank" rel="noopener noreferrer">
          Traffic Analytics
        </ToolLink>
        <ToolLink href="https://www.semrush.com/analytics/reports/" target="_blank" rel="noopener noreferrer">
          Marketing Reports
        </ToolLink>
      </ToolLinks>
      
      <PoweredBy>
        <PoweredByText>Powered by</PoweredByText>
        <SemrushLink href="https://www.semrush.com/" target="_blank" rel="noopener noreferrer">
          <SemrushLogo src="https://cdn.semrush.com/static/index/semrush-logo.svg" alt="SEMrush" />
        </SemrushLink>
      </PoweredBy>
    </HeaderContainer>
  );
};

export default Header; 