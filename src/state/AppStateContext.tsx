import React, {createContext, useContext, useReducer} from 'react';
import {useImmerReducer} from 'use-immer';
import {appStateReducer} from './appStateReducer';
import {Action} from './actions';
import {DragItem} from '../DragAndDrop/DragItem';

export type Task = {
  id: string;
  text: string;
};

export type List = {
  id: string;
  text: string;
  tasks: Task[];
};

export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
};

export const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{id: 'c0', text: 'Generate app scaffold'}],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{id: 'c2', text: 'Learn Typescript'}],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{id: 'c3', text: 'Begin to use static typing'}],
    },
  ],
};

type AppStateContextProps = {
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: React.Dispatch<Action>;
  draggedItem: DragItem | null;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

type AppStateProviderProps = {
  children?: React.ReactNode;
};

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const {lists, draggedItem} = state;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider
      value={{lists, getTasksByListId, dispatch, draggedItem}}
    >
      {children}
    </AppStateContext.Provider>
  );
};
