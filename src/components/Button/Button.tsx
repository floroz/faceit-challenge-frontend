import React, { ReactNode } from 'react';
import { StyledButton } from './Button.styles';

interface IProps {
  children: ReactNode | string;
  onClick: any;
}

const Button = (props: IProps) => {
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>;
};

export default Button;
