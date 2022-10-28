import React from 'react';
import {ColumnContainer, ColumnTitle} from '../styles';
import {AddNewItem} from './AddNewItem';
import {useAppState} from '../state/AppStateContext';
import {Card} from './Card';
import {addTask} from '../state/actions';

type ColumnProps = {
  id: string;
  text: string;
  children?: React.ReactNode;
};

export const Column: React.FC<ColumnProps> = ({id, text}) => {
  const {getTasksByListId, dispatch} = useAppState();

  const tasks = getTasksByListId(id);
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => {
        return <Card key={task.id} id={task.id} text={task.text} />;
      })}
      <AddNewItem
        onAdd={(text) => {
          dispatch(addTask(text, id));
        }}
        toggleButtonText="+ Add another task"
        dark
      />
    </ColumnContainer>
  );
};
