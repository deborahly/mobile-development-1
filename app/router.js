import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from './auth';
import Header from './shared/Header';
import LoginScreen from './screens/LoginScreen';
import RestaurantsScreen from './screens/RestaurantsScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons/faBurger';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons/faClockRotateLeft';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name='Restaurants'
        component={RestaurantStackScreen}
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
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faClockRotateLeft} />
          ),
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

const RestaurantStack = createNativeStackNavigator();

const RestaurantStackScreen = () => {
  return (
    <RestaurantStack.Navigator>
      <RestaurantStack.Screen
        name='Restaurants'
        component={RestaurantsScreen}
        options={{ headerShown: false }}
      />
      <RestaurantStack.Screen
        name='Restaurant'
        component={RestaurantScreen}
        options={{ headerShown: false }}
      />
    </RestaurantStack.Navigator>
  );
};

const Router = () => {
  const { authData, loadStorageData } = useAuth();

  useEffect(() => {
    loadStorageData();
  }, []);

  return (
    <NavigationContainer>
      {authData ? <AppTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
