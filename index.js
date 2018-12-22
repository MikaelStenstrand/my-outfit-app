/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// test purposes
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['']);

AppRegistry.registerComponent(appName, () => App);
