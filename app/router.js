import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from './auth';
import LoginScreen from './screens/LoginScreen';
import RestaurantsScreen from './screens/RestaurantsScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Restaurants' component={RestaurantsScreen} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen} />
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
