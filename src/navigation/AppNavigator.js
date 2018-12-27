import { 
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

// SCREENS
import HomeScreen from '../screens/HomeScreen.js';
import GarmentScreen from '../screens/GarmentScreens.js';
import GarmentDetailView from '../screens/views/GarmentDetailView.js';
import GarmnetCreationView from '../screens/views/GarmnetCreationView.js';

// GARMENTS
const GarmentsStack = createStackNavigator(
  {
    Garments: GarmentScreen,
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