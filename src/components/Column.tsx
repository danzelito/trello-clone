import React from 'react';
import {ColumnContainer, ColumnTitle} from '../styles';
import {AddNewItem} from './AddNewItem';
import {useAppState} from '../state/AppStateContext';
import {Card} from './Card';

type ColumnProps = {
  id: string;
  text: string;
  children?: React.ReactNode;
};

export const Column: React.FC<ColumnProps> = ({id, text}) => {
  const {getTasksByListId} = useAppState();

  const tasks = getTasksByListId(id);
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => {
        return <Card key={task.id} id={task.id} text={task.text} />;
      })}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  );
};
