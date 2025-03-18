import React from 'react';
import styled from 'styled-components';

const InfoContainer = styled.div`
  margin: ${({ theme }) => theme.spacing[8]} 0;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background-color: ${({ theme }) => theme.background.paper};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.border.light};
`;

const InfoHeader = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, ${({ theme }) => `${theme.colors.primary}10, transparent`});
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
`;

const InfoTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text.primary};
  font-size: 30px;
  line-height: 34px;
  font-weight: 800;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const InfoContent = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
`;

const InfoDescription = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  margin: ${({ theme }) => theme.spacing[2]} 0 ${({ theme }) => theme.spacing[4]};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => `${theme.colors.primary}10`};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => `${theme.background.secondary}50`};
  }
`;

const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing[3]};
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.text.primary};
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing[3]};
  vertical-align: top;
  color: ${({ theme }) => theme.text.secondary};
`;

const ParameterTag = styled.span`
  display: inline-block;
  background-color: ${({ color, theme }) => color || theme.colors.primary};
  color: white;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: monospace;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing[1]};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  box-shadow: 0 2px 4px ${({ color }) => `${color}40` || 'rgba(0, 0, 0, 0.1)'};
`;

const RequiredTag = styled.span`
  display: inline-block;
  background-color: ${({ isRequired, theme }) => 
    isRequired ? theme.colors.danger : theme.colors.success};
  color: white;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
`;

const ExampleTag = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.secondary};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: monospace;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  </svg>
);

const parameterData = [
  {
    name: 'Campaign ID',
    tag: 'utm_id',
    required: 'No',
    example: 'abc-123',
    description: 'Used to identify which ads campaign this referral references. Use utm_id to identify a specific ads campaign.',
    color: '#5E60CE',
  },
  {
    name: 'Campaign Source',
    tag: 'utm_source',
    required: 'Yes',
    example: 'google',
    description: 'Use utm_source to identify a search engine, newsletter name, or other source.',
    color: '#2763eb',
  },
  {
    name: 'Campaign Medium',
    tag: 'utm_medium',
    required: 'Yes',
    example: 'cpc',
    description: 'Use utm_medium to identify a medium such as email or cost-per-click.',
    color: '#3A0CA3',
  },
  {
    name: 'Campaign Name',
    tag: 'utm_campaign',
    required: 'No',
    example: 'spring_sale',
    description: 'Used for keyword analysis. Use utm_campaign to identify a specific product promotion or strategic campaign.',
    color: '#4361EE',
  },
  {
    name: 'Campaign Term',
    tag: 'utm_term',
    required: 'No',
    example: 'running_shoes',
    description: 'Used for paid search. Use utm_term to note the keywords for this ad.',
    color: '#4CC9F0',
  },
  {
    name: 'Campaign Content',
    tag: 'utm_content',
    required: 'No',
    example: 'logolink',
    description: 'Used for A/B testing and content-targeted ads. Use utm_content to differentiate ads or links that point to the same URL.',
    color: '#7209B7',
  },
];

const InfoSection = () => {
  return (
    <InfoContainer>
      <InfoHeader>
        <InfoTitle>
          <InfoIcon />
          More information and examples for each parameter
        </InfoTitle>
      </InfoHeader>
      <InfoContent>
        <InfoDescription>
          The following table gives a detailed explanation and example of each of the campaign parameters:
        </InfoDescription>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Parameter</TableHeader>
              <TableHeader>Required</TableHeader>
              <TableHeader>Example</TableHeader>
              <TableHeader>Description</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {parameterData.map((param, index) => (
              <TableRow key={index}>
                <TableCell>
                  {param.name}
                  <div>
                    <ParameterTag color={param.color}>{param.tag}</ParameterTag>
                  </div>
                </TableCell>
                <TableCell>
                  <RequiredTag isRequired={param.required === 'Yes'}>
                    {param.required}
                  </RequiredTag>
                </TableCell>
                <TableCell>
                  <ExampleTag>{param.example}</ExampleTag>
                </TableCell>
                <TableCell>{param.description}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </InfoContent>
    </InfoContainer>
  );
};

export default InfoSection; 