import { 
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

// SCREENS
import HomeScreen from '../screens/HomeScreen.js';
import GarmentsScreen from '../screens/GarmentsScreens.js';
import GarmentDetailView from '../screens/GarmentDetailView.js';

// // HOME
// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
// });

// GARMENTS
const GarmentsStack = createStackNavigator(
  {
    Garments: GarmentsScreen,
    GarmentDetailView: GarmentDetailView,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

// TAB NAVIGATION
const BottomTabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Garments: GarmentsStack,
});

export default createAppContainer(BottomTabNavigator);