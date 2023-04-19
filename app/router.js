import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from './auth';
import LoginScreen from './screens/LoginScreen';
import RestaurantsScreen from './screens/RestaurantsScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import Header from './shared/Header';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons/faBurger';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons/faClockRotateLeft';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name='Restaurants'
        component={RestaurantsScreen}
        options={{
          header: () => <Header />,
          tabBarIcon: ({ focused }) => <FontAwesomeIcon icon={faBurger} />,
        }}
      />
      <Tab.Screen
        name='OrderHistory'
        component={OrderHistoryScreen}
        options={{
          header: () => <Header />,
          tabBarIcon: ({ focused }) => <FontAwesomeIcon icon={faClockRotateLeft} />,
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Router = () => {
  const { authData, loading } = useAuth();

  //   if (loading) {
  //     //You can see the component implementation at the repository
  //     return <Loading />;
  //   }

  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
