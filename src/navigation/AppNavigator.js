import { 
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

// SCREENS
import HomeScreen from '../screens/HomeScreen.js';
import GarmentsScreen from '../screens/GarmentsScreens.js';

/** STACKS IF NEEDED */
// // HOME
// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
// });

// // GARMENTS
// const GarmentsStack = createStackNavigator({
//   Garments: GarmentsScreen,
// });

// TAB NAVIGATION
const BottomTabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Garments: GarmentsScreen,
});

export default createAppContainer(BottomTabNavigator);