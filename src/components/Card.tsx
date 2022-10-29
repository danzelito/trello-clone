import React, {useRef} from 'react';
import {useDrop} from 'react-dnd';
import {CardContainer} from '../styles';
import {useAppState} from '../state/AppStateContext';
import {isHidden} from '../utils/isHidden';
import {useItemDrag} from '../utils/useItemDrag';
import {moveTask, setDraggedItem} from '../state/actions';

type CardProps = {
  text: string;
  id: string;
  columnId: string;
  isPreview?: boolean;
};

export const Card: React.FC<CardProps> = ({
  id,
  text,
  columnId,
  isPreview,
}) => {
  const {draggedItem, dispatch} = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const {drag} = useItemDrag({
    type: 'CARD',
    id,
    text,
    columnId,
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type !== 'CARD') {
        return;
      }
      dispatch(
        moveTask(draggedItem.id, id, draggedItem.columnId, columnId)
      );
    },
  });

  drag(drop(ref));
  return (
    <CardContainer
      isHidden={isHidden(draggedItem, 'CARD', id, isPreview)}
      isPreview={isPreview}
      ref={ref}
    >
      {text}
    </CardContainer>
  );
};
