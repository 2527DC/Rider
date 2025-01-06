/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AppProvider } from './src/Store/AppContext';
AppRegistry.registerComponent(appName, () => () => (
    <AppProvider>
      <App />
    </AppProvider>
  ));