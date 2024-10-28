import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { registerRootComponent } from 'expo';

// Registering main App component for web
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, { initialProps: {}, rootTag: document.getElementById('app-root') });
