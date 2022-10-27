import React from 'react';
import {ColumnContainer, ColumnTitle} from '../styles';
import {AddNewItem} from './AddNewItem';

type ColumnProps = {
  text: string;
  children?: React.ReactNode;
};

export const Column: React.FC<ColumnProps> = ({text, children}) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  );
};
