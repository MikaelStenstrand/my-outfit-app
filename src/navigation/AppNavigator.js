import { 
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

// SCREENS
import HomeScreen from '../screens/HomeScreen.js';
import GarmentsScreen from '../screens/GarmentsScreens.js';
import GarmentDetailView from '../screens/views/GarmentDetailView.js';
import GarmnetCreationView from '../screens/views/GarmnetCreationView.js';

// GARMENTS
const GarmentsStack = createStackNavigator(
  {
    Garments: GarmentsScreen,
    GarmentDetailView: GarmentDetailView,
    GarmentCreationView: GarmnetCreationView,
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
  // Home: HomeScreen,
  Garments: GarmentsStack,
});

export default createAppContainer(BottomTabNavigator);