import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30vh;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.info});
    z-index: -1;
    clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 40vh;
    background-image: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 5px, transparent 6px),
                      radial-gradient(circle at 70% 65%, rgba(255, 255, 255, 0.08) 8px, transparent 9px),
                      radial-gradient(circle at 40% 50%, rgba(255, 255, 255, 0.06) 4px, transparent 5px),
                      radial-gradient(circle at 80% 35%, rgba(255, 255, 255, 0.07) 7px, transparent 8px);
    background-size: 100px 100px;
    background-position: 0 0;
    z-index: -1;
  }
`;

const Main = styled.main`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[4]} ${theme.spacing[10]}`};
  flex: 1;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[2]};
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
    </LayoutWrapper>
  );
};

export default Layout; 