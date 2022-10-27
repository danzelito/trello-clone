import React from 'react';
import {AppContainer} from './styles';
import {Column} from './components/Column';
import {AddNewItem} from './components/AddNewItem';
import {useAppState} from './state/AppStateContext';

type AppProps = {
  children?: React.ReactNode;
};

const App: React.FC<AppProps> = () => {
  const {lists} = useAppState();
  return (
    <AppContainer>
      {lists.map((list) => {
        return <Column key={list.id} id={list.id} text={list.text} />;
      })}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={console.log}
      />
    </AppContainer>
  );
};

export {App};
