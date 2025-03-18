import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const OfferContainer = styled.div`
  position: fixed;
  bottom: ${({ isVisible }) => (isVisible ? '2rem' : '-200px')};
  right: 2rem;
  max-width: 350px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  transition: bottom 0.5s ease-in-out;
  z-index: 100;
  border-left: 4px solid #ff642d;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #777;
  font-size: 16px;
  
  &:hover {
    color: #333;
  }
`;

const OfferHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const OfferLogo = styled.img`
  height: 24px;
  margin-right: 0.5rem;
`;

const OfferTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 0;
`;

const OfferContent = styled.p`
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const OfferHighlight = styled.span`
  color: #ff642d;
  font-weight: 600;
`;

const OfferCTA = styled.a`
  display: block;
  background-color: #ff642d;
  color: white;
  text-align: center;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e85a29;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const OfferFooter = styled.div`
  font-size: 0.8rem;
  color: #777;
  margin-top: 0.75rem;
  text-align: center;
`;

const SpecialOffer = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show the offer after user has spent some time on the page
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 60000); // 60 seconds delay
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    
    // Store in localStorage to prevent showing again in this session
    localStorage.setItem('semrushOfferClosed', 'true');
  };
  
  // Check if user has closed the offer previously
  useEffect(() => {
    if (localStorage.getItem('semrushOfferClosed') === 'true') {
      setIsVisible(false);
    }
  }, []);
  
  // Also show after successful UTM creation
  const showAfterSuccess = () => {
    if (localStorage.getItem('semrushOfferClosed') !== 'true') {
      setIsVisible(true);
    }
  };
  
  return (
    <OfferContainer isVisible={isVisible}>
      <CloseButton onClick={handleClose}>✕</CloseButton>
      
      <OfferHeader>
        <OfferLogo src="https://cdn.semrush.com/static/index/semrush-logo.svg" alt="SEMrush Logo" />
        <OfferTitle>UTM Builder Pro</OfferTitle>
      </OfferHeader>
      
      <OfferContent>
        Take your UTM campaigns to the next level with <OfferHighlight>SEMrush's advanced analytics</OfferHighlight>.
        Track your campaign performance and get detailed insights.
      </OfferContent>
      
      <OfferCTA 
        href="https://www.semrush.com/signup/?src=utm_builder&utm_source=utm_builder&utm_medium=special_offer"
        target="_blank" 
        rel="noopener noreferrer"
      >
        Try SEMrush Free for 7 Days
      </OfferCTA>
      
      <OfferFooter>
        No credit card required. Cancel anytime.
      </OfferFooter>
    </OfferContainer>
  );
};

export { SpecialOffer, showAfterSuccess };
export default SpecialOffer; 