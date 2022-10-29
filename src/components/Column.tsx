import React, {useRef} from 'react';
import {useDrop} from 'react-dnd';
import {ColumnContainer, ColumnTitle} from '../styles';
import {AddNewItem} from './AddNewItem';
import {useAppState} from '../state/AppStateContext';
import {Card} from './Card';
import {addTask, moveList} from '../state/actions';
import {useItemDrag} from '../utils/useItemDrag';
import {isHidden} from '../utils/isHidden';

type ColumnProps = {
  id: string;
  text: string;
  children?: React.ReactNode;
  isPreview?: boolean;
};

export const Column: React.FC<ColumnProps> = ({
  id,
  text,
  isPreview,
}) => {
  const {getTasksByListId, dispatch, draggedItem} = useAppState();
  const {drag} = useItemDrag({id, text, type: 'COLUMN'});
  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      }
    },
  });

  drag(ref);
  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}
      isPreview={isPreview}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => {
        return (
          <Card
            key={task.id}
            id={task.id}
            text={task.text}
            columnId={id}
          />
        );
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
