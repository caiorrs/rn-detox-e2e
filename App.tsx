import React, {useReducer, useState} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {e2eTestIds} from './e2e/testIDs';

type TState = {
  loading: boolean;
  data: null;
  error: null | Error;
};

type TAction = {
  type: string;
  payload: TState['data'] | TState['error'];
};

function reducer(state: TState, action: TAction) {
  switch (action.type) {
    case 'START_REQUEST':
      return {...state, loading: true, error: null};
    case 'FINISH_REQUEST':
      return {...state, loading: false, data: action.payload, error: null};
    case 'FAIL_REQUEST':
      return {...state, loading: false, data: null, error: action.payload};
    default:
      return state;
  }
}

const initialState: TState = {
  loading: false,
  data: null,
  error: null,
};

const App = () => {
  const [show, setShow] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getContent = async () => {
    try {
      dispatch({type: 'START_REQUEST'});
      const response = await fetch('https://rickandmortyapi.com/api', {
        method: 'get',
      });
      const json = await response.json();
      dispatch({type: 'FINISH_REQUEST', payload: json});
    } catch (error) {
      dispatch({type: 'FAIL_REQUEST', payload: error});
    }
  };

  const toggle = () => {
    setShow(prev => !prev);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable
        onPress={toggle}
        testID={e2eTestIds.homeButton}
        style={{padding: 10, backgroundColor: show ? 'blue' : 'red'}}>
        <Text>{show ? 'Hide' : 'Show'}</Text>
      </Pressable>
      {show ? <Text testID={e2eTestIds.hiddenText}>Surprise</Text> : null}
      <Pressable
        onPress={getContent}
        testID={e2eTestIds.getContent}
        style={{padding: 10, backgroundColor: 'green'}}>
        <Text>Get async content</Text>
      </Pressable>
      {state.loading && <ActivityIndicator testID={e2eTestIds.loading} />}
      {state.data && (
        <Text testID={e2eTestIds.data}>{JSON.stringify(state.data)}</Text>
      )}
      {state.error && (
        <Text testID={e2eTestIds.error}>{JSON.stringify(state.error)}</Text>
      )}
    </View>
  );
};

export default App;
