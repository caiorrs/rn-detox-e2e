import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {e2eTestIds} from './e2e/testIDs';

const App = () => {
  const [show, setShow] = useState(false);
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
    </View>
  );
};

export default App;
