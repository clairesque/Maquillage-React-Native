import React from 'react';
import Providers from './navigation';
import {setCustomText} from 'react-native-global-props';
const customTextProps = {
  style: {
    fontFamily: 'Avenir Next',
  },
};

setCustomText(customTextProps);

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const App = () => {
  return <Providers />;
};

export default App;
