import React from 'react';
import {AppContainer} from './styles';
import {Column} from './components/Column';
import {AddNewItem} from './components/AddNewItem';
import {useAppState} from './state/AppStateContext';
import {addList} from './state/actions';
import {CustomDragLayer} from './components/CustomDragLayer';

type AppProps = {
  children?: React.ReactNode;
};

const App: React.FC<AppProps> = () => {
  const {dispatch, lists} = useAppState();
  return (
    <AppContainer>
      <CustomDragLayer />
        {lists.map((list) => {
          return (
            <Column key={list.id} id={list.id} text={list.text} />
          );
        })}
        <AddNewItem
          toggleButtonText="+ Add another list"
          onAdd={(text) => {
            dispatch(addList(text));
          }}
        />
    
    </AppContainer>
  );
};

export {App};
