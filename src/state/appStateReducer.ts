import {nanoid} from 'nanoid';
import {Action} from './actions';
import { AppState } from './AppStateContext';
import { findItemIndexById } from '../utils/arrayUtils';

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
      const listIndex = findItemIndexById(state.lists, action.payload.listId)
      state.lists[listIndex].tasks.push({
        id: nanoid(),
        text: action.payload.text,
      });
      break;
    default:
      break
  }
};
