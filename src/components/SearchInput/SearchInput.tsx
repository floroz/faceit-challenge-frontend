import React from 'react';
import Input from './SearchInput.style';

interface IProps {
  placeholder?: string;
  value: string;
  type?: string;
  id?: string;
  onChange: (e: { target: { value: string } }) => void;
}

const SearchInput = (props: IProps) => {
  return (
    <Input
      type={props.type || 'text'}
      value={props.value}
      id={props.id || ''}
      placeholder={props.placeholder || ''}
      onChange={props.onChange}
    />
  );
};

export default SearchInput;
