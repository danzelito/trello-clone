import {listeners} from 'process';
import React, {createContext, useContext} from 'react';

type Task = {
  id: string;
  text: string;
};

type List = {
  id: string;
  text: string;
  tasks: Task[];
};

type AppState = {
  lists: List[];
};

export const appData: AppState = {
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
  const {lists} = appData;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider value={{lists, getTasksByListId}}>
      {children}
    </AppStateContext.Provider>
  );
};