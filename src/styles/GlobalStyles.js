import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    font-size: 18px;
    line-height: 32px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.background.primary};
    color: ${props => props.theme.text.primary};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Manrope', sans-serif;
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.text.primary};
  }
  
  h1 {
    font-size: 40px;
    line-height: 52px;
    font-weight: 800;
  }
  
  h2 {
    font-size: 30px;
    line-height: 34px;
    font-weight: 800;
  }
  
  h3 {
    font-size: 28px;
    line-height: 34px;
    font-weight: 700;
  }
  
  h4 {
    font-size: 22px;
    line-height: 31px;
    font-weight: 900;
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.text.secondary};
  }
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  button {
    font-family: 'Manrope', sans-serif;
    cursor: pointer;
  }
  
  input, textarea, select {
    font-family: 'Manrope', sans-serif;
    font-size: inherit;
  }
  
  ::selection {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

export default GlobalStyles; 