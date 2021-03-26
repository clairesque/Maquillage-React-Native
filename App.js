import React from 'react';
import Providers from './navigation';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const App = () => {
  return <Providers />;
}

export default App;
