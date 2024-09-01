import React from 'react';
import styled from 'styled-components';

interface LabelProps {
  text: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

const LabelWrapper = styled.span<{ color: string; size: string }>`
  display: inline-block;
  background-color: ${({ color }) => color};
  padding: ${({ size }) => (size === 'large' ? '10px' : size === 'medium' ? '8px' : '5px')};
  color: white;
  font-size: ${({ size }) => (size === 'large' ? '16px' : size === 'medium' ? '14px' : '12px')};
  border-radius: 3px;
`;

const Badge: React.FC<LabelProps> = ({ text, color = 'blue', size = 'medium' }) => {
  return <LabelWrapper color={color} size={size}>{text}</LabelWrapper>;
};

export default Badge;
