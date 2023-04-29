import { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from './auth';
import Header from './shared/Header';
import LoginScreen from './screens/LoginScreen';
import AccountSelectScreen from './screens/AccountSelectScreen';
import RestaurantsScreen from './screens/RestaurantsScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import DeliveriesScreen from './screens/DeliveriesScreen';
import AccountScreen from './screens/AccountScreen';
import CourierAccountScreen from './screens/CourierAccountScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons/faBurger';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons/faClockRotateLeft';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import styles from './styles/styles';
import colors from './styles/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  const { authData } = useAuth();

  return authData.customer_id && !authData.courier_id ? (
    <Stack.Navigator>
      <Stack.Screen
        name='AppTab'
        component={AppTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : !authData.customer_id && authData.courier_id ? (
    <Stack.Navigator>
      <Stack.Screen
        name='CourierAppTab'
        component={CourierAppTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name='AccountSelect'
        component={AccountSelectScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AppTab'
        component={AppTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='CourierAppTab'
        component={CourierAppTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.black,
      }}
    >
      <Tab.Screen
        name='RestaurantStack'
        component={RestaurantStackScreen}
        options={{
          header: () => <Header />,
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.bottomTabIcon}>
              <FontAwesomeIcon icon={faBurger} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='OrderHistory'
        component={OrderHistoryScreen}
        options={{
          header: () => <Header />,
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.bottomTabIcon}>
              <FontAwesomeIcon icon={faClockRotateLeft} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          header: () => <Header />,
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.bottomTabIcon}>
              <FontAwesomeIcon icon={faUser} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
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

const CourierAppTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.black,
      }}
    >
      <Tab.Screen
        name='Deliveries'
        component={DeliveriesScreen}
        options={{
          header: () => <Header />,
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.bottomTabIcon}>
              <FontAwesomeIcon icon={faUser} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name='CourierAccount'
        component={CourierAccountScreen}
        options={{
          header: () => <Header />,
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.bottomTabIcon}>
              <FontAwesomeIcon icon={faBurger} />
            </View>
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

const Router = () => {
  const { authData, loadStorageData } = useAuth();

  useEffect(() => {
    loadStorageData();
  }, []);

  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
