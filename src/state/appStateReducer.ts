import {nanoid} from 'nanoid';
import {Action} from './actions';
import {AppState} from './AppStateContext';
import {findItemIndexById, moveItem} from '../utils/arrayUtils';
import {DragItem} from '../DragAndDrop/DragItem';

export const appStateReducer = (
  state: AppState,
  action: Action
): AppState | void => {
  switch (action.type) {
    case 'ADD_LIST':
      state.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: [],
      });
      break;

    case 'ADD_TASK':
      const listIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      );
      state.lists[listIndex].tasks.push({
        id: nanoid(),
        text: action.payload.text,
      });
      break;

    case 'MOVE_LIST':
      const {draggedId, hoverId} = action.payload;
      const dragIndex = findItemIndexById(state.lists, draggedId);
      const hoverIndex = findItemIndexById(state.lists, hoverId);
      state.lists = moveItem(state.lists, dragIndex, hoverIndex);
      break;

    case 'SET_DRAGGED_ITEM':
      state.draggedItem = action.payload;
      break;
    
    default:
      break;
  }
};
