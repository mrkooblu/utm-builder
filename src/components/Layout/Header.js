import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const HeaderContainer = styled.header`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[4]} ${theme.spacing[8]}`};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  position: relative;
`;

const TitleWrapper = styled.div`
  animation: ${fadeIn} 0.8s ease forwards;
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: 40px;
  line-height: 52px;
  font-weight: 800;
  font-family: 'Manrope', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: white;
    border-radius: 3px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 34px;
    line-height: 46px;
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 800px;
  margin: ${({ theme }) => `${theme.spacing[4]} auto 0`};
  color: ${({ theme }) => theme.colors.gray[800]};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  animation: ${fadeIn} 0.8s ease 0.2s both;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  
  &:hover {
    text-decoration: none;
    animation: ${pulse} 0.4s ease;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <TitleWrapper>
        <Title>UTM Campaign Builder</Title>
      </TitleWrapper>
      <Subtitle>
        Generate tracking URLs for your marketing initiatives in seconds. This tool builds UTM parameters that allow Google Analytics to measure <Link href="https://support.google.com/analytics/answer/1033863#zippy=%2Cin-this-article" target="_blank" rel="noopener noreferrer">
          Custom Campaigns
        </Link>, so you can see exactly what's working.
      </Subtitle>
    </HeaderContainer>
  );
};

export default Header;